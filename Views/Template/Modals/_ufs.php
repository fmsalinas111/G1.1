  <!-- ================================================= -->
  <!-- MODAL UFS -->
  <!-- ================================================= -->
      <?php 
      include "_header.php"; ?> <!-- Header del Modal -->
      <form id="form" onsubmit="guardar(event)" class="p-6 overflow-y-auto space-y-6 flex-1">
        <input type="hidden" id="_id" name="c">
        
        <div> <!-- NOMBRE -->
          <label class="block text-sm font-medium mb-1"> NOMBRE
            <input id="nombre" name="c" autofocus class="nombre w-full border rounded-lg px-3 py-2.5">
          </label>
        </div>

        
        <div> <!-- DESCRIPCION -->
          <label class="block text-sm font-medium mb-1">Descripción
            <input id="descripcion" name="c" class="w-full border rounded-lg px-3 py-2.5"> 
          </label>
        </div>

        
        <div>  <!-- PRECIO -->
          <label class="block text-sm font-medium mb-1">Precio
            <input id="precio" name="c" class="w-full border rounded-lg px-3 py-2.5"> 
          </label>
        </div>

        
        <div class="hidden">   <!-- Alquilado a -->
          <label for="tenant" class="block text-sm font-medium mb-1">Cliente</label>
          <select id="tenant" name="c" class="w-full border rounded-lg px-3 py-2.5">
            <option selected hidden value="0">Seleccione</option>            
          </select>
        </div>

        <!-- Perioricidad -->
        <div class="hidden">
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
      
