
const WHATSAPP = "5491170344429";

const productos = [
  { id:1, nombre:"Remera Infantil Básica", categoria:"Niños", subcategoria:"Remeras", precio:8500, emoji:"👕" },
  { id:2, nombre:"Vestido de Gasa", categoria:"Niñas", subcategoria:"Vestidos", precio:15900, emoji:"👗" },
  { id:3, nombre:"Vestido de Encaje", categoria:"Niñas", subcategoria:"Vestidos", precio:18900, emoji:"👗" },
  { id:4, nombre:"Vestido de Broderie", categoria:"Niñas", subcategoria:"Vestidos", precio:17500, emoji:"👗" },
  { id:5, nombre:"Conjunto Deportivo", categoria:"Niños", subcategoria:"Conjuntos", precio:14500, emoji:"🧥" },
  { id:6, nombre:"Pantalón Infantil", categoria:"Niños", subcategoria:"Pantalones", precio:11200, emoji:"👖" },
  { id:7, nombre:"Blusa Infantil", categoria:"Niñas", subcategoria:"Blusas", precio:12500, emoji:"👚" },
  { id:8, nombre:"Conjunto Verano", categoria:"Niñas", subcategoria:"Conjuntos", precio:14900, emoji:"🌸" },
  { id:9, nombre:"Bermuda Infantil", categoria:"Niños", subcategoria:"Pantalones", precio:9800, emoji:"🩳" },
  { id:10, nombre:"Campera Infantil", categoria:"Niños", subcategoria:"Abrigos", precio:22500, emoji:"🧥" }
];

let carrito = JSON.parse(localStorage.getItem("carritoTienda")) || [];
let vista = "cards";

const $ = id => document.getElementById(id);
const money = n => "$" + n.toLocaleString("es-AR");

function guardarCarrito() {
  localStorage.setItem("carritoTienda", JSON.stringify(carrito));
}

function categorias() {
  return [...new Set(productos.map(p => p.categoria))];
}

function subcategorias() {
  const cat = $("categoryFilter").value;
  return [...new Set(productos.filter(p => !cat || p.categoria === cat).map(p => p.subcategoria))];
}

function llenarFiltros() {
  $("categoryFilter").innerHTML =
    `<option value="">Todas</option>` +
    categorias().map(c => `<option value="${c}">${c}</option>`).join("");

  actualizarSubcategorias();
}

function actualizarSubcategorias() {
  const actual = $("subcategoryFilter").value;
  const subs = subcategorias();

  $("subcategoryFilter").innerHTML =
    `<option value="">Todas</option>` +
    subs.map(s => `<option value="${s}">${s}</option>`).join("");

  if (subs.includes(actual)) $("subcategoryFilter").value = actual;
}

function productosFiltrados() {
  const q = $("searchInput").value.toLowerCase().trim();
  const cat = $("categoryFilter").value;
  const sub = $("subcategoryFilter").value;
  const sort = $("sortFilter").value;

  let lista = productos.filter(p =>
    (!q || p.nombre.toLowerCase().includes(q)) &&
    (!cat || p.categoria === cat) &&
    (!sub || p.subcategoria === sub)
  );

  if (sort === "name-asc") lista.sort((a,b) => a.nombre.localeCompare(b.nombre));
  if (sort === "price-asc") lista.sort((a,b) => a.precio - b.precio);
  if (sort === "price-desc") lista.sort((a,b) => b.precio - a.precio);

  return lista;
}

function render() {
  const lista = productosFiltrados();
  $("resultCount").textContent = `${lista.length} producto${lista.length !== 1 ? "s" : ""}`;

  $("cardsView").innerHTML = lista.map(p => `
    <article class="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
      <div class="h-36 sm:h-44 bg-slate-100 flex items-center justify-center text-6xl">${p.emoji}</div>
      <div class="p-4">
        <span class="text-xs font-bold text-indigo-600">${p.categoria} · ${p.subcategoria}</span>
        <h3 class="font-bold mt-1 line-clamp-2 min-h-12">${p.nombre}</h3>
        <div class="flex items-center justify-between gap-2 mt-4">
          <strong class="text-lg">${money(p.precio)}</strong>
          <button onclick="agregar(${p.id})" class="bg-indigo-600 text-white rounded-xl px-3 py-2 text-sm font-bold">
				+
			</button>
        </div>
      </div>
    </article>
  `).join("");

  $("tableBody").innerHTML = lista.map(p => `
    <tr class="border-t hover:bg-slate-50">
      <td class="p-4 font-semibold">${p.emoji} ${p.nombre}</td>
      <td class="p-4">${p.categoria}</td>
      <td class="p-4">${p.subcategoria}</td>
      <td class="p-4 text-right font-bold">${money(p.precio)}</td>
      <td class="p-4 text-right">
        <button onclick="agregar(${p.id})" class="bg-indigo-600 text-white rounded-lg px-3 py-2 font-bold">Agregar</button>
      </td>
    </tr>
  `).join("");
}

function agregar(id) {
  const item = carrito.find(x => x.id === id);
  if (item) item.cantidad++;
  else carrito.push({ id, cantidad: 1 });
  guardarCarrito();
  renderCarrito();
}

function cambiarCantidad(id, delta) {
  const item = carrito.find(x => x.id === id);
  if (!item) return;
  item.cantidad += delta;
  if (item.cantidad <= 0) carrito = carrito.filter(x => x.id !== id);
  guardarCarrito();
  renderCarrito();
}

function eliminar(id) {
  carrito = carrito.filter(x => x.id !== id);
  guardarCarrito();
  renderCarrito();
}

function totalCarrito() {
  return carrito.reduce((total, item) => {
    const p = productos.find(x => x.id === item.id);
    return total + p.precio * item.cantidad;
  }, 0);
}

function renderCarrito() {
  const unidades = carrito.reduce((s,x) => s + x.cantidad, 0);
  $("cartCount").textContent = unidades;
  $("cartSubtitle").textContent = `${unidades} producto${unidades !== 1 ? "s" : ""}`;
  $("cartTotal").textContent = money(totalCarrito());

  $("cartItems").innerHTML = carrito.length ? carrito.map(item => {
    const p = productos.find(x => x.id === item.id);
    return `
      <div class="border rounded-2xl p-3 flex gap-3">
        <div class="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-2xl">${p.emoji}</div>
        <div class="flex-1 min-w-0">
          <div class="font-bold">${p.nombre}</div>
          <div class="text-sm text-slate-500">${money(p.precio)} c/u</div>
          <div class="flex items-center gap-2 mt-2">
            <button onclick="cambiarCantidad(${p.id},-1)" class="w-8 h-8 border rounded-lg">−</button>
            <span class="font-bold">${item.cantidad}</span>
            <button onclick="cambiarCantidad(${p.id},1)" class="w-8 h-8 border rounded-lg">+</button>
            <button onclick="eliminar(${p.id})" class="ml-auto text-red-500 text-sm">Eliminar</button>
          </div>
        </div>
      </div>
    `;
  }).join("") : `
    <div class="h-full flex flex-col items-center justify-center text-center text-slate-400">
      <div class="text-6xl">🛒</div>
      <p class="mt-3 font-semibold">Tu carrito está vacío</p>
    </div>
  `;
}

function abrirCarrito() {
  $("cartOverlay").classList.remove("hidden");
  $("cartDrawer").classList.remove("translate-x-full");
}

function cerrarCarrito() {
  $("cartOverlay").classList.add("hidden");
  $("cartDrawer").classList.add("translate-x-full");
}

function abrirMenu() {
  $("overlay").classList.remove("hidden");
  $("sideMenu").classList.remove("-translate-x-full");
}

function cerrarMenu() {
  $("overlay").classList.add("hidden");
  $("sideMenu").classList.add("-translate-x-full");
}

function prepararPedido() {
  if (!carrito.length) {
    alert("Agregá al menos un producto al carrito.");
    return;
  }

  $("orderLines").innerHTML = carrito.map(item => {
    const p = productos.find(x => x.id === item.id);
    return `
      <div class="flex justify-between gap-3">
        <div>
          <div class="font-semibold">${item.cantidad} × ${p.nombre}</div>
          <div class="text-xs text-slate-500">${money(p.precio)} c/u</div>
        </div>
        <strong>${money(p.precio * item.cantidad)}</strong>
      </div>
    `;
  }).join("");

  $("orderTotal").textContent = money(totalCarrito());
  $("orderModal").classList.remove("hidden");
  $("orderModal").classList.add("flex");
}

async function generarImagen() {
  return await html2canvas($("orderImageContent"), {
    backgroundColor: "#ffffff",
    scale: 2
  });
}

async function descargarImagen() {
  const canvas = await generarImagen();
  const link = document.createElement("a");
  link.download = "pedido-mitienda.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

async function compartirWhatsApp() {
  const canvas = await generarImagen();
  canvas.toBlob(async blob => {
    const file = new File([blob], "pedido-mitienda.png", { type: "image/png" });

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: "Pedido MiTienda",
          text: "Hola, te envío mi pedido.",
          files: [file]
        });
        return;
      } catch (e) {}
    }

    const mensaje = encodeURIComponent(
      "Hola! Te envío mi pedido desde MiTienda. Total: " + money(totalCarrito()) +
      ". La imagen del pedido se generó en la tienda."
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${mensaje}`, "_blank");
  }, "image/png");
}

// Eventos
$("menuBtn").onclick = abrirMenu;
$("closeMenu").onclick = cerrarMenu;
$("overlay").onclick = cerrarMenu;

document.querySelectorAll(".menu-link").forEach(link => link.onclick = cerrarMenu);

$("cartBtn").onclick = abrirCarrito;
$("closeCart").onclick = cerrarCarrito;
$("cartOverlay").onclick = cerrarCarrito;

$("cardsBtn").onclick = () => {
  vista = "cards";
  $("cardsView").classList.remove("hidden");
  $("tableView").classList.add("hidden");
  $("cardsBtn").classList.add("bg-white","shadow-sm");
  $("tableBtn").classList.remove("bg-white","shadow-sm");
};

$("tableBtn").onclick = () => {
  vista = "table";
  $("cardsView").classList.add("hidden");
  $("tableView").classList.remove("hidden");
  $("tableBtn").classList.add("bg-white","shadow-sm");
  $("cardsBtn").classList.remove("bg-white","shadow-sm");
};

$("searchInput").oninput = render;
$("sortFilter").onchange = render;

$("categoryFilter").onchange = () => {
  actualizarSubcategorias();
  render();
};

$("subcategoryFilter").onchange = render;

$("clearCartBtn").onclick = () => {
  carrito = [];
  guardarCarrito();
  renderCarrito();
};

$("sendOrderBtn").onclick = prepararPedido;
$("closeOrderModal").onclick = () => {
  $("orderModal").classList.add("hidden");
  $("orderModal").classList.remove("flex");
};
$("downloadImageBtn").onclick = descargarImagen;
$("whatsappBtn").onclick = compartirWhatsApp;




//W3Schools Full Access - your next career move


// Inicialización
llenarFiltros();
render();
renderCarrito();
