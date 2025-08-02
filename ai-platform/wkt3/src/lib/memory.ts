// Simulated memory database
export const users = new Map<
  string,
  { password: string; role: string; otp?: string; loginCount: number }
>();

// Active session tokens (serial → { email, expiresAt })
export const sessions = new Map<
  string,
  { email: string; expiresAt: number }
>();

// Seed test user
users.set('admin@wkt3.com', { password: 'Admin@123', role: 'superadmin',
  loginCount: 0 });

// Helper: create a token
export function createToken(email: string) {
  const token = 'SN-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 min TTL

  // Remove any old token for this email
  for (const [key, val] of sessions.entries()) {
    if (val.email === email) sessions.delete(key);
  }

  sessions.set(token, { email, expiresAt });
  return token;
}

// Helper: validate token
export function isValidToken(token: string) {
  const session = sessions.get(token);
  if (!session) return false;
  if (Date.now() > session.expiresAt) {
    sessions.delete(token);
    return false;
  }
  return true;
}

// Helper: logout
export function logoutToken(token: string) {
  sessions.delete(token);
}
