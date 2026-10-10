<?php
    $data['headItems'] = [
      "<link href='https://cdn.jsdelivr.net/npm/tom-select@2.2.2/dist/css/tom-select.css' rel='stylesheet'>",
      "<script src='https://cdn.jsdelivr.net/npm/tom-select@2.2.2/dist/js/tom-select.complete.min.js'></script>"
    ];
    headerAdmin2($data); 
    getModal('_cat',$data);       getModal('_prod',$data);       getModal('_prodMasiva',$data);
?>

            <main class="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">                
              <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 class="text-2xl font-bold text-gray-800">Catálogo de Productos</h1>
                    <p class="text-sm text-gray-500">Gestiona datos y fotografías</p>
                  </div>
                  <div class="flex flex-wrap items-center gap-2">
                    <button onclick="toggleModal('modalEdicionMasiva')" class=" bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition flex items-center gap-2 shadow-sm">
                      <i class="fa-solid fa-pen-to-square"></i> Edición Masiva
                    </button>
                    <button onclick="toggleModal('modalProductos')" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition flex items-center gap-2 shadow-sm">
                      <i class="fa-solid fa-plus"></i> Nuevo
                    </button>
                  </div>
                </div>

                <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-4">
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">      
                    <div class=" relative sm:col-span-2 ">
                      <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      <input type="text" id="inputBusqueda" onkeyup="filtrarProductos()" placeholder="Buscar por código, nombre o SKU..." 
                            class="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500">
                    </div>

                    <div>
                      <select id="filtroCategoria" onchange="filter(event);" class="cats w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500">
                        <option value="">Todas</option>
                      </select>
                    </div>

                    <div class="hidden todel">
                      <select id="filtroEstado" onchange="filter(event)" class="states w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500">
                        <option value="todos">Todos los Estados</option>
                        <option value="1">Solo Activos</option>
                        <option value="0">Inactivos (Deshabilitados)</option>
                        <option value="invisible">Invisibles en Tienda Web</option>
                      </select>
                    </div>

<div class="flex items-center gap-4 mt-6">
    <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" id="chk-active" checked onclick="filter(event)" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
        <span class="ml-2 text-sm text-gray-700">Activos</span>
    </label>
    <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" id="chk-visible" checked onclick="filter(event)" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
        <span class="ml-2 text-sm text-gray-700">Visibles</span>
    </label>
</div>

  <!-- VISIBILIDAD -->
  <div>
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




                    <div class="hidden todel">
                      <select id="filtroOferta" onchange="filtrarProductos()" class="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500">
                        <option value="todos">Todas los precios</option>
                        <option value="oferta">En Oferta / Descuento</option>
                        <option value="regular">Precio Regular</option>
                      </select>
                    </div>

                  </div>

                  <div class="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span class="text-xs text-gray-500 font-medium" id="contadorResultados">Mostrando productos...</span>
                    <div class="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-50">
                      <button id="btnVistaTabla" onclick="cambiarVista('tabla')" class="px-3 py-1 text-xs font-medium rounded-md bg-white text-gray-800 shadow-sm transition">
                        <i class="fa-solid fa-table-cells mr-1"></i> Tabla
                      </button>
                      <button id="btnVistaCards" onclick="cambiarVista('cards')" class="px-3 py-1 text-xs font-medium rounded-md text-gray-500 hover:text-gray-800 transition">
                        <i class="fa-solid fa-border-all mr-1"></i> Tarjetas
                      </button>
                    </div>
                  </div>
                </div>

                <div id="vistaTabla" class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                      <thead>
                        <tr class="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider">
                          <th class="p-4">Producto</th>
                          <th class="p-4">Categoría</th>
                          <th class="p-4">Precio</th>
                          <th class=" p-4">estado</th>
                          <th class=" p-4">Invisible</th>
                          <th class="p-4">Visible</th>
                          <th class="p-4 text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-100 text-sm">
                        <tr class="hover:bg-gray-50/50 transition">
                          <td class="p-4 flex items-center gap-3">
                            <img src="" class="w-10 h-10 rounded-lg object-cover border" alt="Prod">
                            <div>
                              <p class="font-medium text-gray-800">Taladro Percutor 13mm 750W</p>
                              <p class="text-xs text-gray-400">SKU: FER-9982</p>
                            </div>
                          </td>
                          <td class="p-4 text-gray-600">Ferretería</td>
                          <td class="p-4 font-semibold text-gray-800">$ 45.000</td>
                          <td class="p-4"><span class="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">$ 39.900</span></td>
                          <td class="p-4 font-semibold text-emerald-600">18 unid.</td>
                          <td class="p-4">
                            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Visible
                            </span>
                          </td>
                          <td class="p-4 text-right space-x-1">
                            <button class="p-2 text-gray-400 hover:text-indigo-600 transition" title="Editar"><i class="fa-solid fa-pen"></i>pp</button>
                            <button class="p-2 text-gray-400 hover:text-red-600 transition" title="Inactivar"><i class="fa-solid fa-trash-can"></i></button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div id="vistaCards" class="hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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

                            
              <div class="fixed bottom-5 right-5 z-40 flex flex-col gap-3 items-end">
                  <button id="btn-back-to-top" onclick="scrollToTop()" class="opacity-0 translate-y-4 pointer-events-none transition-all duration-300 bg-slate-800 hover:bg-slate-900 text-white p-3 rounded-full shadow-lg border border-slate-700">        
                      <i class="fa-solid fa-arrow-up"></i> 
                  </button>
              </div>
            </main>
            
          </div>
      
        </div>
    <?php   footerAdmin2($data); ?>
  <script src="<?=media(); ?>/js/productsModal.js"></script>
  <script src="<?=media(); ?>/js/prod_cat.js"></script>