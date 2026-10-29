-- Mercantil One — News (PostgreSQL)

CREATE TABLE news (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        VARCHAR(120) NOT NULL,
  summary      VARCHAR(200),
  body         TEXT NOT NULL,
  category     VARCHAR(40)  NOT NULL DEFAULT 'Comunicado',
  author       VARCHAR(80),
  image_url    TEXT,
  location     VARCHAR(160),
  event_start  DATE,
  event_end    DATE,
  publish_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at   TIMESTAMPTZ,
  pinned       BOOLEAN NOT NULL DEFAULT false,
  status       VARCHAR(12) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_by   UUID NOT NULL REFERENCES users(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (event_end IS NULL OR event_start IS NULL OR event_end >= event_start),
  CHECK (expires_at IS NULL OR expires_at > publish_at)
);

CREATE INDEX news_live_idx ON news (status, publish_at, expires_at);

-- One row per advisor per news item, written the first time the advisor opens it.
CREATE TABLE news_reads (
  news_id     UUID NOT NULL REFERENCES news(id) ON DELETE CASCADE,
  advisor_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  read_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (news_id, advisor_id)
);

-- Unread, live news for an advisor (what the sheet shows on login).
-- SELECT n.*
--   FROM news n
--  WHERE n.status = 'published'
--    AND n.publish_at <= now()
--    AND (n.expires_at IS NULL OR n.expires_at > now())
--    AND NOT EXISTS (SELECT 1 FROM news_reads r WHERE r.news_id = n.id AND r.advisor_id = :advisor_id)
--  ORDER BY n.pinned DESC, n.publish_at DESC;

-- Example: SENDEROS OPEN HOUSE
-- INSERT INTO news (title, summary, body, category, author, event_start, event_end,
--                   publish_at, expires_at, pinned, status, created_by)
-- VALUES ('SENDEROS OPEN HOUSE',
--         'Te esperamos el 30 y 31 de octubre y el 1 de noviembre de 2026.',
--         E'Te invitamos al Open House de Senderos.\n\nFechas:\n• Viernes 30 de octubre de 2026\n• Sábado 31 de octubre de 2026\n• Domingo 1 de noviembre de 2026\n\nInvita a tus clientes y coordina sus visitas con tiempo.',
--         'Evento', 'Mercantil', '2026-10-30', '2026-11-01',
--         '2026-10-29 00:00-04', '2026-11-02 00:00-04', true, 'published', :admin_id);
