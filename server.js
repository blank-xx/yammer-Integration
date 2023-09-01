const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Define a proxy route to forward requests to the Yammer API
app.use('/api', createProxyMiddleware({
  target: 'https://www.yammer.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove the /api prefix when forwarding requests
  },
}));

app.use(express.static('./node_modules/@angular/cli/lib/server'));
app.use(express.static('./src'));

// Listen on the desired port (e.g., 3000)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
