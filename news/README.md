# Mercantil One — Noticias para asesores

Módulo de noticias: el **admin** publica una noticia y es **lo primero que ve cada asesor al entrar**
a Mercantil One, en una hoja inferior al estilo *Top Stories*. Cuando el asesor **toca la noticia y la
abre, queda marcada como leída y ya no le vuelve a aparecer**. A los demás asesores les sigue
apareciendo hasta que cada uno la abra.

- 👤 **Vista del asesor:** [`news/index.html`](index.html)
- 🛠️ **Admin:** [`news/admin.html`](admin.html)
- 🗄️ **Esquema SQL:** [`news/schema.sql`](schema.sql)

Ya viene cargada la noticia de ejemplo **SENDEROS OPEN HOUSE** (30 y 31 de octubre y 1 de noviembre de
2026): fijada arriba, publicada el 29/10 y se oculta sola el 02/11.

> La demo guarda los datos en `localStorage` del navegador, así que admin y asesor tienen que abrirse
> en el mismo navegador. En Mercantil One se cambia `news-store.js` por llamadas a la API de abajo; las
> vistas no cambian.

---

## Comportamiento

| Paso | Qué pasa |
|---|---|
| Admin publica | Elige título, resumen, contenido, categoría, fechas del evento, lugar, imagen, «publicar desde», «ocultar desde», fijar arriba o borrador. |
| Asesor inicia sesión | Si tiene noticias sin leer, se abre la hoja **Noticias · De Mercantil** con las tarjetas (fijadas primero, luego las más recientes). |
| Asesor toca una tarjeta | Se abre la noticia completa y **se registra la lectura**. Al cerrar, desaparece de su lista. Si no quedan más, la hoja se cierra. |
| Asesor toca «Más tarde» o arrastra la hoja hacia abajo | No se marca nada: la hoja vuelve a salir en el próximo inicio de sesión. La campana con contador la vuelve a abrir. |
| Admin | Ve por noticia cuántos asesores la leyeron y quién falta, puede editarla, **reenviarla** (borra las lecturas para que todos la vuelvan a ver) o eliminarla. |

Una noticia es visible cuando `status = published`, `publish_at <= ahora` y `expires_at` es nulo o
futuro. Sin imagen, la tarjeta muestra el isotipo de Mercantil sobre rojo con las fechas del evento
(«30 OCT – 1 NOV»).

---

## API para Mercantil One

| Método | Ruta | Rol | Descripción |
|---|---|---|---|
| `GET` | `/api/news/unread` | asesor | Noticias vivas que el asesor no ha abierto. Se llama al iniciar sesión. |
| `GET` | `/api/news/:id` | asesor | Detalle de la noticia. |
| `POST` | `/api/news/:id/read` | asesor | Registra la lectura (idempotente: `INSERT … ON CONFLICT DO NOTHING`). |
| `GET` | `/api/admin/news` | admin | Todas las noticias con `reads_count` y `advisors_total`. |
| `POST` | `/api/admin/news` | admin | Crear. |
| `PUT` | `/api/admin/news/:id` | admin | Editar. |
| `DELETE` | `/api/admin/news/:id` | admin | Eliminar (borra sus lecturas en cascada). |
| `GET` | `/api/admin/news/:id/reads` | admin | Lecturas por asesor (`advisor_id`, `read_at`). |
| `DELETE` | `/api/admin/news/:id/reads` | admin | Reenviar a todos. |

El `advisor_id` siempre sale de la sesión, nunca del cuerpo de la petición.

Correspondencia con `news-store.js`:

| `NewsStore` | API |
|---|---|
| `unreadFor(advisorId)` | `GET /api/news/unread` |
| `get(id)` | `GET /api/news/:id` |
| `markRead(id, advisorId)` | `POST /api/news/:id/read` |
| `list()` | `GET /api/admin/news` |
| `save(item)` | `POST` / `PUT /api/admin/news[/:id]` |
| `remove(id)` | `DELETE /api/admin/news/:id` |
| `readsFor(id)` | `GET /api/admin/news/:id/reads` |
| `resetReads(id)` | `DELETE /api/admin/news/:id/reads` |

### Modelo

```json
{
  "id": "uuid",
  "title": "SENDEROS OPEN HOUSE",
  "summary": "Te esperamos el 30 y 31 de octubre y el 1 de noviembre de 2026.",
  "body": "Te invitamos al Open House de Senderos…",
  "category": "Evento",
  "author": "Mercantil",
  "imageUrl": "",
  "location": "",
  "eventStart": "2026-10-30",
  "eventEnd": "2026-11-01",
  "publishAt": "2026-10-29T00:00:00",
  "expiresAt": "2026-11-02T00:00:00",
  "pinned": true,
  "status": "published"
}
```

El contenido se muestra como texto plano (con saltos de línea); todo lo que escribe el admin se escapa
antes de pintarse.
