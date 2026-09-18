# Lessons

## 2026-09-18 — Never kill processes by image name
- Stopped a local `npx serve` with `taskkill /F /IM node.exe`. That kills every node process on the machine: MCP servers, Jarvis, other dev servers.
- **Rule:** start preview servers with `run_in_background` and stop that task, or find the PID for the port (`netstat -ano | findstr :3008`) and kill that PID only.

## 2026-09-18 — Look at the product before choosing a theme
- The April rebuild picked dark luxury and gold without checking the packaging or the logo. The logo wordmark is black and the packs are daylight botanical prints, so the theme hid the logo and clashed with every real photo.
- **Rule:** read the logo and product photos first. `design/DESIGN.md` is now the authority for any UI change.

## 2026-09-18 — Check a database's contents with a query before calling it empty
- I told Johan the old D1 database had "0 tables" from the D1 list API. That endpoint leaves `num_tables` unset; the real count was 2.
- **Rule:** before any delete, query the thing itself (`sqlite_master`, row counts, `sqlite_sequence`), and say which check the claim rests on.
