# Monorepo con Despliegues Selectivos en Vercel

Este repositorio contiene varios proyectos dentro de la carpeta `/apps`, cada uno se despliega como un proyecto independiente en Vercel.

## Configuración para Despliegues Selectivos

El archivo `vercel.json` en la raíz del proyecto está configurado para detectar cambios y desplegar solo los proyectos que han sido modificados.

### Pasos para Configurar Proyectos en Vercel

Para cada proyecto en la carpeta `/apps`, debes:

1. Crear un nuevo proyecto en Vercel vinculado a este repositorio.

2. Nombrar cada proyecto siguiendo el patrón: `dxp-[nombre-carpeta]`. Por ejemplo:

   - Para `apps/ssg` → `dxp-ssg`
   - Para `apps/ssr` → `dxp-ssr`
   - Para `apps/csr` → `dxp-csr`

3. En la configuración de cada proyecto en Vercel, establece:
   - **Framework Preset**: Selecciona el adecuado (Next.js, Vite, etc.)
   - **Build Command**: Usa `yarn build:[nombre-carpeta]` (ej: `yarn build:ssg`)
   - **Output Directory**: Deja este campo vacío (se gestiona con el vercel.json)
   - **Root Directory**: Deja este campo vacío (se gestiona con el vercel.json)

### Cómo Funciona

Cuando se hace un push al repositorio:

1. Vercel detecta los cambios y activa los despliegues de todos los proyectos.
2. El comando `ignoreCommand` en `vercel.json` detecta si hubo cambios en el directorio específico del proyecto.
3. Solo se construyen y despliegan los proyectos con cambios, cancelando automáticamente el resto.

### Solución de Problemas

- Si un proyecto no se despliega correctamente, verifica que su nombre en Vercel coincida exactamente con el patrón `dxp-[nombre-carpeta]`.
- Asegúrate de que todos los proyectos estén correctamente configurados con los scripts de construcción apropiados.
- Si necesitas forzar el despliegue de todos los proyectos, puedes desactivar temporalmente el comando `ignoreCommand` en `vercel.json`.
