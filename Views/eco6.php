<?php      headerAdmin2($data); ?>
    <script src="https://unpkg.com/lucide@latest"></script>
    <script> 
        const neg = "<?=$data['page_idCo'];?>";    
        const phone = "<?=$data['page_wsp']; ?>";    
        const logged = (!parseInt(<?=USR(); ?>)==0);    
    </script>
    <!-- <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">         -->
    <main class="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">                
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
            <div>
                <h1 class="text-2xl font-extrabold text-slate-800">Catálogo</h1>
                <p class="text-sm text-slate-500">Explora nuestras últimas novedades y ofertas.</p>
            </div>
            <div class="gridcols flex items-center justify-between sm:justify-end gap-3 bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm self-start sm:self-auto w-full sm:w-auto">
                <span class="text-xs font-semibold text-slate-500 px-2 sm:hidden">Vista en móvil:</span>
                <div class="flex items-center gap-1">
                    <button id="btn-col-1" onclick="setGridColumns(1)" title="1 Columna" class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition bg-blue-50 text-blue-600 border border-blue-200">
                        <i data-lucide="square" class="w-4 h-4"></i>
                        <span class="hidden sm:inline">1 Columna</span>
                    </button>
                    <button id="btn-col-2" onclick="setGridColumns(2)" title="2 Columnas" class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition text-slate-600 hover:bg-slate-100">
                        <i data-lucide="grid-2x2" class="w-4 h-4"></i>
                        <span class="hidden sm:inline">2 Columnas</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="relative group catsubcat">
            <button onclick="scrollCategories(-200)" class="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 bg-white shadow-md border border-gray-200 rounded-full p-2 text-slate-600 hover:text-blue-600 transition">
                <i data-lucide="chevron-left" class="w-4 h-4"></i>
            </button>
            <div id="category-slider" class="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth py-1">
                <button onclick="filterCategory('todos')" class="cat-btn active whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 bg-blue-600 text-white shadow-md shadow-blue-600/20">
                    <i data-lucide="layers" class="w-4 h-4"></i> Todos
                </button>
                <button onclick="filterCategory('calzado')" class="cat-btn whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 bg-white text-slate-600 border border-gray-200 hover:bg-slate-50">
                    <i data-lucide="footprints" class="w-4 h-4"></i> Calzado
                </button>
                <button onclick="filterCategory('audio')" class="cat-btn whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 bg-white text-slate-600 border border-gray-200 hover:bg-slate-50">
                    <i data-lucide="headphones" class="w-4 h-4"></i> Audio
                </button>
                <button onclick="filterCategory('gadgets')" class="cat-btn whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 bg-white text-slate-600 border border-gray-200 hover:bg-slate-50">
                    <i data-lucide="watch" class="w-4 h-4"></i> Gadgets
                </button>
                <button onclick="filterCategory('accesorios')" class="cat-btn whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 bg-white text-slate-600 border border-gray-200 hover:bg-slate-50">
                    <i data-lucide="briefcase" class="w-4 h-4"></i> Accesorios
                </button>
            </div>
            <button onclick="scrollCategories(200)" class="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 bg-white shadow-md border border-gray-200 rounded-full p-2 text-slate-600 hover:text-blue-600 transition">
                <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </button>
        </div>
        <div class="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 subcats hidden">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">Subcategorías:</span>
            <button onclick="filterSubcategory('todos')" class="subcat-btn text-xs font-medium px-3 py-1 rounded-full bg-slate-800 text-white transition shrink-0">Todas</button>
            <button onclick="filterSubcategory('deportivo')" class="subcat-btn text-xs font-medium px-3 py-1 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition shrink-0">Deportivo</button>
            <button onclick="filterSubcategory('urbano')" class="subcat-btn text-xs font-medium px-3 py-1 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition shrink-0">Urbano</button>
            <button onclick="filterSubcategory('premium')" class="subcat-btn text-xs font-medium px-3 py-1 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition shrink-0">Premium</button>
        </div>
        <div id="products-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-all duration-300">
        </div>  
        <!-- FOOTER ULTRA COMPACTO (Sencillo y elegante) -->
<footer class="bg-white border-t border-slate-100 py-6 mt-16 text-center text-xs text-slate-500">
    <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>&copy; 2026 TuTienda.Derechos reservados.</p>
        <div class="flex items-center gap-4">
            <a href="aboutus" class="hover:underline">Quiénes Somos</a>
            <a href="<?=base_url().'contact'?>" class="hover:underline">Contacto</a>
            <a href="#privacidad" class="hover:underline">Privacidad</a>
        </div>
    </div>
</footer>
    </main>
    <div id="product-modal-backdrop" onclick="closeProductModal()" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 opacity-0 pointer-events-none transition-opacity duration-300"></div>
    <div id="product-modal" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-white rounded-2xl shadow-2xl z-50 opacity-0 pointer-events-none scale-95 transition-all duration-300 overflow-hidden max-h-[90vh] flex flex-col">
        <div class="p-4 border-b border-gray-100 flex items-center justify-between bg-slate-50">
            <h3 id="modal-category" class="text-xs font-bold uppercase tracking-wider text-blue-600">Categoría</h3>
            <button onclick="closeProductModal()" class="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>
        <div class="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-3">
                <div class="aspect-square rounded-xl bg-gray-100 overflow-hidden border border-gray-200">
                    <img id="modal-main-img" src="" alt="Producto" class="w-full h-full object-cover">
                </div>
                <div id="modal-thumbnails" class="flex gap-2 overflow-x-auto pb-1">
                    </div>
            </div>
            <div class="flex flex-col justify-between space-y-4">
                <div>
                    <h2 id="modal-title" class="text-2xl font-bold text-slate-900 leading-tight">Título del Producto</h2>
                    <div class="flex items-center gap-2 mt-2">
                        <span id="modal-price" class="text-2xl font-extrabold text-blue-600">$0.00</span>
                        <span id="modal-old-price" class="text-sm text-slate-400 line-through hidden">$0.00</span>
                    </div>
                    <p id="modal-description" class="text-sm text-slate-600 mt-4 leading-relaxed">
                        Descripción detallada del producto.
                    </p>
                    <div class="mt-4 pt-4 border-t border-gray-100">
                        <h4 class="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Especificaciones:</h4>
                        <ul id="modal-specs" class="text-xs text-slate-600 space-y-1 list-disc list-inside">
                            </ul>
                    </div>
                </div>
                <button id="modal-add-btn" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-600/20 transition flex items-center justify-center gap-2">
                    <i data-lucide="shopping-cart" class="w-5 h-5"></i>
                    Añadir al carrito
                </button>
            </div>
        </div>
    </div>
    <div id="cart-drawer-backdrop" onclick="toggleCart()" class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 opacity-0 pointer-events-none transition-opacity duration-300"></div>
    <aside id="cart-drawer" class="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col">
        <div class="p-4 border-b border-gray-100 flex items-center justify-between bg-slate-50">
            <div class="flex items-center gap-2">
                <i data-lucide="shopping-bag" class="w-5 h-5 text-blue-600"></i>
                <h2 class="font-bold text-lg text-slate-800">Tu Carrito</h2>
            </div>
            <button onclick="toggleCart()" class="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>
        <div id="cart-items" class="flex-grow overflow-y-auto p-4 space-y-4">
            <div id="empty-cart-msg" class="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <i data-lucide="shopping-cart" class="w-16 h-16 stroke-1 mb-3"></i>
                <p class="text-base font-semibold text-slate-600">Tu carrito está vacío</p>
                <p class="text-xs mt-1">¡Agrega algunos productos para comenzar!</p>
            </div>
        </div>
        <div class="p-4 border-t border-gray-100 bg-slate-50 space-y-3">
            <div class="flex items-center justify-between text-slate-600 text-sm">
                <span>Subtotal</span>
                <span id="cart-subtotal" class="font-semibold text-slate-900">$0.00</span>
            </div>
            <div class="flex items-center justify-between text-slate-900 font-extrabold text-lg">
                <span>Total</span>
                <span id="cart-total" class="text-blue-600">$0.00</span>
            </div>
            <button onclick="checkoutWhatsApp()" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2">
                <i data-lucide="message-circle" class="w-5 h-5"></i>
                Finalizar pedido por WhatsApp
            </button>
        </div>
    </aside>
    <div class="fixed bottom-5 right-5 z-40 flex flex-col gap-3 items-end">
        <button id="btn-back-to-top" onclick="scrollToTop()" class="opacity-0 translate-y-4 pointer-events-none transition-all duration-300 bg-slate-800 hover:bg-slate-900 text-white p-3 rounded-full shadow-lg border border-slate-700">
            <i data-lucide="arrow-up" class="w-5 h-5"></i>
        </button>
        <a href="https://wa.me/<?=$data['page_wsp']; ?>?text=Hola,%quiero%20hacer%20una%20consulta." target="_blank" rel="noopener noreferrer" title="Consultar por WhatsApp" class="bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-xl shadow-emerald-500/30 transition transform hover:scale-110 flex items-center justify-center">
            <i data-lucide="message-circle" class="w-6 h-6"></i>
        </a>
    </div>
    <?php  footerAdmin2($data); ?>
    