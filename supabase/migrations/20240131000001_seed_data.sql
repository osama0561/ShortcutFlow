-- ============================================
-- ShortcutFlow Seed Data
-- ============================================

-- Password hash for 'password123' (bcrypt)

-- Create Admin User
INSERT INTO users (id, email, name, password, role) VALUES
  ('11111111-1111-1111-1111-111111111111', 'admin@shortcutflow.com', 'Admin User', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYxuQxfqMrAi', 'ADMIN')
ON CONFLICT (email) DO NOTHING;

-- Create Account Manager
INSERT INTO users (id, email, name, password, role) VALUES
  ('22222222-2222-2222-2222-222222222222', 'manager@shortcutflow.com', 'Mohammed Al-Rashid', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYxuQxfqMrAi', 'ACCOUNT_MANAGER')
ON CONFLICT (email) DO NOTHING;

-- Create Clients
INSERT INTO clients (id, name, industry, contact_name, contact_email, contact_phone) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'SG Corp', 'Art & Supplies', 'Ahmed Al-Rashid', 'ahmed@sgcorp.com', '+966 50 123 4567'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Florina Coffee', 'Food & Beverage', 'Sara Mohammed', 'sara@florina.com', '+966 55 987 6543'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'My Beauty', 'Beauty & Skincare', 'Noura Abdullah', 'noura@mybeauty.com', '+966 54 567 8901'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'TechCo', 'Technology', 'Khalid Omar', 'khalid@techco.com', '+966 56 234 5678')
ON CONFLICT (id) DO NOTHING;

-- Create Creators
INSERT INTO creators (id, name, email, handle, niche, location, followers, engagement, rating, completed_jobs, status, verified) VALUES
  ('c1111111-1111-1111-1111-111111111111', 'Noura Ahmed', 'noura@creator.com', '@noura.creates', 'Beauty', 'Riyadh', 45000, 4.8, 4.9, 12, 'AVAILABLE', true),
  ('c2222222-2222-2222-2222-222222222222', 'Sara Hassan', 'sara@creator.com', '@sara.lifestyle', 'Lifestyle', 'Jeddah', 32000, 5.2, 4.7, 8, 'AVAILABLE', true),
  ('c3333333-3333-3333-3333-333333333333', 'Ahmed Ali', 'ahmed@creator.com', '@tech.ahmed', 'Tech', 'Riyadh', 28000, 3.9, 4.5, 15, 'ON_CAMPAIGN', false),
  ('c4444444-4444-4444-4444-444444444444', 'Fatima Omar', 'fatima@creator.com', '@fatima.beauty', 'Beauty', 'Dammam', 67000, 4.1, 4.8, 20, 'AVAILABLE', true),
  ('c5555555-5555-5555-5555-555555555555', 'Mohammed Khalid', 'mohammed@creator.com', '@moh.fitness', 'Fitness', 'Riyadh', 52000, 6.3, 4.6, 7, 'ON_CAMPAIGN', true),
  ('c6666666-6666-6666-6666-666666666666', 'Layla Saeed', 'layla@creator.com', '@layla.fashion', 'Fashion', 'Jeddah', 89000, 4.5, 5.0, 25, 'AVAILABLE', true)
ON CONFLICT (email) DO NOTHING;

-- Create Campaigns (using proper UUIDs)
INSERT INTO campaigns (id, name, description, status, target_creators, budget, client_id, manager_id) VALUES
  ('ca111111-1111-1111-1111-111111111111', 'Safe Gallery UGC Campaign', 'Product showcase for art supplies with 200 creators', 'REVIEW', 200, 50000, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222'),
  ('ca222222-2222-2222-2222-222222222222', 'Florina Coffee Launch', 'New coffee blend launch campaign', 'LIVE', 50, 15000, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222'),
  ('ca333333-3333-3333-3333-333333333333', 'Beauty Product Launch', 'Skincare routine videos with beauty influencers', 'FILMING', 100, 30000, 'cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222'),
  ('ca444444-4444-4444-4444-444444444444', 'Tech Gadget Promo', 'Unboxing and review videos for new gadgets', 'RECRUITING', 150, 40000, 'dddddddd-dddd-dddd-dddd-dddddddddddd', '22222222-2222-2222-2222-222222222222')
ON CONFLICT (id) DO NOTHING;

-- Add creators to campaigns
INSERT INTO campaign_creators (campaign_id, creator_id, script_read, product_shipped, video_uploaded, approved, paid, paid_amount) VALUES
  ('ca111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', true, true, true, true, true, 150),
  ('ca111111-1111-1111-1111-111111111111', 'c2222222-2222-2222-2222-222222222222', true, true, false, false, false, null),
  ('ca111111-1111-1111-1111-111111111111', 'c3333333-3333-3333-3333-333333333333', true, true, false, false, false, null),
  ('ca222222-2222-2222-2222-222222222222', 'c4444444-4444-4444-4444-444444444444', true, true, true, true, true, 200),
  ('ca222222-2222-2222-2222-222222222222', 'c5555555-5555-5555-5555-555555555555', true, true, true, true, false, null),
  ('ca333333-3333-3333-3333-333333333333', 'c6666666-6666-6666-6666-666666666666', true, true, false, false, false, null)
ON CONFLICT (campaign_id, creator_id) DO NOTHING;

-- Create sample videos
INSERT INTO videos (campaign_id, creator_id, status, views, likes, title, tiktok_url) VALUES
  ('ca111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', 'APPROVED', 12500, 890, 'Art Supplies Review', null),
  ('ca111111-1111-1111-1111-111111111111', 'c2222222-2222-2222-2222-222222222222', 'CLIENT_REVIEW', 0, 0, 'Unboxing Video', null),
  ('ca222222-2222-2222-2222-222222222222', 'c4444444-4444-4444-4444-444444444444', 'POSTED', 45000, 3200, 'Coffee Tasting', 'https://tiktok.com/...'),
  ('ca222222-2222-2222-2222-222222222222', 'c5555555-5555-5555-5555-555555555555', 'APPROVED', 28000, 1800, 'Morning Routine', null);

-- Create activity log
INSERT INTO activities (action, description, entity_type, user_id) VALUES
  ('uploaded_video', 'Sara uploaded video #47', 'video', '22222222-2222-2222-2222-222222222222'),
  ('approved_video', 'Client approved 5 videos', 'video', null),
  ('joined_campaign', '12 creators joined Beauty Launch', 'campaign', null),
  ('delivered', 'Courier delivered to Noura', 'shipping', null);

SELECT 'Seed data inserted successfully!' as result;
