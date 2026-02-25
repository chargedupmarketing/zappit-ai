-- Zappit AI Database Schema
-- Run this in your Supabase SQL editor to create all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CUSTOMERS
-- ============================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID UNIQUE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  stripe_customer_id TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_stripe ON customers(stripe_customer_id);
CREATE INDEX idx_customers_auth ON customers(auth_user_id);

-- ============================================
-- PRODUCTS
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  short_description TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL CHECK (type IN ('indicator', 'algorithm')),
  platform TEXT NOT NULL DEFAULT 'both' CHECK (platform IN ('tradingview', 'apex', 'both')),
  audience TEXT NOT NULL DEFAULT 'both' CHECK (audience IN ('prop_firm', 'personal', 'both')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('active', 'draft', 'archived')),
  featured BOOLEAN NOT NULL DEFAULT false,
  image_url TEXT,
  features JSONB NOT NULL DEFAULT '[]',
  stripe_product_id TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_type ON products(type);
CREATE INDEX idx_products_status ON products(status);

-- ============================================
-- PRODUCT PRICES
-- ============================================
CREATE TABLE IF NOT EXISTS product_prices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  billing_type TEXT NOT NULL CHECK (billing_type IN ('monthly', 'yearly', 'lifetime')),
  price DECIMAL(10, 2) NOT NULL,
  compare_at_price DECIMAL(10, 2),
  stripe_price_id TEXT UNIQUE,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(product_id, billing_type)
);

CREATE INDEX idx_prices_product ON product_prices(product_id);
CREATE INDEX idx_prices_stripe ON product_prices(stripe_price_id);

-- ============================================
-- SUBSCRIPTIONS
-- ============================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  price_id UUID NOT NULL REFERENCES product_prices(id),
  stripe_subscription_id TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'past_due', 'incomplete', 'trialing')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_subs_customer ON subscriptions(customer_id);
CREATE INDEX idx_subs_product ON subscriptions(product_id);
CREATE INDEX idx_subs_stripe ON subscriptions(stripe_subscription_id);
CREATE INDEX idx_subs_status ON subscriptions(status);

-- ============================================
-- ORDERS
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  price_id UUID NOT NULL REFERENCES product_prices(id),
  stripe_payment_intent_id TEXT,
  stripe_checkout_session_id TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_stripe_pi ON orders(stripe_payment_intent_id);
CREATE INDEX idx_orders_stripe_cs ON orders(stripe_checkout_session_id);

-- ============================================
-- ADMIN USERS
-- ============================================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- DISCOUNT CODES
-- ============================================
CREATE TABLE IF NOT EXISTS discount_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('percentage', 'fixed')),
  value DECIMAL(10, 2) NOT NULL,
  max_uses INTEGER,
  used_count INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  applies_to TEXT DEFAULT 'all' CHECK (applies_to IN ('all', 'indicator', 'algorithm')),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_discounts_code ON discount_codes(code);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;

-- Public read for active products and prices
CREATE POLICY "Products are publicly readable" ON products
  FOR SELECT USING (status = 'active');

CREATE POLICY "Prices are publicly readable" ON product_prices
  FOR SELECT USING (active = true);

-- Service role has full access (used by API routes)
CREATE POLICY "Service role full access to customers" ON customers
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access to products" ON products
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access to product_prices" ON product_prices
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access to subscriptions" ON subscriptions
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access to orders" ON orders
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access to admin_users" ON admin_users
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access to discount_codes" ON discount_codes
  FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
