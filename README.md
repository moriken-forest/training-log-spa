# training-log-spa

This repository manages daily training logs using GitHub Issues. To add or update a log, open an issue using the `Training Log` template and paste the JSON payload directly into the description. The automation workflow extracts the JSON block from the issue body and saves it under `public/logs/`. Once the log is processed, the issue is automatically closed.
