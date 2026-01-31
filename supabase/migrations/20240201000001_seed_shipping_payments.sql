-- ============================================
-- Seed Data for Shipping and Payments
-- Run AFTER 20240201000000_shipping_payments_update.sql
-- ============================================

-- Create Shipments
INSERT INTO shipments (id, creator_id, campaign_id, tracking_number, carrier, status, address, items, estimated_delivery, shipped_at, delivered_at) VALUES
  ('ship1111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', 'camp1111-1111-1111-1111-111111111111', 'SA12345678901', 'Aramex', 'DELIVERED', '123 Artist Street, Riyadh', 'Art Supply Kit x1', NOW() - INTERVAL '5 days', NOW() - INTERVAL '10 days', NOW() - INTERVAL '5 days'),
  ('ship2222-2222-2222-2222-222222222222', 'c2222222-2222-2222-2222-222222222222', 'camp1111-1111-1111-1111-111111111111', 'SA23456789012', 'SMSA', 'IN_TRANSIT', '456 Lifestyle Ave, Jeddah', 'Art Supply Kit x1', NOW() + INTERVAL '2 days', NOW() - INTERVAL '3 days', null),
  ('ship3333-3333-3333-3333-333333333333', 'c3333333-3333-3333-3333-333333333333', 'camp1111-1111-1111-1111-111111111111', 'SA34567890123', 'DHL', 'SHIPPED', '789 Tech Road, Riyadh', 'Art Supply Kit x1', NOW() + INTERVAL '4 days', NOW() - INTERVAL '1 day', null),
  ('ship4444-4444-4444-4444-444444444444', 'c4444444-4444-4444-4444-444444444444', 'camp2222-2222-2222-2222-222222222222', 'SA45678901234', 'FedEx', 'DELIVERED', '321 Beauty Lane, Dammam', 'Coffee Sample Pack x2', NOW() - INTERVAL '7 days', NOW() - INTERVAL '14 days', NOW() - INTERVAL '7 days'),
  ('ship5555-5555-5555-5555-555555555555', 'c5555555-5555-5555-5555-555555555555', 'camp2222-2222-2222-2222-222222222222', null, null, 'PENDING', '654 Fitness Blvd, Riyadh', 'Coffee Sample Pack x2', null, null, null),
  ('ship6666-6666-6666-6666-666666666666', 'c6666666-6666-6666-6666-666666666666', 'camp3333-3333-3333-3333-333333333333', 'SA67890123456', 'Aramex', 'IN_TRANSIT', '987 Fashion Street, Jeddah', 'Beauty Product Set x3', NOW() + INTERVAL '3 days', NOW() - INTERVAL '2 days', null)
ON CONFLICT (id) DO NOTHING;

-- Create Payments
INSERT INTO payments (id, creator_id, campaign_id, amount, currency, status, type, method, reference, paid_at) VALUES
  ('pay11111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', 'camp1111-1111-1111-1111-111111111111', 150.00, 'USD', 'PAID', 'creator_fee', 'bank_transfer', 'TRF-001234', NOW() - INTERVAL '3 days'),
  ('pay22222-2222-2222-2222-222222222222', 'c2222222-2222-2222-2222-222222222222', 'camp1111-1111-1111-1111-111111111111', 150.00, 'USD', 'PENDING', 'creator_fee', 'bank_transfer', null, null),
  ('pay33333-3333-3333-3333-333333333333', 'c3333333-3333-3333-3333-333333333333', 'camp1111-1111-1111-1111-111111111111', 150.00, 'USD', 'PENDING', 'creator_fee', 'paypal', null, null),
  ('pay44444-4444-4444-4444-444444444444', 'c4444444-4444-4444-4444-444444444444', 'camp2222-2222-2222-2222-222222222222', 200.00, 'USD', 'PAID', 'creator_fee', 'bank_transfer', 'TRF-005678', NOW() - INTERVAL '5 days'),
  ('pay55555-5555-5555-5555-555555555555', 'c5555555-5555-5555-5555-555555555555', 'camp2222-2222-2222-2222-222222222222', 200.00, 'USD', 'PROCESSING', 'creator_fee', 'bank_transfer', null, null),
  ('pay66666-6666-6666-6666-666666666666', 'c6666666-6666-6666-6666-666666666666', 'camp3333-3333-3333-3333-333333333333', 175.00, 'USD', 'PENDING', 'creator_fee', 'paypal', null, null),
  ('pay77777-7777-7777-7777-777777777777', 'c1111111-1111-1111-1111-111111111111', 'camp2222-2222-2222-2222-222222222222', 100.00, 'USD', 'PAID', 'bonus', 'bank_transfer', 'TRF-009012', NOW() - INTERVAL '1 day'),
  ('pay88888-8888-8888-8888-888888888888', 'c4444444-4444-4444-4444-444444444444', 'camp3333-3333-3333-3333-333333333333', 180.00, 'USD', 'FAILED', 'creator_fee', 'bank_transfer', null, null)
ON CONFLICT (id) DO NOTHING;

SELECT 'Shipping and Payments seed data inserted successfully!' as result;
