INSERT INTO sedi (id, name) VALUES (1, 'verona') ON CONFLICT (id) DO NOTHING;
INSERT INTO sedi (id, name) VALUES (2, 'padova') ON CONFLICT (id) DO NOTHING;
INSERT INTO sedi (id, name) VALUES (3, 'como') ON CONFLICT (id) DO NOTHING;
INSERT INTO sedi (id, name) VALUES (4, 'milano') ON CONFLICT (id) DO NOTHING;
INSERT INTO sedi (id, name) VALUES (5, 'roma') ON CONFLICT (id) DO NOTHING;
INSERT INTO sedi (id, name) VALUES (6, 'napoli') ON CONFLICT (id) DO NOTHING;

INSERT INTO roles (id, name) VALUES (1, 'guest') ON CONFLICT (id) DO NOTHING;
INSERT INTO roles (id, name) VALUES (2, 'keyOwner') ON CONFLICT (id) DO NOTHING;
INSERT INTO roles (id, name) VALUES (3, 'admin') ON CONFLICT (id) DO NOTHING;
