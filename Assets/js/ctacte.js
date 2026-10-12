cli_pro='Cliente'; 
clipro=['Cliente','Proveedor','Paciente','Médico','Inquilino','Impuesto/servicio']
clipros=['Clientes','Proveedores','Pacientes','Médicos','Inquilinos', 'impuestos y servicios'];

co_pa=['Cobrar','Pagar']

clid = localStorage.getItem('xcli');
nameCli = localStorage.getItem('xname');
const clType = localStorage.getItem('cppm');
acco = localStorage.getItem('acco');

breadcrumb.innerHTML=`<a href="${(clType==2)?'clprpames':'clprpames'}">${clipros[clType-1]}/</a><strong>${nameCli}</strong>`;

btnPercibir.innerHTML = `<i class="fa fa-money-bill-wave"></i> ${(clType==2||clType==6)?'Pagar':'Cobrar'}`;
btnPercibir.addEventListener('click', ()=> percibir())
//document.querySelector("#btnCargo").addEventListener('click',()=>cargo(false));
btnCargo.addEventListener('click',()=>cargo(false));
function cargo(btnDel=false, sid=0, fecha=hoy(),amount=0, notes=''){
  inputs = [];
  inputs.push({id:'campo1' ,campo:cli_pro, selector:'input', type:'text',label:1, value:nameCli, disabled:'1', defVal:nameCli})
  inputs.push({id:'html', idHt:htR1});    inputs.push({id:'html', idHt:ht6});
    inputs.push({id:'campo2' ,campo:'Fecha',selector:'input',type:'date',value:fecha, label:1, defVal:fecha})
  inputs.push({id:'html', idHt:htR2});   inputs.push({id: 'html', idHt:ht6});
    inputs.push({id:'campo3' ,campo:'Importe/saldo',selector:'input',type:'number', placeholder:'Importe',  step:'any', required:'', value:amount, label:1})  
  inputs.push({id:'html', idHt:htR2});   inputs.push({id: 'html', idHt:htR2});
  inputs.push({id:'campo9',campo:'Notas',selector:'textarea',rows:1.5, innerHTML:notes, label:1})
  inputs.push({id:'campo5' ,campo:'clid',  selector:'input', type:'hidden', value:clid,    disabled:'', defVal:clid})
  inputs.push({id:'campo6' ,campo:'slsid', selector:'input', type:'hidden',  disabled:''})
  inputs.push({id:'campo7' ,campo:'amount',selector:'input', type:'hidden',  disabled:''})
  inputs.push({id:'campo8' ,campo:'acco',  selector:'input', type:'hidden', value:acco,    disabled:'', defVal:acco})
  openModal(inputs);   showModal(btnDel); focusModal(campo3);
  document.querySelector('#titleModal').innerHTML ='Cargo';
}

function percibir(imagen=''){
  inputs = []; idcampo = "campo10";//prev img
  combo3=setPreview(nuevaImg(imagen,'hm'), idcampo, imagen);
  
  combo1 = `<div class=""  ><div><label for="campo4">Banco (caja)</label></div><div id="combo_banco"></div></div></div>`;
  inputs.push({id: 'campo1' ,campo:cli_pro, selector:'input', type:'text',label:1, value:nameCli, disabled:'1', defVal:nameCli})
  inputs.push({id: 'html', idHt:htR1});    inputs.push({id: 'html', idHt:ht6});
    inputs.push({id: 'campo2' ,campo:'Fecha',selector:'input',type:'date',value:hoy(), label:1, defVal:hoy()})
  inputs.push({id: 'html', idHt:htR2});   inputs.push({id: 'html', idHt:ht6});
    inputs.push({id:'campo3' ,campo:'Importe/saldo',selector:'input',type:'number', placeholder:'Importe',  step:'any', required:'1', label:1})  
  inputs.push({id:'html', idHt:htR2});   inputs.push({id: 'html', idHt:htR2});
  inputs.push({id:'combo',  idCmb:combo1})// campo4 banco
  inputs.push({id: 'campo9',campo:'Notas',selector:'textarea',rows:1.5, label:1})
  inputs.push({id: 'campo5' ,campo:'clid',  selector:'input', type:'hidden', value:clid, disabled:'', defVal:clid})
  inputs.push({id: 'campo6' ,campo:'slsid', selector:'input', type:'hidden',  disabled:''})
  inputs.push({id: 'campo7' ,campo:'amount',selector:'input', type:'hidden',  disabled:''})
  inputs.push({id: 'campo8' ,campo:'acco',  selector:'input', type:'hidden', value:clType, disabled:'', defVal:clType})
  inputs.push({id: 'combo',  idCmb:combo3})// preview
  openModal(inputs)
  
  const data = new FormData(); data.append('src', 'data');
  f_URL = base_url+'Data/getDataCmb/2' ;
  getJson(f_URL, data, 'combo_banco', 'campo4',localStorage.getItem('dbk'),'Banco' )
  showModal();  focusModal(campo3);titleModal.innerHTML = co_pa[0]; //Cambiamos el titulo
}

///datatable///
var table
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('title').innerHTML = '<i class="fa fa-user-tag"></i> Resumen: <strong>'+nameCli+'</strong> ';
  bEditDs = `<button  type='button' class='botonmodificar btn btn-warning btn-sm' title='Editar' disabled><i class='fa fa-edit'></i></button>`;
  btnEdit = `<button  type='button' class='botonmodificar btn btn-warning btn-sm' title='Editar'><i class='fa fa-edit'></i></button>`;
  btnRece = `<button  type='button' class='botonRecibo btn btn-success btn-sm' title='Obtener recibo'><i class='fa fa-file-contract'></i></button>`;
  //if (type ==3 || type ==4)botones+=`         `;
  decimales=0;
  if (clType ==4) document.getElementById('oEspecialidad').innerHTML = 'Especialidad'
	table=$('#tableCtacte').DataTable({
	    "aProcessing": true,  "aServerside": true,
	    "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
	    "ajax": { "url": " " + base_url + "/Ctactes/getCtactes/"+clid,   "dataSrc": ""  },
	    "columns": [
          { "data": "saux", "orderable": false},
          { "data": "ffecha", className:"text-center","orderable": false },
          //si la app es hm, mostrar notes en lugar de bank
          { "data": "bank",  className: "text-left", "orderable": false },
          { "data": "cargo",  className: "text-right", "orderable": false,
            render: $.fn.dataTable.render.number( ',', '.', decimales )},
            //{data: "abono"},
          { "data": "abono",  className: "text-right", "orderable": false,
            render: $.fn.dataTable.render.number( ',', '.', decimales )},
          
          {data: 'balance',className: "text-right", "orderable": false, 
            render: $.fn.dataTable.render.number( ',', '.', decimales )},
          //cp{ "data": null,"orderable": false},
          { "data": "payd",
            "render":function(data,type,row){
              if (data==='n') return bEditDs; else  if (data==='r') return btnRece; else return btnEdit;
            }, className:"text-center","orderable": false 
          },
	    ],
        "columnDefs": [ 
        { targets: 0, visible: false},
        //{ targets: 6, "defaultContent":botones, data: null, className:"text-center" }  
        ],
	    "responsieve": "true",
	    "bDestroy": true,
	    "iDisplayLength": 10,
	    "order": [  [0, "desc"] ]
    });
})

///datatable modificar
$('#tableCtacte').on('click', 'button.botonmodificar', function() {
    let r = table.row($(this).parents('tr')).data();   
    document.getElementById('id').value = r.si
    if(r.amount>0) cargo((r.payd==='e'), r.si, r.fecha, r.amount, r.notes)
});

/*$('#tableCtacte').on('click', 'button.botonRecibo', function() {
    let registro = table.row($(this).parents('tr')).data();   
    //bifurcar si es debit or credit para mostrar factura o recibo
    getSome('Ctactes/getReceipt/'+registro.si,'receipt', registro.si)    
});
*/
$('#tableCtacte').on('click', 'button.botonRecibo', function() {
    let reg = table.row($(this).parents('tr')).data();
    console.log(reg);
    const data = {
        nombre: reg.clientname,     abono: reg.abono,      fec_receipt: reg.ffecha,
        pyd:reg.si,   bank:reg.bank,    ft:reg.ft
    };
    localStorage.setItem("receipt", JSON.stringify(data));
    window.open('receipt/','_blank');
});


/*
  $('#tableClprpame').on('click', 'button.botondetalles', function() {//  paciente File  
      let registro = table.row($(this).parents('tr')).data(); 
      //btoa("category=textile&user=user1") //atob("Y2F0ZWdvcnk9dGV4dGlsZSZ1c2VyPXVzZXIx")
      //window.location.href = "k_file.php?data="+btoa(registro.clientid) +'&pn='+btoa(registro.clientname);
      if (clType ==3 || clType ==4){
          setXCli('xcli',registro.clientid);
          setXCli('xname',registro.clientname);
          setXCli('xmail',registro.clientemail);
          window.location.href ='K_ficha';
      }
      if (clType==5) alert('ctacte inquilino')
  });
*/
function fillTC(texto, type, param){
  var ca;  i=0; j=0; h='';
  obj=JSON.parse(texto)
  if (type==='resumen') {resumen(obj);return;  }
  //if (obj.length==0) console.log('mostrar detalle de factura')
  imgPath=base_url+'Assets/images/cpacos/';
  letras = '';
  for (x of obj) {
    imagen = (x.imgname==='')?'':`
    <img test="tst" src="${isValidUrl(x.imgname)? x.imgname: imgPath+x.imgname}" width="100px;">`;
    h+=`<div class="container">
          <p>factura:${x.sid}</p>          <p>pago ${x.pyd}</p>
          <p>importe ${x.amt}</p>          <p>Banco: ${x.bank}</p>
          <p> letras ${numeroALetras(x.amt)}
          ${imagen}
        </div>
        `;
    letras = numeroALetras(x.amt);
  }
  document.getElementById('receipt').innerHTML=h;
  const button = document. createElement('button');
  button.type = 'button';
  button.innerText = 'Haz Click';
  button.setAttribute("id","btnPdf");
  button.setAttribute("class","btn btn-success");
  document.getElementById('receipt').appendChild(button);
  button.onclick = function() {
    //getSome('Ctactes/getReceipt/9','receipt', 9)
    //    window.open('export?id='+clid+'&cliente='+'vCliente','_blank');
    //window.open('Exp1','_blank');
    save(base_url+'data/gClient_PDF/'+param);
    const dato=new FormData(); dato.append('letras',letras);
    save(base_url+'data/gReceipt_PDF/'+param,dato);
    window.open('pdf_recibo/getExport','_blank');
  };  
}

btnResumen.addEventListener('click', ()=> getSome("/Ctactes/getCtactes/"+clid,'resumen'))
function resumen(obj){
  head = `<div class="form-group col-md-12">
            <table id="tabDet" border="1" class="table-striped table-bordered responsive" cellpadding="4" cellspacing="6" style="width:98%;"" >
            <thead><th>Fecha</th> <th>Detalle</th> <th>Compra</th> <th>Pago</th> <th>Saldo</th>`;
  body = '';
  for (x of obj) {
    body+= `<tr>
              <td>${x.ffecha}</td> <td>${(APP===2)?x.bank: x.bank+': '+ x.notes}</td> <td>${x.cargo}</td> <td>${x.abono}</td> <td class="text-right">${x.balance}</td>
            </tr>`;  }
  tabResumen = head+body; 
  inputs = [];  inputs.push({id:'html', idHt:tabResumen});
  openModal(inputs);  titleModal.innerHTML ='Resumen';  showModal();
  if(!(document.body.contains(document.querySelector('.export')))){
      otherBtn(['pdf',-2, true]); otherBtn(['excel',-3]);  otherBtn(['token',-4]);}

}

const otherBtn = data =>{  btn_name = data[0];   
  tName = document.createElement('a'); tName.className = "btn btn-info export";
  tName.innerHTML = btn_name.charAt(0).toUpperCase()+btn_name.slice(1);
  if(data[2]) tName.setAttribute('disabled','true');
  tName.setAttribute("exportto",btn_name);tName.setAttribute("tabindex",data[1]);
  tName.href=""; 
  document.getElementById('otherBtns').appendChild(tName);
}

//export
document.querySelector("#otherBtns").addEventListener("click", exportar);
function exportar(e) { e.preventDefault();     
  if (e.target&&e.target.tagName==='A'&&!(e.target.getAttribute('disabled')=='true')) exportTo(e.target.getAttribute("exportto"));
}
function exportTo(keyword){ 
  switch (keyword) {
    case 'pdf': window.open('pdf_presup/getExport','_blank'); break;
    case 'excel':
      sheet = (campo1.options[campo1.selectedIndex].text)      
      tableToExcel('tabDet',sheet);
      break;
    case 'token': console.log('token');
      setCampo(); arr1['type']=1; 
      const dato=new FormData(); dato.append('campos',JSON.stringify(arr1));
      fURL = base_url+'Access_token/createTkn'; save(fURL, dato);
    default:
      break;
  }
}

const beforeSave = data=>{arrAlert=[]; 

  switch (data[1]) {
    case 'Cargo': 
      if (campo3.value<=0) {arrAlert.push('Importe inválido','campo3');break;}
      fetch_URL = base_url +'cpacos/setCargo';     break;

    case 'Cobrar': 
      if (campo3.value<=0) {arrAlert.push('Importe inválido','campo3');break;}
      fetchMulti(arr1, 'cpacos/setCpaco','../Assets/images/cpacos/',idcampo);
      arrAlert[0]= '_close'; 
      break;      

    default:console.log('someaction before'); break;
  }
  return arrAlert;
}

const afterSave = data=>{    
  switch (data[1]) {
    case 'createTkn':      
      navigator.clipboard.writeText(base_url+'access_token?token='+data[0]+'&type=1');
      alert("token copiado");
      /*
        const copiarContenido = async () => {
          try {
            await navigator.clipboard.writeText(texto);
            console.log('Contenido copiado al portapapeles');
          } catch (err) {
            console.error('Error al copiar: ', err);
          }
        } 
      */    
      break;
    default: break;
        
  } 
}
