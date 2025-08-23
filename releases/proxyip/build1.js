export default {
  async fetch(request) {
    const upgradeHeader = request.headers.get("Upgrade");
    if (upgradeHeader && upgradeHeader.toLowerCase() === "websocket") {
      // ====== 配置你的后端节点 ======
      const upstream = "your-vps-domain.com"; // 你的 VPS 域名或 IP
      const upstreamPort = 443;               // 一般是 443
      const upstreamProtocol = "wss";         // 如果你的后端启用了 TLS，用 wss；否则 ws

      const url = new URL(request.url);
      url.hostname = upstream;
      url.protocol = upstreamProtocol + ":";
      url.port = upstreamPort;

      const newRequest = new Request(url, request);
      return fetch(newRequest, {
        headers: request.headers,
      });
    }

    return new Response("Not a WebSocket request.", { status: 400 });
  },
};