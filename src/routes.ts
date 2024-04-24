/**
 * An array of routes accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  '/',
  '/auth/new-verification',
  '/auth/new-password',
];

/**
 * An array of routes used for authentication
 * These routes redirect logged in user to /settings
 * @type {string[]}
 */
export const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/reset-password',
];

/**
 * The Prefix for API authentication routes
 * Routes starting with this prefix are used for API authentication purpose
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * Default redirect path after user logs in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings';
