
function preparaModal(name='',mail='',cell='',status=1, rid=0){
    combo1 = comboStatus('campo4', (status>0)? 'selected':'');
    combo2 = comboBuilder('rol',17,'campo5','data','requerido');
    inputs = []; h='';
    inputs.push({id: 'campo1' ,campo:'Nombre',selector:'input',type:'text',placeholder:'Nombre de usuario',value:name, label:1, required:''})
    inputs.push({id: 'campo2' ,campo:'Email',selector:'input',type:'email', placeholder:'correo', value:mail,label:1})
    inputs.push({id: 'campo3' ,campo:'Celular',selector:'input',value:cell,label:1}) 
    inputs.push({id: 'combo',  idCmb:combo1})// 
    inputs.push({id: 'combo',  idCmb:combo2})
    var data = new FormData(); data.append('src', 'data'); 
    getJson(base_url+'Data/getDataCmb/17',data,'combo_rol', 'campo5',rid,'Rol')  
    openModal(inputs)
    document.querySelector('#titleModal').innerHTML ="Usuarios"; //modal title
}
//preparaModal();
function prepara_abreModal(){  preparaModal();   showModal(); }
var table
    botones = "<button  type='button' class='botonmodificar btn btn-warning btn-sm'><i class='fa fa-edit'></i></button> ";
    botones = `
    <button type='button' class='botonmodificar btn btn-warning btn-sm'title='Editar'><i class='fa fa-edit'></i></button>    
    <button type='button' class='botonReset btn btn-success btn-sm'title ='Resetear o crear acceso'><i class='fa fa-cloud'></i></button>`

    document.addEventListener('DOMContentLoaded', function() {
		table=$('#tableUsuarios').DataTable({
    	    "aProcessing": true,  "aServerside": true,
            "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
    	    "ajax": { "url": " " + base_url + "/Usuarios/getUsuarios",   "dataSrc": ""  },
    	    "columns": [
    	        {"data":"name" },
                {"data":"rolName"},
    	        {"data":"mail" },
    	        {"data":"cell", className:"text-center"},
                {"data":"estado", 
                    "render":function(data,type,row){
                        return (data==1)? `<span class = "badge badge-success">Activo</span>`: `<span class = "badge badge-danger">Inactivo</span>`;
                    },className:"text-center"
                },
                { "data": null,"orderable": false},
    	    ],
            "columnDefs": [ 
                //{ targets: 0, visible: false},
                { targets: 5, "defaultContent":botones, data: null,className:"text-center" }  
            ],
    	    "responsieve": "true",
    	    "bDestroy": true,
    	    "iDisplayLength": 10,
    	    "order": [[0, "asc"]]
	    });
    })


$('#tableUsuarios').on('click', 'button.botonmodificar', function() {
    let r = table.row($(this).parents('tr')).data();    
    document.getElementById('id').value = r.uid
    preparaModal(r.name, r.mail, r.cell, r.estado, r.rid)
    showModal();
});

$('#tableUsuarios').on('click', 'button.botonReset', function() {
    let r = table.row($(this).parents('tr')).data();    
    document.getElementById('id').value = r.uid
    prepara_toK(r.name, r.mail, r.cell)
});

function prepara_toK(usuario='',email='',cell='',token=''){
    inputs = []; 
    inputs.push({id:'campo1' ,campo:'Usuario',selector:'input',type:'text',placeholder:'Nombre de usuario',value:usuario, label:1, disabled:''})
    inputs.push({id:'campo2' ,campo:'Email',selector:'input',type:'email', placeholder:'correo',value:email,label:1})
    inputs.push({id:'campo3' ,campo:'Celular',selector:'input',value:cell,label:1}) 
    inputs.push({id:'campo4' ,campo:'token',selector:'input',value:token, placeholder:'token',disabled:''}) 
    openModal(inputs);    showModal();
    document.querySelector('#btnText').innerHTML ="Generar"; 
    document.querySelector('#titleModal').innerHTML ="Recuperar contraseña"; //modal title
}
const prepareToSend = data=>{
  document.getElementById('campo4').value=data;
  document.querySelector('#alert1').innerHTML =`
    <a href="https://api.whatsapp.com/send?phone=${document.getElementById('campo3').value}&text=Hola, siga este enlace para recuperar su cuenta: 
          ${base_url}/access_token?token=${data}&type=usr">Enviar por whatsapp</a></br>
    <a href="https://api.whatsapp.com/send?phone=${document.getElementById('campo2').value}&text=Hola, siga este enlace para recuperar su cuenta: 
          ${base_url}/access_token?token=${data}&type=usr">Enviar por email</a></br>
    <a href="${base_url}/access_token?token=${data}&type=usr">Seguir el enlace</a>
    `; 
} 

function actionA1(e,c){
  document.getElementById(c).addEventListener('keyup', (event) => {
    if (event.keyCode == 107) {   f=e.substring(6);
      showAddData('mini-crud_'+f,'txtAdd_'+f);
    } }, false);
}