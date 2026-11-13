                <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    <a href="<?=base_url().'dash'  ?>" class="flex items-center px-4 py-3 text-sm font-medium bg-blue-600 text-white rounded-lg">
                        <i class="fa-solid fa-chart-line w-6"></i> Dashboard
                    </a>
                    <a href="ssale" class="flex items-center px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition">
                        <i class="fa-solid fa-cash-register w-6"></i> Punto de Venta (POS)
                    </a>
                    <a href="<?=$_SESSION['page'];?>" class="flex items-center px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition">
                        <i class="fa-solid fa-store w-6"></i> Tienda Virtual  
                    </a>
                    <a href="<?= base_url().'prods' ?>" class="flex items-center px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition">
                        <i class="fa-solid fa-boxes-stacked w-6"></i> Productos
                    </a>
                    <a href="<?= base_url().'clprpames' ?>" class="flex items-center px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition">
                        <i class="fa-solid fa-wallet w-6"></i> Clientes
                    </a>                                    
                
                    <!-- Opción Con Sub-opciones:-->
                    <details class="group [&_summary::-webkit-details-marker]:hidden">
                        <summary class="flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition cursor-pointer select-none">
                            <div class="flex items-center">
                                <i class="fa-solid fa-database w-6"></i>
                                <span>  Datos</span>
                            </div>
                            <i class="fa-solid fa-chevron-down text-xs transition-transform duration-200 group-open:rotate-180"></i>
                        </summary>
                        <!-- Sub-opciones -->
                        <div class="pl-10 pr-2 py-2 space-y-1 bg-slate-950/40 rounded-b-lg mt-1">
                            <a href="<?=base_url().'daten'?>" onclick="setLS('dttp', 3)" class="block py-2 px-3 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-md transition">Categorías</a>
                            <a href="<?=base_url().'daten'?>" onclick="setLS('dttp',16)" class="block py-2 px-3 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-md transition">Colores</a>
                            <a href="<?=base_url().'daten'?>" onclick="setLS('dttp',1)" class="block py-2 px-3 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-md transition">
                                 Marcas</a>
                        </div>
                    </details>
                    
                    <a  href="<?= base_url().'mydata' ?>" class="flex items-center px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition">
                        <i class="fa-solid fa-users-gear w-6"></i> Mis Datos
                    </a>

                </nav>
