# Platform Telemetry & Observability Playground

A comprehensive engineering simulation space designed to test, monitor, and visualize distributed platform performance indicators. It leverages the industry-standard **Prometheus** and **Grafana** ecosystem.

## Orchestrated Services Stack

*   **Node.js Runtime App (`:3000`):** Simulates microservice behaviors, downstream database queries, and tracks HTTP request rates natively.
*   **Prometheus Engine (`:9090`):** Continuously scrapes the application telemetry layer every 5 seconds to capture runtime variations.
*   **Grafana Dashboard Layer (`:3002`):** Aggregates Prometheus data to render real-time histograms, latency line graphs, and system health charts.

## Step-by-Step Initialization Guide

1. Clone this repository locally.
2. Spin up the orchestrated ecosystem containers:
   ```bash
   docker compose up --build
   ```
3. Generate sample traffic logs by navigating to http://localhost:3000/api/data/fetch in your browser.
4. Access the centralized data dashboard endpoint at http://localhost:9090/metrics to view raw parsed values.
5. Log into Grafana at http://localhost:3002 (User: admin / Password: admin), add Prometheus as your data source (http://prometheus:9090), and start modeling live execution histograms.
