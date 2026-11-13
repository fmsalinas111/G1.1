<?php
   headerAdmin2($data); 
   //getModal('_cat',$data);  miniModal

?>

<main class="flex-1 p-4 md:p-6 space-y-6">
    <div class="max-w-4xl mx-auto p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-xl border border-slate-800">        
        <div class="mb-6 border-b border-slate-800 pb-4">
            <h2 class="text-xl font-bold text-white flex items-center gap-2">
                <i class="fa-solid fa-bars-staggered text-indigo-400"></i> Personaliza el Menú de tu Empresa
                (<?= CO() ?>)
            </h2>
            <p class="text-sm text-slate-400">Activa, desactiva o reordena las secciones que aparecerán en la barra lateral de tu sistema.</p>
        </div>

        <!-- Lista de Opciones del Menú (Interactiva) -->
        <div id="listaMenuVisual" class="space-y-3 mb-6">
            <p>lista de elementos del menuCo</p>
            <?php
                $menuCo = json_decode($_SESSION['menuApp'], true);                
                foreach ($menuCo as $m) {
                    echo '
                        <div class="flex items-center justify-between p-4 bg-slate-950/60 border border-slate-800 rounded-2xl shadow-sm hover:border-slate-700 transition" data-view="dash">
                            <div class="flex items-center gap-3">
                                <i class="fa-solid fa-grip-vertical text-slate-600 cursor-move"></i>
                                <div class="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                                    <i class="' . $m['icon'] . '"></i>
                                </div>
                                <div>
                                    <h4 class="text-sm font-semibold text-slate-200">'.$m['text'].'</h4>
                                    <span class="text-xs text-slate-500">Vista principal de métricas</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <!-- Selector amigable de Nombre Personalizado -->
                                <input type="text" value="'.$m['text'].'" class="bg-slate-900 border border-slate-800 text-xs px-3 py-1.5 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500" placeholder="Nombre visible">
                                <!-- Interruptor (Switch) moderno -->
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked class="sr-only peer toggle-item">
                                    <div class="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white 
                                    after:content-['."''".'] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                </label>
                            </div>
                        </div>
                    ';
                }
            ?>

            <hr>
            <!-- Elemento 1: Dashboard -->
            <div class="flex items-center justify-between p-4 bg-slate-950/60 border border-slate-800 rounded-2xl shadow-sm hover:border-slate-700 transition" data-view="dash">
                <div class="flex items-center gap-3">
                    <i class="fa-solid fa-grip-vertical text-slate-600 cursor-move"></i>
                    <div class="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                        <i class="fa-solid fa-chart-line"></i>
                    </div>
                    <div>
                        <h4 class="text-sm font-semibold text-slate-200">Dashboard</h4>
                        <span class="text-xs text-slate-500">Vista principal de métricas</span>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <!-- Selector amigable de Nombre Personalizado -->
                    <input type="text" value="Dashboard" class="bg-slate-900 border border-slate-800 text-xs px-3 py-1.5 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500" placeholder="Nombre visible">
                    <!-- Interruptor (Switch) moderno -->
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked class="sr-only peer toggle-item">
                        <div class="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                </div>
            </div>

            <!-- Elemento 2: Punto de Venta -->
            <div class="flex items-center justify-between p-4 bg-slate-950/60 border border-slate-800 rounded-2xl shadow-sm hover:border-slate-700 transition" data-view="ssale">
                <div class="flex items-center gap-3">
                    <i class="fa-solid fa-grip-vertical text-slate-600 cursor-move"></i>
                    <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <i class="fa-solid fa-cash-register"></i>
                    </div>
                    <div>
                        <h4 class="text-sm font-semibold text-slate-200">Punto de Venta (POS)</h4>
                        <span class="text-xs text-slate-500">Módulo de cobros y caja</span>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <input type="text" value="Punto de Venta (POS)" class="bg-slate-900 border border-slate-800 text-xs px-3 py-1.5 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500">
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked class="sr-only peer toggle-item">
                        <div class="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                </div>
            </div>

        </div>

        <!-- Botón de Guardado amigable -->
        <div class="flex justify-end">
            <button onclick="generarYGuardarMenu()" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-2xl transition shadow-lg shadow-indigo-600/20 flex items-center gap-2">
                <i class="fa-solid fa-check"></i>
                <span>Guardar Configuración</span>
            </button>
        </div>

    </div>

</main>

<?php   footerAdmin2($data); ?>
