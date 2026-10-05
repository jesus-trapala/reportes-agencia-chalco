# Sistema de diseño Vento · Agencia Chalco

Referencia de estilo para todas las herramientas del repo (dashboard, concentrador, comparador, checklist). Si una herramienta nueva se ve distinta a esto, la herramienta está mal, no este archivo.

## 1. Modos claro y oscuro

Todas las herramientas tienen **dos modos fijos** y un botón (sol / luna) para cambiar entre ellos.

- La elección se guarda en `localStorage` con la clave `vento-tema` (`"light"` o `"dark"`), la misma del Portal Vento, para que el modo se mantenga al pasar de una app a otra. Al guardar se escribe también la clave anterior `temaVento` y al leer se usa como respaldo. Siempre dentro de `try/catch` (en modo privado puede fallar y la página debe seguir funcionando).
- Si no hay nada guardado se usa la preferencia del sistema (`prefers-color-scheme`).
- El modo se aplica con `data-theme` en `<html>`, con un script pequeño en el `<head>` para que no parpadee al cargar.

```html
<script>
(function(){
  let t=null;
  try{t=localStorage.getItem("vento-tema")||localStorage.getItem("temaVento");}catch(e){}
  if(t!=="dark"&&t!=="light")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
  document.documentElement.dataset.theme=t;
})();
</script>
```

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--bg` | `#f7f3ec` (crema) | `#0d0f14` | Fondo de página |
| `--card` | `#ffffff` | `#141821` | Tarjetas informativas |
| `--text` | `#16181d` | `#f2f4f8` | Texto principal |
| `--muted` | `#6b6f78` | `#8d95a6` | Texto secundario |
| `--border` | `#e6e0d6` | `#232733` | Bordes y líneas |

## 2. Color institucional

- **Azul Vento `#2B6EF2`** (`--accent`): marca, botones principales, enlaces, la serie principal en gráficas.
- **Rojo `#e63329`** (`--alerta`): **solo** para alertas. Nunca decorativo.
- **Sin logo rojo.** No se usa ningún cuadro rojo con "V" ni en el encabezado ni en los íconos (decisión de Jesús, oct 2026).

## 3. Semáforo

Siempre **color + texto**, nunca color solo.

| Estado | Claro | Oscuro | Texto típico |
|---|---|---|---|
| `--ok` verde | `#1e9e57` | `#3ecf7a` | "En ritmo", "Al día", "Meta cumplida" |
| `--warn` ámbar | `#d18a00` | `#f0b429` | "Atención" |
| `--bad` rojo | `#e63329` | `#ff5a4f` | "Urgente", "Revisar" |

En los mosaicos el estado va como una pastilla (punto de color + texto) en la esquina superior.

**Regla única para mosaicos de control** (entregas, reseñas, expedientes, cuadres, cuotas):

- Algo sin cuadrar → **"Pendiente · N"** en ámbar (N = cuántos faltan).
- Error que hay que corregir en otro sistema (p. ej. ventas sin capturar en Pilot) → **"Revisar"** en rojo.
- Completo → **"Al día"** en verde.

Los pendientes de todos los módulos se juntan en una **campana con número** en el encabezado, que abre un panel lateral (se cierra con X, tocando fuera o con el botón de regresar).

## 4. Colores por módulo (mosaicos)

Vivo en modo claro, profundo en modo oscuro. El texto sobre el mosaico es blanco, salvo Racha en modo claro (el ámbar es muy claro): ahí el texto es oscuro `#2a1d00`.

| Módulo | Token | Claro | Oscuro |
|---|---|---|---|
| Hoy | `--m-hoy` | `#2f7cf6` | `#1f55d6` |
| Asesores | `--m-asesores` | `#14a08f` | `#0e7468` |
| Racha | `--m-racha` | `#e2a21a` | `#9a5d0a` |
| VentoCredit | `--m-vc` | `#7b5cf0` | `#5137b8` |
| Entregadas | `--m-entregas` | `#e07a2e` | `#a4521a` |
| Reseñas | `--m-resenas` | `#2fa04a` | `#2a6f2e` |
| Expedientes | `--m-expedientes` | `#e04e93` | `#8f2b63` |
| Pilot | `--m-pilot` | `#3d5f93` | `#2e4a72` |
| Meta y avance (grande) | `--m-meta` | degradado `#2B6EF2` → `#1846b8` | degradado `#2B6EF2` → `#163c9e` |

## 5. Tipografía (Google Fonts)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600&family=Inter:wght@400;500;600;700&family=Oswald:wght@600&display=swap" rel="stylesheet">
```

- **Oswald 600**: títulos y nombres de mosaico.
- **Inter**: todo el texto.
- **IBM Plex Mono**: cifras y tablas, siempre con `font-variant-numeric: tabular-nums`.

## 6. Regla clave: tocar vs. informar

- Lo que **se puede tocar** (mosaicos, botón "← Inicio") va **en color sólido**.
- Lo que **solo informa** (cifras, tarjetas de detalle, tablas) va **en tarjeta blanca u oscura con borde**.
- Nunca deben confundirse: una tarjeta informativa no lleva fondo de color, y un mosaico nunca es blanco.

## 7. Formas e iconos

- Radio de **16 a 18 px** en mosaicos y tarjetas (mosaicos 18, tarjetas 16).
- Mosaicos con sombra inferior suave: `0 8px 18px -10px rgba(0,0,0,.45)`.
- Iconos de línea simples en **SVG inline** (trazo 2, `stroke="currentColor"`, estilo Feather). **Sin emojis como iconos.** (La carita de estado del dashboard es un indicador, no un icono.)

## 8. Responsive

- Debe funcionar a **~390 px** de ancho sin scroll horizontal; márgenes laterales de 16 px. Áreas táctiles de **44 px** mínimo.
- Mosaicos: 4 columnas en escritorio; **2 columnas en celular**, y el mosaico grande ocupa todo el ancho.
- Tablas anchas: dentro de un contenedor con `overflow-x:auto` para que se desplacen dentro de su tarjeta, nunca la página.

## 9. Encabezado e instalación

- Todas las herramientas abren con el mismo encabezado, en una sola línea: el texto **VENTO CHALCO · NOMBRE DE LA APP** (Oswald 600, mayúsculas, 17 px; "VENTO CHALCO" en azul `--accent` y "· nombre" en `--muted`; el texto lleva a la portada de la app), el botón de regreso y el botón luna / sol. Todo mide mínimo 44 px de alto. Es el estilo del dashboard de ventas.
- Clase `.vh-marca`: `<a class="vh-marca" href="./">Vento Chalco<span>· Ventas</span></a>`. **Sin logo rojo con "V"** y sin "AGENCIA 16025".
- Botón de regreso: **"← Portal"** (https://jesus-trapala.github.io/portal-vento/). Si la página se abrió desde la app Vento Chalco (`?desde=app`), dice **"← App"** y regresa a la app.
- Íconos de las apps instaladas: el logo **VENTO** blanco sobre fondo oscuro `#111214` con una rayita azul abajo (los mismos de la app Vento Chalco).
- El sitio es instalable: `manifest.webmanifest`, `sw.js` (red primero; la copia guardada solo se usa sin señal; nunca guarda nada de Google) e íconos en `iconos/` (192, 512, maskable 512, apple-touch 180). Rutas relativas para GitHub Pages.
- Lo que se imprime o se guarda como PDF (checklist de entrega, carta factura, reporte del comparador) **no** usa este sistema: conserva su formato original. Los estilos de pantalla van dentro de `@media screen`.

## 10. Gráficas

- Una sola escala vertical por gráfica. Serie principal en azul Vento, línea de 2 px; referencias (ritmo ideal, meta) en gris `--muted` punteado.
- Siempre leyenda si hay 2 o más series, y tooltip al pasar el dedo / mouse.
- Rejilla y ejes discretos (`--border` / `--muted`). Al cambiar de modo se vuelven a dibujar con los colores del modo.

## 11. Plantilla de variables CSS

```css
:root{
  --bg:#f7f3ec; --card:#ffffff; --text:#16181d; --muted:#6b6f78; --border:#e6e0d6;
  --accent:#2B6EF2; --alerta:#e63329;
  --ok:#1e9e57; --warn:#d18a00; --bad:#e63329;
  --m-hoy:#2f7cf6; --m-asesores:#14a08f; --m-racha:#e2a21a; --m-vc:#7b5cf0;
  --m-entregas:#e07a2e; --m-resenas:#2fa04a; --m-expedientes:#e04e93; --m-pilot:#3d5f93;
  --m-meta:linear-gradient(135deg,#2B6EF2,#1846b8);
}
[data-theme="dark"]{
  --bg:#0d0f14; --card:#141821; --text:#f2f4f8; --muted:#8d95a6; --border:#232733;
  --ok:#3ecf7a; --warn:#f0b429; --bad:#ff5a4f;
  --m-hoy:#1f55d6; --m-asesores:#0e7468; --m-racha:#9a5d0a; --m-vc:#5137b8;
  --m-entregas:#a4521a; --m-resenas:#2a6f2e; --m-expedientes:#8f2b63; --m-pilot:#2e4a72;
  --m-meta:linear-gradient(135deg,#2B6EF2,#163c9e);
}
```
