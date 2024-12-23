const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

// Create Express Server
const app = express();

// Configuration
const PORT = process.env.PORT || 3333;
const HOST = "localhost";

// CORS
app.use(
  cors({
    // credentials: true,
    origin: true,
    allowedHeaders: "*",
    exposedHeaders: "*",
  })
);

// Logging
app.use(morgan("dev"));

// Info GET endpoint
app.get("/info", (req, res, next) => {
  res.send(
    "This is a proxy service which proxies to Billing and Account APIs."
  );
});

// Authorization
// app.use('', (req, res, next) => {
//     if (req.headers.authorization) {
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// });

// Proxy Ariana endpoints
app.use(
  "/ariana",
  createProxyMiddleware({
    target: "https://ariana.app",
    changeOrigin: true,
    pathRewrite: {
      [`^/ariana`]: "",
    },
  })
);

// Proxy Football360 endpoints
app.use(
  "/f360",
  createProxyMiddleware({
    target: "https://football360.ir",
    changeOrigin: true,
    pathRewrite: {
      [`^/f360`]: "",
    },
  })
);

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
