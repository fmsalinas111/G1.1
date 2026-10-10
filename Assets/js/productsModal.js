// Arreglo global que contiene las imágenes de la galería en orden activo
let listaImagenesModal = []; 
let indiceArrastrado = null; // Guarda el índice del elemento que se está moviendo

// --- 1. ABRIR Y CERAR MODAL ---
function abrirModalNuevo() {
  _$('#formProducto').reset();  _$('#productoId').value = '';
  document.getElementById('modalProductoTitulo').innerText = 'Agregar Producto';
  listaImagenesModal = [];
  renderizarGaleriaUnificada()  
}

function abrirModalEditar() {  
		//._$('#modalProductoTitulo').innerText = 'Editar Producto';
}

function cerrarModalProducto() {  document.getElementById('modalProductos').classList.add('hidden');}

// --- 2. MANEJO Y COMPRESIÓN DE IMÁGENES ---
async function manejarArchivosSeleccionados(archivos) {
  for (const archivo of archivos) {
    if (listaImagenesModal.length >= 5) {
      alert("Puedes subir un máximo de 5 imágenes por producto.");
      break;
    }

    try {
      // Compresión Canvas nativa a WebP
      const { blob, dataUrl } = await comprimirImagenCanvas(archivo, 900, 0.8);
      listaImagenesModal.push({
        id: 'img_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        blob: blob,
        dataUrl: dataUrl,
        esExistente: false
      });
    } catch (e) {
      console.error("Error al procesar la imagen:", e);
    }
  }

  renderizarGaleriaModal();
}

// Función Canvas para comprimir imágenes
function comprimirImagenCanvas(file, maxDimension = 900, calidad = 0.8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        let w = img.width, h = img.height;
        if (w > h) {
          if (w > maxDimension) { h = Math.round((h * maxDimension) / w); w = maxDimension; }
        } else {
          if (h > maxDimension) { w = Math.round((w * maxDimension) / h); h = maxDimension; }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);

        const dataUrl = canvas.toDataURL('image/webp', calidad);
        canvas.toBlob((blob) => resolve({ blob, dataUrl }), 'image/webp', calidad);
      };
      img.onerror = reject;
    };
  });
}

// --- 3. RENDERIZADO UNIFICADO: GALERÍA + BOTÓN DE AGREGAR (+)
function renderizarGaleriaUnificada() {
  const contenedor = document.getElementById('galeriaUnificada');
  contenedor.innerHTML = '';
  // 1. Renderizar fotos cargadas (con soporte Drag & Drop)
  listaImagenesModal.forEach((item, index) => {
    const card = document.createElement('div');
    card.draggable = true;
    card.className = "relative group rounded-xl overflow-hidden border-2 border-gray-200 aspect-square bg-white shadow-sm cursor-grab active:cursor-grabbing hover:border-indigo-400 transition";
    card.dataset.index = index;

    card.innerHTML = `
      <img src="${item.dataUrl}" class="w-full h-full object-cover pointer-events-none">      
      <!-- Badge de Foto Principal -->
      ${index === 0 ? '<span class="absolute top-1.5 left-1.5 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">Principal</span>' : ''}
      <!-- Botón Eliminar -->
      <button type="button" onclick="eliminarImagenModal(${index})" 
              class="absolute top-1.5 right-1.5 bg-red-600/90 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs transition shadow-sm">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <!-- Indicador visual al pasar el cursor -->
      <div class="absolute inset-x-0 bottom-0 bg-black/50 text-white text-[10px] py-1 text-center opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-1">
        <i class="fa-solid fa-arrows-up-down-left-right"></i> Mover
      </div>
    `;
    // --- LÓGICA DE DRAG & DROP ENTRE TARJETAS ---
    card.addEventListener('dragstart', (e) => {
      indiceArrastrado = index;
      card.classList.add('opacity-30', 'scale-95');
      e.dataTransfer.effectAllowed = 'move';
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('opacity-30', 'scale-95');
      indiceArrastrado = null;
    });

    card.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      card.classList.add('border-indigo-500');
    });

    card.addEventListener('dragleave', () => {
      card.classList.remove('border-indigo-500');
    });

    card.addEventListener('drop', (e) => {
      e.preventDefault();
      card.classList.remove('border-indigo-500');
      const indiceDestino = parseInt(card.dataset.index);

      if (indiceArrastrado !== null && indiceArrastrado !== indiceDestino) {
        // Intercambiar posiciones en el array de imágenes
        const elementoMovido = listaImagenesModal.splice(indiceArrastrado, 1)[0];
        listaImagenesModal.splice(indiceDestino, 0, elementoMovido);
        renderizarGaleriaUnificada(); // Re-renderizar con el nuevo orden
      }
    });
    contenedor.appendChild(card);
  });

  // 2. Renderizar la Tarjeta (+) si aún no alcanza el límite de 5 fotos
  if (listaImagenesModal.length < 5) {
    const btnAgregar = document.createElement('div');
    btnAgregar.onclick = () => document.getElementById('inputGaleriaOculto').click();
    btnAgregar.className = "border-2 border-dashed border-gray-300 hover:border-indigo-500 bg-white hover:bg-indigo-50/30 rounded-xl aspect-square flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:text-indigo-600 transition group shadow-sm";    
    btnAgregar.innerHTML = `
      <div class="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-indigo-100 flex items-center justify-center mb-1 transition">
        <i class="fa-solid fa-plus text-lg"></i>
      </div>
      <span class="text-[11px] font-semibold">Añadir</span>
      <span class="text-[9px] text-gray-400">${listaImagenesModal.length}/5 fotos</span>
    `;
    contenedor.appendChild(btnAgregar);
  }
}

/*
  function eliminarImagenModal(index) {//td?
    listaImagenesModal.splice(index, 1);
    renderizarGaleriaModal();
  }
*/

// --- 5. ENVIAR FORMULARIO AL BACKEND (FETCH + FORMDATA) ---
async function guardar(e) {
  if (e) e.preventDefault();
  btnSaveUI();
  try {
    const formData = new FormData();
    // 1. Campos de texto básicos
    setCampo2('c'); formData.append('campos',JSON.stringify(arr1));
    // 2. Procesar la galería en ORDEN SECUENCIAL con un bucle for clásico
    for (let i = 0; i < listaImagenesModal.length; i++) {
      const item = listaImagenesModal[i];
      if (item.esExistente) {
        // Para imágenes que ya estaban guardadas en la BD (URLs)
        formData.append(`imagenes_existentes[${i}]`, item.dataUrl);
        formData.append(`existentes[${i}]`, item.dataUrl.substring(item.dataUrl.lastIndexOf('/') + 1))
      } else if (item.blob) { // Para imágenes NUEVAS comprimidas por Canvas
        // Pasamos el Blob directamente. PHP lo recibirá dentro de $_FILES['imagenes_nuevas']
        formData.append('imagenes_nuevas[]', item.blob, `foto_${i}_${Date.now()}.webp`);
      }
    }
    // 3. Envío Fetch al Backend PHP
    const respuesta = await fetch(base_url +'/products/setproduct2', {
      method: 'POST', body: formData //Importante: ¡NO pongas Content-Type Header! Fetch lo genera automáticamente con el boundary
    });

    const resultado = await respuesta.json();
    if (resultado.status) {
      //console.log(resultado);
      cerrarModalProducto();
      showToast();
      //showToast('¡Catálogo actualizado!', 'success');
    } else {
      alert('Error desde el servidor: ' + resultado.message);
    }

  } catch (err) {
    console.error('Error en la petición AJAX:', err);
    alert('Ocurrió un error al enviar las imágenes al servidor.');
  } finally {
    	btnSaveUI(false);
        productsData = await getProducts(); products = productsData;
        renderCategorySelect(getUniqueCats(productsData));
        if (typeof renderProducts === "function") {
          renderProducts(productsData);
        } else {
          render();
        }

  }
}


// ELIMINAR FOTO DE LA LISTA
function eliminarImagenModal(index) {
  listaImagenesModal.splice(index, 1);
  renderizarGaleriaUnificada();
}

// PROCESAR Y COMPRIMIR IMÁGENES SELECCIONADAS (CANVAS WEBP)
async function manejarArchivosSeleccionados(archivos) {
  for (const archivo of archivos) {
    if (listaImagenesModal.length >= 5) {alert("Límite máximo (5 imágenes)."); break;}
    try {
      // Comprensión cliente Canvas
      const { blob, dataUrl } = await comprimirImagenCanvas(archivo, 900, 0.8);
      listaImagenesModal.push({
        id: 'img_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        blob: blob,        dataUrl: dataUrl,
        esExistente: false
      });
    } catch (e) {
      console.error("Error al comprimir la imagen:", e);
    }
  }
  // Limpiar input file para permitir re-seleccionar los mismos archivos si es necesario
  document.getElementById('inputGaleriaOculto').value = '';
  renderizarGaleriaUnificada();
}

// REGISTRAR DROP EN TODO EL CONTENEDOR (Arrastrar desde la PC/Móvil)
document.addEventListener('DOMContentLoaded', () => {//td?
  const dropzoneGlobal = document.getElementById('contenedorDropzoneGaleria');
  dropzoneGlobal.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzoneGlobal.classList.add('border-indigo-500', 'bg-indigo-50/20');
  });

  dropzoneGlobal.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropzoneGlobal.classList.remove('border-indigo-500', 'bg-indigo-50/20');
  });

  dropzoneGlobal.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzoneGlobal.classList.remove('border-indigo-500', 'bg-indigo-50/20');
    
    // Si se sueltan archivos del sistema operativo
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      manejarArchivosSeleccionados(e.dataTransfer.files);
    }
  });
});

////////////////////////////
function renderCategorySelectModal(cats) {
  //console.log('renderCategorySelectModal', cats);
    const select = document.getElementById('prodCategoria');
    const padreSelect = document.getElementById('catPadreId');
    if (!select) return;    
    select.innerHTML = `<option value="0" hidden>-- Categoría --</option>`;    
    padreSelect.innerHTML = `<option value="0" hidden>-- Categoría principal--</option>`;    
    cats.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.fieldId; option.textContent = cat.fieldName;
        select.appendChild(option); 
        //padreSelect.appendChild(option);
    });
    if (select.tomselect) select.tomselect.destroy();
    new TomSelect(select, {
        create: false,        //sortField: { field: "text", order: "asc" }
    });
}


function getUniqueCats(p){
  // 1. Crear un objeto o mapa temporal para asegurarnos de que cada categoría sea única
  const categoriasMap = p.reduce((acc, product) => {
    // Si la categoría no existe en el acumulador, la agregamos
    if (!acc[product.category]) {
      acc[product.category] = {
        categoryid: product.cid || product.category.toLowerCase().replace(/\s+/g, '-'), // O un ID generado/existente
        categoryname: product.category };
    }
    return acc;
  }, {});
  // 2. Convertir el objeto a un array y ordenarlo por categoryname
  return categoriasUnicasOrdenadas = Object.values(categoriasMap).sort((a, b) => 
    a.categoryname.localeCompare(b.categoryname)
  );
}

function renderCategorySelect(categories) {
    if (categories.length==1 && categories[0] === '') {hide2(['cats']); return;}
    const select = document.getElementById('filtroCategoria');
    if (!select) return;    
    select.innerHTML = `<option value="todos">todos</option>`;    
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.categoryid; option.textContent = cat.categoryname;
        select.appendChild(option);
    });
    if (select.tomselect) select.tomselect.destroy();
    new TomSelect(select, {
        create: false,
        //sortField: { field: "text", order: "asc" }
    });
}
