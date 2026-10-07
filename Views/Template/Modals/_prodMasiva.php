
              <div id="modalEdicionMasiva" class="fixed inset-0 bg-black/50 z-50 hidden flex items-center justify-center p-4">
                <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
                  
                  <div class="flex justify-between items-center border-b pb-3">
                    <h3 class="text-lg font-bold text-gray-800">Edición Masiva de Productos</h3>
                    <button  onclick="toggleModal('modalEdicionMasiva')" class="text-gray-400 hover:text-gray-600"><i class="fa-solid fa-xmark text-xl"></i></button>
                  </div>

                  <div class="space-y-4">
                    <div>
                      <label class="block text-xs font-semibold text-gray-600 uppercase mb-1">Aplicar a:</label>
                      <select class="w-full border-gray-200 border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500">
                        <option>Todos los productos</option>
                        <option>Solo Categoría: Ferretería</option>
                        <option>Solo Proveedor: Distribuidora Central</option>
                      </select>
                    </div>

                    <div class="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 space-y-3">
                      <label class="block text-xs font-bold text-indigo-900 uppercase">Actualización de Precios</label>
                      <div class="grid grid-cols-2 gap-2">
                        <select class="border-gray-200 border rounded-lg p-2 text-sm">
                          <option>Aumentar Precio Lista (%)</option>
                          <option>Descontar Precio Lista (%)</option>
                          <option>Fijar Margen de Ganancia (%)</option>
                        </select>
                        <input type="number" placeholder="Ej: 15" class="border-gray-200 border rounded-lg p-2 text-sm">
                      </div>
                    </div>

                    <div>
                      <label class="block text-xs font-semibold text-gray-600 uppercase mb-1">Cambiar Visibilidad o Estado:</label>
                      <div class="space-y-2">
                        <label class="flex items-center gap-2 text-sm text-gray-700">
                          <input type="checkbox" class="rounded text-indigo-600 focus:ring-indigo-500">
                          Marcar como "Invisibles en Tienda Virtual"
                        </label>
                        <label class="flex items-center gap-2 text-sm text-gray-700">
                          <input type="checkbox" class="rounded text-indigo-600 focus:ring-indigo-500">
                          Activar envío gratis masivo
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="flex justify-end gap-3 pt-3 border-t">
                    <button onclick="toggleModal('modalEdicionMasiva')" class="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancelar</button>
                    <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition shadow-sm">Aplicar Cambios Masivos</button>
                  </div>

                </div>
              </div>