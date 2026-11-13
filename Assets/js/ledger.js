

function render(){
	  data.forEach(dd => {
    const row = document.createElement("tr");
    row.className = "hover:bg-gray-50 transition";
    row.setAttribute("did", dd.saux);
    //const isSelected = state.selected.has(dd.saux);
    row.innerHTML = `
      <!-- fecha -->
      <td class="pl-2 px-2 py-1 text-gray-500 " >
        ${dd.ffecha || ""}
      </td>
      <!-- fecha -->
      <td class="pl-2 px-2 py-1 text-gray-500 " >
        ${dd.saux || ""}
      </td>
      <!-- DESCRIPTION -->
      <td class="pl-10 px-2 py-2 text-gray-500">
        ${dd.bank || ""}
      </td>
      <!-- cargo -->
      <td class="pl-10 px-2 py-2 text-gray-500">
        ${dd.cargo || "-"}
      </td>
      <!-- abono -->
      <td class="pl-10 px-2 py-2 text-gray-500">
        ${dd.abono || "-"}
      </td>
      <!-- balance -->
      <td class="pl-10 px-2 py-2 text-gray-500">
        ${dd.balance || "-"}
      </td>
      
      <!-- ACCIONES -->
            <td class="p-1 text-right space-x-1">
            
              <button did="e,${dd.saux}" onclick="receipt(${dd.si})" class=" p-1 text-gray-400 hover:text-indigo-600 transition" title="Recibo"><i class="fa-solid fa-file"></i></button>
              <button did="e,${dd.saux}" onclick="edit(${dd.saux})" class="_edit p-1 text-gray-400 hover:text-indigo-600 transition" title="Editar"><i class="fa-solid fa-pen"></i></button>
              <button did="d,${dd.saux}" onclick="erase(${dd.saux})" class="_delete p-1 text-gray-400 hover:text-red-600 transition" title="Inactivar"><i class="fa-solid fa-trash-can"></i></button>
            </td>
      `;
    dataTable.appendChild(row);
  });
  }
  
  //renderTabla();
 render();
 selectFiller(_$("#banco"),banks);
 r();

  const receipt0 = si => {
    const d = data.find(d => d.si === si); if (!d) return;
    const receiptWindow = window.open('', '_blank');
    receiptWindow.document.write(`
      <html>
        <head>
          <title>Recibo</title>
        </head>
        <body>
          <h1>Recibo</h1>
          <p>Fecha: ${d.ffecha || ""}</p>
          <p>Banco: ${d.bank || ""}</p>
          <p>Cargo: ${d.cargo || "-"}</p>
          <p>Abono: ${d.abono || "-"}</p>
          <p>Balance: ${d.balance || "-"}</p>
        </body>
      </html>
    `);
  };

  const receipt = si => {
    const d = data.find(d => d.si === si); if (!d) return;
    const rData = {
      nombre:d.clientname, abono:d.abono,  fec_receipt:d.ffecha,
      pyd:d.si,   bank:d.bank,    ft:d.ft
    };
    localStorage.setItem("receipt", JSON.stringify(rData));
    console.log("Generating receipt for si:", si);
    console.log("Receipt data:", rData, localStorage.getItem("receipt"));
    window.open('receipt','_blank');

  }
 function fillModalForm(id) {
  const form = _$("#form"); form.reset(); _$('#_id').value = "";
  _$('#fecha').value = hoy();
  
  if (id !== null) {
    const d = datens.find(d => d.did === id); if (!d) return;
    _$('#_id').value = id;
	  _$('#nombre').value = d.name;
    _$('#descripcion').value = d.description;
    _$('#estado').value = d.stt;
  }
}


function selectFiller(select, data) {
  select.innerHTML = ` <option hidden value=0>seleccione  </option>`;
  data.forEach(d => {
    const option = document.createElement("option");
    option.value = d.fieldId;
    option.textContent = d.fieldName;
    select.appendChild(option);
  });
}
async function guardar(e){
  if (e) e.preventDefault();
	btnSaveUI();
	setCampo2('c'); 
      try 	{
			 r = await getSome3 ("ledger/setIncome", {"campos":JSON.stringify(arr1)});
      	console.log(r)   ;  
		}
	 catch (err)   { console.error('Error en la petición AJAX:', err);
  		alert('Ocurrió un error al enviar los datos al servidor.');
 	} 
		finally {  
     	//showToast();      //showToast('¡Catálogo actualizado!', 'success');
    	btnSaveUI(false);
        //datens = await getDatos();    
        render();
        cerrarModal();
 	}
 }

 function r(){
 	
 	console.log(data);
 	console.log(hoy());
 	console.log(banks);
 }