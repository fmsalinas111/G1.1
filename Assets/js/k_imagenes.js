//desde  aquí gusradado para probar multi upl
  /*$("#submitForm").on("submit", function(e){
    e.preventDefault();
    $.ajax({
      url  :"Controllers/uploadMulti.php",
      
      type :"POST", cache:false,
      contentType : false, // you can also use multipart/form-data replace of false
      processData : false,
      data: new FormData(this),
      success:function(response){
        alert('ok');
        $("#success").show();
        $("#multipleFile").val("");
        //fetchData();
      }
    });
  });

  var form
  if (document.querySelector("#submitFor")) {
      form = document.querySelector("#submitForm");
      form.onsubmit = function(e){
        e.preventDefault();     
        const data = new FormData(this);
        URL = base_url+'uploadMulti'; 
        fetch(URL, {method: 'POST', body: data  })
        .then(function(response) {//console.log(response);
          if(response.ok) { return response.text() } else { throw "Ajax error"; }
        })
        .then(function(texto) {console.log(texto);})
      }
  }
*///hasta aquí
btnNuevo.addEventListener('click',()=>prepara_abreModal());

function preparaModal(imagen='', fecha=hoy(), description=''){
  idcampo="campo1"; combo1=setPreview(nuevaImg(imagen,'klk'), idcampo, imagen);
  inputs = []; h='';  
  inputs.push({id:'combo',  idCmb:combo1})  
  inputs.push({id:'combo',  idCmb:"<hr>"})
  inputs.push({id:'campo2', campo:'Fecha', selector:'input',type:'date', value:fecha, label:1})  
  inputs.push({id:'campo3', campo:'Descripción',selector:'textarea',rows:4, innerHTML: description, label:1})
  openModal(inputs);
}

function prepara_abreModal(){
  preparaModal();   showModal();   
}
///datatable///
var table; var drid; var paid; var schid;
xcli = localStorage.getItem('xcli');
document.getElementById('title').innerHTML = '<i class="fa fa-user-tag"></i> Imágenes: <b>'+localStorage.xname+'</b>';
botones = `<button  type='button' class='botonmodificar btn btn-warning btn-sm ' >Mostrar<i class='fa fa-edit'></i></button>`;

document.addEventListener('DOMContentLoaded', function() {
  table=$('#tableKimage').DataTable({
    "aProcessing": true,  "aServerside": true,
    "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
    "ajax": { "url": " " + base_url + "/K_imagenes/getImagenes/"+xcli, "dataSrc": ""  },
    "columns": [
      { "data": "imageid" },
      { "data": "imagename",
        "render":function(data,type,row){
          if (data==null) {
            return '<center><img src = '+base_url+'Assets/images/klk/'+'noimage.jpg'+' width="80" height ="80" /></center>';
          }else{
            if (data.substr(0,4)=='http') {
              return '<center><img src = '+data+' width="80" height ="80" /></center>';
            }else{
              //return '<center><a href="#" onclick="foo('+data+')"><img src='+base_url+'Assets/images/klk/'+data+' width="80" height ="80" /></a></center>';
              return `<center><a href="#" onclick="foo('${base_url}Assets/images/klk/${data}')"><img src="${base_url}Assets/images/klk/${data}" width="80" height ="80" /></a></center>`;
            }
          }
        },"orderable": false 
      },
      { "data": "imagedate" },
      { "data": "imagedescription",
        "render":function(data,type,row){
          return data.substr(0,30)+' ...';
        }
       },
      { "data": null,"orderable": false},
    ],
    "columnDefs": [
     //{ targets: 0, visible: false},//id
     { targets: 4, "defaultContent":botones, data: null }],
    "responsieve": "true",
    "bDestroy": true,
    "iDisplayLength": 10,
    "order": [  [0, "desc"] ]
  });
})


$('#tableKimage').on('click', 'button.botonmodificar', function() {
  let r = table.row($(this).parents('tr')).data();
  document.getElementById('id').value = r.imageid;
  preparaModal(r.imagename, r.imagedate, r.imagedescription);
  //img_elem='imgModal';
  localStorage.setItem('imgToUpld',r.imagename);
  edtImgName=r.imagename;
  showModal();
});



// Get the modal
var imodal = document.getElementById("myModalImg");
// Get the image and insert it inside the modal - use its "alt" text as a caption
function foo(img){
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");
    imodal.style.display = "block";
    modalImg.src = img;
    //captionText.innerHTML = 'this.alt';
}

span=imodal.querySelector('.closeImg')
span.onclick = function() { 
  imodal.style.display = "none";
}