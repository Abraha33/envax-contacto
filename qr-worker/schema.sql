CREATE TABLE IF NOT EXISTS scans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  scan_id TEXT NOT NULL UNIQUE,
  visitor_key TEXT,
  source TEXT NOT NULL,
  scanned_at TEXT NOT NULL,
  country TEXT,
  city TEXT,
  region TEXT,
  timezone TEXT,
  device TEXT,
  browser TEXT,
  os TEXT,
  user_agent TEXT,
  destination TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_scans_scanned_at ON scans(scanned_at);
CREATE INDEX IF NOT EXISTS idx_scans_source ON scans(source);
CREATE INDEX IF NOT EXISTS idx_scans_visitor_key ON scans(visitor_key);

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
