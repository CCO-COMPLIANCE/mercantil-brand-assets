# Mercantil — Brand Assets

Repositorio oficial de logos de **Mercantil** para diseñadores, desarrolladores y agentes automatizados.

Todos los archivos vienen del set original de imprenta (`LOGO MERCANTIL`, 300 dpi). Los SVG fueron
regenerados desde el PDF vectorial maestro: son **vectores reales**, no trazados automáticos.

- 🎨 **Vista previa web:** https://cco-compliance.github.io/mercantil-brand-assets/
- 🤖 **Manifiesto para agentes:** [`brand.json`](brand.json)
- 📰 **Noticias para asesores (Mercantil One):** [`news/`](news/README.md)
- ⬇️ **Descargar todo:** [ZIP del repositorio](https://github.com/CCO-COMPLIANCE/mercantil-brand-assets/archive/refs/heads/main.zip)

---

## Variantes

### Lockup horizontal (león + wordmark)

| | Variante | Uso |
|---|---|---|
| <img src="previews/lockup-primary.png" width="240"> | **`lockup-primary`** — león rojo + wordmark negro | **Uso principal.** Fondos claros. Es la versión por defecto. |
| <img src="previews/lockup-inverse.png" width="240" style="background:#111"> | **`lockup-inverse`** — león rojo + wordmark blanco | **Uso principal sobre fondos oscuros.** Mantiene el rojo de marca. |
| <img src="previews/lockup-black.png" width="240"> | **`lockup-black`** — monocromo negro | Una tinta, grabado, sellos, documentos B/N. |
| <img src="previews/lockup-white.png" width="240" style="background:#111"> | **`lockup-white`** — monocromo blanco | Fondos oscuros o fotografías, una tinta. |

### Isotipo (león solo)

| | Variante | Uso |
|---|---|---|
| <img src="previews/isotipo-red.png" width="150"> | **`isotipo-red`** | Avatar, app icon, favicon, patrones, espacios reducidos. |
| <img src="previews/isotipo-black.png" width="150"> | **`isotipo-black`** | Una tinta sobre fondo claro. |
| <img src="previews/isotipo-white.png" width="150" style="background:#111"> | **`isotipo-white`** | Una tinta sobre fondo oscuro. |

> El isotipo solo se usa cuando la marca ya está identificada en el contexto (app instalada, perfil social,
> segunda página de un documento). En primer contacto va el lockup completo.

---

## Estructura

```
svg/              Vector transparente — fuente de verdad para web y digital
png/original/     5669 × 3307 px, transparente, ~300 dpi
png/web/          Derivados a 256 / 512 / 1024 / 2048 px + favicons
jpg/              11339 × 6614 px, 300 dpi, CON fondo sólido — solo impresión
tiff/             5670 × 3308 px, RGB sin compresión — original de imprenta
pdf/              Vector maestro, 7 páginas (una por variante)
legacy/           Recortes que ya estaban en uso en www.mercantil.com.do
previews/         Miniaturas de este README
news/             Módulo de Noticias de Mercantil One (vista asesor + admin)
brand.json        Manifiesto legible por máquina
```

Convención de nombres: `mercantil-{lockup|isotipo}-{primary|inverse|black|white|red}.{ext}`

### ¿Qué formato uso?

| Necesito… | Uso |
|---|---|
| Web, app, email HTML, Figma | `svg/` |
| Presentación, Word, redes | `png/web/…-1024.png` |
| Impresión offset / gran formato | `pdf/` o `tiff/` |
| Favicon / app icon | `png/web/favicon-*.png` |
| Composición sobre fondo sólido en imprenta | `jpg/` |

---

## Color

| | Hex | RGB | CMYK |
|---|---|---|---|
| **Mercantil Red** | `#FE0000` | `254, 0, 0` | `0, 100, 100, 0` |
| Negro | `#000000` | `0, 0, 0` | `0, 0, 0, 100` |
| Blanco | `#FFFFFF` | `255, 255, 255` | `0, 0, 0, 0` |

```css
:root {
  --mercantil-red: #FE0000;
  --mercantil-black: #000000;
  --mercantil-white: #FFFFFF;
}
```

---

## Reglas de uso

**Área de protección** — deja libre alrededor del logo, como mínimo, la altura del león.

**Tamaño mínimo** — lockup: 24 px de alto en pantalla / 15 mm en impresión. Isotipo: 16 px / 8 mm.

**No hacer:**

- No cambiar los colores del logo ni aplicar degradados.
- No deformar, rotar, inclinar ni reflejar.
- No añadir sombras, contornos, brillos ni efectos.
- No re-encajar el león y el wordmark: la proporción del lockup es fija.
- No colocar el lockup a color sobre fondos de bajo contraste — usa `black` o `white`.
- No reconstruir el wordmark tipeándolo: usa siempre los archivos de este repositorio.

---

## Tipografía

El wordmark está basado en **Kievit (Italic)** y viene **vectorizado** en los SVG y el PDF, así que no
necesitas la fuente instalada para usar el logo.

Kievit es una tipografía comercial (FontFont / Monotype). **No se distribuye en este repositorio.**
Si necesitas la fuente para textos complementarios, hay que licenciarla por el canal correspondiente.
El archivo `.ttf` que circulaba en la carpeta original venía de un sitio de fuentes gratuitas con
procedencia dudosa — no lo uses en producción.

---

## Para agentes y automatizaciones

[`brand.json`](brand.json) describe cada asset: variante, tipo, fondo recomendado, rutas de todos los
formatos y dimensiones.

```bash
# Manifiesto
curl -s https://raw.githubusercontent.com/CCO-COMPLIANCE/mercantil-brand-assets/main/brand.json

# Un asset concreto
curl -O https://raw.githubusercontent.com/CCO-COMPLIANCE/mercantil-brand-assets/main/svg/mercantil-lockup-primary.svg
```

Regla por defecto para un agente que tiene que elegir logo:

1. ¿El fondo es oscuro? → `lockup-inverse`. ¿Claro? → `lockup-primary`.
2. ¿Hay restricción a una tinta? → `lockup-black` / `lockup-white`.
3. ¿El espacio es cuadrado o menor a ~120 px de ancho? → `isotipo-*`.
4. ¿Es web o vectorial? → `svg/`. ¿Es raster? → `png/web/` en el ancho más cercano por encima del necesario.

---

## Procedencia

Generado a partir de la carpeta original `www.mercantil.com.do/LOGO MERCANTIL`:
archivos de imprenta de 2020–2021 (JPG 300 dpi, TIFF sin compresión, PNG transparente, PDF vectorial).
Los SVG y los PNG de `png/web/` fueron derivados del PDF vectorial maestro en agosto de 2026.

---

## Licencia

Las marcas, logotipos e isotipos de Mercantil son propiedad de Mercantil y están protegidos por
derechos de autor y legislación marcaria. Este repositorio se publica **únicamente** para facilitar
el uso correcto de la marca por parte de socios, proveedores y equipos de diseño autorizados.
No otorga ningún derecho de uso de la marca. Cualquier uso requiere autorización previa de Mercantil.
