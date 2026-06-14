import crypto from 'crypto';

const API_BASE_URL = process.env.TICKET_SIMPLY_BASE_URL || 'https://raj-kalpana-travels.vercel.app';
const SUBDOMAIN = process.env.TICKET_SIMPLY_SUBDOMAIN || '';
const API_KEY = process.env.TICKET_SIMPLY_API_KEY || '';

/**
 * Generates the X-Token required for TicketSimply API authentication.
 * Format: subdomain|api_key|yyyy/mm/dd encrypted via SHA256
 */
function generateXToken(): string {
  if (!SUBDOMAIN || !API_KEY) {
    console.warn('TicketSimply API credentials are missing.');
    return '';
  }

  // Get current date in yyyy/mm/dd format
  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const dateStr = `${year}/${month}/${day}`;

  const data = `${SUBDOMAIN}|${API_KEY}|${dateStr}`;
  
  // Using SHA256 to encrypt the data. Using hex as a safe default, 
  // but if the API expects base64 or a specific custom format, this can be updated.
  return crypto.createHash('sha256').update(data).digest('hex');
}

/**
 * Base fetch function for TicketSimply APIs
 */
async function fetchTicketSimply(endpoint: string, params: Record<string, string> = {}) {
  const xtoken = generateXToken();
  
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  
  // Append query parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Token': xtoken,
    },
    // Next.js caching: we might want to cache destination pairs for a day
    // but routes/availability should be dynamic. We'll disable cache by default.
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`TicketSimply API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// ==========================================
// API Endpoint Methods
// ==========================================

export async function getDestinationPairs() {
  return fetchTicketSimply('/operator/api/destination_pairs.json', {
    response_format: 'true',
    app_bima_enabled: 'false',
  });
}

export async function getAvailableRoutes(originId: string, destinationId: string, travelDate: string) {
  // travelDate format: yyyy-mm-dd
  return fetchTicketSimply(`/operator/api/available_routes/${originId}/${destinationId}/${travelDate}.json`, {
    show_only_available_services: 'false',
    show_injourney_services: 'true',
  });
}

export async function getCities() {
  return fetchTicketSimply('/operator/api/cities.json');
}
