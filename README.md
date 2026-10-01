# Calcetín 🧦

Reto diario: cada noite pérdese un calcetín desparellado entre as estrelas e hai que atopalo en 10 intentos.

## Que hai aquí

| Ficheiro | Para que serve |
|---|---|
| `index.html` | A páxina do xogo |
| `data.js` | Catálogo: estrelas, obxectos especiais, constelacións e liñas |
| `game.js` | Todo o xogo (ceo, linterna, fichas, caixón, clasificación) |
| `admin.html` | Panel oculto (5 toques en «Calcetín» ou `/admin.html`) |
| `api/dia.js` | Dá o reto de hoxe e os pasados (nunca os futuros) |
| `api/resultado.js` | Garda a partida de cada navegador (só a primeira de cada día) |
| `api/nome.js` | Pon ou quita o nome na clasificación |
| `api/ranking.js` | Clasificación: Hoxe, Semana (5 mellores de 7), Mes, Sempre |
| `api/admin.js` | Accións do panel: orde dos días, astros activos, moderación |
| `api/_lib.js` | Código común: base de datos, orde dos retos, puntos |

## Variables en Vercel

- `DATABASE_URL`: cadea do **Transaction pooler** de Supabase (proxecto «xogos», porto 6543). O código quita `sslmode` só.
- `ADMIN_KEY`: o contrasinal do panel.

## Base de datos

As táboas créanse soas na primeira visita, todas co prefixo `cal_` e con RLS activado sen políticas
(só entran as funcións de Vercel):

- `cal_config`: semente secreta da orde e por onde vai.
- `cal_orde`: o astro de cada día. O pasado nunca cambia.
- `cal_off`: astros desactivados como obxectivo.
- `cal_players`: navegadores anónimos (identificador + clave cifrada + nome opcional).
- `cal_results`: unha partida por navegador e día.

## Datos

Os números de reto: o nº 1 é o 1 de outubro de 2026 (o 30 de setembro é o nº 0). O día cambia á medianoite de Madrid.
