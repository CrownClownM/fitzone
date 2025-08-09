# Fitzone

Proyecto web generado con [Angular CLI](https://github.com/angular/angular-cli) versión 19.1.8.

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

- **Framework**: Angular 17.3.6 (Componentes Standalone)
- **Librería UI**: Angular Material
- **Gestión de Estado**: Angular Signals
- **Cliente HTTP**: Angular HttpClient con interceptores
- **Enrutamiento**: Angular Router con guardias
- **Testing**: Jest + Spectator
- **Tipado**: TypeScript con modo estricto
- **Herramienta de Build**: Angular CLI
- **Estilos**: SCSS con temas de Angular Material

## 📁 Estructura del proyecto

```
fitzone/
│
├── angular.json
├── package.json
├── src/
│   ├── index.html
│   ├── main.ts
│   ├── styles.scss
│   └── app/
│       ├── app.component.*
│       ├── app.config.ts
│       ├── app.routes.ts
│       ├── core/
│       ├── modules/
│       │   ├── auth/
│       │   └── home/
│       │       ├── components/
│       │       │   ├── banner/
│       │       │   └── class-card/
│       │       ├── interfaces/
│       │       ├── pages/
│       │       └── services/
│       └── shared/
│           └── components/
│               └── navbar/
│
└── assets/
		└── images/
				└── hero-fitness.jpg
```

## Simulación de datos

El proyecto utiliza una simulación de datos para mostrar información de clases, banners y otros elementos en la interfaz. Esta simulación se realiza mediante servicios e interfaces ubicados en:

- `src/app/modules/home/services/`: Servicios que gestionan y proveen los datos simulados.
- `src/app/modules/home/interfaces/`: Definición de las interfaces de los datos simulados.

Actualmente, los datos no provienen de una API real, sino que se generan y gestionan localmente en el IndexedDB para facilitar el desarrollo y pruebas de la interfaz.

## Comandos útiles

- 🏗️ **Construir el proyecto:**
	```bash
	ng build
	```
- 🧪 **Ejecutar pruebas unitarias:**
	```bash
	ng test
	```

## Decisiones de Diseño

- **Componentes Standalone**: Usando componentes standalone de Angular 19 para mejor tree-shaking
- **Signals**: Aprovechando Angular Signals para gestión de estado reactiva
- **Material Design**: UI consistente con componentes de Angular Material
- **Notificaciones Toast**: Feedback claro para todas las acciones del usuario

## Características de Rendimiento

- **Lazy Loading**: División de código basada en rutas
- **Estrategia OnPush**: Detección de cambios optimizada
- **Valores Computados**: Propiedades computadas reactivas con Signals
- **Tree Shaking**: Tamaño de bundle optimizado con componentes standalone

## Recursos adicionales

Para más información sobre Angular CLI, visita la [documentación oficial](https://angular.dev/tools/cli).
