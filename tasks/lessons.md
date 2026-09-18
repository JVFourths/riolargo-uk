# Lessons

## 2026-09-18 — Never kill processes by image name
- Stopped a local `npx serve` with `taskkill /F /IM node.exe`. That kills every node process on the machine: MCP servers, Jarvis, other dev servers.
- **Rule:** start preview servers with `run_in_background` and stop that task, or find the PID for the port (`netstat -ano | findstr :3008`) and kill that PID only.

## 2026-09-18 — Look at the product before choosing a theme
- The April rebuild picked dark luxury and gold without checking the packaging or the logo. The logo wordmark is black and the packs are daylight botanical prints, so the theme hid the logo and clashed with every real photo.
- **Rule:** read the logo and product photos first. `design/DESIGN.md` is now the authority for any UI change.
