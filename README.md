[![make.fun · news-image-20261125](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![rank](https://make.fun/badge/news-image-20261125/zeinrefo-code/news-image-20261125/rank.svg)](https://make.fun/bounty/news-image-20261125/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![reward](https://make.fun/badge/news-image-20261125/zeinrefo-code/news-image-20261125/reward.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)

# The World in One Day — 25 November 2026

A single front-page-style image that compresses one day of world news
into a classic newspaper layout: one dominant lead story, a row of
secondary headlines, and nothing else competing for the reader's eye.

This repository is an entry for the make.fun bounty
[news-image-20261125](https://make.fun/bounty/news-image-20261125)
($100 prize pool, 50 paid places). Bounty page:
https://make.fun/bounty/news-image-20261125

## What the image shows

- **Lead story — "RIYADH TOWER HIT"**: a Houthi drone strikes the PIF
  Tower in Riyadh, with 11 people reported wounded.
- **"CIA HACKED"** — a breach story targeting the agency.
- **"HUAWEI GUILTY"** — a court verdict against the company.
- **"TANKERS HIT IN HORMUZ"** — tankers reportedly struck in the
  Strait of Hormuz. Honest note: this particular claim could not be
  independently verified before publication, and it is presented as
  reported, not confirmed.
- **"NATO WATCHES POLAND"** — the alliance monitoring developments
  on its eastern flank.

## How to run

The delivery program is `main.ts`, a dependency-free Node script. It
locates `entry.png` next to itself, checks the PNG signature and a
minimum file size, copies the image into the output directory, and
then re-reads the copy and compares SHA-256 digests so a corrupted
deliverable can never pass silently.

Copy the image into the default `out/` directory:

```sh
node main.ts
```

Choose a different output directory with an environment variable:

```sh
MAKEFUN_OUTPUT_DIR=/some/other/dir node main.ts
```

Dry run — validate and hash the source image without writing anything:

```sh
node main.ts --check
```

## License

MIT — see the `LICENSE` file in this repository.
