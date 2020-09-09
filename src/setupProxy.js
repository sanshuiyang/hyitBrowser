const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://103.61.39.178:21011/',
            //   changeOrigin: true,
            auth: false,
            pathRewrite: {
                '^/api': '/api'
            }
        })
    )
}