//todel?
var arrayNegocios=[];
var arrayAux=[];
var arrayCategory=[];
var sin_filtro=true;options='';
function verTabla(){
  var uno = document.getElementById('btnVer');
  if (uno.innerHTML == 'ver tabla') {
      uno.innerHTML = 'ver tarjetas';
		document.getElementById('cardData').style.display="inline";
		document.getElementById('overCards').style.display="none";		
  }else {uno.innerHTML = 'ver tabla'; 
  		document.getElementById('cardData').style.display="none";
  		document.getElementById('overCards').style.display="inline";
	}
}

function render(){	
	URL = base_url+'Celi/getNegocios';			
  	const data = new FormData(); 
    data.append('mode', -99);
    fetch(URL, { method: 'POST', body: data})
    .then(function(response) {
      //console.log(response)
       if(response.ok) {return response.text()} else {throw "Error Ajax";}
    })
    .then(function(texto) {
       //console.log(texto);
       if (texto =='added') {//
       		console.log('Hubo un error')
       }else{
       		fillTableContent(texto);
	   }
    })
    .catch(function(err) {console.log(err);});
}

render();


function coin(red,dato){
  if (dato.length>0) {
    switch (red) {      
      case 'web':
        return'<a href="'+dato+'"><i class="fas fa-globe"></i>&nbsp</a>'
        break;

      case 'telefono':
        return '<i class="fas fa-phone-alt"></i>&nbsp '+dato;
        break;
      case 'wsp':
        return'<a href="http://wa.me/'+dato+'"><i class="fab fa-whatsapp"></i>&nbsp</a>'
        //return'<a href="http://wa.me/'+dato+'" target="_blank"><i class="bi bi-whatsapp"></i>&nbsp</a>'
        break;

      case 'face':
        return'<a href="'+dato+'"><i class="fab fa-facebook-square"></i></a>&nbsp'
        break;
      case 'insta':
        //return '<a ref="'+dato+'"><i class="fab fa-instagram"></i></a>';
        return'<a href="'+dato+'"><i class="fab fa-instagram"></i></a>&nbsp'
        break;
      default:
        return 'defa';
        break;
    }
  }else{
    return '</br>';
  }
}

function fillTableContent(texto){
		var linea; var h;
		
		if (arrayNegocios.length>0) {
			obj = texto;
		}else{
	   		obj=JSON.parse(texto);// esta linea es superimportante 
	   		arrayNegocios=obj;
		}
		i=0; h=''	; l=''; 
		for (x of obj) {
			i=i+1;
			if (!arrayCategory.includes(x.categoryname)){ //lista de categ
    		l+='<li data-filter=".filter-'+x.categoryname.split(' ')[0]+'">'+x.categoryname+'</li>'
    		arrayCategory.push(x.categoryname)
        if (sin_filtro==true) options += `<option value="${x.categoryid}">${x.categoryname}</option>`;
    	}
		 //h+='<div class = "tarjeta portfolio-item filter-'+x.categoryname.split(' ')[0]+' "  >'
		 h+='<div class = "tarjeta filter-'+x.categoryname.split(' ')[0]+' "  >'
		 h+='<h5 class="text-center"><a href="#" title="Mas detalles" data-bs-toggle="modal" data-bs-target="#infoModal" onclick="mostrarModal(\''+x.id+'\')">'+x.nombrenegocio+'</a></h5>';
		 //h+='<h4 class="nomnegocio">'+x.nombrenegocio+'</h4>';
		 h+='<hr>';
          h+='    <h6 class="text-center">'+x.direccion+'</h6>'
          h+=      '<p class="text-center">'+coin('telefono', x.telefono)+'</p>';
          h+='    <div class="social-links text-center">'
    	  h+=      coin('wsp', x.wsp)+coin('face', x.face)+coin('insta', x.insta)+'</br>'+'</br>'+coin('web', x.web);
          h+='    </div>';
          h+='    <p>'+x.notas.substr(0,100)+'...</p>'
		 h+='</div>';
		}       

    document.getElementById('cards').innerHTML = h;
    if (sin_filtro){
      comboCat = `
          <select name="cmbCat" id="cmbCat"  onchange ="cmbChange(this)" class="form-control">
            <option value="0" selected="">(todos)</option><option style="display:none;"></option>
            ${options}
          </select>`; 
          document.getElementById('combo_cat').innerHTML = comboCat;
    }
      sortDropDownListByText('cmbCat')
      
        /*document.getElementById('category-list').innerHTML = `
            <ol id="portfolio-flters">
              	<li data-filter="*" class="filter-active red">Todos</li>
        	  	${l}
    	  	</ol>`*/
	
}

function filtrandoJSon(key, value){
 	if (value==0) {
    sin_filtro=true;
 		fillTableContent(arrayNegocios);
 	} else{
    sin_filtro = false;
    fillTableContent(getFilteredByKey(arrayNegocios, key, value));
	}	
}

function getFilteredByKey(array, key, value) {
  return array.filter(function(e) {
    return e[key] == value;
  });
}



function mostrarModal(id){

  const resultado = arrayNegocios.find( fruta => fruta.id === id );

  logo=(resultado.logo.length==0)? 'logouniversal.jpg':resultado.logo;
  
  telefono = (resultado.telefono.length==0)? '': '<li><strong>Teléfono</strong>: '+resultado.telefono+'</li>'
  wsp = (resultado.wsp.length==0)? '': '<li><strong>Whatsapp</strong>: '+resultado.wsp+'</li>'
  face = (resultado.face.length==0)? '': '<li><strong>Facebook: </strong><a href="'+resultado.face+'">'+resultado.face+'</a></li>'
  insta = (resultado.insta.length==0)? '': '<li><strong>Instagram: </strong><a href="'+resultado.insta+'">'+resultado.insta+'</a></li>'
  web = (resultado.web.length==0)? '': '<li><strong>WEB: </strong><a href="'+resultado.web+'">'+resultado.web+'</a></li>'
  
  notas = (resultado.notas.length==0)? '': resultado.notas;
  //prod = (arrayNegocios[op]['products'].length==0)? '': arrayNegocios[op]['products'];

  ind = document.getElementById('ind');

  ind.innerHTML = '<a href="index.html" class="logo" id="logo"><img src="Assets/images/'+logo+'" alt="" height="50"></a>'  
  document.getElementById('info').innerHTML=` <h3>${resultado.nombrenegocio}</h3>
          <ul> <li><strong>Dirección</strong>: ${resultado.direccion}</li>
            ${telefono} ${wsp} ${face} ${insta}${web}
          </ul>`;
  document.getElementById('description').innerHTML=` <h3>descripción</h3>
              <p>${notas}</p> `//${prod}
}

function sortDropDownListByText(selectId) {
     //Separo la primera opción del select (vacío) porque no quiero ordenarla
    var foption = $('#' + selectId + ' option:first');
    //Ordeno todas menos la primera (Si el texto de a y el de b son iguales no se hace nada, si el de a es menor que el de b es porque tiene que ir en un índice anterior (en la documentación indicada se explican todos los casos posibles de la compareFunction())
    var soptions = $('#' + selectId + ' option:not(:first)').sort(function (a, b) {
        return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
    });
    //Reasigno al select los valores ordenados y le añado antes la primera opción
    $('#' + selectId).html(soptions).prepend(foption);

};