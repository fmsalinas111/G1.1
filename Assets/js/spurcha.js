allProd=[]; tabProd = null; searchInput = null; rows=null; table=null; headers=null;
directions=[]; _direction = null; 

let selectedRowIndex = -1;
const getProd = async()=>{
    try{
      const res=await fetch(base_url+'products/getMyProducts/1');
      const data=await res.json(); allProd=data; cargarTabla(); }
    catch (error){console.log(error);  } 
}

const buildModal = (type, title, arr) => { let inputs = [];
    inputs.push({id:'field1', campo:'Buscar',selector:'input',type:'search', label:1, placeholder:'Buscar producto por cualquier campo', value:'',clasinp:'search'})
    inputs.push({id:'html', idHt:tblProd(allProd)});
    openModal(inputs,'.inputs','purcha');
    
    table = gIC('tabprod'); headers = table.querySelectorAll('th');
    if (allProd.length === 0) getProd();
    tabProd = gIC('tabprod'); searchInput = gIC('search'); 
    searchInput.addEventListener('input', (event) => { inputPurcha(event.target);}, false);
    directions = Array.from(headers).map(function (header) { return ''; });

    table.addEventListener('keydown', (e) => {kd(e)});
    table.addEventListener('click', (e) => {clickT(e)});
    table.addEventListener('dblclick', (e) => {dblclickT(e)});
    table.addEventListener('change', (e) => {chCkeck([e,selectedRowIndex])});
}


const tblProd = _data=>{
  htIuri = (APP===7)? `<th class="iuri">Staff</th> <th class="iuri">Fecha</th> <th class="iuri">Tipo</th>`:'';
  return `<div class="form-group ">
            <table id="tabProd" border="1" class="tabprod table-striped table-bordered responsive" cellpadding="4" cellspacing="6" tabindex="0" style="width:98%;"> 
            <thead>
                <th>Categoría</th>
                <th>Producto</th>${htIuri}                
                <th data-type="number">Cantidad</th>
                <th data-type="number">Precio compra</th>
                <th data-type="number">Importe</th>
                <th colspan="2" class="text-center">Acciones</th>
            </thead>
            <tbody id="prods"></tbody></table></div>		`;}
           
function cargarTabla(){    obj=allProd; let h='';
  for (x of obj) {
    h+=`<tr class="rowDet">
            <td class="">${x.categoria}</td>	
  			<td>${x.name}</td>              
            <td class="text-right edit-qty">cant</td>
            <td class="text-right edit-price">${x.price}</td>
            <td class="text-right importe-col">${x.price}</td>
            <td class="text-center checks"><input type="checkbox" class="check" disabled></td>
  			</tr>`;      
  }    //<td class="text-center" > <a class="btn btn-danger btn-sm ${disabled}" ><i class="fas fa-trash"></i></a> </td>
  gId('prods').innerHTML = h;
  rows = tabProd.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
}

const inputPurcha=(e)=> {
    const filter = searchInput.value.toLowerCase();
    Array.from(rows).forEach(row => { const text = row.innerText.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
    });    deselectAll();}

function deselectAll() {Array.from(rows).forEach(r => {r.classList.remove('selected'); /*console.log('pepe');*/});}
//rr = null;
function highlightRow(visibleRows) {   deselectAll();
    if (visibleRows[selectedRowIndex]) {
        visibleRows[selectedRowIndex].classList.add('selected');
        visibleRows[selectedRowIndex].scrollIntoView({ block: 'nearest' });
    }
}

function toggleEdit(row) { 
    const chk = row.querySelector('.check');
    const qtyCell = row.querySelector('.edit-qty');
    const priceCell = row.querySelector('.edit-price');    
    const isEditing = qtyCell.contentEditable === "true";
    if (!isEditing) {        // Entrar en modo edición
        qtyCell.contentEditable = "true";
        priceCell.contentEditable = "true";
        qtyCell.classList.add('editable');
        priceCell.classList.add('editable');
        chk.removeAttribute('disabled'); 
        qtyCell.focus(); document.execCommand('selectAll');
    } else {        // Salir de modo edición y guardar
        qtyCell.contentEditable = "false";
        priceCell.contentEditable = "false";
        qtyCell.classList.remove('editable');
        priceCell.classList.remove('editable');
        updateRowTotal(row);  
        chk.setAttribute('disabled',true); 
        table.focus(); // Devolver el foco a la tabla 
    }
}
function updateRowTotal(row) { 
    const qty = parseFloat(row.querySelector('.edit-qty').innerText) || 0;
    const price = parseFloat(row.querySelector('.edit-price').innerText) || 0;
    const totalCell = row.querySelector('.importe-col');
    totalCell.innerText = (qty * price).toFixed(2);
}

const kd = e =>{  
    const visibleRows = Array.from(rows).filter(r => r.style.display !== 'none');        
    if (e.key === 'ArrowDown') { e.preventDefault();
        selectedRowIndex = Math.min(selectedRowIndex + 1, visibleRows.length - 1);
        highlightRow(visibleRows);
    } else if (e.key === 'ArrowUp') { e.preventDefault();
        selectedRowIndex = Math.max(selectedRowIndex - 1, 0);  highlightRow(visibleRows);
    } else if (e.key === 'Enter') { e.preventDefault(); el = e.target;
        if (el.classList.contains('check')) { 
            padre=(el.closest('tr')); selectedRowIndex = (padre.rowIndex)-1;
            //el.blur();
        }
        if (selectedRowIndex !== -1)  toggleEdit(visibleRows[selectedRowIndex]);
        
    } else if (e.key === 'Tab') { //e.preventDefault();
        //console.log('tab', e);
    }
}
// Permitir clic también para seleccionar
const clickT = e =>{ row = e.target.parentElement; 
    if(row.parentElement.tagName==='THEAD'){sortColumn(e.target.cellIndex); return null; }
    const visibleRows = Array.from(rows).filter(r => r.style.display !== 'none');
    selectedRowIndex = visibleRows.indexOf(row);     highlightRow(visibleRows);
}

const dblclickT = e =>{ row = e.target.parentElement;
    const visibleRows = Array.from(rows).filter(r => r.style.display !== 'none');
    if (selectedRowIndex !== -1)  toggleEdit(visibleRows[selectedRowIndex]);        
}

const chCkeck = (data) =>{ 
    [e,sRI] = data;
    e.preventDefault(); el = e.target;     
    if (el && el.classList.contains('check')) {
        //console.log(el, 'track',selectedRowIndex,sRI);        
        //table.focus();
    }
}

//sorting
const transform = function (index, content) { // Get the data type of column
    const type = headers[index].getAttribute('data-type');
    switch (type) {
        case 'number': return parseFloat(content);
        case 'string':
        default: return content;    }
};
const sortColumn = function (index) {
    _direction = directions[index] || 'asc';// Get the current direction
    const multiplier = _direction === 'asc' ? 1 : -1;  // A factor based on the direction
    const newRows = Array.from(rows);
    newRows.sort(function (rowA, rowB) {
        const cellA = rowA.querySelectorAll('td')[index].innerHTML;
        const cellB = rowB.querySelectorAll('td')[index].innerHTML;
        const a = transform(index, cellA);  const b = transform(index, cellB);
        switch (true) {
            case a > b: return 1 * multiplier;
            case a < b: return -1 * multiplier;
            case a === b: return 0;             }
    }); 
    [].forEach.call(rows, function (row) { prods.removeChild(row); }); // Remove old rows
    directions[index] = _direction === 'asc' ? 'desc' : 'asc';         // Reverse the direction
    newRows.forEach(function (newRow) { prods.appendChild(newRow); }); // Append new row
};
 
