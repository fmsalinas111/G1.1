<!-- ================================================= -->
  <!-- MODAL productos -->
  <!-- ================================================= -->
      <?php include_once "_header.php"; ?> <!-- Header del Modal -->
      <form id="form" onsubmit="guardar(event)" class="p-6 overflow-y-auto space-y-6 flex-1">
        <input type="hidden" id="_id" name="c">
        <input name="c" type="hidden" id="productoId" name="id" value="" >


                    <!-- Sección 1: Datos Principales -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div class="sm:col-span-2">
                        <label class="block text-xs font-semibold text-gray-700 uppercase ">Nombre del Producto *</label>
                        <input name ="c" type="text" id="prodNombre" autofocus placeholder="Ej: Taladro Percutor 13mm 750W" 
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

                  

<?php include_once "_footer.php"; ?> <!-- Footer con Botones -->

                  