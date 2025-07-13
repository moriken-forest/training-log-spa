# training-log-spa

https://moriken-forest.github.io/training-log-spa/#/calendar


This repository manages daily training logs using GitHub Issues.

Open the **Issues** tab and click **New issue**. Choose **Training Log** to add or update a log or **Delete Training Log** to remove one.
When adding a log, paste the log JSON in the description.

The automation workflow extracts the JSON block and saves it under `public/logs/`.

Computed `1RM` and `e1RM` values are rounded down to the nearest whole number when the log is processed.

To delete an existing log, open an issue with the **Delete Training Log** template.
Choose one or more dates from the dropdown list. These options come from `public/logs/index.json`
and are sorted with the newest date first. The workflow removes the selected files

from `public/logs/` and updates `index.json` automatically.

