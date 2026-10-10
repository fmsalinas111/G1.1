                  <!-- Footer con Botones -->
                  <div class="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                    <button type="button" onclick="cerrarModal()" class="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition">
                      Cancelar
                    </button>
                    <button type="submit" onclick="guardar(event)" id="btnGuardar" class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition flex items-center gap-2 shadow-sm">
                      <span id="btnGuardarTexto">Guardar</span>
                      <span class="spinner hidden"><i id="btnGuardarSpinner" class="fa-solid fa-spinner fa-spin "></i></span>
                    </button>
                  </div>

                </div>
              </div>

              </form>