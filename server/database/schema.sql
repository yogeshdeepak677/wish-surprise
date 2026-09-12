-- Admins table
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Surprises table
CREATE TABLE IF NOT EXISTS surprises (
  id SERIAL PRIMARY KEY,
  random_slug VARCHAR(50) UNIQUE NOT NULL,
  admin_id INTEGER NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
  recipient_name VARCHAR(255) NOT NULL,
  birthday_date DATE NOT NULL,
  age INTEGER,
  message TEXT NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  theme VARCHAR(50) DEFAULT 'Rose Dream',
  background_music_path VARCHAR(500),
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_expired BOOLEAN DEFAULT FALSE
);

-- Media table (photos and audio)
CREATE TABLE IF NOT EXISTS media (
  id SERIAL PRIMARY KEY,
  surprise_id INTEGER NOT NULL REFERENCES surprises(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL,
  storage_path VARCHAR(500) NOT NULL,
  original_filename VARCHAR(255),
  file_size INTEGER,
  mime_type VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Password attempt tracking (rate limiting)
CREATE TABLE IF NOT EXISTS password_attempts (
  id SERIAL PRIMARY KEY,
  surprise_id INTEGER NOT NULL REFERENCES surprises(id) ON DELETE CASCADE,
  ip_address VARCHAR(50) NOT NULL,
  attempt_count INTEGER DEFAULT 1,
  first_attempt_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_attempt_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  locked_until TIMESTAMP
);

-- Admin sessions table
CREATE TABLE IF NOT EXISTS admin_sessions (
  id SERIAL PRIMARY KEY,
  admin_id INTEGER NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_surprises_random_slug ON surprises(random_slug);
CREATE INDEX idx_surprises_admin_id ON surprises(admin_id);
CREATE INDEX idx_surprises_expires_at ON surprises(expires_at);
CREATE INDEX idx_surprises_is_expired ON surprises(is_expired);
CREATE INDEX idx_media_surprise_id ON media(surprise_id);
CREATE INDEX idx_password_attempts_surprise_id ON password_attempts(surprise_id);
CREATE INDEX idx_password_attempts_locked_until ON password_attempts(locked_until);
CREATE INDEX idx_admin_sessions_admin_id ON admin_sessions(admin_id);
CREATE INDEX idx_admin_sessions_expires_at ON admin_sessions(expires_at);