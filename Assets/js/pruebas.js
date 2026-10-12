//intento de guardar subcategorías y categorías nuevas desde el modal de productos
const newSubCat = e=>{ et = e.target; inputs=[];
  console.log(et);
  if (et.tagName==="INPUT" && et.classList.contains('subcat')) {
    newGroup = crEl2('div', 'input-group mb-3', {a: 'pepe', b: 'bar'});
    newGroup.appendChild(crEl('input', 'form-control', {type: 'text', placeholder: 'Subcategoría nueva', 'aria-label': 'Subcategoría nueva'}));
    newGroup.appendChild(crEl('button', 'btn btn-outline-secondary', {type: 'button'}, 'Eliminar'));
    inputs2.appendChild(newGroup);
  } 
}

document.querySelector('#inputs')?.addEventListener("click", newCat)
document.querySelector('#inputs2')?.addEventListener("click", newSubCat)

function newCat(e){ et = e.target; inputs=[];
  console.log(et);
  if (et.tagName==="INPUT" && et.classList.contains('subcat')) {  }
  if((et.tagName==="A")&&et && et.innerText.trim() ==='nueva') {
    check1 =`<div class="col-md-12 " >   <div class="form-check"><label class="form-check-label " for="chkSubCat">
                <input type="checkbox" class="form-check-input subcat chkSubCat" id="chkSubCat"  >Incluir subcategorías</label> </div></div>`
    inputs.push({id:'field1', campo:'Categoría', selector:'input', type:'input', placeholder:'Categoría nueva',label:1});
    inputs.push({id:'html', idHt:check1, value:0});
               
    openModal(inputs,'.inputs2');  titleModal2.innerText='Categoría nueva';
    modal2.show();  
  }
}
