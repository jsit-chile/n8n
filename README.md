<p align="center">
  <img src="assets/logo%20jWorkflows.png" alt="jWorkflows" width="320" />
</p>

# jWorkflows - Automatización de flujos de trabajo de JSIT

jWorkflows es la plataforma de automatización de flujos de trabajo de JSIT. Combina la flexibilidad del código con la velocidad del no-code: más de 400 integraciones, capacidades de IA nativas y control total sobre los datos y despliegues.

## Capacidades principales

- **Código cuando lo necesitas**: escribe JavaScript/Python, agrega paquetes npm o usa la interfaz visual
- **Plataforma AI-native**: construye flujos con agentes de IA basados en LangChain, con tus propios datos y modelos
- **Control total**: self-hosted en infraestructura propia
- **Permisos avanzados**: SSO, roles y proyectos para trabajar en equipo
- **Extensible**: agrega tus propios nodos y funcionalidad

## Producción

La instancia productiva corre en [workflows.jsit.cl](https://workflows.jsit.cl), desplegada en Railway. Cada push a `master` reconstruye la imagen y redespliega automáticamente.

## Desarrollo local

Requiere [Node.js](https://nodejs.org/en/) y pnpm:

```
pnpm install
pnpm build
pnpm start
```

El editor queda disponible en http://localhost:5678

## Estructura

Monorepo con pnpm workspaces. Los paquetes clave:

- **`packages/cli`**: servidor Express, REST API y comandos CLI
- **`packages/core`**: motor de ejecución de workflows
- **`packages/workflow`**: interfaces y tipos del núcleo
- **`packages/editor-ui`**: frontend Vue 3
- **`packages/nodes-base`**: nodos integrados

Ver [AGENTS.md](AGENTS.md) para la guía completa de desarrollo.

## Licencia

jWorkflows está basado en [n8n](https://github.com/n8n-io/n8n), distribuido como [fair-code](https://faircode.io) bajo la [Sustainable Use License](LICENSE.md) y la [n8n Enterprise License](LICENSE_EE.md).
