  <div id="mainModal" class="hidden fixed inset-0 bg-black/60 z-50  flex items-center justify-center p-3 sm:p-4 overflow-y-auto">    
    <div class="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">    
      <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div>
          <h3 id="titleModal" class="text-lg font-bold text-gray-800"></h3>
          <!--  <p class="text-xs text-gray-500">extra info</p> -->
        </div>
        <button onclick="cerrarModal()" class="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition">
          <i class="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>

                          <!--toast-->
                      <!-- Contenedor del Toast (Oculto por defecto con 'hidden') -->
                      <div id="toast-success" class=" fixed bottom-5 right-5 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-xl border border-gray-100" role="alert">
                          <!-- Contenido e icono (simplificado) -->
                          <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
                              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/></svg>
                          </div>
                          <div class="ms-3 text-sm font-normal">¡Acción completada!</div>
                          
                          <button onclick="closeToast()" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8">
                              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/></svg>
                          </button>
                          
                      </div>
                      <!-- Botón activador 
                        <button onclick="showToast()" class="px-5 py-2.5 text-white bg-blue-600 rounded-lg">Mostrar</button>
                      -->
                    <!--toast-->

