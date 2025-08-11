# Fitzone

Proyecto web generado con [Angular CLI](https://github.com/angular/angular-cli) versión **19.1.8** (Angular 19, componentes standalone, Signals).

## 🔧 Instrucciones de instalación y ejecución

1. **Clona el repositorio:**
	 ```bash
	 git clone <url-del-repo>
	 cd fitzone
	 ```
2. **Instala las dependencias:**
	 ```bash
	 npm install
	 ```
3. **Ejecuta el servidor de desarrollo:**
	 ```bash
	 ng serve
	 ```
	 Luego abre tu navegador en [http://localhost:4200/](http://localhost:4200/)

## 🛠️ Stack Tecnológico

- **Framework**: Angular 19 (Standalone Components + Signals)
- **UI**: Angular Material
- **Estado**: Angular Signals + servicios especializados
- **Persistencia**: IndexedDB (seed inicial + operaciones CRUD simuladas)
- **Routing**: Angular Router con guardias (`loginRedirectGuard`, `authGuard`)
- **Testing**: Karma + Jasmine + Spectator (utilidades de test)
- **Tipado**: TypeScript (modo estricto)
- **Build**: Angular CLI
- **Estilos**: SCSS + theming Material
- **Notificaciones**: Servicio de Toast/SnackBar para feedback de usuario

## 📁 Estructura del proyecto (simplificada)

```
fitzone/
│
├── angular.json
├── package.json
├── karma.conf.js
├── src/
│   ├── index.html
│   ├── main.ts
│   ├── styles.scss
│   └── app/
│       ├── app.component.*
│       ├── app.config.ts / app.routes.ts
│       ├── core/
│       │   └── services/ (IndexedDB, Auth, etc.)
│       ├── modules/
│       │   ├── auth/
│       │   └── home/
│       │       ├── components/
│       │       │   ├── banner/
│       │       │   ├── class-card/
│       │       │   ├── card-reservation/
│       │       │   └── (otros componentes UI)
│       │       ├── interfaces/
│       │       ├── pages/ (main, reservations, etc.)
│       │       └── services/ (class-store, etc.)
│       └── shared/
│           └── components/
│               ├── navbar/
│               ├── center-card/
│               └── confirm-dialog/
│
└── assets/
	└── images/ (hero-fitness.jpg, promo*.svg)
```

## 🗃️ Simulación de datos (IndexedDB)

Al iniciar, el servicio de IndexedDB realiza un seed con datos mock (centros, clases, usuarios, reservas). Estos datos se modularizaron en archivos independientes:

- `mock-centers.ts`
- `mock-classes.ts`
- `mock-users.ts`

El flujo de reservas actualiza dinámicamente `currentEnrollment` de cada clase y previene duplicados por usuario. Todo se persiste en stores de IndexedDB para mantener estado entre recargas.

Interfaces y servicios clave:
- `modules/home/interfaces/`: Modelos de clase, centro, reserva, etc.
- `modules/home/services/class-store.service.ts`: Gestión reactiva (Signals) de clases y reservas.
- `core/services/indexed-db.service.ts`: Capa de persistencia y seed inicial.

## 📜 Requisitos previos

- Node.js >= 18.19 (recomendado LTS 20+)
- Navegador Chrome o Chromium instalado (para Karma)

## Comandos útiles

- 🏗️ **Construir el proyecto:**
	```bash
	ng build
	```
- 🧪 **Pruebas unitarias:** (requiere Chrome / Chromium)
	```bash
	ng test
	```

## Decisiones de Diseño

- **Standalone Components** para reducir boilerplate y mejorar tree-shaking.
- **Signals** para estado local reactivo y derivaciones computadas sin NgRx por ahora.
- **IndexedDB** para persistir y simular backend sin depender de APIs externas durante el desarrollo.
- **Guards de Auth** para proteger rutas y redirigir según estado de sesión.
- **Material Design + SCSS** para consistencia visual y fácil theming.
- **Toast/Dialogs** centralizados para UX clara (confirmaciones y feedback de reservas).

## Características de Rendimiento

- **Lazy Loading** en módulos de características.
- **Signals computados** para derivar vistas sin recalcular costoso.
- **Tree Shaking** + Standalone = bundles más pequeños.
- **Actualizaciones granulares** vía señales en lugar de stores globales pesados.

## Recursos adicionales

- Documentación Angular: https://angular.dev/
- Angular CLI: https://angular.dev/tools/cli
- Angular Material: https://material.angular.io/

---

Si necesitas correr pruebas en CI más adelante, se puede añadir un launcher headless específico; hoy se usa configuración básica (Chrome). Solicítalo cuando se requiera.
