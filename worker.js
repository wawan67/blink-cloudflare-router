const UPSTREAM = 'https://core.blink.new/api/v1/ai';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/' || url.pathname === '/health') {
      return Response.json({ ok: true, service: 'blink-cloudflare-router' });
    }

    if (!url.pathname.startsWith('/v1/')) {
      return Response.json({ error: 'Not Found' }, { status: 404 });
    }

    const upstreamUrl = new URL(UPSTREAM + url.pathname.slice(3) + url.search);
    const headers = new Headers(request.headers);
    headers.delete('host');

    if (env.BLINK_API_KEY) {
      headers.set('authorization', `Bearer ${env.BLINK_API_KEY}`);
    }

    const response = await fetch(upstreamUrl, {
      method: request.method,
      headers,
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
      redirect: 'follow'
    });

    const responseHeaders = new Headers(response.headers);
    responseHeaders.delete('content-length');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders
    });
  }
};
