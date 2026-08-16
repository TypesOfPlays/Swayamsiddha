#!/usr/bin/env bash
#
# Regenerates app/fonts/noto-oriya-{400,600}.woff2.
#
# Run this whenever Odia copy is added or changed anywhere on the site.
# A glyph that is not in ODIA_TEXT below does not exist in the shipped font
# files and will render as a blank box.
#
#   bash scripts/gen-odia-font.sh
#
# Why by hand rather than next/font's `text` option: that option is the
# documented way to do this and it is a no-op in the Next version pinned
# here. It is accepted without complaint and the emitted font is the full
# 96 KB subset regardless. This fetches the same subsetted file from the
# Google Fonts API directly and commits it, which is 55 KB for both weights
# against 192 KB.
#
# The sentences are passed whole rather than as a set of unique letters.
# Oriya forms conjuncts, and the subsetter needs to see the real sequences
# to keep the ligature glyphs that join them.

set -euo pipefail
cd "$(dirname "$0")/.."

ODIA_TEXT="ପ୍ରଥମେ ଫୋନ କରନ୍ତୁ, କିମ୍ବା ସିଧା ଚାଲି ଆସନ୍ତୁ। ଡାକ୍ତରଙ୍କ ପ୍ରେସକ୍ରିପସନ ଦେଖାନ୍ତୁ — ଆମେ ବୁଝାଇ ଦେବୁ। ନୂଆ ସୂଚୀ, ଆପଣଙ୍କ ଆଖି ଆଗରେ ଖୋଲାଯାଏ। ମେସିନ ମାପେ, ହାତ ନୁହେଁ। ସେହି ଦିନର ରିପୋର୍ଟ, ଆପଣଙ୍କ ହାତରେ। ଆସନ୍ତୁ, ଦେଖନ୍ତୁ — ଆରମ୍ଭରୁ ଶେଷ ପର୍ଯ୍ୟନ୍ତ। ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ, ଆମର ଦାୟିତ୍ୱ। ଦୁଇଟି ସ୍ଥାନ — ଯେଉଁଠି ସୁବିଧା, ସେଠାକୁ ଆସନ୍ତୁ। ସ୍ୱୟଂସିଦ୍ଧା ଡାଇଗ୍ନୋଷ୍ଟିକ୍ସ ଲ୍ୟାବ ଓ ଏକ୍ସ-ରେ"

# A desktop UA is required: the API serves older formats to anything it does
# not recognise, and we specifically want woff2.
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"

mkdir -p app/fonts
ENCODED=$(node -e 'process.stdout.write(encodeURIComponent(process.argv[1]))' "$ODIA_TEXT")

for WEIGHT in 400 600; do
  CSS_URL="https://fonts.googleapis.com/css2?family=Noto+Sans+Oriya:wght@${WEIGHT}&text=${ENCODED}"

  # Subsetted files come from a /l/font?kit= endpoint with no .woff2
  # extension, so match the url() rather than the file suffix.
  FONT_URL=$(curl -sSf --max-time 40 -A "$UA" "$CSS_URL" \
    | grep -oE 'url\([^)]+\)' | head -1 | sed 's/^url(//; s/)$//')

  if [ -z "$FONT_URL" ]; then
    echo "weight ${WEIGHT}: the API returned no font URL" >&2
    exit 1
  fi

  OUT="app/fonts/noto-oriya-${WEIGHT}.woff2"
  curl -sSf --max-time 40 -A "$UA" "$FONT_URL" -o "$OUT"

  # Guard against saving an error page under a .woff2 name.
  if [ "$(head -c 4 "$OUT")" != "wOF2" ]; then
    echo "weight ${WEIGHT}: downloaded file is not woff2" >&2
    rm -f "$OUT"
    exit 1
  fi

  printf 'weight %s -> %s (%s bytes)\n' "$WEIGHT" "$OUT" "$(stat -c%s "$OUT")"
done
