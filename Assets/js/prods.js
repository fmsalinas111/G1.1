document.querySelectorAll('.tom-select').forEach((el) => {
  new TomSelect(el, {
    create: true,
    sortField: { field: "text", order: "asc" },
    plugins: ['remove_button']
  });
});let  products = []; let  categories = [];
async function initApp() {
  try {
    products = await getProducts();
    categories = await getCats();
    renderCategorySelect(getUniqueCats(products));
    render();
    if (android)  switchView('cards');  // cambiarVista('cards');
    } catch (error) {        console.log(error);    }
}

const getProducts = async () => {return await getSome3('products/getMyProducts2/' + (getLS('prod_source')||1));}
const getCats = async () => {return await getSome3('Data/getDataCmb/3',{'src':'data'});}
/* =====================================================
   INICIO
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

// ============================================================
// ESTADO
// ============================================================
const state = {
  search: "",
  visible: null,
  activo: null,
  category: "todas",
  sortBy: "nombre",
  sortDirection: "asc",
  page: 1,
  pageSize: 10,
  selected: new Set(),
  vistaCards: true
};
// ============================================================
// ELEMENTOS
// ============================================================
const productTable =  document.getElementById("productTable");
const emptyState =  document.getElementById("emptyState");
const resultCount =  document.getElementById("resultCount");
const pagination =  document.getElementById("pagination");
const selectAll =  document.getElementById("selectAll");
const bulkActions =  document.getElementById("bulkActions");
const selectedCount =  document.getElementById("selectedCount");
// ============================================================
// OBTENER PRODUCTOS FILTRADOS
// ============================================================
function getFilteredProducts() {
  const search = state.search.toLowerCase().trim();
  return products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      product.art.toLowerCase().includes(search);
      matchesCategory = state.category === "todas" || product.category === _$('#filtroCategoria').options[_$('#filtroCategoria').selectedIndex].text ;
    const matchesVisible = state.visible === null || product.visible === state.visible;
    const matchesActivo =  state.activo === null ||  product.estado === state.activo;
    return (matchesSearch && matchesVisible && matchesActivo  && matchesCategory);
  });
}


// ============================================================
// ORDENAMIENTO
// ============================================================
function sortProducts(list) {
  return [...list].sort((a, b) => {
    let valueA = a[state.sortBy];
    let valueB = b[state.sortBy];
    if (typeof valueA === "string") {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }
    if (valueA < valueB) return state.sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return state.sortDirection === "asc" ? 1 : -1;
    return 0;
  });
}
// ============================================================
// RENDER PRINCIPAL
// ============================================================
function render() {
  let filtered = getFilteredProducts();
  filtered = sortProducts(filtered);
  // ----------------------------------------------------------
  // PAGINACIÓN
  // ----------------------------------------------------------
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(  total / state.pageSize  ));
  if (state.page > totalPages) { state.page = totalPages;  }
  const start = (state.page - 1) * state.pageSize;
  const pageProducts = filtered.slice( start, start + state.pageSize);
  // -----
  // CONTADOR
  // ----------------------------------------------------------
  resultCount.textContent =`${total} ${total === 1? "producto": "productos"}`;
  // ----------------------------------------------------------
  // TABLA
  // ----------------------------------------------------------
  productTable.innerHTML = "";
  if (pageProducts.length === 0) { emptyState.classList.remove("hidden" );
  } else {emptyState.classList.add("hidden");  }
  //_$('#vistaCards').innerHTML = "";
  if(state.vistaCards) {
    // Renderizar en vista de tarjetas
        _$('#vistaTarjetas').innerHTML = filtered.map(p => `
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
                  <button prid="v,${p.prid}" onclick="abrirModal(${p.prid})" class="_edit p-2 bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition"><i class="fa-solid fa-eye"></i></button>
                  <button prid="e,${p.prid}" onclick="abrirModal(${p.prid})" class="_edit p-2 bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition"><i class="fa-solid fa-pen"></i></button>
                </div>
              </div>
            </div>
            <div class="mt-1 pt-1 border-t border-gray-100 flex items-center justify-between">
            </div>
          </div> 
      `).join('');  //cards

    return;
  }
  pageProducts.forEach(product => {
    const row = document.createElement("tr");
    row.className = "hover:bg-gray-50 transition";
    row.setAttribute("prid", product.prid);
    const isSelected = state.selected.has(product.prid);
    /*
      <!-- PRODUCTO -->
      <td class="px-5 py-4">
        <div class="font-medium text-gray-900">${product.name}</div>
      </td>
    */
    row.innerHTML = `
      <!-- CHECKBOX -->
      <td class="px-5 py-4">
        <input type="checkbox" class="product-checkbox w-4 h-4 rounded border-gray-300"
          data-id="${product.prid}" ${isSelected ? "checked" : ""}>
      </td>

      <!-- PRODUCTO -->
            <td class="p-4 flex items-center gap-3">
              <img src="${product.images[0]}" alt="${product.name}" class="w-20 h-20 rounded-lg object-cover border" 
              onerror="this.onerror=null; this.src='${base_url}/Assets/images/uploads/default.jpg';" 
                alt="Sin imagen">
              <div>
                <p class="font-medium text-gray-800">${product.name}</p>
                <p class="text-xs text-gray-400">${product.category}</p>
              </div>
            </td>

      <!-- SKU -->
      <td class="pl-10 px-5 py-4 text-gray-500">
        ${product.art}
      </td>
      <!-- PRECIO -->
      <td class="px-5 py-4 font-medium">
        _$${product.price.toLocaleString("es-AR")}
      </td>
      <!-- VISIBILIDAD -->
      <td class="px-5 py-4">
        ${product.visible? `
            <span class=" inline-flex items-center gap-1.5 px-2.5 py-1
              rounded-full text-xs font-medium bg-blue-50 text-blue-700">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Visible
            </span>`
          : `
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1
              rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              <span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
              Oculto
            </span>`
        }
      </td>
      <!-- ESTADO -->
      <td class="px-5 py-4">
        _${product.estado? `
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs 
                font-medium bg-green-50 text-green-700">
              <span class="w-1.5 h-1.5 rounded-full bg-green-500">
              </span>Activo</span> `
          : `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs 
              font-medium bg-red-50 text-red-700">
              <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              Inactivo
             </span>          `
        }
      </td>
      <!-- ACCIONES -->
            <td class="p-4 text-right space-x-1">
              <button prid="e,${product.prid}" onclick="abrirModal(${product.prid})" class="_edit p-2 text-gray-400 hover:text-indigo-600 transition" title="Editar"><i class="fa-solid fa-pen"></i></button>
              <button prid="d,${product.prid}" class="_delete p-2 text-gray-400 hover:text-red-600 transition" title="Inactivar"><i class="fa-solid fa-trash-can"></i></button>
            </td>
      `;

    /*
          <!-- ACCIONES -->
      <td class="px-5 py-4 text-right whitespace-nowrap">
        <button onclick="editProduct(${product.prid})"
          class="text-gray-500 hover:text-gray-900 mr-3">
          Editar
        </button>
        <button
          onclick="toggleProduct(${product.prid})"
          class="text-gray-500 hover:text-gray-900">
          ${product.estado? "Desactivar": "Activar"}
        </button>
      </td>

    */
    // esto iba debajo de la img<span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">OFERTA</span>
    productTable.appendChild(row);


  });

  // ----------------------------------------------------------
  // CHECKBOXES
  // ----------------------------------------------------------
  document.querySelectorAll(".product-checkbox")
    .forEach(checkbox => {
      checkbox.addEventListener("change",() => {
          const id = Number(checkbox.dataset.id);
          if (checkbox.checked) state.selected.add(id); else state.selected.delete(id);
          updateSelectionUI();
        }
      );
    });
  updateSelectionUI();
  renderPagination(totalPages, total);
  updateSortIndicators();
}

// ============================================================
// SELECCIÓN
// ============================================================
function updateSelectionUI() {
  const count = state.selected.size;
  if (count > 0) {
    bulkActions.classList.remove("hidden");
    bulkActions.classList.add("flex");
  } else {bulkActions.classList.add("hidden");
    bulkActions.classList.remove("flex");
  }
  selectedCount.textContent = `${count} ${ count === 1 ? "seleccionado" : "seleccionados"}`;
  // Productos visibles en página actual
  const pageIds = [..._$$(".product-checkbox")].map(input =>Number(input.dataset.id));
  const selectedOnPage = pageIds.filter(id => state.selected.has(id)).length;
  selectAll.checked = pageIds.length > 0 && selectedOnPage === pageIds.length;
  selectAll.indeterminate = selectedOnPage > 0 && selectedOnPage < pageIds.length;
}
// ============================================================
// SELECCIONAR TODOS DE LA PÁGINA
// ============================================================
selectAll.addEventListener("change", () => {
    document.querySelectorAll(".product-checkbox").forEach(checkbox => {
        const id = Number( checkbox.dataset.id);
        if (selectAll.checked) state.selected.add(id); else state.selected.delete(id);   
    });
    render();
  }
);
// ============================================================
// ACCIONES MASIVAS
// ============================================================
function bulkSetActive(value) {
  state.selected.forEach(id => {
    const product = products.find(p => p.prid === id );
    if (product) product.estado = value;
  });
  render();
}

function bulkSetVisible(value) {
  state.selected.forEach(id => {
    const product = products.find(p => p.prid === id );
    if (product) product.visible = value;
  });
  render();
}
// ============================================================
// LIMPIAR SELECCIÓN
// ============================================================
function clearSelection() {
  state.selected.clear();
  render();
}
// ============================================================
// ORDENAMIENTO
// ============================================================
document.querySelectorAll(".sortable")
  .forEach(header => {
    header.addEventListener("click", () => {
        const field = header.dataset.sort;
        if (state.sortBy === field) {
          state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
        } else  state.sortBy = field; state.sortDirection = "asc";
        state.page = 1;
        render();
      }
    );
  });

  function updateSortIndicators() {
  document.querySelectorAll(".sortable").forEach(header => {
      const icon = header.querySelector(".sort-icon");
      if ( header.dataset.sort === state.sortBy ) {
        icon.textContent = state.sortDirection === "asc"? " ↑" : " ↓";
        icon.className ="sort-icon text-gray-900";
      } else {
        icon.textContent = " ↕";
        icon.className = "sort-icon text-gray-300";      
      }
    });
}
// ============================================================
// FILTROS
// ============================================================
document.querySelectorAll(".filter-btn")
  .forEach(button => {
    button.addEventListener("click",() => {
        const filter = button.dataset.filter;
        const value = button.dataset.value;
        state[filter] = value === "all" ? null : Number(value);
        state.page = 1;
        // Actualizar botones del grupo
        document.querySelectorAll(`[data-filter="${filter}"]`)
          .forEach(btn => {
            btn.classList.remove("bg-white", "shadow-sm", "font-medium");
            btn.classList.add("text-gray-500");
          });
        button.classList.add("bg-white","shadow-sm","font-medium");
        button.classList.remove("text-gray-500");
        render();
      }
    );
  });
// ============================================================
// BÚSQUEDA
// ============================================================
document.getElementById("search").addEventListener("input",event => {
      state.search = event.target.value;
      state.page = 1;
      render();
    }
  );
// ============================================================
// LIMPIAR FILTROS
// ============================================================
document.getElementById("clearFilters").addEventListener("click",() => {
      state.search = "";
      state.visible = null;
      state.activo = null;
      state.category = null;
      state.page = 1;
      document.getElementById("search").value = "";
      document.querySelectorAll(".filter-btn").forEach(button => {
          const isAll = button.dataset.value === "all";
          button.classList.toggle("bg-white", isAll);
          button.classList.toggle("shadow-sm", isAll);
          button.classList.toggle("font-medium", isAll);
          button.classList.toggle("text-gray-500", !isAll);
        });
      render();
    }
  );
// ============================================================
// PAGE SIZE
// ============================================================
document.getElementById("pageSize").addEventListener("change", event => {
      state.pageSize = Number( event.target.value);
      state.page = 1;
      render();
    }
  );
// ============================================================
// PAGINACIÓN
// ============================================================
function renderPagination(  totalPages,  total) {
  pagination.innerHTML = "";
  if (total === 0) return;
  
  const info =    document.createElement("span");
  const start =    (state.page - 1) *    state.pageSize + 1;
  const end = Math.min(state.page * state.pageSize, total );
  info.className =    "text-sm text-gray-500";
  info.textContent =`Mostrando ${start}–${end} de ${total}`;
  pagination.appendChild(info);
  const controls = document.createElement("div");
  controls.className = "page-btn flex items-center gap-1";
  // Anterior
  const previous = createPageButton("‹", state.page === 1);
  previous.addEventListener("click",() => {
      if (state.page > 1) {
        state.page--;
        render();
      }
    }
  );
  controls.appendChild(previous  );
  // Números
  for ( let page = 1; page <= totalPages; page++  ) {
    const button = createPageButton(page, false, page === state.page);
    button.addEventListener( "click", () => {
        state.page = page;
        render();
      }
    );
    controls.appendChild(button);
  }
  // Siguiente
  const next = createPageButton("›", state.page === totalPages);
  next.addEventListener("click", () => {
      if (state.page < totalPages) {
        state.page++;
        render();
      }
    }
  );
  controls.appendChild(next);
  pagination.appendChild(controls);
}
function createPageButton(  text,  disabled = false,  active = false) {
  const button =    document.createElement("button");
  button.textContent =    text;
  button.disabled =    disabled;
  button.className = `min-w-8 h-8 px-2 rounded-lg text-sm border transition
    ${active ? "bg-gray-900 text-white border-gray-900"
        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
    }
    ${disabled ? "opacity-40 cursor-not-allowed" : "" }
  `;
  return button;
}
// ============================================================
// ACCIONES INDIVIDUALES
// ============================================================
function editProduct(id) {
  const product = products.find(p => p.prid === id );
  console.log(`Editando: ${product.name} Images: ${product.images?.length || 0} `  );
}
function toggleProduct(id) {
  console.log('Toggling product with id:', id);
  const product = products.find(p => p.prid === id );
  product.estado = product.estado ? 0 : 1;
  render();
}


// ============================================================
// PRIMER RENDER
// ============================================================
render();

// ============================================================
// RENDER edit modal
// ============================================================
_$('#vistaTabla').addEventListener('click', e => clickProd(e));
_$('#vistaTarjetas').addEventListener('click', e => clickProd(e));

const clickProd = data =>{
    cell = data.target;
    if(!(cell.tagName==='BUTTON'||cell.tagName==='I'))return;
    if((cell.tagName==='BUTTON'||cell.classList.contains('page-btn '))) return;
    if (cell.tagName==='I') cell = cell.parentNode;
    //console.log(cell);
    [action, prid] = cell.getAttribute('prid').split(',');
    const foundEl = products.find(p => p.prid == prid);
    if (!foundEl||!["e", "d"].includes(action)){alert('sus actividades serán revisadas'); return null;}
    if (action==="d") {console.log(' eliminación: '+prid); deleteProduct(prid); return null;}
    toggleModal('modalProductos', false);  
    _$('#prodNombre').value = foundEl.name;
    _$('#prodSku').value = foundEl.art||'';
    _$('#prodCategoria').tomselect.setValue(foundEl.cid);
    _$('#prodPrecioLista').value = foundEl.price;
    _$('#productoId').value = foundEl.prid;
    _$('#prodCurva').value = foundEl.multiplo;
    _$('#prodActivo').checked = foundEl.estado;
    _$('#prodVisibleWeb').checked = foundEl.visible;

    if (foundEl.images && foundEl.images.length ===1 && foundEl.images[0].includes('default.jpg')) foundEl.images = [];
    listaImagenesModal = (foundEl.images || []).map((url, index) => ({
      id: 'existente_' + index + '_' + Date.now(),
      id: index + '_' + Date.now(),
      dataUrl: url,   blob: null, // Ya está en el servidor
      esExistente: true
    }));    
    renderizarGaleriaUnificada()
}
function fillModalForm(id) {
	alert (id);
  const form = _$("#form"); form.reset(); _$('#_id').value = "";
  if (id !== null) {
  	const foundEl = products.find(p => p.prid == id);
    _$('#prodNombre').value = foundEl.name;
    _$('#prodSku').value = foundEl.art||'';
    //document.getElementById('prodCategoria').tomselect.setValue(foundEl.cid);
    _$('#prodCategoria').value = foundEl.cid;
	_$('#prodPrecioLista').value = foundEl.price;
    _$('#productoId').value = foundEl.prid;
    _$('#prodCurva').value = foundEl.multiplo;
    _$('#prodActivo').checked = foundEl.estado;
    _$('#prodVisibleWeb').checked = foundEl.visible;

    if (foundEl.images && foundEl.images.length ===1 && foundEl.images[0].includes('default.jpg')) foundEl.images = [];
    listaImagenesModal = (foundEl.images || []).map((url, index) => ({
      id: 'existente_' + index + '_' + Date.now(),
      id: index + '_' + Date.now(),
      dataUrl: url,   blob: null, // Ya está en el servidor
      esExistente: true
    }));    
    renderizarGaleriaUnificada()
  }
}
// Control de Abrir / Cerrar Modales
function toggleModal(modalId, nuevo=true, p) {
  if (nuevo) abrirModalNuevo(); else abrirModalEditar(p);
  renderCategorySelectModal(categories); //
  const modal = _$(modalId);
  if (modal) modal.classList.toggle('hidden');  
}

// --- 1. ABRIR Y CERAR MODAL ---
function abrirModalNuevo() {
  _$('#formProducto').reset();  _$('#productoId').value = '';
  _$('#modalProductoTitulo').innerText = 'Agregar Producto';
  listaImagenesModal = [];
  renderizarGaleriaUnificada()  
}

//function abrirModalEditar() {  console.log('prods',528);  _$('#modalProductoTitulo').innerText = 'Editar Producto';}
function cerrarModalProducto() { _$('#modalProductos').classList.add('hidden');}

function filter(e) {
    const select = gId(e.target.id);
    if (e.target.id == 'filtroCategoria') state.category = select.options[select.selectedIndex].text;
    console.log('filter', e.target.id, state.category);
    render();
}

// Alternar Vista Tabla / Cards
function cambiarVista(tipo) {
  const tabla = document.getElementById('vistaTabla');
  const cards = document.getElementById('vistaTarjetas');
  const btnTabla = document.getElementById('btnVistaTabla');
  const btnCards = document.getElementById('btnVistaCards');
  if (tipo === 'tabla') {
    show2(['infoTabla']);
    tabla.classList.remove('hidden'); cards.classList.add('hidden'); state.vistaCards = false;
    btnTabla.className = "px-3 py-1 text-xs font-medium rounded-md bg-white text-gray-800 shadow-sm transition";
    btnCards.className = "px-3 py-1 text-xs font-medium rounded-md text-gray-500 hover:text-gray-800 transition";
  } else {
    hide2(['infoTabla']);
    tabla.classList.add('hidden');  cards.classList.remove('hidden'); state.vistaCards = true;
    btnCards.className = "px-3 py-1 text-xs font-medium rounded-md bg-white text-gray-800 shadow-sm transition";
    btnTabla.className = "px-3 py-1 text-xs font-medium rounded-md text-gray-500 hover:text-gray-800 transition";
  }
  render();
}
const deleteProduct = async (prid) => {
  if (!confirm('¿Está seguro de que desea eliminar este producto?')) return;
  try {
    const response = await fetch(base_url+`products/delProduct2/${prid}`);
    if (!response.ok) throw new Error('Error al eliminar el producto');
    const index = products.findIndex(product => product.prid == prid);
    if (index !== -1)   products.splice(index, 1); 
    render();
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
  }
}
