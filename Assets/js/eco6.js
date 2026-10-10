// ==========================================
// CONFIGURACIÓN GLOBAL DE FORMATO DE MONEDA
// ==========================================
const CURRENCY_CONFIG = {
    decimals: 0,         // Cantidad de decimales (ej: 2 o 0)
    showSymbol: false     // true = incluye el símbolo detectado según el país del navegador
};
// Detectar automáticamente el símbolo de moneda según la localización del cliente
const USER_LOCALE = navigator.language || 'es-AR';
let DETECTED_SYMBOL = '';
if (CURRENCY_CONFIG.showSymbol) {
    try {
        // Extrae únicamente el símbolo de moneda de la configuración regional
        const formatter = new Intl.NumberFormat(USER_LOCALE, { style: 'currency', currency: 'USD' });
        const parts = formatter.formatToParts(0);
        const symbolPart = parts.find(part => part.type === 'currency');
        DETECTED_SYMBOL = symbolPart ? symbolPart.value : '$';
    } catch (e) {
        DETECTED_SYMBOL = '$';
    }
}
/**
 * Función centralizada para formatear montos
 * @param {number} amount - El número a formatear
 * @returns {string} - Cadena con el formato (separador de miles con espacio)
 */
function formatCurrency(amount) {
    const numericValue = Number(amount) || 0;
    // Formatea los decimales fijados
    const fixedValue = numericValue.toFixed(CURRENCY_CONFIG.decimals);
    const [integerPart, decimalPart] = fixedValue.split('.');
    // Añade el espacio como separador de miles
    const integerWithSpaces = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    // Une parte entera y decimal
    const formattedNumber = decimalPart !== undefined ? `${integerWithSpaces}.${decimalPart}` : integerWithSpaces;
    // Retorna con o sin símbolo
    return CURRENCY_CONFIG.showSymbol ? `${DETECTED_SYMBOL} ${formattedNumber}` : formattedNumber;
}
// ==========================================
// CONTROL DE ESTADOS DE CARGANDO Y ERROR
// ==========================================
// 1. Muestra esqueletos animados (Skeletons) mientras se obtienen los productos
function showLoadingState() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    // Genera 4 tarjetas "esqueleto" vacías con animación de pulso
    grid.innerHTML = Array(4).fill(0).map(() => `
        <div class="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse">
            <div class="aspect-square bg-slate-200 rounded-xl mb-4"></div>
            <div class="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
            <div class="h-3 bg-slate-200 rounded w-1/2 mb-4"></div>
            <div class="flex justify-between items-center pt-2">
                <div class="h-6 bg-slate-200 rounded w-1/3"></div>
                <div class="w-9 h-9 bg-slate-200 rounded-xl"></div>
            </div>
        </div>
    `).join('');
}
// 2. Oculta el estado de carga (al llamar a renderProducts, automáticamente se reemplaza)
function hideLoadingState() {
    // No requiere código extra si renderProducts() reemplaza el innerHTML de 'products-grid'
}
// 3. Muestra un mensaje amigable si falla la API
function showErrorState(message = "Ocurrió un error al cargar los productos.") {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    grid.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-500">
            <div class="inline-flex p-3 bg-red-50 text-red-500 rounded-full mb-3">
                <i data-lucide="alert-circle" class="w-8 h-8"></i>
            </div>
            <p class="font-bold text-slate-800 text-lg mb-1">¡Ups! Algo salió mal</p>
            <p class="text-sm text-slate-500 mb-4">${message}</p>
            <button onclick="initApp()" class="px-4 py-2 bg-blue-600 text-white font-medium text-xs rounded-xl hover:bg-blue-700 transition">
                Reintentar
            </button>
        </div>
    `;
    if (window.lucide) lucide.createIcons();
}
/**
 * Obtiene el listado de productos desde el servidor/API.
 * @returns {Promise<Array>} Promesa que resuelve a un array de productos.
 */
async function getProducts() {
    f_url = base_url +'Ecommerce/getProducts6/' + neg;     ; 
    const API_URL = f_url; 
    try {
        const response = await fetch(API_URL, {
            method: 'GET', headers: {'Content-Type': 'application/json'}
        });
        // Verificar si la respuesta del servidor fue exitosa (código 200-299)
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        // Retornar los datos (asegurando un array por seguridad)
        return Array.isArray(data) ? data : (data.products || []);
    } catch (error) {
        console.error(" Error al obtener productos en getProducts():", error);
        // Lanzamos el error hacia arriba para que initApp() pueda mostrar el estado de error en la UI
        throw error; 
    }
}
// ==========================================
// ESTADO DE LA APLICACIÓN
// ==========================================
// Función principal de arranque
let productsData = []; let categoriasUnicasOrdenadas = [];
async function initApp() {
    showLoadingState(); // Muestra esqueletos / spinner
    try {
        // La ejecución se PAUSA aquí hasta que getProducts() termina de traer los datos
       // if (!android) hide2(['gridcols']);
        productsData = await getProducts();
        categoriasUnicasOrdenadas = [...new Set(productsData.map(p => p.category))].sort();
        renderCategoryButtons(categoriasUnicasOrdenadas.filter(Boolean)); // Filtra categorías vacías
        renderProducts(productsData);
    } catch (error) {
        // Si la API falla o da error 404/500, capturamos el fallo suavemente
        showErrorState("No pudimos cargar los productos en este momento.");
    }
}
const productsData_ = [
    {
        id: 1,
        name: "Zapatillas Red Runner Pro",
        category: "calzado",
        subcategory: "deportivo",
        price: 89.99,
        oldPrice: 120.00,
        isOffer: true,
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80"
        ],
        description: "Diseñadas para maximizar el rendimiento en carrera. Material altamente transpirable con amortiguación reactiva.",
        specs: ["Suela de goma antideslizante", "Techo de malla Mesh ultra ligero", "Plantilla ergonómica memory foam"]
    },
    {
        id: 2,
        name: "Auriculares Wireless Premium",
        category: "audio",
        subcategory: "premium",
        price: 149.50,
        oldPrice: null,
        isOffer: false,
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
        ],
        description: "Cancelación de ruido activa de última generación. Sonido envolvente Hi-Fi con hasta 30 horas de autonomía continua.",
        specs: ["Bluetooth 5.3", "Cancelación activa de ruido (ANC)", "Carga rápida USB-C"]
    },
    {
        id: 3,
        name: "Smartwatch Sport Edition",
        category: "gadgets",
        subcategory: "deportivo",
        price: 199.00,
        oldPrice: null,
        isOffer: false,
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
        ],
        description: "Monitor de salud avanzado con seguimiento de ritmo cardíaco, oxígeno en sangre y monitoreo continuo del sueño.",
        specs: ["Resistencia al agua 5 ATM", "Pantalla AMOLED 1.4 pulgadas", "Batería de 14 días de duración"]
    },
    {
        id: 4,
        name: "Mochila Urbana Waterproof",
        category: "accesorios",
        subcategory: "urbano",
        price: 55.00,
        oldPrice: null,
        isOffer: false,
        images: [
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80"
        ],
        description: "Mochila impermeable moderna para el día a día. Compartimento acolchado para laptop de hasta 15.6 pulgadas.",
        specs: ["Tela Oxford impermeable", "Puerto de carga USB externo", "Cierres de seguridad antirrobo"]
    }
];
let cart = [];
let activeCategory = 'todos';
let activeSubcategory = 'todos';
// Inicialización de la aplicación
document.addEventListener("DOMContentLoaded", () => {
    initApp();
    renderProducts();
    lucide.createIcons();
    stateLogin(); 
});
// ==========================================
// Verifica si el usuario está logueado y ajusta la UI
// ==========================================
const stateLogin = () => {
    if (logged) {
        //hide2(['log']);
        //document.querySelector('.log').appendChild(  crEl2('button', { class: 'text-xs text-slate-400', innerHTML: `Bienvenido, pepe` }))
        //document.querySelector('.log').innerHTML = `<button class="text-xs text-slate-400">Bienvenido, </button>`;
        //window.location.href = base_url+'dash';
    }
}
// ==========================================
// LÓGICA DE FILTRADO Y CATEGORÍAS
// ==========================================
function renderCategoryButtons(categories) {
    if (categories.length==1 && categories[0] === '') {hide2(['catsubcat', 'subcats']); return;}
    const container = document.getElementById('category-slider');
    if (!container) return;
    container.innerHTML = `<button onclick="filterCategory('todos')" class="cat-btn active whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 bg-blue-600 text-white shadow-md shadow-blue-600/20">
                    <i data-lucide="layers" class="w-4 h-4"></i> Todos
                </button>`;
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = "cat-btn whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 bg-white text-slate-600 border border-gray-200 hover:bg-slate-50";
        btn.textContent = cat;
        btn.addEventListener('click', () => filterCategory(cat));
        container.appendChild(btn);
    });
}
function filterCategory(cat) {
    activeCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.className = "cat-btn whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 bg-white text-slate-600 border border-gray-200 hover:bg-slate-50";
    });
    event.currentTarget.className = "cat-btn active whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 bg-blue-600 text-white shadow-md shadow-blue-600/20";
    renderProducts();
}
function filterSubcategory(subcat) {
    activeSubcategory = subcat;
    document.querySelectorAll('.subcat-btn').forEach(btn => {
        btn.className = "subcat-btn text-xs font-medium px-3 py-1 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition shrink-0";
    });
    event.currentTarget.className = "subcat-btn text-xs font-medium px-3 py-1 rounded-full bg-slate-800 text-white transition shrink-0";
    renderProducts();
}
function renderProducts() {
    const grid = document.getElementById('products-grid');
    const filtered = productsData.filter(p => {
        const matchCat = activeCategory === 'todos' || p.category === activeCategory;
        const matchSub = activeSubcategory === 'todos' || p.subcategory === activeSubcategory;
        return matchCat && matchSub;
    });
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-12 text-center text-slate-400">
                <i data-lucide="package-search" class="w-12 h-12 mx-auto mb-2 stroke-1"></i>
                <p class="font-semibold text-slate-600">No se encontraron productos en esta categoría.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    //  w-full aspect-[2/3] object-cover
    grid.innerHTML = filtered.map(p => `
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col group">
            <div class="relative aspect-[4/5] overflow-hidden bg-gray-100 cursor-pointer" onclick="openProductModal(${p.id})">
                <img src="${p.images[0]}" alt="${p.name}" class="w-full 
                w-full aspect-[2/3] object-contain
                 group-hover:scale-105 transition duration-300">
                ${p.isOffer ? `<span class="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Oferta</span>` : ''}
                <div class="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span class="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1">
                        <i data-lucide="eye" class="w-4 h-4"></i> Ver detalles
                    </span>
                </div>
            </div>
            <div class="p-4 flex flex-col flex-grow justify-between">
                <div>
                    <div class="flex items-center gap-2 flex-wrap justify-between catcu">
                        <span class="text-xs text-slate-400 uppercase tracking-wider font-semibold">${p.category}</span>
                        <span class="text-xs font-semibold text-blue-500 curva">Curva: ${p.multiplo}</span>
                    </div>
                    <h3 onclick="openProductModal(${p.id})" class="font-bold text-slate-800 text-base leading-snug mt-1 hover:text-blue-600 transition cursor-pointer">${p.name}</h3>
                </div>
                <div class="mt-4 flex items-center justify-between gap-2">
                    <div>
                        ${p.oldPrice ? `<span class="text-xs text-slate-400 line-through">${formatCurrency(p.oldPrice)}</span>` : ''}
                        <p class="text-lg font-extrabold text-slate-900">${formatCurrency(p.price)}</p>
                    </div>
                    <button onclick="addToCart(${p.id},event)" class="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl transition flex items-center justify-center">
                        <i data-lucide="plus" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
    if (!productsData.some(prod => prod.multiplo > 1)) {hide2(['curva']); }
}
function scrollCategories(distance) {
    document.getElementById('category-slider').scrollBy({ left: distance, behavior: 'smooth' });
}
// ==========================================
// MODAL DETALLES DEL PRODUCTO
// ==========================================
function openProductModal(id) {
    const product = productsData.find(p => p.id === id);
    if (!product) return;
    document.getElementById('modal-category').innerText = product.category;
    document.getElementById('modal-title').innerText = product.name;
    document.getElementById('modal-price').innerText = formatCurrency(product.price);
    document.getElementById('modal-description').innerText = product.description;
    const oldPriceEl = document.getElementById('modal-old-price');
    if (product.oldPrice) {
        oldPriceEl.innerText = formatCurrency(product.oldPrice);
        oldPriceEl.classList.remove('hidden');
    } else  oldPriceEl.classList.add('hidden');    
    document.getElementById('modal-main-img').src = product.images[0];
    const thumbsContainer = document.getElementById('modal-thumbnails');
    thumbsContainer.innerHTML = product.images.map((img) => `
        <button onclick="changeModalMainImg('${img}')" class="w-14 h-14 rounded-lg border border-gray-200 overflow-hidden shrink-0 hover:border-blue-600 transition">
            <img src="${img}" class="w-full h-full object-cover">
        </button>
    `).join('');
    const specsContainer = document.getElementById('modal-specs');
    specsContainer.innerHTML = product.specs.map(s => `<li>${s}</li>`).join('');
    const btn = document.getElementById('modal-add-btn');
    btn.onclick = () => {
        addToCart(product.id);
        closeProductModal();
    };
    const modal = document.getElementById('product-modal');
    const backdrop = document.getElementById('product-modal-backdrop');
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
}
function changeModalMainImg(src) {
    document.getElementById('modal-main-img').src = src;
}
function closeProductModal() {
    const modal = document.getElementById('product-modal');
    const backdrop = document.getElementById('product-modal-backdrop');
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
}
// ==========================================
// GESTIÓN DEL CARRITO CON SUBTOTAL POR ITEM
// ==========================================
function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-drawer-backdrop');
    drawer.classList.toggle('translate-x-full');
    backdrop.classList.toggle('opacity-0');
    backdrop.classList.toggle('pointer-events-none');
}
function addToCart(id, event) {
    const product = productsData.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    increment = product.multiplo || 1; // Si no tiene múltiplo, se asume 1
    if (existing) {
        existing.quantity += increment; // Incrementa la cantidad según el múltiplo
    } else {
        cart.push({ ...product, quantity: increment }); // Añade el producto con la cantidad inicial según el múltiplo
    }
    updateCartUI();
    //cambiar el color del botón de añadir al carrito para indicar que se ha añadido
    if (!event) {
        // buscar el btn de la card poduct para cambiarle el color 
        btn = document.querySelector(`.bg-blue-600[onclick="addToCart(${id},event)"]`);
    } else {
        btn = event.currentTarget;
    }
    //const btn = event.currentTarget;
    if (btn) {
        btn.classList.remove('bg-blue-500', 'hover:bg-blue-600');
        btn.classList.add('bg-green-500', 'hover:bg-green-600');
    }
    //toggleCart();
}
function updateQuantity(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }
    updateCartUI();
}
function updateCartUI() {
    const container = document.getElementById('cart-items');
    const emptyMsg = document.getElementById('empty-cart-msg');
    const countBadge = document.getElementById('cart-count');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    countBadge.innerText = totalItems;
    if (totalItems > 0) {
        countBadge.classList.remove('scale-0');
    } else {
        countBadge.classList.add('scale-0');
    }
    if (cart.length === 0) {
        container.innerHTML = '';
        container.appendChild(emptyMsg);
    } else {
        container.innerHTML = cart.map(item => {
            const itemSubtotal = item.price * item.quantity; // Cálculo de subtotal por producto
            return `
                <div class="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-gray-100">
                    <img src="${item.images[0]}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg bg-white shrink-0">
                    <div class="flex-grow">
                        <h4 class="font-bold text-sm text-slate-800 line-clamp-1">${item.name}</h4>
                        <p class="text-xs text-slate-400">Unit: ${formatCurrency(item.price)}</p>
                        <div class="flex items-center gap-2 mt-2">
                            <button onclick="updateQuantity(${item.id}, -1)" class="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center text-xs text-slate-600 font-bold hover:bg-slate-100">-</button>
                            <span class="text-xs font-bold w-4 text-center">${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, 1)" class="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center text-xs text-slate-600 font-bold hover:bg-slate-100">+</button>
                        </div>
                    </div>
                    <div class="flex flex-col items-end justify-between self-stretch py-0.5">
                        <button onclick="updateQuantity(${item.id}, -${item.quantity})" class="text-slate-400 hover:text-red-500 p-1 transition" title="Eliminar del carrito">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                        <div class="text-right">
                            <span class="text-[10px] text-slate-400 uppercase font-semibold block leading-none">Subtotal</span>
                            <span class="text-xs font-extrabold text-blue-600 leading-tight">${formatCurrency(itemSubtotal)}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        lucide.createIcons();
    }
    subtotalEl.innerText = formatCurrency(totalPrice);
    totalEl.innerText = formatCurrency(totalPrice);
}
// ==========================================
// CHECKOUT Y BOTONES AUXILIARES
// ==========================================
function checkoutWhatsApp() {
    if (cart.length === 0) return alert('Tu carrito está vacío');
    let message = "¡Hola! Quisiera realizar el siguiente pedido:\n\n";
    cart.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        message += `• ${item.name} x${item.quantity} = ${formatCurrency(itemSubtotal)}\n`;
    });
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    message += `\n*Total: ${formatCurrency(total)}*`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}
function setGridColumns(cols) {
    const grid = document.getElementById('products-grid');
    const btn1 = document.getElementById('btn-col-1');
    const btn2 = document.getElementById('btn-col-2');
    if (cols === 1) {
        grid.classList.remove('grid-cols-2');
        grid.classList.add('grid-cols-1');
        btn1.className = "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition bg-blue-50 text-blue-600 border border-blue-200";
        btn2.className = "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition text-slate-600 hover:bg-slate-100";
    } else {
        grid.classList.remove('grid-cols-1');
        grid.classList.add('grid-cols-2');
        btn2.className = "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition bg-blue-50 text-blue-600 border border-blue-200";
        btn1.className = "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition text-slate-600 hover:bg-slate-100";
    }
}
const btnBackToTop = document.getElementById('btn-back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        btnBackToTop.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
    } else {
        btnBackToTop.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
    }
});
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
// ==========================================
// CONTROL DEL MENÚ MÓVIL (HAMBURGUESA)
// ==========================================
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const backdrop = document.getElementById('mobile-menu-backdrop');
    if (!menu || !backdrop) return;
    // Alternar visibilidad del menú desplegable lateral
    menu.classList.toggle('translate-x-full');
    // Alternar visibilidad del fondo oscuro (overlay)
    backdrop.classList.toggle('opacity-0');
    backdrop.classList.toggle('pointer-events-none');
}