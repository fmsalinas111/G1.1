document.querySelectorAll('.tom-select').forEach((el) => {
  new TomSelect(el, {
    create: true,
    sortField: { field: "text", order: "asc" },
    plugins: ['remove_button']
  });
});
/*
{
  "rubro": "Farmacia",
  "campos_activos": {
    "requiere_receta": true,
    "laboratorio": true,
    "lote_vencimiento": true,
    "unidad_medida": "Comprimidos / ML",
    "fraccionable": true
  }
}
*/
// Alternar Vista Tabla / Cards
function cambiarVista(tipo) {
  const tabla = document.getElementById('vistaTabla');
  const cards = document.getElementById('vistaCards');
  const btnTabla = document.getElementById('btnVistaTabla');
  const btnCards = document.getElementById('btnVistaCards');
  if (tipo === 'tabla') {
    tabla.classList.remove('hidden');    cards.classList.add('hidden');
    btnTabla.className = "px-3 py-1 text-xs font-medium rounded-md bg-white text-gray-800 shadow-sm transition";
    btnCards.className = "px-3 py-1 text-xs font-medium rounded-md text-gray-500 hover:text-gray-800 transition";
  } else {
    tabla.classList.add('hidden');    cards.classList.remove('hidden');
    btnCards.className = "px-3 py-1 text-xs font-medium rounded-md bg-white text-gray-800 shadow-sm transition";
    btnTabla.className = "px-3 py-1 text-xs font-medium rounded-md text-gray-500 hover:text-gray-800 transition";
  }
}
// Control de Abrir / Cerrar Modales
function toggleModal(modalId, nuevo=true, p) {
  if (nuevo) abrirModalNuevo(); else abrirModalEditar(p);
  renderCategorySelectModal(categories); //
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.toggle('hidden');  
}

let galeriaImagenes = [];
async function procesarImagenes(archivos) {
  const contenedor = document.getElementById('contenedorPreviews');
  // Usamos bucle for...of clásico para asegurar que las promesas de compresión
  // y renderizado de imágenes se ejecuten ordenadamente sin bloquear el hilo principal.
  for (const archivo of archivos) {
    if (galeriaImagenes.length >= 5) {
      alert("Solo se permiten hasta 5 imágenes por producto."); break;
    }
    try {
      // Compresión Canvas JS
      const imagenComprimida = await comprimirImagenCanvas(archivo, 800, 0.85);      
      const idUnico = Date.now() + Math.random().toString(36).substring(2, 5);
      galeriaImagenes.push({ id: idUnico, blob: imagenComprimida.blob, dataUrl: imagenComprimida.dataUrl });
      // Renderizar la miniatura en el DOM
      const card = document.createElement('div');
      card.id = `img-${idUnico}`;
      card.className = "relative group rounded-lg overflow-hidden border border-gray-200 aspect-square bg-gray-100";
      card.innerHTML = `
        <img src="${imagenComprimida.dataUrl}" class="w-full h-full object-cover">
        <button type="button" onclick="eliminarImagen('${idUnico}')" 
                class="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs opacity-90 hover:opacity-100 transition">
          <i class="fa-solid fa-xmark"></i>
        </button>
      `;
      contenedor.appendChild(card);
    } catch (e) {
      console.error("Error al comprimir la imagen:", e);
    }
  }
}
// Función Canvas para comprimir imágenes del lado del cliente
function comprimirImagenCanvas1(file, maxDimension = 800, calidad = 0.8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        // Redimensionar proporcionalmente
        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        // Exportar como WebP para máxima compresión
        const dataUrl = canvas.toDataURL('image/webp', calidad);
        canvas.toBlob((blob) => {
          resolve({ blob, dataUrl });
        }, 'image/webp', calidad);
      };
      img.onerror = (error) => reject(error);
    };
  });
}
function eliminarImagen(id) {
  galeriaImagenes = galeriaImagenes.filter(item => item.id !== id);
  const el = document.getElementById(`img-${id}`);
  if (el) el.remove();
}
// ==========================================
// CONTROL DE ESTADOS DE CARGANDO Y ERROR
// ==========================================
// 1. Muestra esqueletos animados (Skeletons) mientras se obtienen los productos
function showLoadingState() {
    const grid = document.getElementsByTagName('tbody')[0];
    if (!grid) return;
    // Genera 4 tarjetas "esqueleto" vacías con animación de pulso
    grid.innerHTML = Array(4).fill(0).map(() => `
                            <tr class="hover:bg-gray-50/50 transition">
            <td class="p-4 flex items-center gap-3">
              <img src="" class="w-10 h-10 rounded-lg object-cover border" alt="Prod">
              <div>
                <p class="font-medium text-gray-800">Taladro Percutor 13mm 750W</p>
                <p class="text-xs text-gray-400">SKU: FER-9982</p>
              </div>
            </td>
            <td class="p-4 text-gray-600">Ferretería</td>
            <td class="p-4 font-semibold text-gray-800">$ 45.000</td>
            <td class="p-4"><span class="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">$ 39.900</span></td>
            <td class="p-4 font-semibold text-emerald-600">18 unid.</td>
            <td class="p-4">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Visible
              </span>
            </td>
            <td class="p-4 text-right space-x-1">
              <button class="p-2 text-gray-400 hover:text-indigo-600 transition" title="Editar"><i class="fa-solid fa-pen"></i></button>
              <button class="p-2 text-gray-400 hover:text-red-600 transition" title="Inactivar"><i class="fa-solid fa-trash-can"></i></button>
            </td>
          </tr>`).join(''); //skeleton
}
function showErrorState(message = "Ocurrió un error al cargar los productos.") {
    const grid = document.getElementById('vistaTabla');
    if (!grid) return;
    grid.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-500">
            <div class="inline-flex p-3 bg-red-50 text-red-500 rounded-full mb-3">
                <i data-lucide="alert-circle" class="w-8 h-8"></i>
            </div>
            <p class="font-bold text-slate-800 text-lg mb-1">¡Ups! Algo salió mal</p>
            <p class="text-sm text-slate-500 mb-4">${message}</p>
            <button onclick="initApp()" class="px-4 py-2 bg-blue-600 text-white font-medium text-xs rounded-xl hover:bg-blue-700 transition">
                Reintentar
            </button>
        </div>
    `;
    if (window.lucide) lucide.createIcons();
}
async function getProducts() {
    const API_URL = base_url +'products/getMyProducts2/' + (getLS('prod_source')||1);      
    try {
        const response = await fetch(API_URL, {method: 'GET', headers: {'Content-Type': 'application/json'}});
        if (!response.ok) {//si la respuesta del servidor fue exitosa (código 200-299)
            throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }
        const data = await response.json(); // Retornar los datos (asegurando un array)
        return Array.isArray(data) ? data : (data.products || []);
    } catch (error) {
        console.error(" Error al obtener productos en getProducts():", error);
        throw error; 
    }
}
let productsData = []; let categoriasUnicasOrdenadas = []; let categories = []; 
async function initApp() {
  const inputBusqueda = document.getElementById('inputBusqueda');
  if (inputBusqueda) {inputBusqueda.addEventListener('keyup', debounce(filtrarProductos, 300));    }
  showLoadingState(); // Muestra esqueletos / spinner
  categories = await getSome3('Data/getDataCmb/3',{'src':'data'});
  try {
        // La ejecución se PAUSA aquí hasta que getProducts() termina de traer los datos
        productsData = await getProducts();
        //categoriasUnicasOrdenadas = [...new Set(productsData.map(p => p.category))].sort();
        //categoriasUnicasOrdenadas = getUniqueCats();
        renderCategorySelect(getUniqueCats(productsData));
        renderProducts(productsData);
        if (android) cambiarVista('cards');
    } catch (error) {
        // Si la API falla o da error 404/500, capturamos el fallo suavemente
        showErrorState("No pudimos cargar los productos en este momento.");
    }
}


if (document.readyState !== 'loading') { 
  initApp();
}else {
  document.addEventListener('DOMContentLoaded', initApp);
}

// ==========================================
// LÓGICA DE FILTRADO Y CATEGORÍAS
// ==========================================
function filter(e) {
    const select = document.getElementById(e.target.id);
    if (e.target.id == 'filtroCategoria') activeCategory =  select.options[select.selectedIndex].text;
    if (e.target.id == 'filtroEstado') activeStates =  select.value;
    if (e.target.id == 'chk-active')  acActive =  (select.checked)?1:0;
    if (e.target.id == 'chk-visible') acVisible =  (select.checked)?1:0;
       // if (campos.item(i).type==='checkbox') valor = (campos.item(i).checked)?1:0;
    console.log(activeCategory, acActive, acVisible);
    renderProducts();
}
function filterSubcategory(subcat) {
    activeSubcategory = subcat;
    document.querySelectorAll('.subcat-btn').forEach(btn => {
        btn.className = "subcat-btn text-xs font-medium px-3 py-1 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition shrink-0";
    });
    e.target.className = "subcat-btn text-xs font-medium px-3 py-1 rounded-full bg-slate-800 text-white transition shrink-0";
    renderProducts();
}
let activeCategory = 'todos'; let activeSubcategory = 'todos';
//let activeStates = 'todos';
let acActive = 1; let acVisible = 1;  
function renderProducts() {
    const grid = document.getElementsByTagName('tbody')[0];
    const cards = document.getElementById('vistaCards');    
    console.log(activeCategory, acActive, acVisible);    
    const chkActive = gId('chk-active');
    const chkVisible = gId('chk-visible');  
    const filtered = productsData.filter(p => {
        const matchCat = activeCategory === 'todos' || p.category === activeCategory;
        //const matchSub = activeSubcategory === 'todos' || p.subcategory === activeSubcategory;
        //const matchStt = activeStates === "todos" || p.estado == activeStates;
        const matchSearch = gId('inputBusqueda').value.toLowerCase().trim();
        const coincideTexto = !matchSearch || p.name.toLowerCase().includes(matchSearch) ||
              (p.art && p.art.toLowerCase().includes(matchSearch)) ||
              (p.baco && p.baco.toLowerCase().includes(matchSearch)) ;
            //console.log(matchCat , matchSub , matchStt , coincideTexto;);
// Si el checkbox está marcado, exige que cumpla la condición; si no, ignora la condición
        const matchActive = acActive ==1 || p.estado === acActive;
        const matchVisible = acVisible ==1 || p.visible === acVisible;            
            return matchCat  && coincideTexto && matchActive  && matchVisible  ;
    });
    console.log(filtered.length, activeCategory, acActive, acVisible);
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-12 text-center text-slate-400">
                <i data-lucide="package-search" class="w-12 h-12 mx-auto mb-2 stroke-1"></i>
                <p class="font-semibold text-slate-600">No se encontraron productos en esta categoría.</p>
            </div>
        `;
        //lucide.createIcons();
        return;
    }
    console.log('rendering products:', filtered);
    grid.innerHTML = filtered.map(p => `
          <tr class="hover:bg-gray-50/50 transition" prid=${p.prid}>
            <td class="p-4 flex items-center gap-3">
              <img src="${p.images[0]}" alt="${p.name}" class="w-20 h-20 rounded-lg object-cover border" 
              onerror="this.onerror=null; this.src='${base_url}/Assets/images/uploads/default.jpg';" 
                alt="Sin imagen">
              <div>
                <p class="font-medium text-gray-800">${p.name}</p>
                <p class="text-xs text-gray-400">SKU: FER-10002</p>
              </div>
            </td>
            <td class="p-4 text-gray-600">${p.category}</td>
            <td class="p-4 font-semibold text-gray-800">${p.price}</td>
            <td class="p-4 font-semibold text-gray-800">e${p.estado}</td>
            <td class="p-4 font-semibold text-gray-800">in${p.visible}</td>
            <td class="p-4">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Visible
              </span>
            </td>
            <td class="p-4 text-right space-x-1">
              <button prid="e,${p.prid}" class="_edit p-2 text-gray-400 hover:text-indigo-600 transition" title="Editar"><i class="fa-solid fa-pen"></i></button>
              <button prid="d,${p.prid}" class="_delete p-2 text-gray-400 hover:text-red-600 transition" title="Inactivar"><i class="fa-solid fa-trash-can"></i></button>
            </td>
          </tr>
    `).join('');
    //lucide.createIcons();
    //la sigte linea iba debajo de la img 
    //<span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">OFERTA</span>
    cards.innerHTML = filtered.map(p => `
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 relative flex flex-col justify-between hover:shadow-md transition" prid =${p.prid}>
            <div class="flex">
              <div class="relative mb-1">
                <img src="${p.images[0]}" alt="${p.name}" class="w-full h-35 object-cover rounded-lg" alt="Prod"
                onerror="this.onerror=null; this.src='${base_url}/Assets/images/uploads/default.jpg';" 
                alt="Sin imagen">
              </div>
              <div class="ml-3">
              <div>
                <h3 class="font-bold text-gray-800 text-base leading-snug mt-1">${p.name}</h3>
              </div>
              <div class="mt-1 pt-1 border-t border-gray-100 flex items-center justify-between">
                <span class="text-xs font-medium text-indigo-600 uppercase tracking-wider">${p.category}</span>
                <span class="text-xs font-semibold text-blue-500 curva">Curva: ${p.multiplo}</span>
              </div>
                <p class="truncate text-xs text-gray-400 mt-0.5">SKU: ${p.art}</p>                
                <span class=" hidden text-xs text-gray-400 line-through">$ 45.000</span>
                <p class="text-lg font-bold text-gray-900">Precio: ${p.price}</p>
                <div class="flex gap-1">
                  <button prid="v,${p.prid}" class="_edit p-2 bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition"><i class="fa-solid fa-eye"></i></button>
                  <button prid="e,${p.prid}" class="_edit p-2 bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition"><i class="fa-solid fa-pen"></i></button>
                </div>
              </div>
            </div>
            <div class="mt-1 pt-1 border-t border-gray-100 flex items-center justify-between">
            </div>
          </div> 
      `).join('');  //cards
}
//detectando los botones _edit
const clickProd = data =>{
    cell = data.target;
    if(!(cell.tagName==='BUTTON'||cell.tagName==='I'))return;
    if (cell.tagName==='I') cell = cell.parentNode;
    //console.log(cell);
    [action, prid] = cell.getAttribute('prid').split(',');
    const foundEl = productsData.find(p => p.prid == prid);
    if (!foundEl||!["e", "d"].includes(action)){alert('sus actividades serán revisadas'); return null;}
    if (action==="d") {alert('confirmar eliminación: '+prid); return null;}
    toggleModal('modalProductos', false);  
    gId('prodNombre').value = foundEl.name;
    gId('prodSku').value = foundEl.art||'';
    gId('prodCategoria').tomselect.setValue(foundEl.cid);
    gId('prodPrecioLista').value = foundEl.price;
    gId('productoId').value = foundEl.prid;
    gId('prodCurva').value = foundEl.multiplo;
    gId('prodActivo').checked = foundEl.estado;
    gId('prodVisibleWeb').checked = foundEl.visible;
    // images
    //console.log(listaImagenesModal, foundEl.images);
    listaImagenesModal = (foundEl.images || []).map((url, index) => ({
      id: 'existente_' + index + '_' + Date.now(),
      id: index + '_' + Date.now(),
      dataUrl: url,
      blob: null, // Ya está en el servidor
      esExistente: true
    }));    
    renderizarGaleriaUnificada()
}
gId('vistaTabla').addEventListener('click', e => clickProd(e));
gId('vistaCards').addEventListener('click', e => clickProd(e));
//items.addEventListener("click", e => checkClick(e,items));
// LÓGICA PRINCIPAL DE FILTRADO COMBINADO
function filtrarProductos() {
  // 1. Capturar los valores actuales de los insumos de control
  const textoBusqueda = document.getElementById('inputBusqueda').value.toLowerCase().trim();
  const categoriaSel = document.getElementById('filtroCategoria').value;
  const estadoSel = document.getElementById('filtroEstado').value;
  const ofertaSel = document.getElementById('filtroOferta').value;
  // 2. Aplicar los filtros encadenados sobre el listado global
  console.log('hello');
  const productosFiltrados = productsData.filter(prod => {
    // A. Filtro BÚSQUEDA POR TEXTO (Nombre, SKU o Código de barras)
    const coincideTexto = !textoBusqueda || 
      prod.name.toLowerCase().includes(textoBusqueda) ;//||
      //(prod.sku && prod.sku.toLowerCase().includes(textoBusqueda)) ||
      //(prod.barcode && prod.codigo_barra.includes(textoBusqueda));
    // B. Filtro POR CATEGORÍA
    const coincideCategoria = !categoriaSel || prod.categoria === categoriaSel;
    //const selectCat = document.getElementById('filtroCategoria');
    //activeCategory =  selectCat.options[selectCat.selectedIndex].text
    /*
    // C. Filtro POR ESTADO (Activo, Inactivo, Invisible)
    let coincideEstado = true;
    if (estadoSel === 'activo') {
      coincideEstado = prod.activo == 1;
    } else if (estadoSel === 'inactivo') {
      coincideEstado = prod.activo == 0;
    } else if (estadoSel === 'invisible') {
      coincideEstado = prod.visible_web == 0;
    }
    // D. Filtro POR OFERTA
    let coincideOferta = true;
    if (ofertaSel === 'oferta') {
      coincideOferta = prod.precio_oferta && parseFloat(prod.precio_oferta) > 0;
    } else if (ofertaSel === 'regular') {
      coincideOferta = !prod.precio_oferta || parseFloat(prod.precio_oferta) === 0;
    }
    // Retorna true solo si pasa los 4 filtros al mismo tiempo
    return coincideTexto && coincideCategoria && coincideEstado && coincideOferta;
    */
   console.log('coincideTexto:', coincideTexto, 'coincideCategoria:', coincideCategoria);
   return coincideTexto && coincideCategoria;
  });
  console.log(productosFiltrados.length);
  // 3. Renderizar el resultado filtrado en el DOM
  //renderizarTablaYCards(productosFiltrados);
  renderProducts();
  actualizarContadorResultados(productosFiltrados.length, productsData.length);
}
// RENDERIZADO REACTIVO DE TABLA Y CARDS
function renderizarTablaYCards(lista) {
  const tbody = document.querySelector('#vistaTabla tbody');
  const contenedorCards = document.getElementById('vistaCards');
  // Limpiar vistas actuales
  tbody.innerHTML = '';
  contenedorCards.innerHTML = '';
  if (lista.length === 0) {
    const mensajeVacio = `
      <tr>
        <td colspan="7" class="text-center py-8 text-gray-400">
          <i class="fa-solid fa-box-open text-3xl mb-2"></i>
          <p class="text-sm">No se encontraron productos con los filtros aplicados.</p>
        </td>
      </tr>`;
    tbody.innerHTML = mensajeVacio;
    contenedorCards.innerHTML = `<div class="col-span-full text-center py-8 text-gray-400"><p class="text-sm">No hay productos que coincidan.</p></div>`;
    return;
  }
  // Iterar e inyectar filas / tarjetas
  lista.forEach(prod => {
    // A. Inyectar Fila en Tabla
    const tr = document.createElement('tr');
    tr.className = "hover:bg-gray-50/50 transition border-b border-gray-100";
    tr.innerHTML = `
      <td class="p-4 flex items-center gap-3">
        <img src="${prod.images[0]}" alt="${prod.name}" class="w-10 h-10 rounded-lg object-cover border" >
        <div>
          <p class="font-medium text-gray-800">${prod.name}</p>
          <p class="text-xs text-gray-400">SKU: ${prod.art || 'N/A'}</p>
        </div>
      </td>
      <td class="p-4 text-gray-600 capitalize">${prod.category}</td>
      <td class="p-4 font-semibold text-gray-800">$ ${prod.price}</td>
      <td class="p-4">
        ${prod.precio_oferta ? `<span class="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">$ ${formatCurrency(prod.precio_oferta)}</span>` : '<span class="text-xs text-gray-400">-</span>'}
      </td>
      <td class="p-4 font-semibold ${prod.stock > 0 ? 'text-emerald-600' : 'text-red-500'}">${prod.stock} unid.</td>
      <td class="p-4">
        ${prod.visible_web == 1 
          ? '<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Visible</span>'
          : '<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200"><span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Oculto</span>'}
      </td>
      <td class="p-4 text-right space-x-1">
        <button onclick='abrirModalEditar(${JSON.stringify(prod)})' class="p-2 text-gray-400 hover:text-indigo-600 transition" title="Editar"><i class="fa-solid fa-pen"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
    // B. Inyectar Card
    const card = document.createElement('div');
    card.className = "bg-white rounded-xl border border-gray-100 shadow-sm p-4 relative flex flex-col justify-between hover:shadow-md transition";
    card.innerHTML = `
      <div>
        <div class="relative mb-3">
          <img src="${prod.images[0]}" alt="${prod.name}" class="w-full h-40 object-cover rounded-lg" alt="${prod.nombre}">
          ${prod.price ? '<span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">OFERTA</span>' : ''}
        </div>
        <span class="text-xs font-medium text-indigo-600 uppercase tracking-wider">${prod.category}</span>
        <h3 class="font-bold text-gray-800 text-base leading-snug mt-1">${prod.name}</h3>
        <p class="text-xs text-gray-400 mt-0.5">SKU: ${prod.art || 'N/A'}</p>
      </div>
      <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div>
          ${prod.precio_oferta ? `<span class="text-xs text-gray-400 line-through">$ ${(prod.price)}</span>` : ''}
          <p class="text-lg font-bold text-gray-900">$ 555</p>
        </div>
        <button onclick='abrirModalEditar(${JSON.stringify(prod)})' class="p-2 bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition"><i class="fa-solid fa-pen"></i></button>
      </div>
    `;
    contenedorCards.appendChild(card);
  });
}
// ACTUALIZAR LEYENDA DEL CONTADOR
function actualizarContadorResultados(visibles, totales) {
  const contador = document.getElementById('contadorResultados');
  if (contador) {
    contador.innerText = `Mostrando ${visibles} de ${totales} productos`;
  }
}
// Función Helper Debounce
function debounce(func, delay = 300) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
}
const btnBackToTop = document.getElementById('btn-back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        btnBackToTop.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
    } else {
        btnBackToTop.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
    }
});
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
