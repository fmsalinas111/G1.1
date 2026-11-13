    <?php 
          echo base_url();

    ?>

<!DOCTYPE html>
<html lang="es" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestion de Alquileres</title>
    
    <!-- Tailwind CSS v4 Browser CDN -->
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    
    <!-- Configuración del Tema para Tailwind CSS v4 -->
    <style>
        @theme {
            --color-brand-50: #eff6ff;
            --color-brand-100: #dbeafe;
            --color-brand-500: #3b82f6;
            --color-brand-600: #2563eb;
            --color-brand-700: #1d4ed8;
            --color-brand-900: #1e3a8a;
        }
    </style>

    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            50: '#eff6ff',
                            100: '#dbeafe',
                            500: '#3b82f6',
                            600: '#2563eb',
                            700: '#1d4ed8',
                            900: '#1e3a8a',
                        }
                    }
                }
            }
        }
    </script>

    <!-- FontAwesome para iconos -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="shortcut icon" type="image/x-icon" href="./favicon.ico">
</head>
<body class="bg-slate-50 text-slate-800 antialiased font-sans">

    <!-- HEADER / NAVBAR -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            
            <!-- LOGO -->
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md shadow-brand-500/20">
                    G
                </div>
                <span class="text-2xl font-black tracking-tight text-slate-900">Alquilando<span class="text-brand-600">  </span></span>
            </div>
            
            <!-- NAVEGACIÓN DESKTOP -->
            <nav class="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
                <a href="#caracteristicas" class="hover:text-brand-600 transition">Características</a>
                <a href="#beneficios" class="hover:text-brand-600 transition">Ventajas</a>
                <a href="#planes" class="hover:text-brand-600 transition">Planes</a>
                <a href="#registro" class="hover:text-brand-600 transition">Crear Cuenta</a>
            </nav>

            <!-- BOTÓN DESKTOP -->
            <div class="hidden md:flex items-center space-x-4">
                <a href="login" class="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-lg shadow-brand-600/20 transition">
                    Iniciar sesión
                </a>
            </div>

            <!-- BOTÓN MENÚ HAMBURGUESA (MOBILE) -->
            <div class="flex md:hidden items-center">
                <button id="mobile-menu-btn" type="button" class="p-2 text-slate-600 hover:text-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg" aria-label="Abrir menú">
                    <i id="menu-icon" class="fa-solid fa-bars text-2xl"></i>
                </button>
            </div>
        </div>

        <!-- MENÚ DESPLEGABLE MOBILE -->
        <div id="mobile-menu" class="hidden md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
            <a href="#caracteristicas" class="mobile-link block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50 transition">Características</a>
            <a href="#beneficios" class="mobile-link block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50 transition">Ventajas</a>
            <a href="#planes" class="mobile-link block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50 transition">Planes</a>
            <a href="#registro" class="mobile-link block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50 transition">Crear Cuenta</a>
            <div class="pt-2">
                <a href="login" class="mobile-link block w-full text-center px-5 py-3 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-lg shadow-brand-600/20 transition">
                    Iniciar sesión
                </a>
            </div>
        </div>
    </header>

    <!-- HERO SECTION -->
    <section class="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-brand-50/50 via-white to-white overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
                    <div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold uppercase tracking-wider">
                        <i class="fa-solid fa-sparkles text-brand-600"></i>
                        <span>La evolución en gestión inmobiliaria</span>
                    </div>
                    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                        Administrá tus alquileres <span class="text-brand-600 underline decoration-brand-200 decoration-wavy">sin estrés ni complicaciones</span>
                    </h1>
                    <p class="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0">
                        Centralizá inquilinos, contratos, cobros y reportes en una sola plataforma moderna diseñada para hacer crecer tu negocio inmobiliario.
                    </p>
                    <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                        <a href="#registro" class="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xl shadow-brand-600/30 transition text-center flex items-center justify-center space-x-2">
                            <span>Crear cuenta gratis</span>
                            <i class="fa-solid fa-arrow-right text-sm"></i>
                        </a>
                        <a href="#caracteristicas" class="w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition text-center">
                            Conocer funciones
                        </a>
                    </div>
                </div>
                <!-- Mockup / Visual -->
                <div class="lg:col-span-5 relative">
                    <div class="relative mx-auto max-w-md bg-slate-900 rounded-3xl shadow-2xl p-4 border border-slate-800">
                        <div class="bg-slate-800 rounded-2xl p-4 text-white space-y-4">
                            <div class="flex items-center justify-between border-b border-slate-700 pb-3">
                                <div class="flex items-center space-x-2">
                                    <div class="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <span class="text-xs text-slate-400 font-mono">gen.com.ar/panel</span>
                            </div>
                            <div class="space-y-3">
                                <div class="bg-slate-700/50 p-3 rounded-xl flex items-center justify-between">
                                    <div>
                                        <p class="text-xs text-slate-400">Cobros del Mes</p>
                                        <p class="text-lg font-bold text-emerald-400">$ 4.250.000</p>
                                    </div>
                                    <i class="fa-solid fa-chart-line text-2xl text-emerald-400"></i>
                                </div>
                                <div class="grid grid-cols-2 gap-2">
                                    <div class="bg-slate-700/30 p-3 rounded-xl">
                                        <p class="text-xs text-slate-400">Inmuebles</p>
                                        <p class="text-base font-bold">24 Activos</p>
                                    </div>
                                    <div class="bg-slate-700/30 p-3 rounded-xl">
                                        <p class="text-xs text-slate-400">Contratos</p>
                                        <p class="text-base font-bold">Por vencer (2)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CARACTERÍSTICAS PRINCIPALES -->
    <section id="caracteristicas" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-3xl mx-auto space-y-4 mb-16">
                <h2 class="text-xs font-bold text-brand-600 uppercase tracking-widest">Características principales</h2>
                <p class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Todo lo que necesitás para el control total</p>
                <p class="text-slate-600 text-lg">Herramientas diseñadas a la medida de tus necesidades de administración.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Inquilinos -->
                <div class="bg-slate-50 hover:bg-brand-50/40 p-8 rounded-3xl border border-slate-100 transition group">
                    <div class="w-14 h-14 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center text-xl font-bold mb-6 group-hover:scale-110 transition">
                        <i class="fa-solid fa-users"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">Registro de Inquilinos</h3>
                    <p class="text-slate-600">Base de datos completa con datos de contacto, garantes, historial de alquileres y antecedentes centralizados.</p>
                </div>

                <!-- Inmuebles -->
                <div class="bg-slate-50 hover:bg-brand-50/40 p-8 rounded-3xl border border-slate-100 transition group">
                    <div class="w-14 h-14 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center text-xl font-bold mb-6 group-hover:scale-110 transition">
                        <i class="fa-solid fa-building"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">Inmuebles y Unidades</h3>
                    <p class="text-slate-600">Organiza propiedades, estados de ocupación, direcciones, comodidades e inventarios detallados por unidad.</p>
                </div>

                <!-- Contratos -->
                <div class="bg-slate-50 hover:bg-brand-50/40 p-8 rounded-3xl border border-slate-100 transition group">
                    <div class="w-14 h-14 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center text-xl font-bold mb-6 group-hover:scale-110 transition">
                        <i class="fa-solid fa-file-contract"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">Gestión de Contratos</h3>
                    <p class="text-slate-600">Control de plazos, actualizaciones de valor, cláusulas especiales y alertas automáticas de vencimiento.</p>
                </div>

                <!-- Cobranzas -->
                <div class="bg-slate-50 hover:bg-brand-50/40 p-8 rounded-3xl border border-slate-100 transition group">
                    <div class="w-14 h-14 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center text-xl font-bold mb-6 group-hover:scale-110 transition">
                        <i class="fa-solid fa-wallet"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">Cobranzas y Pagos</h3>
                    <p class="text-slate-600">Registro diario de ingresos, seguimiento de morosidad, emisión de recibos y control de cuentas corrientes.</p>
                </div>

                <!-- Reportes -->
                <div class="bg-slate-50 hover:bg-brand-50/40 p-8 rounded-3xl border border-slate-100 transition group">
                    <div class="w-14 h-14 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center text-xl font-bold mb-6 group-hover:scale-110 transition">
                        <i class="fa-solid fa-chart-pie"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">Reportes Financieros</h3>
                    <p class="text-slate-600">Informes claros de recaudación, rentabilidad por propiedad, gastos y flujos de caja listos para exportar.</p>
                </div>

                <!-- Multi-plataforma -->
                <div class="bg-slate-50 hover:bg-brand-50/40 p-8 rounded-3xl border border-slate-100 transition group">
                    <div class="w-14 h-14 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center text-xl font-bold mb-6 group-hover:scale-110 transition">
                        <i class="fa-solid fa-shield-halved"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">Seguridad y Respaldo</h3>
                    <p class="text-slate-600">Tus datos protegidos y disponibles en la nube las 24 horas, accesibles desde cualquier dispositivo.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- SECCIÓN DE REGISTRO -->
    <section id="registro" class="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div class="absolute -top-40 -left-40 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 sm:p-12 shadow-2xl">
                <div class="text-center max-w-xl mx-auto mb-10 space-y-3">
                    <h2 class="text-3xl font-black tracking-tight">Comenzá a usar Gestionando</h2>
                    <p class="text-slate-400 text-sm sm:text-base">Creá tu cuenta en menos de 2 minutos y optimiza la administración de tus propiedades.</p>
                </div>

                <form class="space-y-6" onsubmit="event.preventDefault(); registrar();">
                    <input id="app" style="display: none;" value=2/>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label for="inputLastName" class="block text-sm font-semibold text-slate-300">Nombre de Usuario o Inmobiliaria</label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                                    <i class="fa-solid fa-user"></i>
                                </span>
                                <input type="text" id="inputLastName" required placeholder="Ej: Juan Pérez" class="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition">
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label for="inputEmailAddress" class="block text-sm font-semibold text-slate-300">Correo Electrónico</label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                                    <i class="fa-solid fa-envelope"></i>
                                </span>
                                <input type="email" id="inputEmailAddress" required placeholder="correo@ejemplo.com" class="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition">
                            </div>
                        </div>
                    </div>

                    <input type="email" id="cellNumber" class="hidden">

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label for="inputPassword" class="block text-sm font-semibold text-slate-300">Contraseña</label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                                    <i class="fa-solid fa-lock"></i>
                                </span>
                                <input type="password" id="inputPassword" required placeholder="••••••••" class="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition">
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label for="inputConfirmPassword" class="block text-sm font-semibold text-slate-300">Confirmar Contraseña</label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                                    <i class="fa-solid fa-lock"></i>
                                </span>
                                <input type="password" id="inputConfirmPassword" required placeholder="••••••••" class="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition">
                            </div>
                        </div>
                    </div>

                    <div class="flex items-start space-x-3 pt-2">
                        <input id="inlineFormCheck" type="checkbox" required class="mt-1 w-4 h-4 text-brand-600 bg-slate-900 border-slate-700 rounded focus:ring-brand-500 focus:ring-offset-slate-800">
                        <label for="inlineFormCheck" class="text-sm text-slate-300 cursor-pointer">
                            He leído y acepto los <a href="terms_conditions" class="text-brand-400 hover:underline">términos, condiciones</a> y política de privacidad de la plataforma.
                        </label>
                    </div>

                    <button type="submit" class="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg shadow-brand-600/30 transition flex items-center justify-center space-x-2">
                        <span>Crear mi cuenta ahora</span>
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </form>
                <div id="alert1" class="hidden alert " role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true"onclick="closeAlert()">&times;</span></button>
                    <strong>Mensaje: </strong> <span id="mensaje">Acceso correcto</span>
                </div>

            </div>
        </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-white border-t border-slate-200 py-12 text-slate-600 text-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    G
                </div>
                <span class="font-bold text-slate-900">Gestionando</span>
            </div>
            <p>© 2026 Gestionando. Todos los derechos reservados.</p>
            <div class="flex space-x-6 text-slate-400">
                <a href="#" class="hover:text-brand-600 transition"><i class="fa-brands fa-twitter text-lg"></i></a>
                <a href="#" class="hover:text-brand-600 transition"><i class="fa-brands fa-linkedin text-lg"></i></a>
                <a href="#" class="hover:text-brand-600 transition"><i class="fa-brands fa-github text-lg"></i></a>
            </div>
        </div>
    </footer>

    <!-- SCRIPT DE NAVEGACIÓN MOBILE -->
    <script>
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        const icon = document.getElementById('menu-icon');
        const links = document.querySelectorAll('.mobile-link');

        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
            if (menu.classList.contains('hidden')) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            }
        });

        // Cierra el menú al hacer clic en cualquier enlace
        links.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    </script>
        <?php 
      
      
        echo'
          <script>
            const base_url = "'.base_url().'";
          </script>';   
    ?>

    <script src="<?=media(); ?>/js/sign.js"></script>

</body>
</html>