# Blink Cloudflare Router

Cloudflare Worker reverse proxy for Blink AI.

## Routing

`/v1/*` is forwarded to:

`https://core.blink.new/api/v1/ai/*`

Example:

`/v1/chat/completions` → `https://core.blink.new/api/v1/ai/chat/completions`

## Cloudflare Secret

Set `BLINK_API_KEY` as a Worker Secret if the upstream requires a Blink API key.

With Wrangler:

```bash
wrangler secret put BLINK_API_KEY
```

Or configure it from the Cloudflare dashboard.

## Deploy

Deploy manually with Wrangler or paste `worker.js` into the Cloudflare Workers editor.
