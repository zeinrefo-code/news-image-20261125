[![make.fun · news-image-20261125](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![rank](https://make.fun/badge/news-image-20261125/zeinrefo-code/news-image-20261125/rank.svg)](https://make.fun/bounty/news-image-20261125/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![reward](https://make.fun/badge/news-image-20261125/zeinrefo-code/news-image-20261125/reward.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)

# The World in One Day — 25 November 2026

An entry for make.fun's **news-image-20261125** bounty ($100, 50 places).
The whole entry is a single 1024×1024 image that sums up one day of world
news — the front page of 25 November 2026, designed to be read at a glance.

## What's in the image

- **RIYADH TOWER HIT** — the lead story. A Houthi drone struck the PIF
  tower in Riyadh's financial district, wounding 11 people — the second
  hit on the tower in less than a week (Reuters, 24 Nov 2026).
- **CIA HACKED** — the CIA and the Office of the Director of National
  Intelligence were hit by a cyberattack affecting unclassified
  open-source intelligence systems; no classified information was
  affected (CNN / New York Times, 24 Nov 2026).
- **HUAWEI GUILTY** — a federal jury in Brooklyn convicted Huawei on 10
  of 12 criminal counts, including bank fraud and conspiring to steal
  trade secrets (Reuters, 24 Nov 2026).
- **TANKERS HIT IN HORMUZ** — Iran's Revolutionary Guard claimed three
  oil tankers struck naval mines and caught fire in the Strait of
  Hormuz (IRNA, 24 Nov 2026; claims not independently verified).
- **NATO WATCHES POLAND** — NATO plans to deploy early-warning aircraft
  in Poland after missiles landed in the country during an attack on
  Ukraine.

## How it is delivered

`entry.png` is the artwork itself (1024×1024). `main.ts` is a small
Node.js program that hands it to the grader: it resolves the output
directory, confirms the source file exists and starts with a valid PNG
signature, copies the image over byte-identically, and then compares
SHA-256 digests of the source and the copy so a damaged delivery fails
instead of slipping through. It also supports a `--check` dry-run mode
that validates the image without writing anything.

## License

MIT — see `LICENSE`.
