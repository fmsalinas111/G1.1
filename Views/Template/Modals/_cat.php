<!-- MODAL SECUNDARIO: CREAR / EDITAR CATEGORÍA Y SUBCATEGORÍA -->
<div id="modalCategoria" class="fixed inset-0 bg-black/60 z-[60] hidden flex items-center justify-center p-4 overflow-y-auto">
  <div class="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden my-auto border border-gray-100">
    
    <!-- Header del Modal -->
    <div class="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
      <h3 id="tituloModalCat" class="text-base font-bold text-gray-800">Nueva Categoría / Subcategoría</h3>
      <button type="button" onclick="cerrarModalCategoria()" class="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition">
        <i class="fa-solid fa-xmark text-lg"></i>
      </button>
    </div>

    <!-- Cuerpo del Formulario -->
    <form id="formCategoria" onsubmit="guardarCategoriaRapida(event)" class="p-5 space-y-4">
      
      <!-- Es Subcategoría? -->
      <div>
        <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">Categoría Padre (Opcional)</label>
        <select id="catPadreId" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
          <option value="">-- Es Categoría Principal --</option>
          <!-- Se puebla dinámicamente con las categorías principales existentes -->
        </select>
        <p class="text-[11px] text-gray-400 mt-1">Selecciona una categoría padre solo si estás creando una subcategoría.</p>
      </div>

      <!-- Nombre -->
      <div>
        <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">Nombre de la Categoría *</label>
        <input type="text" id="catNombre" required placeholder="Ej: Herramientas Eléctricas" 
               class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
      </div>

      <!-- Footer / Botones -->
      <div class="flex justify-end gap-2 pt-3 border-t border-gray-100">
        <button type="button" onclick="cerrarModalCategoria()" class="px-3.5 py-1.5 border rounded-lg text-xs text-gray-600 hover:bg-gray-50 transition">
          Cancelar
        </button>
        <button type="submit" id="btnGuardarCat" class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition flex items-center gap-2">
          <span>Guardar Categoría</span>
        </button>
      </div>

    </form>
  </div>
</div>
