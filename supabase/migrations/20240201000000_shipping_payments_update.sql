-- ============================================
-- Shipping and Payments Update Migration
-- ============================================

-- Add shipments table
CREATE TABLE IF NOT EXISTS shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES creators(id),
  campaign_id UUID REFERENCES campaigns(id),
  tracking_number TEXT,
  carrier TEXT,
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED', 'FAILED')),
  address TEXT,
  items TEXT,
  estimated_delivery TIMESTAMPTZ,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns to payments table
ALTER TABLE payments ADD COLUMN IF NOT EXISTS campaign_id UUID REFERENCES campaigns(id);
ALTER TABLE payments ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'USD';
ALTER TABLE payments ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'creator_fee';

-- Update payments status enum (if needed - drop and recreate constraint)
ALTER TABLE payments DROP CONSTRAINT IF EXISTS payments_status_check;
ALTER TABLE payments ADD CONSTRAINT payments_status_check CHECK (status IN ('PENDING', 'PROCESSING', 'PAID', 'FAILED', 'CANCELLED', 'pending', 'completed', 'failed'));

-- Enable RLS on shipments
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role has full access to shipments" ON shipments FOR ALL USING (true);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_shipments_creator_id ON shipments(creator_id);
CREATE INDEX IF NOT EXISTS idx_shipments_campaign_id ON shipments(campaign_id);
CREATE INDEX IF NOT EXISTS idx_shipments_status ON shipments(status);
CREATE INDEX IF NOT EXISTS idx_payments_campaign_id ON payments(campaign_id);

-- Add trigger for updated_at
CREATE TRIGGER update_shipments_updated_at BEFORE UPDATE ON shipments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

SELECT 'Shipping and Payments schema updated successfully!' as result;
