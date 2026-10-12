apiColores=[];
async function obtenerDatos(data) {
    try {
        const resultado = await getSome3('Data/getData/16',{"src" : "data" }, cargarDatalist);
    } catch (error) {        console.error("Hubo un error:", error);    }
}

const cargarDatalist = data =>{ console.log(data);
    data.forEach(r=>{           apiColores.push({id:r.dataid, text:r.dataname});          });
}

obtenerDatos();

textil_inc = getLSobj('textil_inc');
gIC('prodname').innerHTML = `Producto: <mark>${textil_inc.prodName.toUpperCase()}</mark>`;
gIC('vendor').innerHTML = `Proveedor: ${textil_inc.vendor}`;

    // 1. Simulación de la API de colores
    function calcularTotalPesos() {
        let total = 0; let i=0;
        $('.input-peso').each(function() { i++;
            const valor = parseFloat($(this).val()) || 0;
            total += valor;  });
        $('#cant').text(i); $('#celdaTotal').text(total.toFixed(1));
    }
    calcularTotalPesos();

    $('#tablaMateriales').on('input', '.input-peso', function() {
        $(this).closest('tr').removeClass('fila-error'); // Limpiar error si el usuario corrige el peso
        calcularTotalPesos();
    });

    // 2. Control de teclado: ENTER y Navegación con Flechas (↑ / ↓) en Pesos
    $('#tablaMateriales').on('keydown', '.input-peso', function(e) {
        const filaActual = $(this).closest('tr');

        if (e.which === 13) { // ENTER: Duplica fila manteniendo el mismo color por defecto
            e.preventDefault();
            const idColorActual = filaActual.attr('data-id-color');
            const textoColorActual = filaActual.find('.editable-color').text().trim();

            const nuevaFila = filaActual.clone();
            nuevaFila.removeClass('fila-error'); // Clonar sin el estado de error
            nuevaFila.attr('data-id-color', idColorActual);
            nuevaFila.find('.editable-color').text(textoColorActual).attr('tabindex', '0'); // Mantener la celda enfocable
            nuevaFila.find('.input-peso').val('0.0');

            filaActual.after(nuevaFila);
            nuevaFila.find('.input-peso').focus().select();
            
            calcularTotalPesos();
        }

        if (e.which === 38) { // Flecha Arriba
            e.preventDefault();
            const filaAnterior = filaActual.prev('tr');
            if (filaAnterior.length > 0) {
                filaAnterior.find('.input-peso').focus().select();
            }
        }

        if (e.which === 40) { // Flecha Abajo
            e.preventDefault();
            const filaSiguiente = filaActual.next('tr');
            if (filaSiguiente.length > 0) {
                filaSiguiente.find('.input-peso').focus().select();
            }
        }
    });

    // Interceptar Enter (13) o Espacio (32) cuando la celda de color tiene el foco del teclado
    $('#tablaMateriales').on('keydown', '.editable-color', function(e) {
        if (e.which === 13 || e.which === 32) { 
            e.preventDefault();
            $(this).trigger('click'); // Disparar la apertura de Select2
        }
    });

    // 3. Eliminar Fila
    $('#tablaMateriales').on('click', '.btn-eliminar', function() {
        const totalFilas = $('#tablaMateriales tbody tr').length;
        if (totalFilas > 1) {
            $(this).closest('tr').remove();
            calcularTotalPesos();
        } else {
            alert("La tabla debe contener al menos una fila activa para trabajar.");
        }
    });

    // 4. Inicialización y lógica del Select2 Dinámico
    $('#tablaMateriales').on('click', '.editable-color', function() {
        if ($(this).find('select').length > 0) return;
        const celda = $(this);
        const fila = celda.closest('tr');
        
        const textoOriginal = celda.text().trim();
        const idOriginal = fila.attr('data-id-color');

        const selectElement = $('<select></select>').css('width', '100%');

        apiColores.forEach(function(color) {
            const selected = (color.id == idOriginal) ? 'selected' : '';
            selectElement.append(`<option value="${color.id}" ${selected}>${color.text}</option>`);
        });
        celda.html(selectElement);
        selectElement.select2({ minimumResultsForSearch: Infinity }).select2('open');

        // Escuchar ESC para cancelar
        $('.select2-container').on('keydown', function(match) {
            if (match.which === 27) { 
                selectElement.select2('destroy');
                celda.html(textoOriginal).focus(); // Regresar foco a la celda original
                fila.attr('data-id-color', idOriginal);
            }
        });
        // Al seleccionar color
        selectElement.on('select2:select', function() {
            const nuevoId = selectElement.val();
            const nuevoTexto = selectElement.find('option:selected').text();
            
            selectElement.select2('destroy');
            celda.html(nuevoTexto).focus(); // Regresar foco a la celda cambiada
            fila.attr('data-id-color', nuevoId);
        });

        // Cierre preventivo por click exterior
        selectElement.on('select2:close', function() {
            setTimeout(function() {
                if (celda.find('select').length > 0) {
                    selectElement.select2('destroy');
                    celda.html(textoOriginal);
                }
            }, 100);
        });
    });

    // 5. Validación preventiva y envío de la Matriz final
    $('#btnGuardar').on('click', function() {
        const matrizDatos = [];
        let tieneErrores = false;

        // Limpiar estilos de errores previos
        $('#tablaMateriales tbody tr').removeClass('fila-error');

        $('#tablaMateriales tbody tr').each(function() {
            const fila = $(this);
            const idColor = parseInt(fila.attr('data-id-color')) || null;
            const peso = parseFloat(fila.find('.input-peso').val()) || 0;

            // Validación: Prevenir ceros o valores vacíos
            if (peso <= 0) {
                fila.addClass('fila-error');
                if (!tieneErrores) {
                    fila.find('.input-peso').focus().select(); // Enfoca el primer error encontrado
                }
                tieneErrores = true;
            }

            matrizDatos.push({ idColor: idColor, peso: peso });
        });

        if (tieneErrores) {
            alert("No se puede guardar. Por favor, corrige las filas marcadas con pesos mayores a 0.");
            return; // Detiene la ejecución del envío de datos
        }

        console.log("Matriz validada y lista:", matrizDatos);
        alert("¡Éxito! Matriz generada sin ceros y lista para el servidor.");
    });
