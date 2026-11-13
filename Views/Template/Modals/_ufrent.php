  <!-- ================================================= -->
  <!-- MODAL ALQUILA -->
  <!-- ================================================= -->
      <?php include "_header.php"; ?> <!-- Header del Modal -->
      <form id="ufRent" onsubmit="guardar(event)" class="p-6 overflow-y-auto space-y-6 flex-1">
        <input type="hidden" id="_id" name="c">
        
        <div>  <!-- Activo -->
          <label class="block text-sm font-medium mb-1">Activo
            <input id="importe" name="c" disabled class="w-full border rounded-lg px-3 py-2.5"> 
          </label>
        </div>

        <div> <!-- fecha -->
          <label class="block text-sm font-medium mb-1"> Fecha
            <input id="fecha" name="c" autofocus type="date" class="fecha w-full border rounded-lg px-3 py-2.5">
          </label>
        </div>
        
        <div>  <!-- Importe -->
          <label class="block text-sm font-medium mb-1">Importe
            <input id="importe" name="c" class="w-full border rounded-lg px-3 py-2.5"> 
          </label>
        </div>

        
        <div >   <!-- Inquilino -->
          <label for="tenant" class="block text-sm font-medium mb-1">Cliente</label>
          <select id="tenant" name="c" class="w-full border rounded-lg px-3 py-2.5">
            <option selected hidden value="0">Seleccione</option>            
          </select>
        </div>

        <!-- Perioricidad -->
        <div class="">
          <label for="period" class="block text-sm font-medium mb-1">Periodo</label>
          <select id="period" name="c" class="w-full border rounded-lg px-3 py-2.5">
            <option selected hidden value="0">Seleccione</option>
          </select>
        </div>
        
        <div class = "">  <!-- Estado -->
          <label for="estado" class="block text-sm font-medium mb-1">Estado</label>
          <select id="estado" name="c" class="w-full border rounded-lg px-3 py-2.5">
            <option value="1">Activo</option>
            <option value="0">Inactivo</option>
          </select>
        </div>
        <?php include "_footer.php"; ?> <!-- Footer con Botones -->
      
