import pool from './db.js';

export async function cleanupExpiredSurprises() {
  const client = await pool.connect();
  try {
    console.log('[CLEANUP] Starting expired surprise cleanup...');

    // Get expired surprises
    const result = await client.query(
      `SELECT id, random_slug FROM surprises WHERE expires_at <= NOW() AND is_expired = FALSE`
    );

    if (result.rows.length === 0) {
      console.log('[CLEANUP] No expired surprises to clean up');
      return;
    }

    for (const surprise of result.rows) {
      // Delete associated media files
      const mediaResult = await client.query(
        `SELECT id, storage_path FROM media WHERE surprise_id = $1`,
        [surprise.id]
      );

      for (const media of mediaResult.rows) {
        // In production, delete from actual storage (Supabase, S3, etc)
        if (process.env.STORAGE_TYPE === 'local') {
          try {
            const fs = await import('fs/promises');
            await fs.unlink(media.storage_path);
          } catch (err) {
            console.log(`[CLEANUP] Could not delete file: ${media.storage_path}`);
          }
        }
      }

      // Delete media records
      await client.query(`DELETE FROM media WHERE surprise_id = $1`, [surprise.id]);

      // Delete password attempts
      await client.query(`DELETE FROM password_attempts WHERE surprise_id = $1`, [surprise.id]);

      // Mark surprise as expired
      await client.query(
        `UPDATE surprises SET is_expired = TRUE WHERE id = $1`,
        [surprise.id]
      );

      console.log(`[CLEANUP] Cleaned up surprise: ${surprise.random_slug}`);
    }

    console.log(`[CLEANUP] Cleanup completed. Processed ${result.rows.length} surprises`);
  } catch (error) {
    console.error('[CLEANUP] Error during cleanup:', error.message);
  } finally {
    client.release();
  }
}

export function startCleanupJob() {
  const interval = parseInt(process.env.CLEANUP_INTERVAL_MS || '3600000');
  console.log(`[CLEANUP] Scheduled cleanup job every ${interval / 60000} minutes`);
  
  // Run immediately on startup
  cleanupExpiredSurprises();
  
  // Then run on interval
  setInterval(cleanupExpiredSurprises, interval);
}