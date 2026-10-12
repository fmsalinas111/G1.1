  const data = new FormData();     data.append('src', 'categoria');
    URL = base_url+'Celi/getCeli_cmb';
    getJson(URL, data, 'combo_cat', 'campo2',0,'Categoría' )
    
    const data1 = new FormData();     data1.append('src', 'localidad');
    URL = base_url+'Celi/getCeli_cmb';
    getJson(URL, data1, 'combo_loc', 'campo4',0,'Localidad' )
    

function preparaModal(nombrenegocio, categoria, direccion, localidad, face, insta, telefono, wsp, web, notas, logo,logo_url){
    if (!nombrenegocio)     nombrenegocio='';
    if (!categoria)   categoria=0;
    if (!direccion)   direccion='';
    if (!localidad)   localidad=0;
    if (!face)   face='';
    if (!insta)   insta='';
    if (!telefono)   telefono='';
    if (!wsp)   wsp='';
    if (!web)   web='';
    if (!notas)   notas='';
    if (!logo)   logo='';
    if (!logo_url) logo_url='';

    combo1 = `<div class="col-md-12"></div><div id="combo_categoria"></div> <br></div>`;
    combo2 = `<div class="col-md-12"></div><div id="combo_localidad"></div> <br></div>`;
/*    html1   =`<div>
                  <form onsubmit="return false" class="oculto" method="post" enctype="multipart/form-data" id="formUpload">
                  <label>Logo</label>
                  <input type="file" class="form-control" name="image" onchange="upload_img('campo11');">
                  </form>
              
              <img id="imglogo" width="60px;" src="${logo_url}">
              </div>`;    
*/
    inputs = []; h='';
    inputs.push({id: 'campo1', campo:'Nombre del negocio',selector:'input',type:'text',value:nombrenegocio, placeholder:'nombre del negocio'})
    inputs.push({id: 'combo',  idCmb:combo1})// categ campo2
    inputs.push({id: 'campo3', campo:'Domicilio',selector:'input',type:'text',value:direccion,placeholder:'Dirección'})
    inputs.push({id: 'combo',  idCmb:combo2})// localidad campo4
    inputs.push({id: 'campo5', campo:'Facebook',selector:'input',type:'text',value:face,placeholder:'Facebook'})
    inputs.push({id: 'campo6', campo:'Instagram',selector:'input',type:'text',value:insta,placeholder:'Instagram'})
    inputs.push({id: 'campo7', campo:'Teléfono',selector:'input',type:'text',value:telefono,placeholder:'Teléfono fijo'})
    inputs.push({id: 'campo8', campo:'WhatsApp',selector:'input',type:'text',value:wsp,placeholder:'WhatsApp: 5411####-####'})
    inputs.push({id: 'campo9', campo:'Web',selector:'input',type:'url',value:web,placeholder:'página web: http://...'})
    inputs.push({id: 'campo10', campo:'Notas',selector:'textarea',innerHTML:notas,rows:'2',placeholder:'notas',label:1})
    //inputs.push({id: 'campo11', campo:'Logo',selector:'input',type:'text',value:logo})
    //inputs.push({id: 'html', idHtml:html1})
    openModal(inputs)
    const data = new FormData();     data.append('src', 'categoria');
    URL = base_url+'Celi/getCeli_cmb';
    getJson(URL, data, 'combo_categoria', 'campo2',categoria,'Categoría' )
    
    const data1 = new FormData();     data1.append('src', 'localidad');
    URL = base_url+'Celi/getCeli_cmb';
    getJson(URL, data1, 'combo_localidad', 'campo4',localidad,'Localidad' )
    
    document.querySelector('#titleModal').innerHTML ="Mis negocios"; //Cambiamos el titulo
    
}

//preparaModal();
function prepara_abreModal(){
    preparaModal();
    showModal();
}


var table;
  document.addEventListener('DOMContentLoaded', function() {
  botones = "<button  type='button' class='botonmodificar btn btn-warning'><i class='fa fa-edit'></i></button> ";
  table=$('#perfil_table').DataTable({
        "aProcessing": true,  "aServerside": true,
        "language": {  "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"  },
        "ajax": { "url": " " + base_url + "/Miperfil/getMyBussiness",   "dataSrc": ""  },
          "columns": [
            {"data": "nombrenegocio",className: "text-left lead"},
            {"data": "direccion",className: "text-left"},
            {"data": "wsp"},
            {"data": "notas"},
            {"data": null,"orderable": false},
          ],
          "columnDefs": [
          { targets: 4, "defaultContent":botones, data: null }
          ],
          "columnDefs": [ { targets: 4, "defaultContent":botones, data: null }  ],
        "responsieve": "true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [  [0, "desc"] ]
    });
  })

$('#perfil_table').on('click', 'button.botonmodificar', function() {
    //cambiar el caption de registrar/actualizar
    let registro = table.row($(this).parents('tr')).data();    
    logo = registro.logo;
    
    logo_url = (logo.length>0)? base_url+'Assets/images/uploads/'+logo:base_url+'Assets/images/sinlogo.png'

    document.getElementById('id').value = registro.id

    preparaModal(registro.nombrenegocio, registro.categoria, registro.direccion, 
      registro.localidad, registro.face, registro.insta, registro.telefono,
      registro.wsp,registro.web,registro.notas, logo, logo_url)

    document.getElementById('campo10').value = registro.notas// porque desde el script2 no func
    showModal();


});

$('#perfil_table').on('click', 'button.botonborrar', function() {
    if (confirm("Confirme la eliminación del registro")) {
      let registro = table.row($(this).parents('tr')).data();
      let urlcontroller =  "controller/C_perfil.php";
      let mode   = -99;
          code  = registro.id;
          $.ajax({
              url: urlcontroller,
              type: 'POST',
              data :{mode:mode, code:code }
          }).done(function(resp){
              if(resp>0){
                  if(resp==1){
                      table.ajax.reload();
                  }else{
                      alert('?');
                  }
              }else{
                  //Swal.fire("Mensaje De Error","Lo sentimos, no se pudo completar el registro","error");
                  alert('error al eliminar')
              }
          })
    }        
});

function showModal_Celi(){
    $('#modalCeli').modal({backdrop:'static',keyboard:false});    
    $("#modalCeli").modal('show');  
}

function closeModal_Celi(){
  $("#modalFormCeli").modal('hide');
  document.getElementById('id').value = '';
}
