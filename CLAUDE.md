@AGENTS.md

## Git workflow

**Nunca commitear directamente a `main`.** Siempre trabajar en una rama feature.

Al iniciar cualquier tarea de código:
1. Crear rama desde main: `git checkout -b feature/<nombre-corto-descriptivo>`
2. Hacer los cambios y commits ahí
3. Al terminar, abrir PR hacia `main` con `gh pr create`

Nombres de rama: `feature/` nuevas funcionalidades · `fix/` correcciones · `design/` cambios visuales/UX
