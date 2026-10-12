  let tomSelectInstance = null;
  let celdaActiva = null;

  // 2. Inicializar el Tom Select Compartido
function startTom(){
  tomSelectInstance = new TomSelect("#tomSelectCompartido", {
    valueField: 'fieldId',    labelField: 'fieldName',    searchField: 'fieldName',
    options: coloresAPI,
    create: false,
    onChange: function(value) {
      if (!celdaActiva || !value) return;   
      // Obtener el texto del item seleccionado
      const option = this.options[value];
      celdaActiva.dataset.id = value;
      celdaActiva.dataset.name = option.fieldName;
    },
    onBlur: function() {
      // Cuando el Tom Select pierde el foco, restauramos el texto en la celda
      setTimeout(() => {        cerrarTomSelect();      }, 150); // Pequeño delay para permitir clicks internos
    }
  });
}
  
   
  gIC("inputs").addEventListener("focusin", (e) => {
    if (e.target.classList.contains("prod-color")) { 
      //activarTomSelectEnCelda(e.target);    
      activarS2(e.target,0);
    }
  });

  // Mover y activar el Tom Select en la celda correspondiente
  // Variable global para guardar el contenedor original oculto
  const contenedorOculto = document.getElementById("contenedor-tomselect-compartido");
  function activarTomSelectEnCelda(celda) {
    if (celdaActiva === celda) return;
    // Si había otra celda abierta, la cerramos primero
    if (celdaActiva) cerrarTomSelect();
    celdaActiva = celda;
    // Obtenemos el wrapper real de Tom Select (.ts-wrapper es el contenedor creado por la librería)
    const tsWrapper = tomSelectInstance.control.closest('.ts-wrapper');
    
    celda.innerHTML = ""; // Limpiamos texto de la celda e inyectamos el componente de Tom Select
    celda.appendChild(tsWrapper);
    
    // Seteamos el valor guardado o limpiamos
    if (celda.dataset.id) {
      tomSelectInstance.setValue(celda.dataset.id, true);
    } else { tomSelectInstance.clear(true);}

    // Enfocar y abrir el dropdown
    tomSelectInstance.focus();
    tomSelectInstance.open();
  }

  function cerrarTomSelect() {
    if (!celdaActiva) return;
    // Obtenemos el wrapper real de Tom Select
    const tsWrapper = tomSelectInstance.control.closest('.ts-wrapper');
    // Lo devolvemos al búnker oculto de forma segura
    if (tsWrapper && contenedorOculto) contenedorOculto.appendChild(tsWrapper);
    // Renderizamos el texto plano en la celda que acabamos de dejar
    celdaActiva.textContent = celdaActiva.dataset.name || "Seleccione un color...";
    celdaActiva = null;
  }  // 4. Capturar ENTER en el input de Peso para crear una nueva fila
gIC('inputs').addEventListener("keydown", (e) => {
  return;
    if (e.target.classList.contains("input-valor") && e.key === "Enter") {
      e.preventDefault(); // Evitar submit accidentales del form
      const filaActual = e.target.closest("tr");
      const celdaColorActual = filaActual.querySelector(".prod-color");
      // Obtener datos actuales del color para arrastrarlos a la nueva fila
      const colorId = celdaColorActual.dataset.id || "";
      const colorName = celdaColorActual.dataset.name || "Seleccione un color...";
      // Crear nueva fila clonando estructura o mediante template string
      const nuevaFila = document.createElement("tr");
      nuevaFila.classList.add("fila-rollo");
      nuevaFila.innerHTML = `
        <td class="prod-color" tabindex="0" data-id="${colorId}" data-name="${colorName}">${colorName}</td>
        <td>
          <input type="type="text" class="input-valor  input-peso form-control text-right" placeholder="0.00">
        </td>
      `;

      // Insertar debajo de la actual
      filaActual.insertAdjacentElement("afterend", nuevaFila);

      // Mover el foco directamente al input de peso de la nueva fila
      const nuevoInputPeso = nuevaFila.querySelector(".input-valor");
      nuevoInputPeso.focus();
      calcTotalPeso();
    }
  });

  // 5. Escuchar cambios de escritura en el Peso para actualizar totales en tiempo real
  gIC('inputs').addEventListener("input", (e) => {
    if (e.target.classList.contains("input-valor"))  calcTotalPeso();
  });
