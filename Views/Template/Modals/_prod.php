<!-- MODAL DE CREACIÓN / EDICIÓN DE PRODUCTO -->
              <div id="modalProductos" class="hidden fixed inset-0 bg-black/60 z-50  flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
                <div class="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">    
                  <!-- Header del Modal -->
                  <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                      <h3 id="modalProductoTitulo" class="text-lg font-bold text-gray-800">Agregar Producto</h3>
                      <!--<p class="text-xs text-gray-500">Datos y fotografías</p>                      -->
                    </div>
                    <button onclick="cerrarModalProducto()" class="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition">
                      <i class="fa-solid fa-xmark text-xl"></i>
                    </button>
                  </div>

                  <!-- Cuerpo con Scroll Interno -->
                  <form id="formProducto" onsubmit="guardarProducto(event)" class="p-6 overflow-y-auto space-y-6 flex-1">
                    <input name="c" type="hidden" id="productoId" name="id" value="" >
                    <!-- Sección 1: Datos Principales -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div class="sm:col-span-2">
                        <label class="block text-xs font-semibold text-gray-700 uppercase ">Nombre del Producto *</label>
                        <input name ="c" type="text" id="prodNombre" required placeholder="Ej: Taladro Percutor 13mm 750W" 
                              class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                      </div>
                      <div>
                        <label class="block text-xs font-semibold text-gray-700 uppercase ">Código / SKU</label>
                        <input name ="c" type="text" id="prodSku" placeholder="FER-9982" 
                              class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                      </div>
                    </div>

                    <!-- Sección 2: Precios, Stock y Categoría -->
                  <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
                      <!-- Columna 1 -->
                      <div class="flex flex-col">                        
                          <div class="flex justify-between items-center ">
                             <label class="block text-xs font-semibold text-gray-700 uppercase">Categoría</label>
                                <button type="button" onclick="abrirModalCategoria()" class="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1">
                                  <i class="fa-solid fa-plus text-[10px]"></i> Nueva
                                </button>
                          </div>                     
                                            
                        <select name ="c" id="prodCategoria" class="border p-2 rounded">
                          <option value="ferreteria">Ferretería</option>
                          <option value="almacen">Almacén</option>
                          <option value="farmacia">Farmacia</option>
                        </select>                      
                      </div>

                <!-- Columna 2 -->
                <div class="flex flex-col">
                    <label class="block text-xs font-semibold text-gray-700 uppercase">Precio ($) *</label>
                    <input name ="c" type="number" step="1" id="prodPrecioLista" required placeholder="45000" 
                           class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                </div>
              
                <!-- Columna 3 -->
                <div class="flex flex-col">
                 <label class="block text-xs font-semibold text-gray-700 uppercase ">Curva</label>
                   <input name ="c" type="number" step="1" id="prodCurva" placeholder="5" 
                          class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                </div>
              
                <!-- Columna 4 -->
                <div class="flex flex-col">
                    <label class="block text-xs font-semibold text-gray-700 uppercase ">Stock Actual *</label>
                      <input name ="c" type="number" step="0.001" id="prodStock" required placeholder="10" 
                             class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                 </div>
              </div>

                    <!-- Sección 3: Visibilidad y Estados -->
                    <div class="flex flex-wrap gap-6 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <label class="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-medium">
                        <input name="c" type="checkbox" id="prodActivo" checked class="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500">
                        Activo
                      </label>
                      <label class="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-medium">
                        <input name="c" type="checkbox" id="prodVisibleWeb" checked class="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500">
                        Visible 
                      </label>
                    </div>

                    <!-- Sección 4: Galería Unificada (Dropzone + Reordenar + Botón Añadir) -->
                    <div class="space-y-2">
                      <div class="flex justify-between items-center">
                        <label class="block text-xs font-semibold text-gray-700 uppercase">Imágenes (Máx. 5)</label>
                        <span class="text-xs text-gray-400">Arrastra para reordenar (La 1ª es la Principal)</span>
                      </div>
                      <!-- Contenedor Unificado: Galería Reordenable + Zona Drop Global -->
                      <div id="contenedorDropzoneGaleria" 
                          class="border-2 border-dashed border-gray-200 bg-gray-50/50 rounded-2xl p-3 transition-all min-h-[120px]">    
                        <!-- Grid donde coexisten las miniaturas y el botón '+' -->
                        <div id="galeriaUnificada" class="grid grid-cols-3 sm:grid-cols-5 gap-3">
                          <!-- Aquí se renderizan las fotos y al final la tarjeta '+' -->
                          <div onclick="inputGaleriaOculto.click();"
                            class="border-2 border-dashed border-gray-300 hover:border-indigo-500 bg-white hover:bg-indigo-50/30 rounded-xl aspect-square flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:text-indigo-600 transition group shadow-sm">
                            <div class="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-indigo-100 flex items-center justify-center mb-1 transition">
                              <i class="fa-solid fa-plus text-lg"></i>
                          </div>
                          <span class="text-[11px] font-semibold">Añadir</span>
                          <span class="text-[9px] text-gray-400">1/5 fotos</span>
                        </div>
                        <!-- Grid donde coexisten las miniaturas y el botón '+' -->
                        </div>
                      </div>

                      <!-- Input de archivos oculto -->
                      <input type="file" id="inputGaleriaOculto" multiple accept="image/*" class="hidden" onchange="manejarArchivosSeleccionados(this.files)">
                    </div>

                  </form>

                  <!-- Footer con Botones -->
                    <!--toast-->
                      <!-- Contenedor del Toast (Oculto por defecto con 'hidden') -->
                      <div id="toast-success" class="hidden fixed bottom-5 right-5 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-xl border border-gray-100" role="alert">
                          <!-- Contenido e icono (simplificado) -->
                          <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
                              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/></svg>
                          </div>
                          <div class="ms-3 text-sm font-normal">¡Acción completada!</div>
                          <button onclick="closeToast()" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8">
                              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/></svg>
                          </button>
                      </div>
                      <!-- Botón activador 
                        <button onclick="showToast()" class="px-5 py-2.5 text-white bg-blue-600 rounded-lg">Mostrar</button>
                      -->
                    <!--toast-->


                  <div class="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                    <button type="button" onclick="cerrarModalProducto()" class="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition">
                      Cancelar
                    </button>
                    <button type="button" onclick="guardarProducto(event)" id="btnGuardarProd" class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition flex items-center gap-2 shadow-sm">
                      <span id="btnGuardarTexto">Guardar</span>
                      <span class="spinner hidden"><i id="btnGuardarSpinner" class="fa-solid fa-spinner fa-spin "></i></span>
                    </button>
                  </div>

                </div>
              </div>