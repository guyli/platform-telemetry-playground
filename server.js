const express = require('express');
const client = require('prom-client');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Prometheus registry and standard metrics collection
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

// Custom Performance Telemetry Tracker Definitions
const httpRequestsTotal = new client.Counter({
  name: 'platform_http_requests_total',
  help: 'Total number of HTTP requests processed by the platform stack',
  labelNames: ['method', 'route', 'status_code']
});

const databaseQueryDuration = new client.Histogram({
  name: 'platform_database_query_duration_seconds',
  help: 'Histogram tracking the operational runtime execution latency of database queries',
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5]
});

// Middleware to capture automated request logging metrics
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestsTotal.inc({
      method: req.method,
      route: req.path,
      status_code: res.statusCode
    });
  });
  next();
});

// Simulated endpoint triggering real-world metric behaviors
app.get('/api/data/fetch', async (req, res) => {
  const endTimer = databaseQueryDuration.startTimer();
  
  // Simulate database I/O lag (randomized fluctuation)
  const simulatedLag = Math.random() * 400;
  await new Promise(resolve => setTimeout(resolve, simulatedLag));
  
  endTimer();
  res.status(200).json({ success: true, payload: "Telemetry captured successfully" });
});

// Prometheus Scrape Destination Target Core URL
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(PORT, () => {
  console.log(`[Telemetry Service] Gathering metrics on http://localhost:${PORT}`);
});
