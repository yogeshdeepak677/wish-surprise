import pool from '../database/db.js';
import { comparePassword, getClientIP } from '../utils/auth.js';

export async function checkPasswordAttempts(req, res, next) {
  try {
    const { slug } = req.params;
    const ip = getClientIP(req);

    const result = await pool.query(
      `SELECT * FROM password_attempts WHERE surprise_id = (SELECT id FROM surprises WHERE random_slug = $1) AND ip_address = $2`,
      [slug, ip]
    );

    if (result.rows.length > 0) {
      const attempt = result.rows[0];
      if (attempt.locked_until && new Date(attempt.locked_until) > new Date()) {
        return res.status(429).json({ error: 'Too many attempts. Please try again later.' });
      }
    }

    next();
  } catch (error) {
    console.error('Password attempt check error:', error.message);
    next();
  }
}

export async function recordPasswordAttempt(surpriseId, ip, success = false) {
  try {
    const result = await pool.query(
      `SELECT * FROM password_attempts WHERE surprise_id = $1 AND ip_address = $2`,
      [surpriseId, ip]
    );

    if (result.rows.length === 0) {
      await pool.query(
        `INSERT INTO password_attempts (surprise_id, ip_address, attempt_count, locked_until)
         VALUES ($1, $2, $3, $4)`,
        [surpriseId, ip, 1, null]
      );
    } else {
      const attempt = result.rows[0];
      const newCount = attempt.attempt_count + 1;
      const maxAttempts = parseInt(process.env.PASSWORD_ATTEMPT_LIMIT || '5');

      let lockedUntil = null;
      if (newCount >= maxAttempts) {
        lockedUntil = new Date(Date.now() + parseInt(process.env.PASSWORD_ATTEMPT_WINDOW_MS || '900000'));
      }

      await pool.query(
        `UPDATE password_attempts SET attempt_count = $1, last_attempt_at = NOW(), locked_until = $2 WHERE id = $3`,
        [newCount, lockedUntil, attempt.id]
      );
    }
  } catch (error) {
    console.error('Record password attempt error:', error.message);
  }
}

export async function verifySurprisePassword(surpriseId, password) {
  try {
    const result = await pool.query(
      `SELECT password_hash FROM surprises WHERE id = $1`,
      [surpriseId]
    );

    if (result.rows.length === 0) {
      return false;
    }

    return await comparePassword(password, result.rows[0].password_hash);
  } catch (error) {
    console.error('Password verification error:', error.message);
    return false;
  }
}