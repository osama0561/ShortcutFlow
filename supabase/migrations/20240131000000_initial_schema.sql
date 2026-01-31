-- ============================================
-- ShortcutFlow Database Schema for Supabase
-- Run this in Supabase Dashboard > SQL Editor
-- ============================================

-- ============================================
-- AUTH MODELS
-- ============================================

-- Users table (for internal app users - admins, managers)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  password TEXT,
  image TEXT,
  role TEXT DEFAULT 'ACCOUNT_MANAGER' CHECK (role IN ('ADMIN', 'ACCOUNT_MANAGER', 'CLIENT', 'CREATOR')),
  email_verified TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BUSINESS MODELS
-- ============================================

-- Clients (Brands/Companies)
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo TEXT,
  industry TEXT,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Client Portal Users
CREATE TABLE IF NOT EXISTS client_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  password TEXT NOT NULL,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Creators
CREATE TABLE IF NOT EXISTS creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  avatar TEXT,
  handle TEXT,
  niche TEXT,
  location TEXT,
  followers INTEGER DEFAULT 0,
  engagement DECIMAL DEFAULT 0,
  rating DECIMAL DEFAULT 5,
  completed_jobs INTEGER DEFAULT 0,
  status TEXT DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'ON_CAMPAIGN', 'BUSY', 'INACTIVE')),
  bank_name TEXT,
  bank_account TEXT,
  address TEXT,
  city TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Campaigns
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  brief TEXT,
  script TEXT,
  status TEXT DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'RECRUITING', 'SCRIPTING', 'SHIPPING', 'FILMING', 'REVIEW', 'LIVE', 'COMPLETED')),
  target_creators INTEGER DEFAULT 10,
  budget DECIMAL,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  client_id UUID REFERENCES clients(id),
  manager_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Campaign-Creator Junction (Many-to-Many)
CREATE TABLE IF NOT EXISTS campaign_creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES creators(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  script_read BOOLEAN DEFAULT FALSE,
  product_shipped BOOLEAN DEFAULT FALSE,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  video_uploaded BOOLEAN DEFAULT FALSE,
  approved BOOLEAN DEFAULT FALSE,
  paid BOOLEAN DEFAULT FALSE,
  paid_amount DECIMAL,
  paid_at TIMESTAMPTZ,
  UNIQUE(campaign_id, creator_id)
);

-- Videos
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  url TEXT,
  thumbnail_url TEXT,
  duration INTEGER,
  status TEXT DEFAULT 'PENDING_UPLOAD' CHECK (status IN ('PENDING_UPLOAD', 'UPLOADED', 'INTERNAL_REVIEW', 'REVISION_REQUESTED', 'CLIENT_REVIEW', 'APPROVED', 'REJECTED', 'POSTED')),
  revision_note TEXT,
  client_note TEXT,
  tiktok_url TEXT,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  uploaded_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  posted_at TIMESTAMPTZ,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES creators(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amount DECIMAL NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  method TEXT,
  reference TEXT,
  creator_id UUID REFERENCES creators(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('info', 'success', 'warning', 'error')),
  read BOOLEAN DEFAULT FALSE,
  link TEXT,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity Log
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  description TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Create policies to allow service role full access
CREATE POLICY "Service role has full access to users" ON users FOR ALL USING (true);
CREATE POLICY "Service role has full access to clients" ON clients FOR ALL USING (true);
CREATE POLICY "Service role has full access to client_users" ON client_users FOR ALL USING (true);
CREATE POLICY "Service role has full access to creators" ON creators FOR ALL USING (true);
CREATE POLICY "Service role has full access to campaigns" ON campaigns FOR ALL USING (true);
CREATE POLICY "Service role has full access to campaign_creators" ON campaign_creators FOR ALL USING (true);
CREATE POLICY "Service role has full access to videos" ON videos FOR ALL USING (true);
CREATE POLICY "Service role has full access to payments" ON payments FOR ALL USING (true);
CREATE POLICY "Service role has full access to notifications" ON notifications FOR ALL USING (true);
CREATE POLICY "Service role has full access to activities" ON activities FOR ALL USING (true);

-- ============================================
-- INDEXES for performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_campaigns_client_id ON campaigns(client_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_manager_id ON campaigns(manager_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaign_creators_campaign_id ON campaign_creators(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_creators_creator_id ON campaign_creators(creator_id);
CREATE INDEX IF NOT EXISTS idx_videos_campaign_id ON videos(campaign_id);
CREATE INDEX IF NOT EXISTS idx_videos_creator_id ON videos(creator_id);
CREATE INDEX IF NOT EXISTS idx_videos_status ON videos(status);
CREATE INDEX IF NOT EXISTS idx_creators_status ON creators(status);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_created_at ON activities(created_at);

-- ============================================
-- Updated_at trigger function
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_creators_updated_at BEFORE UPDATE ON creators FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

SELECT 'ShortcutFlow database schema created successfully!' as result;
