
let params = new URLSearchParams(location.search);
var id = params.get('id');

function mostrarConfig(){document.getElementById('modal').classList.toggle('is-active')}
function cerrarConfig(){document.getElementById('modal').classList.remove('is-active')}


function setImg(op,img){
	h= '<p class="title"></p> <p class="subtitle">  </p>';
	h+= '<figure class="image is-4by3"> <img id="img'+op+'"></figure><br><br>';
	document.getElementById("fig"+op).innerHTML = h;
	document.getElementById('img'+op).src = base_url+'Assets/images/uploads/'+img;
	document.getElementById('img'+op).style.width = 'auto';
}

var arrayNegocios=[];
	function render(){
	  	const data = new FormData(); 
	    data.append('mode', id);
	    fetch('Controllers/C_celi.php', { method: 'POST', body: data})
	    .then(function(response) {
	       if(response.ok) {return response.text()
	       } else {throw "Error en la llamada Ajax";}
	    })
	    .then(function(texto) {//console.log(texto);
	       if (texto =='added') {console.log('Hubo un error')
	       }else{fillTableContent(texto);}
	    })
	    .catch(function(err) {console.log(err);});
	}

	render();



function coin(red,dato){
  if (dato.length>0) {
    switch (red) {
      case 'web':
        //return '<h5><i class="fas fa-globe"></i> '+dato+'</h5>';
        return'<a href="'+dato+'"><i class="fas fa-globe fa-1x"></i>&nbsp<small><span>'+dato+'<span></small></a>'
        break;
      case 'telefono':
        return '<i class="fas fa-phone-alt"></i>&nbsp '+dato;
        break;
      case 'wsp':
        //return '<a href="http://wa.me/5411........">wsp</a>'
        return'<a href="http://wa.me/'+dato+'"><i class="fab fa-whatsapp"></i>&nbsp'+dato+'</a>'
        break;

      case 'face':
        return'<a href="'+dato+'"><i class="fab fa-facebook-square fa-2x"></i></a>&nbsp'
        break;
      case 'insta':
        //return '<a ref="'+dato+'"><i class="fab fa-instagram"></i></a>';
        return'<a href="'+dato+'"><i class="fab fa-instagram fa-2x"></i></a>&nbsp'
        break;
      default:
        return 'defa';
        break;
    }
  }else{
    return '';
  }
}
function fillTableContent(texto){
		var linea; var h;
//		console.log(arrayNegocios)
		if (arrayNegocios.length>0) {
			obj = texto;
		}else{
	   		obj=JSON.parse(texto);// esta linea es superimportante 
	   		arrayNegocios=obj;
		}
		h=''	;
		for (x of obj) {
			if(x.userid!=document.getElementById('us').value) document.getElementById('menuConfig').style.display ="none";
			
		    if (x.logo.length>0) { 
		      document.getElementById('logo').src = base_url+'Assets/images/uploads/'+x.logo;
		    }else{
		      document.getElementById('logo').src = base_url+'Assets/images/sinlogo.png';
		    }			
			//document.getElementById('logo').src = base_url+'Assets/images/uploads/'+x.logo
			document.getElementById('title').innerHTML = (x.title.length>0)? x.title : x.nombrenegocio
			document.getElementById('subtitle').innerHTML = x.subtitle
			document.getElementById('contentNotas').innerHTML = (x.description.length>0)? x.description : x.notas;
			/*
			if (x.img1.length>0) setImg(1,x.img1);
			if (x.img2.length>0) setImg(2,x.img2);
			if (x.img3.length>0) setImg(3,x.img3);
			*/
			if (x.img4.length>0) {
			  setImg(4,x.img4);
		      document.getElementById('imata').src = base_url+'Assets/images/uploads/'+x.img4;
			}

			 h+='<h5>Dirección: '+x.direccion+'</h5>';
			 //h+= coin('web', x.web);
			 h+= '<p>'+coin('telefono', x.telefono)+'</p>';
			 h+= '<p>'+coin('wsp', x.wsp)+'</p>';
			 h+='<div class = "row" style="padding-left:20px;">'
			 h+= coin('face', x.face);
			 h+= coin('insta', x.insta);

			 document.getElementById('txt_campo1').value = x.title;
			 document.getElementById('txt_campo2').value = x.subtitle;
/*			 document.getElementById('txt_campo3').value = x.img1;
			 document.getElementById('txt_campo4').value = x.img2;
			 document.getElementById('txt_campo5').value = x.img3;
*/			 
			 document.getElementById('txt_campo6').value = x.products;
			 document.getElementById('txt_campo7').value = x.description;
			 document.getElementById('txt_campo8').value = x.img4;

           let arr = x.products.split(','); 
            //console.log(arr); 
            p='';
            arr.forEach(function(kiru, index) {
                //console.log(`${index} : ${kiru}`);
                p+='<li>'+kiru+'</li>';
            });
		}       
		document.getElementById('contentContact').innerHTML = h;
        document.getElementById('contentProducts').innerHTML = p;

}


document.getElementById('btnGuardar').addEventListener('click', function(){
	URL = base_url+'/Pag/setPag';	
	mode = id;
  const data = new FormData(); 
    data.append('campo1', document.getElementById('txt_campo1').value);    
    data.append('campo2', document.getElementById('txt_campo2').value);    
	//data.append('campo3', document.getElementById('txt_campo3').value);
	//data.append('campo4', document.getElementById('txt_campo4').value);
    //data.append('campo5', document.getElementById('txt_campo5').value);
    data.append('campo6', document.getElementById('txt_campo6').value);
    data.append('campo7', document.getElementById('txt_campo7').value);
    data.append('campo8', document.getElementById('txt_campo8').value);
	data.append('mode', mode);

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
       if (texto ='added') {//reload page
       		location.reload();
       }
    })
    .catch(function(err) {
       console.log(err);
    });

})

