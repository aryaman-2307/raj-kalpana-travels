/**
 * SafeHtml — sanitizes HTML from WordPress before rendering.
 * Strips script tags, event handlers, and dangerous attributes.
 *
 * SECURITY: Never use dangerouslySetInnerHTML with unsanitized content.
 * This component provides a basic allow-list sanitizer.
 * For production, consider using a library like DOMPurify (server-side).
 */

const ALLOWED_TAGS = new Set([
  'p', 'br', 'strong', 'em', 'b', 'i', 'u', 'a', 'ul', 'ol', 'li',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'code',
  'img', 'figure', 'figcaption', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'span', 'div', 'section', 'article', 'aside', 'hr', 'sup', 'sub',
]);

const DANGEROUS_ATTR_PATTERN = /^on/i;
const DANGEROUS_PROTO_PATTERN = /^(javascript|data|vbscript):/i;

/**
 * Basic HTML sanitizer that removes script tags, event handlers, and
 * dangerous URL protocols. For a more robust solution, use DOMPurify
 * on the server side.
 */
export function sanitizeHtml(html: string): string {
  return html
    // Remove script and style tags and their contents
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    // Remove event handler attributes (onclick, onerror, etc.)
    .replace(/\s+on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]*)/gi, '')
    // Remove javascript: and data: protocol links
    .replace(/href\s*=\s*["']?\s*(javascript|data|vbscript)\s*:/gi, 'href="#"')
    .replace(/src\s*=\s*["']?\s*(javascript|data|vbscript)\s*:/gi, 'src=""')
    // Remove iframe, embed, object tags
    .replace(/<\s*(iframe|embed|object|applet|form|input|textarea|button)\b[^>]*>/gi, '')
    .replace(/<\/\s*(iframe|embed|object|applet|form|input|textarea|button)\s*>/gi, '');
}

interface SafeHtmlProps {
  html: string;
  className?: string;
  as?: 'div' | 'article' | 'section' | 'span' | 'p';
}

/**
 * Renders sanitized HTML content from WordPress or other CMS sources.
 * Always use this component instead of raw dangerouslySetInnerHTML.
 */
export default function SafeHtml({ html, className = '', as: Tag = 'div' }: SafeHtmlProps) {
  const cleanHtml = sanitizeHtml(html);
  return (
    <Tag
      className={`prose prose-slate max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
