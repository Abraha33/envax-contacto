CREATE TABLE IF NOT EXISTS scans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  scan_id TEXT NOT NULL UNIQUE,
  visitor_key TEXT,
  source TEXT NOT NULL,
  scanned_at TEXT NOT NULL,
  scanned_at_bogota TEXT NOT NULL,
  country TEXT,
  city TEXT,
  region TEXT,
  timezone TEXT,
  colo TEXT,
  device TEXT,
  browser TEXT,
  os TEXT,
  language TEXT,
  landing_path TEXT,
  campaign_source TEXT,
  campaign_medium TEXT,
  campaign_name TEXT,
  campaign_term TEXT,
  campaign_content TEXT,
  referrer TEXT,
  destination TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_scans_scanned_at ON scans(scanned_at);
CREATE INDEX IF NOT EXISTS idx_scans_source ON scans(source);
CREATE INDEX IF NOT EXISTS idx_scans_visitor_key ON scans(visitor_key);
CREATE INDEX IF NOT EXISTS idx_scans_campaign_source ON scans(campaign_source);
CREATE INDEX IF NOT EXISTS idx_scans_location ON scans(country, region, city);

CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id TEXT NOT NULL UNIQUE,
  scan_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_at TEXT NOT NULL,
  metadata_json TEXT NOT NULL DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_events_scan_id ON events(scan_id);
CREATE INDEX IF NOT EXISTS idx_events_event_type ON events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_event_at ON events(event_at);
CREATE INDEX IF NOT EXISTS idx_events_type_at ON events(event_type, event_at);
