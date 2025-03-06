# Frontend React Monorepo

Este repositorio contiene una aplicación desarrollada con **React** en un entorno de monorepo utilizando las capacidades de `npm workspaces`. Incluye funciones avanzadas de gestión de estado con **Zustand**, un sistema modular y configurable de CI/CD basado en **GitHub Actions**, y despliegue en **AWS S3**. Además, el proyecto utiliza **Storybook** para construir y documentar componentes de interfaz y pruebas con herramientas modernas como **Vitest** y **Playwright**.

---

## **Instalación y ejecución**

### Requisitos previos

- **Node.js** (16 o superior).
- **npm** (7 o superior) para compatibilidad con workspaces.
- Configuración de las credenciales de AWS para despliegue (opcional).

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/usuario/proyecto.git
   ```

2. Instala las dependencias principales del monorepo:

   ```bash
   npm install
   ```

3. Asegúrate de que los paquetes individuales del monorepo también tengan todas las dependencias instaladas automáticamente.

### Ejecución local

Ejecuta la aplicación principal desde el paquete `app`:

```bash
npm run dev -w app
```

Esto ejecutará la aplicación con **Vite** y estará disponible en `http://localhost:3000`.

### Ejecución de Storybook

Para visualizar y probar los componentes de la interfaz:

```bash
npm run storybook
```

La interfaz de Storybook estará disponible en `http://localhost:6006`.

---

## **Despliegue y configuración CI/CD**

### **Descripción general del CI/CD**

El proceso de desarrollo sigue el flujo **GitHub Flow**, donde los cambios se realizan a través de ramas feature y se mergean en `main` tras pasar revisiones y pruebas. Al realizar un push a `main`, se activa automáticamente el flujo de despliegue.

### **Pipeline de GitHub Actions**

El archivo [aws.yml](./.github/workflows/aws.yml) configura el pipeline de despliegue de la siguiente manera:

1. **Paso: Ejecución de pruebas**
    - Se instalan las dependencias.
    - Se realizan pruebas usando Vitest para garantizar la integridad del código.

   ```yaml
   run: npm test
   ```

2. **Paso: Construcción**
    - Se realiza la construcción de producción de la aplicación usando `npm run build` de Vite.

   ```yaml
   run: npm run build -w app
   ```

3. **Paso: Despliegue**
    - Se sincronizan los archivos generados con un bucket en AWS S3 utilizando `jakejarvis/s3-sync-action`.

   Variables requeridas (definidas como GitHub Secrets):
    - `AWS_S3_BUCKET`: Nombre del bucket en S3.
    - `AWS_ACCESS_KEY_ID` y `AWS_SECRET_ACCESS_KEY`: Credenciales de AWS.
    - `SOURCE_DIR`: Carpeta de salida de la construcción (por defecto `./packages/app/dist`).

### **Ejecución del pipeline**

El pipeline se ejecuta automáticamente con cada _push_ a la rama `main`. Para configurar el despliegue en un nuevo bucket, actualiza las variables en los secretos del repositorio.

### **Configuración del bucket en S3**

El bucket de AWS S3 debe estar configurado para alojar sitios web estáticos, permitiendo acceso público (solo lectura) a los archivos estáticos. También puedes habilitar un CDN como CloudFront para mejorar la distribución del contenido.

---

## **Detalles técnicos del proyecto**

### **Gestión del estado**

La gestión de estado se implementó con **Zustand**, una librería ligera y reactiva ideal para aplicaciones de React.

- **Stores implementados**:
    1. **AuthStore**: Maneja la autenticación del usuario.
    2. **CartStore**: Gestiona el carrito de compras.
    3. **ProductStore**: Administra los productos y su inventario.
    4. **OrderStore**: Trabaja con las órdenes realizadas.
    5. **InvoiceStore**: Genera y almacena facturas de las compras.

Los estados persistentes, como carrito, autenticación e historial de órdenes, se almacenan en `localStorage` usando el middleware `zustand/middleware`.

### **Patrones y estructura**

1. **Stores independientes**:
    - Cada funcionalidad principal tiene su propia store, lo que favorece horizontabilidad en la arquitectura y separación de preocupaciones.
2. **Atomic Design**:
    - Los componentes están diseñados siguiendo los principios de **Atomic Design**, lo que facilita su testeo, reutilización y documentación en **Storybook**.
3. **Arquitectura modular en un monorepo**:
    - La base del proyecto se encuentra modularizada bajo paquetes individuales (`packages/*`), lo que permite flexibilidad para expandir el monorepo en el futuro.

### **Estructura del monorepo**

- **`app/`**: Contiene la aplicación principal de React.
- **`shared/`**: Incluye componentes reutilizables y utilidades globales.
- **`cart/`**, **`dashboard/`**, **`admin_panel/`**: Son módulos específicos con funcionalidades definidas.

### **Storybook**

**Storybook** se utiliza para construir y documentar los componentes visuales en su propio entorno. Esto mejora la colaboración en equipo, así como el desarrollo aislado.

Comando para construir Storybook:

```bash
npm run build-storybook
```

Los archivos de Storybook se generan en la carpeta `storybook-static`.

---

## **Pruebas**

### **Herramientas**:

1. **Vitest**:
    - Para pruebas unitarias y de integración.
2. **Testing Library**:
    - Tests sobre el DOM y componentes de React.
3. **Playwright**:
    - Automatización de pruebas End-to-End para verificar flujos completos.

### **Ejecución de pruebas**

- Pruebas unitarias:

  ```bash
  npm test
  ```

- Pruebas E2E con Playwright:

  ```bash
  npx playwright test
  ```

Las pruebas están configuradas para ejecutarse automáticamente en el pipeline de CI.

---

## **Decisión de servicios CI/CD**

### GitHub Actions para CI/CD

Se eligió **GitHub Actions** frente a otros servicios de CI/CD por estas razones:

- Es nativo a GitHub, lo que facilita la integración y configuración de pipelines dentro del repositorio.
- Permite configurar pasos personalizados para pruebas y despliegues según las necesidades del proyecto.

### AWS S3 como hosting

Se eligió **AWS S3** para desplegar la aplicación web debido a su:
- Eficiencia para entregar sitios estáticos.
- Integración con servicios de CDN como CloudFront.
- Alta flexibilidad y escalabilidad.

### Alternativas evaluadas
1. **AWS Amplify**:
    - Simplifica el flujo DevOps, pero puede ser innecesariamente complejo o costoso para proyectos que ya utilizan GitHub Actions.

---