<?php
   headerAdmin2($data); 
   getModal('_clpr', $data);   
   //getModal('_cat',$data);  miniModal
?>
<style>
  /* body { font-family: Arial, sans-serif;}*/
    .modal-backdrop { background: rgba(0, 0, 0, 0.45); }
</style>
  <!-- CONTENEDOR PRINCIPAL -->
  <!-- <main class="max-w-7xl mx-auto p-4 md:p-6"> -->
  <main class="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">                
    <!-- BARRA DE HERRAMIENTAS -->
    <section class="bg-white rounded-xl shadow-sm p-4 mb-5">
      <div class="flex flex-col lg:flex-row gap-3">
        <!-- BUSCADOR -->
        <div class="flex-1">
          <input            id="busqueda"            type="text"
            placeholder="Buscar por nombre, CUIT, teléfono..."
            oninput="renderClientes()"
            class="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <!-- FILTRO -->
        <select
          id="filtroEstado"
          onchange="renderClientes()"
          class="border rounded-lg px-4 py-2.5 bg-white">
          <option value="todos">Todos los estados</option>
          <option value="activo">Activos</option>
          <option value="inactivo">Inactivos</option>
        </select>
    <!-- =======        cambia vista ============= -->    
      <div class="cambiador flex justify-between items-center pt-2 border-t border-gray-800">
          <span class="hidden text-xs text-gray-500 font-medium" id="contadorResultados">Mostrando productos...</span>
          <span id="resultCount" class="text-sm text-gray-500"> </span>
        <div class="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-50">
          <button id="btnVistaTabla" onclick="switchView('tabla')" class="btnViewTable px-3 py-1 text-xs font-medium rounded-md bg-white text-gray-800 shadow-sm transition">
            <i class="fa-solid fa-table-cells mr-1"></i> Tabla
          </button>
          <button id="btnVistaCards" onclick="switchView('cards')" class="btnViewCards px-3 py-1 text-xs font-medium rounded-md text-gray-500 hover:text-gray-800 transition">
            <i class="fa-solid fa-border-all mr-1"></i> Tarjetas
          </button>
        </div>
      </div>
      </div>
      <!-- ACCIONES MASIVAS -->
      <div
        id="accionesMasivas"
        class="hidden mt-4 pt-4 border-t flex flex-wrap items-center gap-3">
        <span id="contadorSeleccionados"
          class="text-sm text-gray-600">
          0 seleccionados
        </span>
        <button
          onclick="eliminarSeleccionados()"
          class="text-red-600 border border-red-200 hover:bg-red-50 px-3 py-2 rounded-lg">
          🗑 Eliminar seleccionados
        </button>
      </div>
    </section>
    <!-- CONTENEDOR -->
    <section>
      <!-- TABLA -->
      <div id="vistaTabla" class=" vistatabla bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50 border-b">
              <tr>
                <th class="p-4 text-left">
                  <input id="seleccionarTodos" type="checkbox" onchange="seleccionarTodos(this.checked)">
                </th>
                <th class="p-4 text-left">Cliente</th>
                <th class="p-4 text-left">CUIT / DNI</th>
                <th class="p-4 text-left">WhatsApp</th>
                <th class="p-4 text-left">IVA</th>
                <th class="p-4 text-left">Estado</th>
                <th class="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody id="tablaClientes"></tbody>
          </table>
        </div>
      </div>
      <!-- TARJETAS -->
      <div
        id="vistaTarjetas" class="vistatarjeta hidden grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      </div>
    </section>
    <!-- PAGINACIÓN -->
    <div
      id="paginacion"
      class="flex justify-center items-center gap-2 mt-6">
    </div>
  </main>
  <!-- ================================================= -->
  <!-- MINIMODAL IVA -->
  <!-- ================================================= -->
  <div
    id="modalIva"
    class="modaliva hidden fixed inset-0 z-[60] modal-backdrop flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow-xl w-full max-w-md">
      <div class="flex justify-between items-center p-4 border-b">
        <h3 class="font-bold text-lg">
          Nueva categoría de IVA
        </h3>
        <button
          onclick="cerrarModalIva()" class="text-gray-500"> ✕ </button>
      </div>
      <form onsubmit="guardarCategoriaIva(event)"
        class="p-4 space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">            Nombre          </label>
          <input
            id="nuevoIva" required
            class="w-full border rounded-lg px-3 py-2.5"
            placeholder="Ej: Monotributista">
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">            Código          </label>
          <input id="codigoIva"
            class="w-full border rounded-lg px-3 py-2.5"
            placeholder="Ej: MT">
        </div>
        <div class="flex justify-end gap-2">
          <button type="button" onclick="cerrarModalIva()" class="px-4 py-2 border rounded-lg">
            Cancelar
          </button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
    <?php   footerAdmin2($data); ?>
