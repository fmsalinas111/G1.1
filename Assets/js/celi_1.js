var table;
function celi_list(){  
    botones = " <button style='font-size:13px;' type='button' class='botondetalles btn btn-success'><i class='fa fa-desktop'></i></button>"
     table = $("#celi_table").DataTable({
       language: {"decimal": "","emptyTable": "No hay información", "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas","infoEmpty": "Mostrando 0 to 0 of 0 Entradas", "infoFiltered": "(Filtrado de _MAX_ total entradas)","infoPostFix": "","thousands": ",","lengthMenu": "Mostrar _MENU_ Reg","loadingRecords": "Cargando...", "processing": "Procesando...","search": "Buscar:","zeroRecords": "Sin resultados encontrados","paginate": {"first": "Primero","last": "Ultimo","next": "Siguiente","previous": "Anterior" }},
       "order": [[ 1, "asc" ]],
       "ajax":{"url":"Controllers/C_celi.php",type: 'POST'},
          "columns": [
            {"data": "nombrenegocio",className: "text-left lead"},
            {"data": "direccion",className: "text-left"},
            {"data": "categoria"},
            {"data": "notas"},
            {"data": null,"orderable": false},
          ],
          "columnDefs": [
          { targets: 1, visible: false},
          { targets: 2, visible: false},
          { targets: 3, visible: false},
          { targets: 4, "defaultContent":botones, data: null }
          ],
   });
}
        

$('#celi_table').on('click', 'button.botondetalles', function() {    
    let registro = table.row($(this).parents('tr')).data(); 
    web = registro.web;
    face = registro.face;
    insta = registro.insta;
    linked = registro.linked;
    logo = registro.logo;
    if (logo.length>0) { 
      document.getElementById('logo_negocio').src = base_url+'Assets/images/uploads/'+logo;
    }else{
      document.getElementById('logo_negocio').src = base_url+'Assets/images/sinlogo.png';
    }

    document.getElementById('title').innerHTML = '<a href="pag?id='+registro.id+'">'+registro.nombrenegocio+'</a>';
    document.getElementById('website').innerHTML = web;
    document.getElementById('website').href = web;

    h = '<p >'+registro.notas+'</p>';
    h+='Direcci&oacute;n: <strong>'+registro.direccion+'</strong><br>';
    h+= '<p>'+coin('telefono', registro.telefono)+'</p>';
    h+= '<p>'+coin('wsp', registro.wsp)+'</p>';
    h +='<ul class="social-buttons" id="demo2">';
    
    h+= coin('face', face);      
    h+= coin('insta', insta);      
    //if (insta.length>0)  h +=' <li> <a href="'+registro.insta+'" class="brandico-instagram" id="insta"></a> </li>'
    h += '</ul>';
    document.getElementById('cardContent').innerHTML = h
    abrirModalNoStatic();
});

$('#celi_table').on('click', 'button.botonmodificar', function() {    
    let registro = table.row($(this).parents('tr')).data();
    abrirModal();    
    $("#txt_ID").val(registro.id);
    $("#txt_campo1").val(registro.nombrenegocio);
    $("#txt_campo2").val(registro.direccion);
    $("#txt_campo3").val(registro.face);
    $("#txt_campo4").val(registro.insta);
    $("#txt_campo5").val(registro.telefono);
    $("#txt_campo6").val(registro.wsp);
    $("#txt_campo7").val(registro.web);
    $("#txt_campo8").val(registro.notas);
    
    //$("#cmbMarca").val(registro.brand);
});
 
function filtrar(op){
  //si boton.caption = 'Tarjetas', estamos en tabla
  $('#global_filter').val(op);
  filterGlobal()
  //else
  // filtrando json por categoría
  
}

function filterByIcon(op) {
    $('#celi_table').DataTable().search(
        op,
    ).draw();
}

