# Portafolio · Nicolás Migueles

Sitio estático (HTML + CSS + un poco de JavaScript) listo para publicar con GitHub Pages. No necesita instalar nada ni compilar.

## Estructura

```
index.html     → todo el contenido (textos, links, secciones)
style.css      → estilos (colores y fuentes están al inicio, en :root)
script.js      → galería ampliable, menú activo, copiar correo
favicon.png    → ícono de la pestaña (tu avatar)
img/           → todas las imágenes del portafolio en formato .webp
```

## Cómo editar

- **Textos y links:** abre `index.html` y busca el texto que quieras cambiar. Cada juego es un bloque `<article class="project">`.
- **Agregar el link de Pixel Fist:** dentro del bloque `id="pixelfist"`, agrega bajo la lista de etiquetas:
  ```html
  <a class="btn" href="TU-LINK" target="_blank" rel="noopener">Link del juego <span aria-hidden="true">↗</span></a>
  ```
- **Agregar tu teléfono:** en la sección `id="contacto"`, agrega otro botón `<a class="btn alt" href="tel:+56TUNUMERO">…</a>`. Lo dejé fuera a propósito porque esta página será pública.
- **Cambiar imágenes:** reemplaza el archivo en `img/` manteniendo el mismo nombre.
- **Colores:** variables al inicio de `style.css` (`--ink`, `--red`, `--yellow`, `--navy`…). El tamaño de los cuadros del fondo es `--cell`.
- **Fuentes:** se cargan desde Google Fonts (Anton, Permanent Marker y Barlow). Si no cargan, el sitio usa fuentes del sistema.

## Publicar en GitHub Pages

1. Crea una cuenta en https://github.com si aún no tienes.
2. Crea un repositorio **público**. Si lo llamas exactamente `tu-usuario.github.io`, tu sitio quedará en `https://tu-usuario.github.io`. Con otro nombre (por ejemplo `portafolio`) quedará en `https://tu-usuario.github.io/portafolio/`.
3. Sube **el contenido** de esta carpeta (que `index.html` quede en la raíz del repositorio):
   - Desde la web: botón *Add file → Upload files*, arrastra todos los archivos y la carpeta `img`, y confirma con *Commit changes*.
   - O con git:
     ```
     git init
     git add .
     git commit -m "Portafolio"
     git branch -M main
     git remote add origin https://github.com/tu-usuario/tu-usuario.github.io.git
     git push -u origin main
     ```
4. En el repositorio ve a **Settings → Pages**, en *Build and deployment* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)` y guarda.
5. Espera 1 o 2 minutos y abre tu link. Cada vez que subas cambios, el sitio se actualiza solo.
