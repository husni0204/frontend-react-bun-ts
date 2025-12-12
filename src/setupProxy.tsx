import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app: any) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://demo18.jidokasystem.co.id/ess", // alamat server API
            changeOrigin: true,
        }),
    );
};
