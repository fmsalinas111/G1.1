function preparaModal(cajero=0, closer=0, apertura=hoy(), initAmount=0,  realAmount=0, cierre = hoy(), stt=false, obs=''){
    inputs = []; 
    sele=(stt>0)? 'selected':'';  combo1 = comboStatus('campo7', sele, true);
    cmbCajero = comboBuilder('cajero',22,'campo9','data','');    
    inputs.push({id: 'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});
      inputs.push({id:'campo1', campo:'Apertura ', selector:'input', type:'date', required:'', autofocus:'', value:apertura, label:1})
    inputs.push({id: 'html', idHt:htR2});inputs.push({id: 'html', idHt:ht6});
    inputs.push({id:'campo2', campo:'Cierre', selector:'input', type:'date',  value:cierre, label:1})
    inputs.push({id: 'html', idHt:htR2});inputs.push({id: 'html', idHt:htR2});
    inputs.push({id: 'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});
    inputs.push({id:'campo3', campo:'Init amount ', selector:'input', type:'Number',  value:initAmount, label:1})
    inputs.push({id: 'html', idHt:htR2});inputs.push({id: 'html', idHt:ht6});
    inputs.push({id:'campo4', campo:'según recuento', selector:'input', type:'number', value:realAmount, label:1})
    inputs.push({id: 'html', idHt:htR2});inputs.push({id: 'html', idHt:htR2});      
    
    inputs.push({id:'campo5', campo:'Closer', selector:'input', type:'text', value:closer, label:1});
    inputs.push({id:'campo6', campo:'Notas', selector:'textarea', rows:'2', innerHTML:obs, label:1});
    inputs.push({id: 'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});
      inputs.push({id:'combo',  idCmb:combo1})// campo8 status
    inputs.push({id: 'html', idHt:htR2});inputs.push({id: 'html', idHt:ht6});
    //inputs.push({id:'combo',  idCmb:cmbIva})// campo9 
    inputs.push({id: 'html', idHt:htR2});inputs.push({id: 'html', idHt:htR2}); 
    //inputs.push({id:'campo10', campo:'csrf', selector:'input', type:'hidden', value:'TOKEN_CSRF_GENERADO'});
  
    openModal(inputs);
    gId('titleModal').innerText ='modal title'; //Cambiamos el titulo

}

function prepara_abreModal(){preparaModal(); showModal(0,'modal-lg');}

var table
document.addEventListener('DOMContentLoaded', function() {
  botones = `
    <button type='button' class='botonmodificar btn btn-warning btn-sm'title='Editar'><i class='fa fa-edit'></i></button>    
    <button type='button' class='botonCtaCte btn btn-success btn-sm'title ='Cta Corriente'><i class='fa fa-book'></i></button>`
    
	table=$('#tableCashflow').DataTable({
    "aProcessing": true,  "aServerside": true,
    "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
    "ajax": { "url": " " + base_url + "/Cashflow/getcashflow/1",   "dataSrc": ""  },
    "columns": [
      { "data": "cashid" },
      { "data": "vendor" },
      { "data": "openingdate" },
      { "data": "closingdate" },
      { "data": "finalamount"},
      { "data": "stt"},
      { "data": null,"orderable": false},
    ],
      "columnDefs": [ 
      //{ targets: 0, visible: false},//id
      //{ targets: 4, visible: false},//stt
      { targets: 7, "defaultContent":botones, data: null, className: "text-center" }  ],
    "responsieve": "true",
    "bDestroy": true,
    "iDisplayLength": 10,
    "order": [  [1, "asc"] ]
  });
  
})


$('#tableCashflow').on('click', 'button.botonmodificar', function() {
    let r = table.row($(this).parents('tr')).data();
    document.getElementById('id').value = reg.cid    
    gId('id').value = r.cashid;
    preparaModal(reg.clientname, reg.clientlastname, reg.celu, reg.clientci,
      reg.clientaddress, reg.clientemail, reg.obs, reg.clstatus, reg.iva);
    showModal();
});

$('#tableCashflow').on('click', 'button.botondetalles', function() {//  paciente File      
    let reg = table.row($(this).parents('tr')).data(); 
    //btoa("category=textile&user=user1") //atob("Y2F0ZWdvcnk9dGV4dGlsZSZ1c2VyPXVzZXIx")
    //window.location.href = "k_file.php?data="+btoa(reg.clientid) +'&pn='+btoa(reg.clientname);
    let location = [];
    location.push({type:clType,page:'k_ficha'})
    setXCli('xcli', reg.cid); setXCli('xname', reg.fullname); setXCli('xmail',''+reg.clientemail);
    /*    if (clType ==3||clType ==4){window.location.href ='K_ficha';}
    if (clType ==8||clType ==9|| APP===7){window.location.href ='s_legajo';}
    */
    window.location.href ='legajo';
  });

$('#tableCashflow').on('click', 'button.botonCtaCte', function() {
    let reg = table.row($(this).parents('tr')).data();
    setXCli('xcli',reg.cid);
    setXCli('xname',reg.fullname);
    window.location.href ='Ctactes';
});

const change2 = data=>{
  if (data[2].id==='campo9') document.getElementById('btnActionForm').removeAttribute('disabled');
}

function fntInsertUpdate(e){
  e.preventDefault();  
  const strName = gId('campo1').value;
  const strLname = gId('campo2').value;
  const strFono = gId('campo3').value;
  const strCi = gId('campo4').value;
  const strAddr = gId('campo5').value;
  const strEmail = gId('campo6').value;
  const strNotas = gId('campo7').value;
  const intStt = gId('campo8').value;
  const intIva = gId('campo9').value;
  if(strName == '' || strLname == '' || strFono == '' || strCi == '' || strAddr == '' || strEmail == '' ){
    swal.fire("Atención", "Todos los campos son obligatorios.", "error");
    return false;
  }
  divLoading.style.display = "flex";
  const request =  new XMLHttpRequest();
  const ajaxUrl = base_url+'Clprpames/ins_updClprpame'; 
  const formData = new FormData(formClprpame);
  formData.append('clType', clType);
  request.open("POST",ajaxUrl,true);
  request.send(formData); 
  request.onreadystatechange = function(){
    if(request.readyState == 4 && request.status == 200){
      const objData = JSON.parse(request.responseText); 
      if(objData.status){
        $('#tableCashflow').DataTable().ajax.reload();
        closeModal();
        formClprpame.reset();
        swal.fire("Clientes", objData.msg , "success");
      }else{
        swal.fire("Error", objData.msg , "error");
      } 
    }
    divLoading.style.display = "none";
    return false;
  } 
}

