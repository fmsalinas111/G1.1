/*function detectaMOvil(){
    if( navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)
  alert("You're using Mobile Device!!")
}*/

function eliminar(){
  place = document.getElementById('title').innerText;
  nombrecortado  = place.split(" "); primera = nombrecortado[0];
  if (confirm("Confirme la eliminación del registro")) {
    let registro = table.row($(this).parents('tr')).data();
    let urlcontroller =  "Controllers/C_perfil.php";
    if (primera == 'Admin') urlcontroller =  "Admin/delAdm";
    let mode   = -99;
    code  = $("#txt_ID").val();
    $.ajax({
        url: urlcontroller, type: 'POST',
        data :{mode:mode, code:code }
    }).done(function(resp){
        if(resp>0){
            if(resp==1){
                LimpiarRegistro();
                $("#modal_registro").modal('hide');
                table.ajax.reload();
            }else{ alert('?'); }
        }else{
            //Swal.fire("Mensaje De Error","Lo sentimos, no se pudo completar el registro","error");
            alert('error al eliminar')
        }
    })
  }          
}
//-----------------------------------------
function registrar(){
    //let urlcontroller =  "Controllers/C_perfil.php";
    let urlcontroller =  "Miperfil/setBussiness";

    let mode   = $("#txt_ID").val();
        place  = $("#title").text();
    var campo1; var campo2; var campo3; var campo4; var campo5;    
    var cmb1; var cmb2; var cmb3;
    var campo = []; var cmb=[];
    //usar un ternario con undefined   
    campo1 = (document.getElementById('txt_campo1'))? document.getElementById('txt_campo1').value:'';
    campo2 = (document.getElementById('txt_campo2'))? document.getElementById('txt_campo2').value:'';
    campo3 = (document.getElementById('txt_campo3'))? document.getElementById('txt_campo3').value:'';
    campo4 = (document.getElementById('txt_campo4'))? document.getElementById('txt_campo4').value:'';
    campo5 = (document.getElementById('txt_campo5'))? document.getElementById('txt_campo5').value:'';
    campo6 = (document.getElementById('txt_campo6'))? document.getElementById('txt_campo6').value:'';
    campo7 = (document.getElementById('txt_campo7'))? document.getElementById('txt_campo7').value:'';
    campo8 = (document.getElementById('txt_campo8'))? document.getElementById('txt_campo8').value:'';
    campo9 = (document.getElementById('txt_campo9'))? document.getElementById('txt_campo9').value:'';
    campo10 = (document.getElementById('txt_campo10'))? document.getElementById('txt_campo10').value:'';
    cmb1 = $("#cmb1").val();
    cmb2 = $("#cmb2").val();
    
    //sin jquery y con array
  

      var b = document.querySelectorAll(".fields");
      var brands = [];
      var campos = [];
      for (index = 0; index < b.length; ++index) {
          f = (b[index].id)
          if (f.substring(0,4)=='txt_') f = b[index].id.substr(4);
          campos.push(f +':'+ b[index].value)
      }
//console.log(campos)

    //sin jquery fin


    if (campo1.length==0){alert('Campo obligatorio'); $("#txt_campo1").focus(); return false;}
    if (cmb1==0){alert('Campo obligatorio'); $("#cmb1").focus(); return false;}
    if (cmb2==0){alert('Campo obligatorio'); $("#cmb2").focus(); return false;}

    nombrecortado  = place.split(" "); primera = nombrecortado[0];
//    if (primera == 'Admin') urlcontroller =  "Controllers/C_admin.php";
    if (primera == 'Admin') urlcontroller =  "Admin/setAdm";
    ultima = place.substring(place.lastIndexOf(" ") -7);  
    ultima = ultima.trim()

//   fetch
  
  URL = base_url+urlcontroller; 
  
  
  const data = new FormData(); 
    data.append('campo1', campo1);    
    data.append('campo2', campo2);    
    data.append('campo3', campo3);    
    data.append('campo4', campo4);    
    data.append('campo5', campo5);    
    data.append('campo6', campo6);    
    data.append('campo7', campo7);    
    data.append('campo8', campo8);    
    data.append('campo9', campo9); 
    data.append('campo10', campo10); 
    data.append('cmb1', cmb1);    
    data.append('cmb2', cmb2);    

    data.append('mode', mode);

//console.log(data)
    fetch(URL, { method: 'POST', body: data})
    .then(function(response) {
//      console.log(response)
       if(response.ok) {
           return response.text()
       } else {
           throw "Error en la llamada Ajax";
       }
    })
    .then(function(texto) {
console.log(texto)
      var objData = JSON.parse(texto);
      alert(objData.msg)
      if (objData.status) {       
          LimpiarRegistro();
          $("#modal_registro").modal('hide');
          table.ajax.reload();
       }

    })
    .catch(function(err) {
       console.log(err);
    });

//fetch   fin
////ajax jquery
/*
    $.ajax({
        url: urlcontroller,
        type: 'POST',
        data :{campo1: campo1, campo2:campo2, campo3:campo3, campo4:campo4, campo5:campo5,
         campo6: campo6, campo7:campo7, campo8:campo8, campo9:campo9, campo10:campo10,
        cmb1:cmb1, cmb2:cmb2, cmb3:cmb3,
        mode:mode, place:place }
        }).done(function(resp){
          if(resp>0){
              if(resp==1){
                  LimpiarRegistro();
                  $("#modal_registro").modal('hide');
                  table.ajax.reload();
              }else{
                  //return Swal.fire("Mensaje De Advertencia","Lo sentimos, el nombre ya se encuentra registrado","warning");
              }
          }else{
              alert('error al registrar')
          }
    })
*/
////ajax jquery fin

}




function registrar2(){
  const data = new FormData(); 
  data.append('campo1', document.getElementById('txt_campo1').value);    
  data.append('mode', document.getElementById('txt_ID').value);
  
    URL = 'controller/C_data.php';
    fetch(URL, { method: 'POST', body: data})
    .then(function(response) {
      console.log(response)
       if(response.ok) { return response.text()} else { throw "Error Ajax"; }
    })
    .then(function(texto) {
       console.log(texto);
       if (texto ='added') {//reload page
        data_list()
          //location.reload();
       }
    })
    .catch(function(err) {console.log(err);});
}


function LimpiarRegistro(){
    $("#txt_ID").val("");
    $("#txt_campo1").val("");
    $("#txt_campo2").val("");
    $("#txt_campo3").val("");
    $("#txt_campo4").val("");    
    $("#txt_campo5").val("");    
    $("#txt_campo6").val("");    
    $("#txt_campo7").val("");    
    $("#txt_campo8").val("");    
    $("#txt_campo9").val("");    
    $("#txt_campo10").val("");    
    if ($('#cmbCat').length) $('#cmbCat').val(0)      
    if ($('#cmbLoc').length) $('#cmbLoc').val(0)
    if ($('#logo').length) document.getElementById('logo').src='';
}

function cerrarModal(){  $("#modal_registro").modal('hide');}

function abrirModal(op){
    if (op==1) LimpiarRegistro();
    $('#modal_registro').modal({backdrop:'static',keyboard:false});    
    $("#modal_registro").modal('show');
}
function abrirModalNoStatic(op){
    if (op==1) LimpiarRegistro();
    $('#modal_registro').modal()
    $("#modal_registro").modal('show');
}


    function abrirModal2(op){
        //if (op==1) LimpiarRegistro();
        
        $('#modal_2').modal({backdrop:'static',keyboard:false})
        $("#modal_2").modal('show');
    }
///
function resume_list(){
  
     table = $("#resume_table").DataTable({
       "ajax":{"url":"controller/C_main.php",type: 'POST'},
          "columns": [
            {"data": "paymentid"},
            {"data": "paymentdate", className: "text-left"},
            {"data": "clientname", className: "text-left"},
            {"data": "debit", className: "text-right"},
            {"data": "credit", className: "text-right"},
            {"data": "balance", className: "text-right"},
            {"data": null,"orderable": false},
          ],
          "columnDefs": [{
            targets: 3,
            "defaultContent":"<button style='font-size:13px;' type='button' class='botonmodificar btn btn-warning'><i class='fa fa-edit'></i></button> &nbsp; <button style='font-size:13px;' type='button' class='botonborrar btn btn-danger'><i class='fa fa-trash'></i></button>  &nbsp; <button style='font-size:13px;' type='button' class='botondetalles btn btn-success'><i class='fa fa-desktop'></i></button>",
            data: null
          }],
   });
}
//
function receivable_list(){
     table = $("#receivable_table").DataTable({
       "ajax":{"url":"controller/C_main.php",type: 'POST'},
          "columns": [
            {"data": "salesid"},
            {"data": "ffecha", className: "text-left"},
            {"data": "clientname", className: "text-left"},
            {"data": "amount", className: "text-right"},
            {"data": null,"orderable": false},
          ],
          "columnDefs": [{
            targets: 4,
            "defaultContent":"<button style='font-size:13px;' type='button' class='botonmodificar btn btn-warning'><i class='fa fa-edit'></i></button> &nbsp; <button style='font-size:13px;' type='button' class='botonborrar btn btn-danger'><i class='fa fa-trash'></i></button>",
            data: null
          }],
   });
}




////data
function loadCmb(id, src, fi, cmb, comb_div, opSelect){ //fi:primer option-> todos o seleccionar
  //document.getElementById(cmb).disabled = true;
      $.ajax({
            url:'Controllers/cmb.php',  type:'POST',
            data:{id:id, src:src, fi:fi}
        }).done(function(resp){                      
            h =  '<select name="'+cmb+'" id="'+cmb+'" class="form-control fields" onchange ="cmbChange('+cmb+')">'
            newCmb = h+resp+'</select>';             
            $("#"+comb_div).html(newCmb);
            if (opSelect>0)   document.getElementById(cmb).value = opSelect;
        });
    //document.getElementById(cmb).disabled = false;
}

function cmbChange(cmb){  
  
  var sPath = window.location.pathname;    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);    
  if (sPage=='admin.php' ||  sPage=='admin') {
    if (cmb.id=='cmbTabla'){
      varsession('numTabla',cmb.value);
      //location.reload();
      
      listar_tabla(cmb.value); 
      /* Para obtener el texto y llevarlo a título del modal*/
      document.getElementById('title').innerText += ' '+ cmb.options[cmb.selectedIndex].text;
    }
  }
  if (sPage=='index.php' ||  sPage=='' ||  sPage=='Celi') {
    if (cmb.id=='cmbCat') {  
      filtrandoJSon('categoria',cmb.value);
    }
  }
  if (sPage=='cpn.php') {
    if (cmb.id=='cmbCat' ) {
      varsession('s_filterCat',cmb.value)  // editar la variable de sesion para el filtro
      table.ajax.reload();
    }
  }  
}

function showAdd(div_option, txtoption){  
    if (document.getElementById(div_option).style.display=="none") {
      document.getElementById(div_option).style.display="inline";
      document.getElementById(txtoption).focus;
    }else{
      document.getElementById(div_option).style.display="none";
    }
}

function newAdd(data, txtAdd, div_crud, txtoption, type, cmb, div_cmb){//txtAdd=id txtInput;   
  newData = document.getElementById(txtAdd).value;
  console.log('data:'+data+' newdata:'+newData+' type:'+type)
  addRecord(data, 0, newData, type);
  loadCmb(type, data, 1, cmb, div_cmb); //recarga el combo
  document.getElementById(div_crud).style.display="none";
  document.getElementById(txtAdd).value="";  //borrar texto 
  if (table == null || table == undefined){
  }else{
    table.ajax.reload();  //recarga el datatable
  }
  //table.api().ajax.reload();
}

function addRecord(gTabla, reload, campo1, campo2, campo3, campo4,campo5,campo6){
    gTabla = gTabla;
    reload = reload;
    campo1 = campo1;
    campo2 = campo2;
    campo3 = campo3;
    campo4 = campo4;    
    campo5 = campo5;    
    campo6 = campo6;    
    $.ajax({
        "url":"BD/addRecord.php",
        type: 'post',
        data: { campo1: campo1, 
                campo2: campo2, 
                campo3: campo3,
                campo4: campo4,
                campo5: campo5,
                campo6: campo6,
                gTabla: gTabla
                }
    }).done(function(resp){  
      //alert(resp) // new id
        if(resp==0 ) {
            alert ('error')        
        }else{
            alert('ok:'+resp);            
        }
        if (reload) window.location.reload()
    })
}


function borrarRegistro(codigo, dato, datatype) {
  $.ajax({
    type: 'GET',
    url: 'BD/datos.php?accion=borrar&codigo='+codigo+'&datatype='+datatype+'&dato='+dato,
    data: '',
    success: function(msg) {   table.ajax.reload(); },
    error: function() {      alert("Hay un problema");    }
  });
}

function setCookie(cooName, cooValue){
  document.cookie = cooName + encodeURIComponent(cooValue);
}

function readCookie(name) {
  return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}

function varsession(nombre, valor){
      $.ajax({
      url:'Controllers/ssn.php',
      type:'POST',
      data:{varName:nombre, varVal:valor}
    }).done(function(resp){
      if (resp=='ok') {
        //
      }
    });    
}

function mostrarInactivos(){
  btnInactivos = document.getElementById('inactivos');
  btnText      = btnInactivos.innerText;
  if (btnText=='Inactivos') {
    btnInactivos.innerText = 'Activos';
    varsession('s_showinactive',1)
  }else{
    btnInactivos.innerText = 'Inactivos';
    varsession('s_showinactive',0)
  }
  table.ajax.reload();
}

function afetch(URL,data){

    fetch(URL, { method: 'POST', body: data})
    .then(function(response) {
      console.log(response)
       if(response.ok) {
           return response.text()
       } else {
           throw "Error en la llamada Ajax";
       }

    })
    .then(function(texto) {
       console.log(texto);
       if (texto ='added') return 'texto'      
    })
    .catch(function(err) {
       console.log(err);
    });  
}

function mostrarMas(negid){
  //alert(  document.getElementById(negid).innerText)
  msg = negid.innerText;
  if (msg.length>0)   alert(msg)  
}

function filterGlobal(x_table) {
    $(x_table).DataTable().search(
        $('#global_filter').val(),
    ).draw();
}
