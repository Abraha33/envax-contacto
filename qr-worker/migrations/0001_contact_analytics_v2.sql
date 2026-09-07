-- Apply once to the existing D1 database. This migration is additive only.
ALTER TABLE scans ADD COLUMN scanned_at_bogota TEXT;
ALTER TABLE scans ADD COLUMN colo TEXT;
ALTER TABLE scans ADD COLUMN language TEXT;
ALTER TABLE scans ADD COLUMN landing_path TEXT;
ALTER TABLE scans ADD COLUMN campaign_source TEXT;
ALTER TABLE scans ADD COLUMN campaign_medium TEXT;
ALTER TABLE scans ADD COLUMN campaign_name TEXT;
ALTER TABLE scans ADD COLUMN campaign_term TEXT;
ALTER TABLE scans ADD COLUMN campaign_content TEXT;
ALTER TABLE scans ADD COLUMN referrer TEXT;

CREATE INDEX IF NOT EXISTS idx_scans_campaign_source ON scans(campaign_source);
CREATE INDEX IF NOT EXISTS idx_scans_location ON scans(country, region, city);
CREATE INDEX IF NOT EXISTS idx_events_type_at ON events(event_type, event_at);
