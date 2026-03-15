export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let path = url.pathname;

    // Default to index.html for root
    if (path === "/") {
      path = "/index.html";
    }

    // Handle SPA routing - try adding .html
    if (!path.endsWith(".html") && !path.includes(".")) {
      path = path + ".html";
    }

    // Try ASSETS binding (provided by Workers Static Assets)
    try {
      const response = await env.ASSETS.fetch(request);
      return response;
    } catch (e) {
      // Fallback to index.html for SPA
      try {
        const indexResponse = await env.ASSETS.fetch(new URL("/index.html", request.url));
        return indexResponse;
      } catch (e2) {
        return new Response("Error: " + e2.message, { status: 500 });
      }
    }
  },
};
