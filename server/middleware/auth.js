import pool from '../database/db.js';
import { comparePassword, hashPassword } from '../utils/auth.js';

export async function authenticateAdmin(req, res, next) {
  try {
    const sessionToken = req.cookies?.adminSession;
    if (!sessionToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const result = await pool.query(
      `SELECT a.id, a.email FROM admin_sessions s
       JOIN admins a ON s.admin_id = a.id
       WHERE s.session_token = $1 AND s.expires_at > NOW()`,
      [sessionToken]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Session expired' });
    }

    req.admin = result.rows[0];
    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    res.status(500).json({ error: 'Authentication failed' });
  }
}

export async function verifyAdminPassword(email, password) {
  try {
    const result = await pool.query(
      `SELECT id, password_hash FROM admins WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return { valid: false, message: 'Invalid email or password' };
    }

    const admin = result.rows[0];
    const passwordMatch = await comparePassword(password, admin.password_hash);

    if (!passwordMatch) {
      return { valid: false, message: 'Invalid email or password' };
    }

    return { valid: true, adminId: admin.id };
  } catch (error) {
    console.error('Password verification error:', error.message);
    return { valid: false, message: 'Verification failed' };
  }
}

export async function createAdminSession(adminId, expiresIn = 24 * 60 * 60 * 1000) {
  try {
    const sessionToken = require('crypto').randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + expiresIn);

    await pool.query(
      `INSERT INTO admin_sessions (admin_id, session_token, expires_at) VALUES ($1, $2, $3)`,
      [adminId, sessionToken, expiresAt]
    );

    return sessionToken;
  } catch (error) {
    console.error('Session creation error:', error.message);
    throw error;
  }
}

export async function invalidateAdminSession(sessionToken) {
  try {
    await pool.query(`DELETE FROM admin_sessions WHERE session_token = $1`, [sessionToken]);
  } catch (error) {
    console.error('Session invalidation error:', error.message);
  }
}