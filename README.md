# training-log-spa

This repository manages daily training logs using GitHub Issues. To add or update a log, open an issue using the `Training Log` template and paste the JSON payload directly into the description. The automation workflow extracts the JSON block from the issue body and saves it under `public/logs/`.

Computed `1RM` and `e1RM` values are rounded down to the nearest whole number when the log is processed.

To delete an existing log, open an issue with the `Delete Training Log` template
and supply a JSON object such as `{ "date": "YYYY-MM-DD" }`. The workflow will
remove the corresponding file from `public/logs/` and update `index.json`.

