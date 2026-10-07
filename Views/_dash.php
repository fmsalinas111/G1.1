<?php   headerAdmin2($data); ?>

            <main class="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">                
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ventas de Hoy</p>
                        <h3 class="text-2xl font-bold text-slate-800 mt-1">$ 125 400</h3>
                        <p class="text-xs text-emerald-600 mt-2 font-medium"><i class="fa-solid fa-arrow-up"></i> +12% vs. ayer</p>
                    </div>
                    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pedidos Tienda Web</p>
                        <h3 class="text-2xl font-bold text-slate-800 mt-1">18</h3>
                        <p class="text-xs text-slate-500 mt-2">Sincronizado vía WhatsApp</p>
                    </div>
                    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Stock Crítico</p>
                        <h3 class="text-2xl font-bold text-amber-600 mt-1">4 Artículos</h3>
                        <p class="text-xs text-amber-600 mt-2 font-medium">Requiere reorden inmediata</p>
                    </div>
                    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Saldo Cuentas Corrientes</p>
                        <h3 class="text-2xl font-bold text-slate-800 mt-1">$ 48 900</h3>
                        <p class="text-xs text-slate-500 mt-2">Cobros pendientes</p>
                    </div>
                </div>

                <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 md:p-6">
                    
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <h2 class="text-base font-bold text-slate-800">Últimas Transacciones Registradas</h2>
                        
                        <div class="inline-flex rounded-lg border border-slate-200 p-1 bg-slate-50 self-start sm:self-auto">
                            <button id="btnViewTable" onclick="switchView('table')" class="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md bg-white text-slate-800 shadow-sm transition">
                                <i class="fa-solid fa-table-cells"></i> Tabla
                            </button>
                            <button id="btnViewCards" onclick="switchView('cards')" class="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md text-slate-500 hover:text-slate-800 transition">
                                <i class="fa-solid fa-address-card"></i> Tarjetas
                            </button>
                        </div>
                    </div>

                    <div id="tableView" class="overflow-x-auto">
                        <table class="w-full text-left text-sm text-slate-600">
                            <thead class="bg-slate-50 text-xs font-semibold uppercase text-slate-400 border-b">
                                <tr>
                                    <th class="py-3 px-4">Origen</th>
                                    <th class="py-3 px-4">Cliente / Referencia</th>
                                    <th class="py-3 px-4">Estado</th>
                                    <th class="py-3 px-4 text-right">Monto</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                <tr>
                                    <td class="py-3 px-4"><span class="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-medium">POS Local</span></td>
                                    <td class="py-3 px-4 font-medium text-slate-800">Consumidor Final</td>
                                    <td class="py-3 px-4 text-slate-500">Completado</td>
                                    <td class="py-3 px-4 text-right font-semibold text-slate-800">$ 14 200</td>
                                </tr>
                                <tr>
                                    <td class="py-3 px-4"><span class="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-xs font-medium">Tienda Web</span></td>
                                    <td class="py-3 px-4 font-medium text-slate-800">Pedido #1024 (WhatsApp)</td>
                                    <td class="py-3 px-4 text-amber-600 font-medium">Pendiente de pago</td>
                                    <td class="py-3 px-4 text-right font-semibold text-slate-800">$ 8 500</td>
                                </tr>
                                <tr>
                                    <td class="py-3 px-4"><span class="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full text-xs font-medium">Cta. Corriente</span></td>
                                    <td class="py-3 px-4 font-medium text-slate-800">Cliente Frecuente</td>
                                    <td class="py-3 px-4 text-slate-500">Abonado a cuenta</td>
                                    <td class="py-3 px-4 text-right font-semibold text-slate-800">$ 25 000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div id="cardsView" class="hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div class="border border-slate-200 rounded-lg p-4 bg-slate-50/50 flex flex-col justify-between space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-medium">POS Local</span>
                                <span class="text-xs text-slate-400">Completado</span>
                            </div>
                            <div>
                                <p class="text-xs text-slate-400">Cliente / Referencia</p>
                                <p class="font-semibold text-slate-800 text-sm">Consumidor Final</p>
                            </div>
                            <div class="border-t border-slate-200 pt-2 flex items-center justify-between">
                                <span class="text-xs font-semibold text-slate-400">Total</span>
                                <span class="font-bold text-slate-800 text-base">$ 14 200</span>
                            </div>
                        </div>

                        <div class="border border-slate-200 rounded-lg p-4 bg-slate-50/50 flex flex-col justify-between space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-xs font-medium">Tienda Web</span>
                                <span class="text-xs font-medium text-amber-600">Pendiente de pago</span>
                            </div>
                            <div>
                                <p class="text-xs text-slate-400">Cliente / Referencia</p>
                                <p class="font-semibold text-slate-800 text-sm">Pedido #1024 (WhatsApp)</p>
                            </div>
                            <div class="border-t border-slate-200 pt-2 flex items-center justify-between">
                                <span class="text-xs font-semibold text-slate-400">Total</span>
                                <span class="font-bold text-slate-800 text-base">$ 8 500</span>
                            </div>
                        </div>

                        <div class="border border-slate-200 rounded-lg p-4 bg-slate-50/50 flex flex-col justify-between space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full text-xs font-medium">Cta. Corriente</span>
                                <span class="text-xs text-slate-400">Abonado a cuenta</span>
                            </div>
                            <div>
                                <p class="text-xs text-slate-400">Cliente / Referencia</p>
                                <p class="font-semibold text-slate-800 text-sm">Cliente Frecuente</p>
                            </div>
                            <div class="border-t border-slate-200 pt-2 flex items-center justify-between">
                                <span class="text-xs font-semibold text-slate-400">Total</span>
                                <span class="font-bold text-slate-800 text-base">$ 25 000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            
        </div>
    </div>

</body>
</html>
