let  datens = [];   let Dtype = parseInt(localStorage.getItem('dttp')); 
console.log(Dtype);
async function initApp() {
  try {
    datens = await getDatos();
    title = await setTitle();
    titpage.innerText = title[1];
    render(); //if (android) cambiarVista('cards');
    } catch (error) {  console.log(error); }
}
const getDatos = async () => {
  return await getSome3('daten/getData/' + Dtype);
}
const setTitle = async () => {return await getSome3('Daten/setTitle/'+Dtype); }
/* =================   INICIO================================ */
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});
// ======// ESTADO// ========
const state = {
  search: "",
  visible: null,
  activo: null,
  //category: "todas",
  sortBy: "nombre",
  sortDirection: "asc",
  page: 1,
  pageSize: 10,
  selected: new Set(),
  vistaCards: false
};
// ============================================================
// ELEMENTOS
// ============================================================
const dataTable =  document.getElementById("dataTable");
const emptyState =  document.getElementById("emptyState");
const resultCount =  document.getElementById("resultCount");
const pagination =  document.getElementById("pagination");
const selectAll =  document.getElementById("selectAll");
const bulkActions =  document.getElementById("bulkActions");
const selectedCount =  document.getElementById("selectedCount");
// ============================================================
// OBTENER PRODUCTOS FILTRADOS
// ============================================================
function getFilteredDatens() {
  const search = state.search.toLowerCase().trim();
  return datens.filter(_data => {
    const matchesSearch =
      _data.name.toLowerCase().includes(search) ||
      _data.description.toLowerCase().includes(search);
    const matchesActivo =  state.activo === null ||  _data.estado === state.activo;
    return (matchesSearch && matchesActivo  );
  });
}
// ============================================================
// ORDENAMIENTO
// ============================================================
function sortDatens(list) {
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
  let filtered = getFilteredDatens();
  filtered = sortDatens(filtered);
  // ----------------------------------------------------------
  // PAGINACIÓN
  // ----------------------------------------------------------
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(  total / state.pageSize  ));
  if (state.page > totalPages) { state.page = totalPages;  }
  const start = (state.page - 1) * state.pageSize;
  const pageDatens = filtered.slice( start, start + state.pageSize);
  // -----  // CONTADOR  // --------
  resultCount.textContent =`${total} ${total === 1? "registro": "registros"}`;
  // ----------------------------------------------------------
  // TABLA
  // ----------------------------------------------------------
  dataTable.innerHTML = "";
  if (pageDatens.length === 0) { emptyState.classList.remove("hidden" );
  } else {emptyState.classList.add("hidden");  }
  //_$('#vistaCards').innerHTML = "";
  if(state.vistaCards) {
    // Renderizar en vista de tarjetas
        _$('#vistaCards').innerHTML = filtered.map(p => `
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 relative flex flex-col justify-between hover:shadow-md transition" did =${p.did}>
            <div class="flex">
              <div class="relative mb-1">
              </div>
              <div class="ml-3">
              <div>
                <h3 class="font-bold text-gray-800 text-base leading-snug mt-1">${p.name}</h3>
              </div>
              <div class="mt-1 pt-1 border-t border-gray-100 flex items-center justify-between">
                <span class="text-xs font-medium text-indigo-600 uppercase tracking-wider">${p.description||''}</span>
              </div>
                <div class="flex gap-1">
                  <button did="v,${p.did}" class="_edit p-2 bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition"><i class="fa-solid fa-eye"></i></button>
                  <button did="e,${p.did}" onclick="edit(${p.did})" class="_edit p-2 bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition"><i class="fa-solid fa-pen"></i></button>
                </div>
              </div>
            </div>
            <div class="mt-1 pt-1 border-t border-gray-100 flex items-center justify-between">
            </div>
          </div> 
      `).join('');  //cards
    return;
  }
  pageDatens.forEach(datens => {
    const row = document.createElement("tr");
    row.className = "hover:bg-gray-50 transition";
    row.setAttribute("did", datens.did);
    const isSelected = state.selected.has(datens.did);
    row.innerHTML = `
      <!-- CHECKBOX -->
      <td class="px-5 py-4">
        <input type="checkbox" class="product-checkbox w-4 h-4 rounded border-gray-300"
          data-id="${datens.did}" ${isSelected ? "checked" : ""}>
      </td>
      <!-- NAME -->
      <td class="px-5 py-4">
        <div class="font-medium text-gray-900">${datens.name}</div>
      </td>
      <!-- DESCRIPTION -->
      <td class="pl-10 px-5 py-4 text-gray-500">
        ${datens.description || ""}
      </td>
      <!-- ESTADO -->
      <td class="px-5 py-4">
        ${datens.stt? `
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
              <button did="e,${datens.did}" onclick="edit(${datens.did})" class="_edit p-2 text-gray-400 hover:text-indigo-600 transition" title="Editar"><i class="fa-solid fa-pen"></i></button>
              <button did="d,${datens.did}" onclick="erase(${datens.did})" class="_delete p-2 text-gray-400 hover:text-red-600 transition" title="Inactivar"><i class="fa-solid fa-trash-can"></i></button>
            </td>
      `;
    dataTable.appendChild(row);
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
    const product = products.find(p => p.did === id );
    if (product) product.estado = value;
  });
  render();
}
function bulkSetVisible(value) {  // no aplica en daten
  state.selected.forEach(id => {
    const product = products.find(p => p.did === id );
    if (product) product.visible = value;
  });
  render();
}
// =========// LIMPIAR SELECCIÓN// ===========================
function clearSelection() { state.selected.clear();  render();}
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
function edit(id) {  abrirModal(id);}
function erase(id) { 
  console.log('elemento a eliminar', id);
  delDato (id);
}
function toggleProduct(id) { //bulking
  console.log('Toggling product with id:', id);
  const product = datens.find(p => p.did === id );
  product.estado = product.estado ? 0 : 1;
  render();
}
// ============================================================
// PRIMER RENDER
// ============================================================
render();
// Alternar Vista Tabla / Cards
function cambiarVista(tipo) {
  const tabla = document.getElementById('vistaTabla');
  const cards = document.getElementById('vistaCards');
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
const delDato2 = async (did) => {
  if (!confirm('¿Está seguro de que desea eliminar este producto?')) return;
  try {
    const response = await fetch(base_url+`daten/delDaten/${did}`);
    if (!response.ok) throw new Error('Error al eliminar el producto');
    console.log(response)   ;  
    const index = datens.findIndex(product => product.did == did);
    if (index !== -1)   datens.splice(index, 1); 
    render();
  } catch (error) { console.error('Error al eliminar el producto:', error); }
}

function fillModalForm(id) {
  const form = _$("#form"); form.reset(); _$('#_id').value = "";
  if (id !== null) {
    const d = datens.find(d => d.did === id); if (!d) return;
    _$('#_id').value = id;
	  _$('#nombre').value = d.name;
    _$('#descripcion').value = d.description;
    _$('#estado').value = d.stt;
  }
}

async function guardar(e){
  if (e) e.preventDefault();
	btnSaveUI();
	setCampo2('c'); arr1.dttp = Dtype;
      try 	{
			 r = await getSome3 ("daten/setDaten", {"campos":JSON.stringify(arr1)});
      	console.log(r)   ;  
		}
	 catch (err)   { console.error('Error en la petición AJAX:', err);
  		alert('Ocurrió un error al enviar los datos al servidor.');
 	} 
		finally {  
     	//showToast();      //showToast('¡Catálogo actualizado!', 'success');
    	btnSaveUI(false);
        datens = await getDatos();    
        render();
        cerrarModal();
 	}
 }
 //********* del ******
 async function delDato(id){
	if (!confirm('¿ Seguro de eliminar este registro ?')) return;
		//x = customConfirm.showModal();
		//console.log(x);
		arr1.dttp = Dtype; arr1._id=id;
       console.log(_id, arr1);
		try 	{
			 r = await getSome3 ("daten/delDaten", {"campos":JSON.stringify(arr1)});
      	console.log(r)   ;  
		}
	 catch (err)   { 
		console.error('Error en la petición AJAX:', err);
  		alert('Ocurrió un error al enviar los datos al servidor.');
 	} 
	finally {  	
        datens = await getDatos();    
        render();
        cerrarModal();
 	}
 }