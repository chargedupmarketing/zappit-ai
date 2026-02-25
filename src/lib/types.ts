export type ProductType = 'indicator' | 'algorithm';
export type Platform = 'tradingview' | 'apex' | 'both';
export type Audience = 'prop_firm' | 'personal' | 'both';
export type BillingType = 'monthly' | 'yearly' | 'lifetime';
export type OrderStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type SubscriptionStatus = 'active' | 'cancelled' | 'past_due' | 'incomplete';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  type: ProductType;
  platform: Platform;
  audience: Audience;
  status: 'active' | 'draft' | 'archived';
  featured: boolean;
  image_url?: string;
  features: string[];
  created_at: string;
  updated_at: string;
  prices?: ProductPrice[];
}

export interface ProductPrice {
  id: string;
  product_id: string;
  billing_type: BillingType;
  price: number;
  compare_at_price?: number;
  stripe_price_id?: string;
  active: boolean;
}

export interface Customer {
  id: string;
  email: string;
  name: string;
  stripe_customer_id?: string;
  created_at: string;
}

export interface Subscription {
  id: string;
  customer_id: string;
  product_id: string;
  price_id: string;
  stripe_subscription_id: string;
  status: SubscriptionStatus;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
  product?: Product;
}

export interface Order {
  id: string;
  customer_id: string;
  product_id: string;
  price_id: string;
  stripe_payment_intent_id?: string;
  stripe_checkout_session_id?: string;
  amount: number;
  status: OrderStatus;
  created_at: string;
  product?: Product;
  price?: ProductPrice;
}

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  role: 'admin' | 'super_admin';
  created_at: string;
}

export interface DiscountCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  max_uses?: number;
  used_count: number;
  active: boolean;
  expires_at?: string;
  created_at: string;
}

export interface CartItem {
  product: Product;
  price: ProductPrice;
  quantity: number;
}
