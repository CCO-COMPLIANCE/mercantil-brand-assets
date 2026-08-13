#!/usr/bin/env bash
# Publica este repositorio en GitHub y activa GitHub Pages.
# Requiere: gh CLI autenticado  ->  brew install gh && gh auth login
set -e
OWNER="${1:-}"                       # ej: ./publish.sh mi-org
NAME="mercantil-brand-assets"
REPO="${OWNER:+$OWNER/}$NAME"

gh repo create "$REPO" --public --source=. --remote=origin --push \
  --description "Logos oficiales de Mercantil — vector, raster e imprenta."

FULL=$(gh repo view "$REPO" --json nameWithOwner -q .nameWithOwner)
gh api -X POST "repos/$FULL/pages" -f "source[branch]=main" -f "source[path]=/" >/dev/null 2>&1 || true

echo
echo "Repositorio: https://github.com/$FULL"
echo "Vista web:   https://$(echo "${FULL%%/*}" | tr 'A-Z' 'a-z').github.io/$NAME/"
echo "ZIP directo: https://github.com/$FULL/archive/refs/heads/main.zip"
