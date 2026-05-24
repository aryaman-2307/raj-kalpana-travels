/**
 * Prevents open redirect attacks by only allowing safe relative URLs.
 * Use this after login/logout or any user-influenced redirect.
 */
export function safeRedirect(url: string, fallback = '/'): string {
  // Only allow relative URLs that start with a single /
  if (
    !url ||
    !url.startsWith('/') ||
    url.startsWith('//') ||
    url.startsWith('/\\') ||
    url.includes('://') ||
    url.toLowerCase().startsWith('javascript:') ||
    url.toLowerCase().startsWith('data:')
  ) {
    return fallback;
  }
  return url;
}
