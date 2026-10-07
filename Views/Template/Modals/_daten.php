  <!-- ================================================= -->
  <!-- MODAL DATEN -->
  <!-- ================================================= -->
      <?php include_once "_header.php"; ?> <!-- Header del Modal -->
      <form id="form" onsubmit="guardar(event)" class="p-6 overflow-y-auto space-y-6 flex-1">
        <input type="hidden" id="_id">
        <!-- NOMBRE -->
        <div>
          <label class="block text-sm font-medium mb-1"> NOMBRE
            <input id="nombre" name="c" class="nombre w-full border rounded-lg px-3 py-2.5">
          </label>
        </div>

        <!-- DESCRIPCION -->
        <div>
          <label class="block text-sm font-medium mb-1">Descripción
            <input id="descripcion" name="c" class="w-full border rounded-lg px-3 py-2.5"> 
          </label>
        </div>

        <!-- ESTADO -->
        <div>
          <label for="estado" class="block text-sm font-medium mb-1">Estado</label>
          <select id="estado" name="c" class="w-full border rounded-lg px-3 py-2.5">
            <option value="1">Activo</option>
            <option value="0">Inactivo</option>
          </select>
        </div>
      </form>
      <?php include_once "_footer.php"; ?> <!-- Footer con Botones -->
