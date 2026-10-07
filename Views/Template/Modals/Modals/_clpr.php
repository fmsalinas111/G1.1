  <!-- ================================================= -->
  <!-- MODAL CLIENTE -->
  <!-- ================================================= -->
      <?php include_once "_header.php"; ?> <!-- Header del Modal -->
      <form id="formCliente" onsubmit="guardarCliente(event)" class="p-6 overflow-y-auto space-y-6 flex-1">
        <input type="hidden" id="clienteId">
        <!-- NOMBRE / APELLIDO -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1"> Nombre 
              <input id="nombre" required class="w-full border rounded-lg px-3 py-2.5">
            </label>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1"> Apellido / Razón social 
              <input id="apellido" required class="w-full border rounded-lg px-3 py-2.5">
            </label>
          </div>
        </div>

        <!-- DOCUMENTO -->
        <div>
          <label class="block text-sm font-medium mb-1"> DNI / CUIT
            <input id="documento" class="w-full border rounded-lg px-3 py-2.5" placeholder="20-12345678-9">
          </label>
        </div>

        <!-- TELEFONO -->
        <div>
          <label for="telefono" class="block text-sm font-medium mb-1"> WhatsApp</label>
          <div class="flex gap-2">
            <select
              id="pais" onchange="actualizarCodigoPais()" class="border rounded-lg px-3 py-2.5 w-28">
              <option value="AR">🇦🇷 AR</option>
              <option value="UY">🇺🇾 UY</option>
              <option value="CL">🇨🇱 CL</option>
              <option value="BR">🇧🇷 BR</option>
              <option value="PY">🇵🇾 PY</option>
              <option value="BO">🇧🇴 BO</option>
              <option value="ES">🇪🇸 ES</option>

            </select>
            <input id="codigoPais" readonly class="border rounded-lg px-3 py-2.5 w-20 bg-gray-50">
            <input id="telefono" required class="flex-1 border rounded-lg px-3 py-2.5" placeholder="11 7034-4429">
          </div>
        </div>


        <!-- EMAIL -->
        <div>
          <label class="block text-sm font-medium mb-1">Email
            <input id="email" type="email" class="w-full border rounded-lg px-3 py-2.5" placeholder="cliente@email.com">
          </label>
        </div>

        <!-- DIRECCION -->
        <div>
          <label class="block text-sm font-medium mb-1">Dirección
            <input id="direccion" class="w-full border rounded-lg px-3 py-2.5"> 
          </label>
        </div>

        <!-- IVA -->
        <div>
          <label for="categoriaIva" class="block text-sm font-medium mb-1"> Categoría de IVA </label>
          <div class="flex gap-2">
            <select id="categoriaIva" class="flex-1 border rounded-lg px-3 py-2.5"></select>
            <button type="button" onclick="abrirModalIva()" class="border border-blue-300 text-blue-600 hover:bg-blue-50 px-4 rounded-lg">
              + Nueva
            </button>
          </div>
        </div>

        <!-- ESTADO -->
        <div>
          <label for="estado" class="block text-sm font-medium mb-1">Estado</label>
          <select id="estado" class="w-full border rounded-lg px-3 py-2.5">
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
      </form>
      <?php include_once "_footer.php"; ?> <!-- Footer con Botones -->
