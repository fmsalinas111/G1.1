  <!-- ================================================= -->
  <!-- LEDGER NODAL -->
  <!-- ================================================= -->
      <?php include_once "_header.php"; ?> <!-- Header del Modal -->
      <form id="form" onsubmit="guardar(event)" class="p-6 overflow-y-auto space-y-6 flex-1">
        <input type="hidden" id="_id">
        <!-- fecha -->
        <div>
          <label class="block text-sm font-medium mb-1"> Fecha
            <input id="fecha" name="c" type="date" 
				class="fecha w-full border rounded-lg px-3 py-2.5">
          </label>
        </div>

        <!-- importe -->
        <div>
          <label class="block text-sm font-medium mb-1">Importe
            <input id="importe" name="c" type="number" required
				class="w-full border rounded-lg px-3 py-2.5"> 
          </label>
        </div>

        <!-- banco -->
        <div>
          <label for="banco" class="block text-sm font-medium mb-1">Banco</label>
          <select id="banco" name="c" class="w-full border rounded-lg px-3 py-2.5">
            <option value="1">Activo</option>
            <option value="0">Inactivo</option>
          </select>
        </div>
        <!-- img -->
        <div class="mt-4">
            <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Imagen (opcional))</label>
            <input type="file" name="banner" accept="image/*" class="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer">
        </div>

      </form>
      <?php include_once "_footer.php"; ?> <!-- Footer con Botones -->
