# training-log-spa

https://moriken-forest.github.io/training-log-spa/#/calendar


This repository manages daily training logs using GitHub Issues.

Open the **Issues** tab and click **New issue**. Choose **Training Log** to add or update a log.
To delete a log, create an issue with the label `delete-training-log` and include the username and date in the body:

```
username: kenta
date: 2025-08-20
```
When adding a log, prefix the JSON with the username like `kenta{...}` in the description.

The automation workflow extracts the username and JSON block and saves it under `public/logs/<user>/`.
Training schedules are organized the same way and live under `public/schedule/<user>/`.

Computed `1RM` and `e1RM` values are rounded down to the nearest whole number when the log is processed.

The workflow deletes the specified log file from `public/logs/<user>/` and updates `index.json` automatically.

