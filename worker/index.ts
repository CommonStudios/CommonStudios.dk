import { resolveRedirect } from './redirects';

interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}

const CANONICAL_HOST = 'commonstudios.dk';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname !== CANONICAL_HOST || url.protocol !== 'https:') {
      url.protocol = 'https:';
      url.hostname = CANONICAL_HOST;
      url.port = '';
      return Response.redirect(url.toString(), 301);
    }

    const redirect = resolveRedirect(url.pathname, request);
    if (redirect) {
      const headers = new Headers({ location: new URL(redirect.location, url).toString() });
      if (!redirect.permanent) {
        headers.set('vary', 'Cookie, Accept-Language');
        headers.set('cache-control', 'private, no-cache');
      }
      return new Response(null, { status: redirect.permanent ? 301 : 302, headers });
    }

    return env.ASSETS.fetch(request);
  },
};
