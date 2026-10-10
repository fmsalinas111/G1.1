<?php    $isLogged = (USR()>0)?true:false; ?>
<!-- === NAV=== -->
    <body class="bg-slate-100 text-slate-800 font-sans antialiased">
        <div id="sidebarOverlay" onclick="toggleMobileSidebar()" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 hidden md:hidden transition-opacity"></div>
        <div class="flex h-screen ">    
            <aside id="sidebar" class="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col transform -translate-x-full md:translate-x-0 md:static transition-transform duration-300 ease-in-out shrink-0">
                <div class="h-16 flex items-center justify-between px-6 bg-slate-950 font-bold text-xl border-b border-slate-800">
                    <div class="flex items-center">
                        <span class="text-blue-500 mr-2"><i class="fa-solid fa-cube"></i></span>
                        <span><?=STORE() ?></span><span class="text-xs text-blue-400 font-normal ml-1"></span>
                    </div>
                    <button onclick="toggleMobileSidebar()" class="md:hidden text-slate-400 hover:text-white p-1">
                        <i class="fa-solid fa-xmark text-xl"></i>
                    </button>
                </div>
                <?php if($isLogged){  include_once "navlogged2.php";
                }else{?>
                <p> desconectado </p>
                <nav class="p-4 space-y-2">
                    <a href="#inicio" class="menu-link block px-4 py-3 rounded-xl hover:bg-indigo-50">🏠 Inicio</a>
                    <a href="#quienes-somos" class="menu-link block px-4 py-3 rounded-xl hover:bg-indigo-50">👥 Quiénes somos</a>
                    <a href="#contacto" class="menu-link block px-4 py-3 rounded-xl hover:bg-indigo-50">📞 Contacto</a>
                    <a href="login" class="menu-link block px-4 py-3 rounded-xl hover:bg-indigo-50">🔐 Iniciar sesión</a>
                </nav>
                <?php }  ?>
                <div class="p-4 border-t border-slate-800 text-xs text-slate-400">
                    Sincronización activa <i class="fa-solid fa-circle text-emerald-500 text-[10px] ml-1"></i>
                </div>
            </aside>

            <div class="flex-1 flex flex-col h-full min-w-0 ">
                <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shrink-0">
                    <div class="flex items-center space-x-3">       
                        <button onclick="toggleMobileSidebar()" class="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none">
                            <i class="fa-solid fa-bars text-xl"></i>
                        </button>                        

                        <h1 class="text-base md:text-lg font-bold text-slate-800 truncate">
                            <span id="titpage"><?= $data['page_title'] ?></span>
                        </H1>
                    </div>
                    
                    <div class="flex items-center space-x-3">
                        <?php 
                        if (!in_array($data['page_name'], ['_dash', 'eco6'])) { ?>
                        <button onclick="abrirModal();"
                            class="px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-800 transition">
                            <i class="fa-solid fa-plus"></i> <span class=" sm:inline"></span>
                        </button>
                        <?php }?>
                        <?php if ($data['page_name']==='eco6') {?>
                        <button onclick="toggleCart()" class="relative p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition">                
                            <i data-lucide="shopping-cart" class="w-5 h-5"></i>
                            <span id="cart-count" class="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center scale-0 transition-transform">0</span>
                        </button>
                        <?php }?>
        
                        <!-- Contenedor del menú de usuario -->
                        <div class="relative inline-block text-left" id="user-menu-container">
                        <!-- Botón del avatar / nombre de usuario -->
                        <button type="button" id="user-menu-button" aria-expanded="false" aria-haspopup="true"
                            class="flex items-center gap-2 rounded-full bg-slate-100 p-1.5 px-3 text-sm 
                            font-semibold text-slate-800 hover:bg-slate-200 focus:outline-none focus:ring-2 
                            focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
                            <span id="un" class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-300 text-xs font-bold uppercase text-slate-700">
                                <?=USRNAME();?>
                            </span>
                            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <!-- Menú desplegable (Oculto por defecto) -->
                        <div 
                            id="user-menu-dropdown" class="hidden absolute right-0 z-50 mt-2 w-48 origin-top-right 
                                rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"  aria-orientation="vertical"  aria-labelledby="user-menu-button">
                            <a href="/g1/profile" class="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100" role="menuitem">
                                <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Mi Perfil
                            </a>
                            
                            <div class="my-1 border-t border-slate-100"></div>

                            <a href="logout" class="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50" role="menuitem">
                                <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Cerrar Sesión
                            </a>
                        </div>
                        </div>


                    </div>
                </header>
        <script>
            // Lógica para abrir/cerrar Menú en Teléfonos Android / Móviles
            function toggleMobileSidebar() {
                const sidebar = document.getElementById('sidebar');
                const overlay = document.getElementById('sidebarOverlay');
                sidebar.classList.toggle('-translate-x-full');
                overlay.classList.toggle('hidden');
            }

            // Lógica para cambiar entre Tabla y Tarjetas (Cards) dash
            function switchView(mode) {
                const tableView = _$('.vistatabla');
                const cardsView = _$('.vistatarjeta');
                const btnViewTable = _$('.btnViewTable');
                const btnViewCards = _$('.btnViewCards');
                 //console.log(mode, tableView, cardsView);

                if (mode === 'tabla') {
                    tableView.classList.remove('hidden');
                    cardsView.classList.add('hidden');
                    btnViewTable.className = "btnViewTable flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md bg-white text-slate-800 shadow-sm transition";
                    btnViewCards.className = "btnViewCards flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md text-slate-500 hover:text-slate-800 transition";
                } else if (mode === 'cards') {
                    cardsView.classList.remove('hidden');
                    tableView.classList.add('hidden');
                    btnViewCards.className = "btnViewCards flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md bg-white text-slate-800 shadow-sm transition";
                    btnViewTable.className = "btnViewTable flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md text-slate-500 hover:text-slate-800 transition";
                }
            }

            function abrirModal(id = null) {
                _$('#titleModal').innerText = id ? 'Editar' : 'Nuevo ';
                _$("#mainModal").classList.remove('hidden');
                fillModalForm(id);
            }
            function cerrarModal() { _$('#mainModal').classList.add('hidden');}             

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('user-menu-button');
  const dropdown = document.getElementById('user-menu-dropdown');

  if (!menuButton || !dropdown) return;

  function toggleMenu() {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !isExpanded);
    dropdown.classList.toggle('hidden');
  }

  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    dropdown.classList.add('hidden');
  }

  // Toggle al hacer clic en el botón
  menuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Cierra el menú al hacer clic fuera de él
  document.addEventListener('click', (e) => {
    if (!dropdown.classList.contains('hidden') && !menuButton.contains(e.target) && !dropdown.contains(e.target)) {
      closeMenu();
    }
  });

  // Cierra el menú al presionar la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !dropdown.classList.contains('hidden')) {
      closeMenu();
    }
  });
});


    </script>

<!-- === NAV END=== -->