// Variable global de categorías
let listaCategoriasGlobal = []; 
// Abrir el Modal de Categoría Rápida
function abrirModalCategoria() {
  document.getElementById('formCategoria').reset();
  // Poblar el select de 'Categoría Padre' con las categorías principales existentes
  const selectPadre = document.getElementById('catPadreId');
  selectPadre.innerHTML = '<option value="0" hidden>-- Categoría Principal --</option>';
  /*
  listaCategoriasGlobal
    .filter(c => !c.padre_id) // Solo las principales
    .forEach(cat => {
      selectPadre.innerHTML += `<option value="${cat.id}">${cat.nombre}</option>`;
    });
*/
  categories.forEach(cat => {
    selectPadre.innerHTML += `<option value="${cat.fieldId}">${cat.fieldName}</option>`;
  });
  document.getElementById('modalCategoria').classList.remove('hidden');
}

function cerrarModalCategoria() {
  document.getElementById('modalCategoria').classList.add('hidden');
}

// Guardar Categoría / Subcategoría vía AJAX
async function guardarCategoriaRapida(e) {
  e.preventDefault();
  const nombre = document.getElementById('catNombre').value.trim();
  const padreId = document.getElementById('catPadreId').value;
  const cmb ="";
  //edtR2(0,
  if (!nombre) return;
  addR2('data', 3, cmb, nombre, padreId );
  cerrarModalCategoria();
  /*
  try {
    const respuesta = await fetch(base_url+'/categorias/guardarRapido', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nombre, padre_id: padreId || null })
    });

    const resultado = await respuesta.json();

    if (resultado.status === 'success') {
      const nuevaCat = resultado.categoria; // Objeto { id, nombre, padre_id }
      
      // 1. Agregar a la lista global
      listaCategoriasGlobal.push(nuevaCat);

      // 2. Insertar e Inyectar en el Select del Modal de Productos
      const selectProdCat = document.getElementById('prodCategoria');
      
      // Si usamos Tom Select (Vanilla JS):
      if (selectProdCat.tomselect) {
        const labelText = nuevaCat.padre_nombre ? `${nuevaCat.padre_nombre} > ${nuevaCat.nombre}` : nuevaCat.nombre;
        selectProdCat.tomselect.addOption({ value: nuevaCat.id, text: labelText });
        selectProdCat.tomselect.setValue(nuevaCat.id);
      } else {
        // Fallback Select Estándar HTML
        const opt = document.createElement('option');
        opt.value = nuevaCat.id;
        opt.textContent = nuevaCat.padre_nombre ? `${nuevaCat.padre_nombre} > ${nuevaCat.nombre}` : nuevaCat.nombre;
        opt.selected = true;
        selectProdCat.appendChild(opt);
      }

      cerrarModalCategoria();
    } else {
      alert('Error: ' + resultado.message);
    }
  } catch (err) {
    console.error('Error al guardar categoría:', err);
    alert('No se pudo guardar la categoría.');
  }
    */
}

const afterSave = (nuevaCat) => {
  console.log('afterSave', nuevaCat);
  [nuevoId, nombre, padreId] = [nuevaCat[0], nuevaCat[2].campo1, nuevaCat[2].campo2];
  console.log('afterSave', nuevoId, nombre, padreId);
  
  // 1. Agregar a la lista global
  listaCategoriasGlobal.push(nuevaCat); 
  const selectProdCat = document.getElementById('prodCategoria');
  // Si usamos Tom Select (Vanilla JS):
  if (selectProdCat.tomselect) {
    const labelText = nuevaCat.padre_nombre ? `${nuevaCat.padre_nombre} > ${nuevaCat.nombre}` : nuevaCat.nombre;
    selectProdCat.tomselect.addOption({ value: nuevaCat.id, text: labelText });
    selectProdCat.tomselect.setValue(nuevaCat.id);
  } else {
    // Fallback Select Estándar HTML
    const opt = document.createElement('option');
    opt.value = nuevaCat.id;
    opt.textContent = nuevaCat.padre_nombre ? `${nuevaCat.padre_nombre} > ${nuevaCat.nombre}` : nuevaCat.nombre;
    opt.selected = true;
    selectProdCat.appendChild(opt);
  } 
}