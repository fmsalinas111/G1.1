<?php 
  headerAdmin2($data); 
  echo "<script >  
				const data0 =".$data['data'].";  
        const data = [...data0].sort((b, a) => a.saux - b.saux);
				const banks =".$data['banks'].";  
			</script>";  
  getModal('_ledger', $data);  
?>
<main class="flex-1 p-4 md:p-6 space-y-6">
  <h2 class="text-base md:text-lg font-bold text-slate-800 truncate">
      <span id="cli"><?= $data['page_clName']?></span>
  </h2>
    <!-- =====================================================
        TABLA
    ====================================================== -->
    <div id="vistaTabla" class="vistatabla tableview bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <!-- HEADER -->
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr class="text-left text-xs uppercase tracking-wide text-gray-500">
              <!-- fecha -->
              <th data-sort="fecha" 
                class="sortable px-2 py-2 font-medium cursor-pointer hover:text-gray-900 w-1/3">
                Fecha <span class="sort-icon"></span>
              </th>
              <!-- saux -->
              <th data-sort="name" 
                class=" sortable px-2 py-2 font-medium cursor-pointer hover:text-gray-900 w-1/4">
                saux <span class="sort-icon"></span>
              </th>
              <!-- DESCRIPTION -->
              <th data-sort="description"
                class="sortable pl-10 px-5 py-3 font-medium cursor-pointer hover:text-gray-900">
                Descripción  <span class="sort-icon"></span>
              </th>
              <!-- cargo-->
              <th
                data-sort="price"
                class=" sortable px-5 py-3 font-medium cursor-pointer hover:text-gray-900">
                Cargo <span class="sort-icon"></span>
              </th>
              <!-- abono-->
              <th data-sort="visible"
                class=" sortable px-5 py-3 font-medium cursor-pointer hover:text-gray-900">
                Abono <span class="sort-icon"></span>
              </th>
              <!-- balance -->
              <th data-sort="activo"
                class="sortable px-5 py-3 font-medium cursor-pointer hover:text-gray-900 w-1/4">
                Balance <span class="sort-icon"></span>
              </th>
              <!-- ACCIONES -->
              <th class="px-5 py-3 font-medium text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <!-- BODY -->
          <tbody id="dataTable" class="divide-y divide-gray-10">  </tbody>
          <!-- BODY -->
        </table>
      </div>
</main>
<?php   footerAdmin2($data); ?>