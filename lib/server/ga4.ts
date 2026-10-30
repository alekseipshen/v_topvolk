// Server-side GA4 generate_lead via the Measurement Protocol.
//
// Why: reconciling the "Topvolk Leads" Telegram group against GA4 (2026-10-22) showed
// 3 of 17 real leads missing from GA4, and on those days GA4 recorded no event at all
// from the visitor's page. The visitor was invisible to GTM (ad blocker or the
// container failed to load), so no client-side fix can count them.
//
// The browser tells us whether GTM was loaded (`gaTracked`). When it was, the
// client-side GA4 tag already sent generate_lead and we send nothing, so leads are
// never double counted. When it was not, this module sends the event from the server.
//
// Requires a Measurement Protocol API secret for stream G-7H2T820K7M
// (GA4 Admin > Data streams > Measurement Protocol API secrets). Without it this is a no-op.

const MEASUREMENT_ID = 'G-7H2T820K7M';
const SESSION_COOKIE = '_ga_7H2T820K7M';

function apiSecret(): string {
  return (process.env.GA4_MP_API_SECRET || '').trim();
}

// _ga = "GA1.1.123456789.1700000000" -> "123456789.1700000000"
export function clientIdFromCookie(value: string | undefined): string | null {
  if (!value) return null;
  const parts = value.split('.');
  if (parts.length < 4) return null;
  return `${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
}

// GS1.1.<session_id>.<n>... or GS2.1.s<session_id>$o1$g1$t...
export function sessionIdFromCookie(value: string | undefined): string | null {
  if (!value) return null;
  const gs2 = value.match(/^GS2\.\d+\.s(\d+)/);
  if (gs2) return gs2[1];
  const gs1 = value.match(/^GS1\.\d+\.(\d+)/);
  return gs1 ? gs1[1] : null;
}

function randomClientId(): string {
  const rand = Math.floor(Math.random() * 2_000_000_000);
  return `${rand}.${Math.floor(Date.now() / 1000)}`;
}

export async function sendServerLead(opts: {
  gaCookie?: string;
  sessionCookie?: string;
  pageLocation?: string;
  service?: string;
}): Promise<'sent' | 'skipped' | 'failed'> {
  const secret = apiSecret();
  if (!secret) return 'skipped';

  const clientId = clientIdFromCookie(opts.gaCookie) || randomClientId();
  const sessionId = sessionIdFromCookie(opts.sessionCookie);
  const params: Record<string, string | number> = {
    engagement_time_msec: 1,
    lead_source: 'server_fallback',
  };
  if (sessionId) params.session_id = sessionId;
  if (opts.pageLocation) params.page_location = opts.pageLocation.slice(0, 1000);
  if (opts.service) params.service = opts.service.slice(0, 100);

  const url =
    `https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}` +
    `&api_secret=${encodeURIComponent(secret)}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        events: [{ name: 'generate_lead', params }],
      }),
      signal: controller.signal,
    });
    return res.ok ? 'sent' : 'failed';
  } catch (error) {
    console.error('[GA4 MP] Error:', error);
    return 'failed';
  } finally {
    clearTimeout(timer);
  }
}

export { SESSION_COOKIE as GA4_SESSION_COOKIE };
