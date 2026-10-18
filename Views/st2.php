<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Tienda Virtual</title>
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
  <style>
    html { scroll-behavior: smooth; }
    body { font-family: Inter, system-ui, sans-serif; }
    .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
  </style> 
  
</head>

<body class="">

<!-- HEADER -->
<header class="sticky top-0 z-40 bg-white/95 backdrop-blur border-b">
  <div class="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3">
    <!-- MENÚ A LA IZQUIERDA -->
    <button id="menuBtn" class="p-2 rounded-xl hover:bg-slate-100 text-xl" aria-label="Abrir menú">☰</button>

    <a href="#" class="font-black text-xl tracking-tight flex-1">
      Mi<span class="text-indigo-600">Tienda</span>
    </a>

    <button id="cartBtn" class="relative p-2 rounded-xl hover:bg-slate-100 text-xl" aria-label="Carrito">
      🛒
      <span id="cartCount" class="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">0</span>
    </button>
  </div>
</header>

<!-- MENÚ LATERAL -->
<div id="overlay" class="fixed inset-0 bg-black/40 z-50 hidden"></div>
<aside id="sideMenu" class="fixed top-0 left-0 z-[60] h-full w-72 bg-white shadow-2xl -translate-x-full transition-transform duration-300">
  <div class="p-5 border-b flex items-center justify-between">
    <strong class="text-xl">Menú</strong>
    <button id="closeMenu" class="text-2xl p-2">×</button>
  </div>
  <nav class="p-4 space-y-2">
    <a href="#inicio" class="menu-link block px-4 py-3 rounded-xl hover:bg-indigo-50">🏠 Inicio</a>
    <a href="#quienes-somos" class="menu-link block px-4 py-3 rounded-xl hover:bg-indigo-50">👥 Quiénes somos</a>
    <a href="#contacto" class="menu-link block px-4 py-3 rounded-xl hover:bg-indigo-50">📞 Contacto</a>
    <a href="#login" class="menu-link block px-4 py-3 rounded-xl hover:bg-indigo-50">🔐 Iniciar sesión</a>
  </nav>
</aside>

<main id="inicio" class="">

  <!-- HERO -->
  <section class="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-7 md:p-10 mb-6">
    <p class="text-indigo-100 text-sm font-semibold uppercase tracking-widest">Tienda virtual</p>
    <h1 class="text-3xl md:text-5xl font-black mt-2">Encontrá lo que buscás</h1>
    <p class="mt-3 text-indigo-100 max-w-xl">Explorá nuestros productos, agregalos al carrito y enviá tu pedido por WhatsApp.</p>
  </section>

  <!-- FILTROS -->
  <section class="bg-white border rounded-2xl p-4 mb-5 shadow-sm">
    <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
      <div class="md:col-span-2">
        <label class="text-xs font-bold text-slate-500">BUSCAR</label>
        <input id="searchInput" type="search" placeholder="Nombre del producto..."
          class="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500">
      </div>

      <div>
        <label class="text-xs font-bold text-slate-500">CATEGORÍA</label>
        <select id="categoryFilter" class="mt-1 w-full rounded-xl border px-3 py-3 bg-white"></select>
      </div>

      <div>
        <label class="text-xs font-bold text-slate-500">SUBCATEGORÍA</label>
        <select id="subcategoryFilter" class="mt-1 w-full rounded-xl border px-3 py-3 bg-white"></select>
      </div>

      <div>
        <label class="text-xs font-bold text-slate-500">ORDENAR</label>
        <select id="sortFilter" class="mt-1 w-full rounded-xl border px-3 py-3 bg-white">
          <option value="default">Destacados</option>
          <option value="name-asc">Nombre A-Z</option>
          <option value="price-asc">Precio menor</option>
          <option value="price-desc">Precio mayor</option>
        </select>
      </div>
    </div>

    <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
      <span id="resultCount" class="text-sm text-slate-500"></span>

      <div class="flex rounded-xl border p-1 bg-slate-50">
        <button id="cardsBtn" class="px-4 py-2 rounded-lg bg-white shadow-sm text-sm font-semibold">▦ Cards</button>
        <button id="tableBtn" class="px-4 py-2 rounded-lg text-sm font-semibold">☷ Tabla</button>
      </div>
    </div>
  </section>

  <!-- CATÁLOGO -->
  <section id="cardsView" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"></section>

  <section id="tableView" class="hidden bg-white rounded-2xl border overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-slate-100">
          <tr>
            <th class="text-left p-4">Producto</th>
            <th class="text-left p-4">Categoría</th>
            <th class="text-left p-4">Subcategoría</th>
            <th class="text-right p-4">Precio</th>
            <th class="p-4"></th>
          </tr>
        </thead>
        <tbody id="tableBody"></tbody>
      </table>
    </div>
  </section>

  <!-- QUIÉNES SOMOS -->
  <section id="quienes-somos" class="mt-12 bg-white rounded-3xl border p-7">
    <h2 class="text-2xl font-black">Quiénes somos</h2>
    <p class="mt-3 text-slate-600 max-w-3xl">
      Somos una tienda dedicada a ofrecer productos seleccionados con atención personalizada
      y una experiencia de compra simple desde cualquier dispositivo.
    </p>
  </section>

  <!-- CONTACTO -->
  <section id="contacto" class="mt-5 bg-white rounded-3xl border p-7">
    <h2 class="text-2xl font-black">Contacto</h2>
    <p class="mt-3 text-slate-600">WhatsApp: <strong>11 7034-4429</strong></p>
    <p class="text-slate-600">Horario: lunes a sábado de 9:00 a 18:00.</p>
  </section>

  <!-- LOGIN -->
  <section id="login" class="mt-5 mb-12 bg-white rounded-3xl border p-7 max-w-lg">
    <h2 class="text-2xl font-black">Iniciar sesión</h2>
    <div class="mt-4 space-y-3">
      <input type="email" placeholder="Correo electrónico" class="w-full border rounded-xl px-4 py-3">
      <input type="password" placeholder="Contraseña" class="w-full border rounded-xl px-4 py-3">
      <button class="w-full bg-indigo-600 text-white rounded-xl py-3 font-bold">Ingresar</button>
      <p class="text-xs text-slate-400">Demo visual: conectar este formulario a tu backend cuando agreguemos usuarios.</p>
    </div>
  </section>
</main>


 
<!-- CARRITO -->
<div id="cartOverlay" class="fixed inset-0 bg-black/40 z-50 hidden"></div>
<aside id="cartDrawer" class="fixed top-0 right-0 z-[60] h-full w-full sm:max-w-md bg-white shadow-2xl translate-x-full transition-transform duration-300 flex flex-col">
  <div class="p-5 border-b flex items-center justify-between">
    <div>
      <h2 class="text-xl font-black">Mi carrito</h2>
      <p id="cartSubtitle" class="text-sm text-slate-500">0 productos</p>
    </div>
    <button id="closeCart" class="text-2xl p-2">×</button>
  </div>

  <div id="cartItems" class="flex-1 overflow-y-auto p-4 space-y-3"></div>

  <div class="border-t p-5">
    <div class="flex justify-between text-lg font-black mb-4">
      <span>Total</span>
      <span id="cartTotal">$0</span>
    </div>
    <button id="sendOrderBtn" class="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 font-bold">
      📲 Preparar pedido para WhatsApp
    </button>
    <button id="clearCartBtn" class="w-full mt-2 border rounded-xl py-3 font-semibold">
      Vaciar carrito
    </button>
  </div>
</aside>

<!-- MODAL PEDIDO / IMAGEN -->
<div id="orderModal" class="fixed inset-0 z-[80] bg-black/60 hidden items-center justify-center p-4">
  <div class="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto">
    <div class="p-5 border-b flex justify-between items-center">
      <h2 class="font-black text-xl">Pedido listo</h2>
      <button id="closeOrderModal" class="text-2xl">×</button>
    </div>

    <div class="p-5">
      <p class="text-sm text-slate-500 mb-3">Esta es la imagen que podés compartir por WhatsApp.</p>

      <div id="orderImageContent" class="bg-white border rounded-2xl p-5">
        <div class="text-center border-b pb-4">
          <h3 class="text-2xl font-black">MiTienda</h3>
          <p class="text-sm text-slate-500">Detalle del pedido</p>
        </div>
        <div id="orderLines" class="py-4 space-y-3"></div>
        <div class="border-t pt-4 flex justify-between font-black text-lg">
          <span>Total</span>
          <span id="orderTotal">$0</span>
        </div>
        <p class="text-xs text-slate-400 mt-4 text-center">Gracias por tu compra</p>
      </div>

      <div class="grid grid-cols-2 gap-3 mt-4">
        <button id="downloadImageBtn" class="border rounded-xl py-3 font-bold">⬇ Guardar imagen</button>
        <button id="whatsappBtn" class="bg-green-600 text-white rounded-xl py-3 font-bold">WhatsApp</button>
      </div>
      <p class="text-xs text-slate-400 mt-3">
        WhatsApp no permite que una página web adjunte automáticamente una imagen a un chat.
        Por eso la imagen se genera primero y luego podés compartirla desde el teléfono.
      </p>
    </div>
  </div>
</div>



<!-- BOTONES FLOTANTES -->
<div class="fixed bottom-5 right-4 z-40 flex flex-col gap-3">

  <!-- WhatsApp -->
  <a
    href="https://wa.me/5491170344429"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Escribir por WhatsApp"
    title="Escribir por WhatsApp"
    class="flex h-14 w-14 items-center justify-center
           rounded-full bg-green-500 text-white shadow-lg
           transition hover:scale-110 hover:bg-green-600"
  >
    <!-- Ícono WhatsApp -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="h-8 w-8"
      aria-hidden="true"
    >
      <path d="M12.04 2a9.87 9.87 0 0 0-8.48 14.92L2.25 22l5.22-1.37A9.93 9.93 0 1 0 12.04 2Zm0 18.1a8.18 8.18 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31A8.14 8.14 0 1 1 12.04 20.1Zm4.47-6.1c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.04.4 1.4.51.59.19 1.12.16 1.54.1.47-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"/>
    </svg>
  </a>

  <!-- Ir arriba -->
  <button    id="backToTop"    type="button"   aria-label="Ir arriba"
    title="Ir arriba"
    class="flex h-14 w-14 items-center justify-center
           rounded-full bg-indigo-600 text-white shadow-lg
           transition hover:scale-110 hover:bg-indigo-700"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
      class="h-7 w-7" aria-hidden="true"
    >
      <path d="m18 15-6-6-6 6"/>
    </svg>
  </button>

</div>

<script>

    // Botón "Ir arriba"
    const btnArriba = document.getElementById("backToTop");

    btnArriba.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

</script>
<?php  footerAdmin2 ($data); ?>

</body>
</html>
