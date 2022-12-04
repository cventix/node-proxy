const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

// Create Express Server
const app = express();

// Configuration
const PORT = process.env.PORT || 3333;
const HOST = "localhost";
const API_SERVICE_URL = "https://portal.talente-in-rente.bayern/api/";

// CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

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

// Proxy endpoints
app.use(
  "/tir",
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/tir`]: "",
    },
  })
);

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
