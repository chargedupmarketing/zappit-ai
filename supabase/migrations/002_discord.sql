-- Zappit AI Discord Bot Schema
-- Run this after 001_initial_schema.sql

-- ============================================
-- DISCORD LINKS (user → customer mapping)
-- ============================================
CREATE TABLE IF NOT EXISTS discord_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  discord_user_id TEXT UNIQUE NOT NULL,
  discord_username TEXT,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  linked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_discord_links_user ON discord_links(discord_user_id);
CREATE INDEX idx_discord_links_customer ON discord_links(customer_id);

-- ============================================
-- DISCORD LINK TOKENS (one-time pairing codes)
-- ============================================
CREATE TABLE IF NOT EXISTS discord_link_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  token TEXT UNIQUE NOT NULL,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_link_tokens_token ON discord_link_tokens(token);
CREATE INDEX idx_link_tokens_customer ON discord_link_tokens(customer_id);

-- ============================================
-- BOT SERVERS (guild config)
-- ============================================
CREATE TABLE IF NOT EXISTS bot_servers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guild_id TEXT UNIQUE NOT NULL,
  guild_name TEXT,
  news_channel_id TEXT,
  news_enabled BOOLEAN NOT NULL DEFAULT false,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bot_servers_guild ON bot_servers(guild_id);

-- ============================================
-- NOTIFICATION CHANNELS (premium alert routing)
-- ============================================
CREATE TABLE IF NOT EXISTS notification_channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guild_id TEXT NOT NULL,
  channel_id TEXT NOT NULL,
  notification_type TEXT NOT NULL CHECK (
    notification_type IN ('algo_buy', 'algo_sell', 'algo_update', 'indicator_signal', 'indicator_update')
  ),
  enabled_by_discord_user_id TEXT NOT NULL,
  enabled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(guild_id, notification_type)
);

CREATE INDEX idx_notif_channels_guild ON notification_channels(guild_id);
CREATE INDEX idx_notif_channels_type ON notification_channels(notification_type);

-- ============================================
-- SIGNALS (admin-triggered, bot delivers)
-- ============================================
CREATE TABLE IF NOT EXISTS signals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_type TEXT NOT NULL CHECK (product_type IN ('indicator', 'algorithm')),
  signal_type TEXT NOT NULL CHECK (signal_type IN ('buy', 'sell', 'update')),
  instrument TEXT NOT NULL DEFAULT 'ES',
  price DECIMAL(10, 2),
  timeframe TEXT,
  confidence INTEGER CHECK (confidence BETWEEN 1 AND 100),
  message TEXT,
  chart_symbol TEXT,
  delivered BOOLEAN NOT NULL DEFAULT false,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_signals_delivered ON signals(delivered);
CREATE INDEX idx_signals_product_type ON signals(product_type);
CREATE INDEX idx_signals_created ON signals(created_at DESC);

-- ============================================
-- RLS
-- ============================================
ALTER TABLE discord_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE discord_link_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE bot_servers ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE signals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access to discord_links" ON discord_links
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access to discord_link_tokens" ON discord_link_tokens
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access to bot_servers" ON bot_servers
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access to notification_channels" ON notification_channels
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access to signals" ON signals
  FOR ALL USING (true) WITH CHECK (true);

-- Updated_at trigger for bot_servers
CREATE TRIGGER bot_servers_updated_at
  BEFORE UPDATE ON bot_servers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
