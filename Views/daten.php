<?php 
  headerAdmin2($data); 
  getModal('_daten', $data);   
  getModal('_confirm', $data);   
?>

<main class="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">                
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- ==================        FILTROS  ========================== -->
    <details>
      <summary>Filtros</summary>
      <div class="bg-white border border-gray-200 rounded-xl shadow-sm mb-4">
        <div class="p-4 flex flex-col xl:flex-row gap-4 xl:items-end">
          <!-- BUSCAR -->
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1.5">
              Buscar
            </label>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m21 21-4.35-4.35
                    m1.35-5.65a7 7 0 1 1-14 0
                    7 7 0 0 1 14 0Z"/>
              </svg>
              <input
                id="search" type="text" placeholder="Buscar por nombre ..."
                class="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg
                      text-sm outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400">
            </div>
          </div>
          <!-- filtro categoría-->
          <div class="hidden">
            <select id="filtroCategoria" onchange="filter(event);"  class="cats w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500">
              <option value="">Todas</option>
            </select>
          </div>

          <!-- VISIBILIDAD -->
          <div class="hidden">
            <label class="block text-sm font-medium text-gray-700 mb-1.5">
              Visibilidad
            </label>
            <div class="inline-flex bg-gray-100 p-1 rounded-lg">
              <button
                  data-filter="visible" data-value="all"
                  class="filter-btn px-3 py-1.5 text-sm rounded-md bg-white shadow-sm font-medium">
                Todos
              </button>
              <button
                  data-filter="visible" data-value="1"
                  class="filter-btn px-3 py-1.5 text-sm rounded-md text-gray-500">
                Visibles
              </button>
              <button
                  data-filter="visible" data-value="0" class="filter-btn px-3 py-1.5 text-sm rounded-md text-gray-500">
                Ocultos
              </button>
            </div>
          </div>
          <!-- ESTADO -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">
              Estado
            </label>
            <div class="inline-flex bg-gray-100 p-1 rounded-lg">
              <button
                  data-filter="activo" data-value="all"
                  class="filter-btn px-3 py-1.5 text-sm rounded-md bg-white shadow-sm font-medium">
                Todos
              </button>
              <button
                  data-filter="activo" data-value="1"
                  class="filter-btn px-3 py-1.5 text-sm rounded-md text-gray-500">
                Activos
              </button>
              <button
                  data-filter="activo" data-value="0"
                  class="filter-btn px-3 py-1.5 text-sm rounded-md text-gray-500">
                Inactivos
              </button>
            </div>
          </div>
          <!-- LIMPIAR -->
          <button
              id="clearFilters"
              class="px-3 py-2.5 text-sm text-gray-500 hover:text-gray-900 whitespace-nowrap">
            Limpiar filtros
          </button>
        </div>
      </div>
    </details>


    <!-- =====================================================
        BARRA DE SELECCIÓN / ACCIONES MASIVAS
    ====================================================== -->
    <div
      id="bulkActions"
      class="hidden bg-gray-900 text-white rounded-xl p-3 mb-4 flex-col sm:flex-row
            sm:items-center sm:justify-between gap-3">
      <div class="flex items-center gap-3">
        <span id="selectedCount" class="text-sm font-medium">0 seleccionados </span>
      </div>
      <div class="flex flex-wrap gap-2">
        <!-- ACTIVAR -->
        <button onclick="bulkSetActive(1)" class="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm">
          Activar
        </button>
        <!-- DESACTIVAR -->
        <button onclick="bulkSetActive(0)" class="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm">
          Desactivar
        </button>
        <!-- MOSTRAR -->
        <button onclick="bulkSetVisible(1)" class="hidden px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm">
          Mostrar
        </button>
        <!-- OCULTAR -->
        <button onclick="bulkSetVisible(0)" class=" hidden px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm">
          Ocultar
        </button>
        <!-- ELIMINAR -->
        <button onclick="bulkDelete(0)" class="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm">
          Eliminar
        </button>

        <!-- DESELECCIONAR -->
        <button onclick="clearSelection()" class="px-3 py-1.5 rounded-lg text-gray-300 hover:text-white text-sm">
          Cancelar
        </button>
      </div>
    </div>
    <!-- =====================================================
        INFORMACIÓN
    ====================================================== -->
    <div class="infoTabla flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-500"> Mostrar </span>
        <select
          id="pageSize"
          class="border border-gray-300 rounded-lg px-2 py-1.5 text-sm bg-white">
          <option value="5">5</option>
          <option value="10" selected>10</option>
          <option value="20">20</option>
        </select>
        <span class="text-sm text-gray-500"> por página </span>
      </div>
    </div>

    <!-- =======        cambia vista ============= -->    
      <div class="cambiador flex justify-between items-center pt-2 border-t border-gray-800">
          <span class="hidden text-xs text-gray-500 font-medium" id="contadorResultados">Mostrando productos...</span>
          <span id="resultCount" class="text-sm text-gray-500"> </span>
        <div class="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-50">
          <button id="btnVistaTabla" onclick="cambiarVista('tabla')" class="px-3 py-1 text-xs font-medium rounded-md bg-white text-gray-800 shadow-sm transition">
            <i class="fa-solid fa-table-cells mr-1"></i> Tabla
          </button>
          <button id="btnVistaCards" onclick="cambiarVista('cards')" class="px-3 py-1 text-xs font-medium rounded-md text-gray-500 hover:text-gray-800 transition">
            <i class="fa-solid fa-border-all mr-1"></i> Tarjetas
          </button>
        </div>
      </div>
    <!-- =====================================================
        TABLA
    ====================================================== -->
    <div id="vistaTabla" class="vistaTabla tableview bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <!-- HEADER -->
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr class="text-left text-xs uppercase tracking-wide text-gray-500">
              <!-- CHECKBOX -->
              <th class="px-5 py-3 w-10">
                <input id="selectAll" type="checkbox" class="w-4 h-4 rounded border-gray-300">
              </th>
              <!-- NOMBRE -->
              <th data-sort="name"
                class="sortable px-5 py-3 font-medium cursor-pointer hover:text-gray-900 w-1/3">
                Nombre <span class="sort-icon"></span>
              </th>
              <!-- DESCRIPTION -->
              <th data-sort="description"
                class="sortable pl-10 px-5 py-3 font-medium cursor-pointer hover:text-gray-900">
                Descripción  <span class="sort-icon"></span>
              </th>
              <!-- PRECIO HIDDEN TD-->
              <th
                data-sort="price"
                class="hidden sortable px-5 py-3 font-medium cursor-pointer hover:text-gray-900">
                Precio <span class="sort-icon"></span>
              </th>
              <!-- VISIBILIDAD HIDDEN TD-->
              <th data-sort="visible"
                class="hidden sortable px-5 py-3 font-medium cursor-pointer hover:text-gray-900">
                Visibilidad <span class="sort-icon"></span>
              </th>
              <!-- ESTADO -->
              <th data-sort="activo"
                class="sortable px-5 py-3 font-medium cursor-pointer hover:text-gray-900">
                Estado <span class="sort-icon"></span>
              </th>
              <!-- ACCIONES -->
              <th class="px-5 py-3 font-medium text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <!-- BODY -->
          <tbody id="dataTable" class="divide-y divide-gray-100">  </tbody>
          <!-- BODY -->
        </table>
      </div>
      <!-- =================================================
          SIN RESULTADOS
      ================================================== -->
      <div
        id="emptyState" class="hidden py-16 text-center">
        <div class="text-4xl mb-3">🔎</div>
        <h3 class="font-medium"> Datos no encontrados </h3>
        <p class="text-sm text-gray-500 mt-1">
          Probá modificando los filtros o la búsqueda.
        </p>
      </div>
      <!-- =================================================
          PAGINACIÓN
      ================================================== -->
      <div
        id="pagination"
        class="border-t border-gray-200 px-5 py-3 flex flex-col sm:flex-row
              gap-3 sm:items-center sm:justify-between">
      </div>
    </div>
    <!-- =====================================================
        cards
    ====================================================== -->
    <div id="vistaCards" class="hidden cardsview grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 relative flex flex-col justify-between hover:shadow-md transition">
        <div>
          <div class="relative mb-3">
            <img src="" class="w-full h-40 object-cover rounded-lg" alt="Prod">
            <span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">OFERTA</span>
          </div>
          <span class="text-xs font-medium text-indigo-600 uppercase tracking-wider">Ferretería</span>
          <h3 class="font-bold text-gray-800 text-base leading-snug mt-1">Taladro Percutor 13mm 750W</h3>
          <p class="text-xs text-gray-400 mt-0.5">SKU: FER-9982</p>
        </div>

        <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span class="text-xs text-gray-400 line-through">$ 45.000</span>
            <p class="text-lg font-bold text-gray-900">$ 39.900</p>
          </div>
          <div class="flex gap-1">
            <button class="p-2 bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition"><i class="fa-solid fa-pen"></i></button>
          </div>
        </div>
      </div>
    </div>

  </div>

</main>
<?php   footerAdmin2($data); ?>
  
