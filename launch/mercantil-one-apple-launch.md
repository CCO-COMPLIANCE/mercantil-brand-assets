# Mercantil ONE · Lanzamiento Apple — registro de estado

Fecha: 2026-11-02 · Mercado inicial: **República Dominicana**

Este documento registra autorizaciones, hallazgos verificados y bloqueos reales.
Nada aquí se marca como hecho si no fue comprobado.

---

## 1. Autorizaciones registradas (Marino A. Marrero B., 2026-11-02)

| Ámbito | Decisión |
|---|---|
| Proyectos inmobiliarios e imágenes | **Todos debidamente autorizados.** No volver a solicitar autorización. |
| Residencial Opus | Retirar la imagen equivocada de web, app y material para Apple. Conservar proyecto y datos. **No sustituir por imagen inventada.** |
| Textos legales | Publicar política de privacidad, aviso de IA, base legal documentada y texto de la oración en su última versión revisada, siempre que describan el funcionamiento real. No sustituye el consentimiento de clientes ni acredita revisión jurídica externa. |
| Etiquetas de privacidad (App Store) | Aprobadas si coinciden con datos y SDK de la compilación final. |
| Mercado inicial | República Dominicana. |
| TestFlight / revisión Apple | Autorizado subir y enviar a revisión cuando las verificaciones necesarias estén superadas. |

---

## 2. Hallazgos verificados

### 2.1 Residencial Opus — imagen equivocada (CONFIRMADO)

- Ficha: `https://mercantil.one/proyectos/residencial-opus-en-santo-domingo-este-autopista-de-san-isidro-repimar`
- Imagen de portada en `/proyectos` **y** `og:image` de la ficha:
  `https://repimar.com/wp-content/uploads/2024/08/20221103BanboToys-Minix-v1-Conjunto-Drone-copy-scaled-1-374x240.jpg`
  - Responde **HTTP 404** (enlace roto) — comprobado 2026-11-02.
  - El nombre del archivo corresponde a un producto de juguetería (dron "BanboToys Minix"), no al proyecto.
  - Sin `alt`.
- Galería de la ficha (12 imágenes locales `/uploads/projects/residencial-opus-…/gallery/*.webp`):
  revisadas visualmente; son interiores coherentes del mismo apartamento. **Se conservan.**

**Corrección a aplicar (sin imagen sustituta inventada):**
1. Web `/proyectos`: quitar el `src` externo de la tarjeta de Opus. Si el diseño exige imagen, usar
   la primera foto real de su propia galería (`…/gallery/1783702600515-as3k4z.webp`) o el placeholder
   neutro del sitio; nunca una imagen nueva.
2. Web ficha Opus: eliminar `og:image` y la portada con la URL de repimar; mismo criterio que (1).
3. Base de datos / CMS: vaciar el campo de portada del proyecto Opus (origen del dato para web y app).
4. App iOS: verificar que la tarjeta y la ficha de Opus no referencien esa URL (sale del mismo dato).
5. App Store Connect: no usar Opus con esa imagen en capturas ni material promocional.

### 2.2 Seis imágenes públicas externas en `/proyectos`

| Proyecto | Origen | Estado HTTP | Contenido | Observación |
|---|---|---|---|---|
| La Marquesa Residences II | cdn.plusval.com.do (WhatsApp image) | 200 | Edificio residencial bajo | Coherente. Sin `alt`. |
| Torre Meraki III | CloudFront (alterestate) | 200 | Fachada con rótulo "MERAKI III" | Coherente. Sin `alt`. |
| Terrazas de Ramsés | CloudFront (alterestate) | 200 | Render | Revisar emparejamiento con Saiko (ver nota). Sin `alt`. |
| Saiko Business Center | CloudFront (alterestate) | 200 | Render | Ídem. Sin `alt`. |
| Barahona Bay Suites | img.mmc.com.do (bucket de El Caribe) | 200 | Interior con vista al mar | Hotlink a medio de prensa; depende de un tercero. Sin `alt`. |
| **Residencial Opus** | repimar.com | **404** | Archivo de juguete (dron) | **Incorrecta — retirar (2.1).** |

Nota: dos renders de CloudFront del mismo listado (`3044MFNQJZ`) — uno es un atrio comercial y otro
una torre residencial. El atrio encaja con Saiko Business Center; confirmar en el CMS que no estén
cruzados con Terrazas de Ramsés.

Recomendación de presentación (todas): añadir `alt` descriptivo y alojar copias locales para no
depender de hotlinks de terceros (autorizaciones ya confirmadas).

### 2.3 Privacidad e IA en producción (mercantil.one/privacy, actualizada 2026-11-01)

- Describe: WhatsApp (Meta), Sign in with Google/Apple (alcances reales), app móvil (llavero,
  sesión ≤ 90 días, calendario/recordatorios locales, contacto elegido), Ley 172-13.
- **No menciona inteligencia artificial, proveedores de IA ni el aviso de IA** (0 coincidencias).
- El aviso de IA, la base legal documentada y el texto de la oración **no están publicados** y sus
  "últimas versiones revisadas" no se localizaron en Drive, Gmail, Notion ni Slack accesibles.
- `/privacidad`, `/ai`, `/aviso-ia` → 404.
- Banner de cookies (`consent.js`) con categorías y bloqueo previo de analítica/marketing: presente.

---

## 3. Bloqueos reales (acceso que falta)

| Paso | Qué falta exactamente |
|---|---|
| 1. Copilot OS | Los **tres comandos anteriores** no existen en ningún repositorio, Slack, Gmail, Notion ni Drive accesibles. No se inventan. Falta: los comandos (o el enlace a donde están) y acceso SSH/consola al servidor de Copilot OS. |
| 2, 5, 6 App / compilación | El código de la app está en `thetrade/mercantil-one`. La invitación de GitHub existe en el correo, pero la sesión **no tiene acceso** (`add_repo` rechazado). Falta: aceptar la invitación y que la GitHub App de Claude tenga acceso a ese repo/organización. |
| 2 Web | No hay repositorio del sitio mercantil.one ni credenciales del hosting/Cloudflare en esta sesión. |
| 4, 5, 7 App Store Connect | No hay clave API de App Store Connect (Issuer ID, Key ID, .p8) ni Mac conectado (Remote Control sin carpetas) para Xcode/firma/subida. |
| 6 Pruebas en iPhone | Requiere compilación en TestFlight (depende de lo anterior). |
| MIA | No se localizó servicio, repositorio ni cola de MIA en los sistemas accesibles; no se puede confirmar si está detenida ni los 429 trabajos. |
| Advisors / Marialis | No hay acceso a la base de datos de usuarios/advisors. `/advisors` público no expone correos. No se encontraron direcciones verificadas de Pedro Páez ni de los otros seis advisors. |
