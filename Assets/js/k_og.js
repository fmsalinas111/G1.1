ogid=0; 
//document.getElementById('id').innerText = 'name patient'
function replaceAll(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function createOdontogram() {
    var htmlLecheLeft = "", htmlLecheRight = "", htmlLeft = "", htmlRight = "",
        a = 1;
    for (var i = 9 - 1; i >= 1; i--) {
        //Dientes Definitivos Cuandrante Derecho (Superior/Inferior)
        htmlRight += '<div data-name="value" id="dienteindex' + i + '" class="diente">' +
            '<span style="margin-left: 45px; margin-bottom:5px; display: inline-block !important; border-radius: 10px !important;" class="label label-info">index' + i + '</span>' +
            '<div id="tindex' + i + '" class="cuadro click">' + '</div>' +
            '<div id="lindex' + i + '" class="cuadro izquierdo click">' +  '</div>' +
            '<div id="bindex' + i + '" class="cuadro debajo click">' +  '</div>' +
            '<div id="rindex' + i + '" class="cuadro derecha click click">' +  '</div>' +
            '<div id="cindex' + i + '" class="centro click">' +  '</div>' +
            '</div>';
        //Dientes Definitivos Cuandrante Izquierdo (Superior/Inferior)
        htmlLeft += '<div id="dienteindex' + a + '" class="diente">' +
            '<span style="margin-left: 45px; margin-bottom:5px; display: inline-block !important; border-radius: 10px !important;" class="label label-info">index' + a + '</span>' +
            '<div id="tindex' + a + '" class="cuadro click">' +                '</div>' +
            '<div id="lindex' + a + '" class="cuadro izquierdo click">' +      '</div>' +
            '<div id="bindex' + a + '" class="cuadro debajo click">' +         '</div>' +
            '<div id="rindex' + a + '" class="cuadro derecha click click">' +  '</div>' +
            '<div id="cindex' + a + '" class="centro click">' +  '</div>' +    '</div>';
        if (i <= 5) {
            //Dientes Temporales Cuandrante Derecho (Superior/Inferior)
            htmlLecheRight += '<div id="dienteLindex' + i + '" style="left: -25%;" class="diente-leche">' +
                '<span style="margin-left: 45px; margin-bottom:5px; display: inline-block !important; border-radius: 10px !important;" class="label label-primary">index' + i + '</span>' +
                '<div id="tlecheindex' + i + '" class="cuadro-leche top-leche click">' +   '</div>' +
                '<div id="llecheindex' + i + '" class="cuadro-leche izquierdo-leche click">' +  '</div>' +
                '<div id="blecheindex' + i + '" class="cuadro-leche debajo-leche click">' +  '</div>' +
                '<div id="rlecheindex' + i + '" class="cuadro-leche derecha-leche click click">' +  '</div>' +
                '<div id="clecheindex' + i + '" class="centro-leche click">' +  '</div>' +
                '</div>';
        }
        if (a < 6) {
            //Dientes Temporales Cuandrante Izquierdo (Superior/Inferior)
            htmlLecheLeft += '<div id="dienteLindex' + a + '" class="diente-leche">' +
                '<span style="margin-left: 45px; margin-bottom:5px; display: inline-block !important; border-radius: 10px !important;" class="label label-primary">index' + a + '</span>' +
                '<div id="tlecheindex' + a + '" class="cuadro-leche top-leche click">' +  '</div>' +
                '<div id="llecheindex' + a + '" class="cuadro-leche izquierdo-leche click">' + '</div>' +
                '<div id="blecheindex' + a + '" class="cuadro-leche debajo-leche click">' + '</div>' +
                '<div id="rlecheindex' + a + '" class="cuadro-leche derecha-leche click click">' +'</div>' +
                '<div id="clecheindex' + a + '" class="centro-leche click">' + '</div>' +
                '</div>';
        }
        a++;
    }        
    document.getElementById('tr').innerHTML = (replaceAll('index', '1', htmlRight));
    document.getElementById('tl').innerHTML = (replaceAll('index', '2', htmlLeft));
    document.getElementById('tlr').innerHTML= (replaceAll('index', '5', htmlLecheRight));
    document.getElementById('tll').innerHTML= (replaceAll('index', '6', htmlLecheLeft));

    document.getElementById('bl').innerHTML = (replaceAll('index', '3', htmlLeft));
    document.getElementById('br').innerHTML = (replaceAll('index', '4', htmlRight));
    document.getElementById('bll').innerHTML= (replaceAll('index', '7', htmlLecheLeft));
    document.getElementById('blr').innerHTML= (replaceAll('index', '8', htmlLecheRight));

}


createOdontogram();


const getNombreAsync = async(idPost) =>{
    //console.log (idPost);
    try{
        const resPost = await fetch(base_url+'K_og/getOg/'+localStorage.xcli)
        const post = await resPost.json()
        deta = JSON.parse(JSON.stringify(post));            
        if(!deta) return null
        kirus = (deta.ogdet);
        document.getElementById('ogid').value = (deta.ogid);
        ogid = (deta.ogid);

        let arr = kirus.split(','); 
        console.log(arr, deta);

        arr.forEach(function(kiru, index) {
            //console.log(`${index} : ${kiru}`);
            ki1 = kiru.substring(0,3);        ki2 = kiru.substring(3)
            if (ki1=='red') document.getElementById(ki2).classList.toggle('click-red');
            if (ki1=='yel') document.getElementById(ki2).classList.toggle('click-yel');
            if (ki1=='blu') document.getElementById(ki2).classList.toggle('click-blue');
            //console.log (ki1, ki2)
        });

    }catch(error){
        console.log(error);
    }
}
getNombreAsync(1)
/*
//las sigtes dos lineas son el éxito de la misión. Los dientes se pueden pintar 
//de acuerdo a la lectura del regitro del paciente

//y se podrán almacenar en un nuevo odontograma o editar el mismo
c14.classList.toggle('click-blue')
c13.classList.toggle('click-red')
c18.classList.toggle('click-yel')
*/
const cmb = document.getElementById("select");
var color;
var guardar='';
var deta ='';

cmb.addEventListener('change',function(){color = selcolor(cmb.value); })


const cbox = document.querySelectorAll(".cuadro");
    for (let i = 0; i < cbox.length; i++) {
        cbox[i].addEventListener("click", function() {
        cbox[i].classList.remove('click-red', 'click-blue', 'click-yel');            
        cbox[i].classList.toggle(color);
        console.log(cbox[i].id);
        });
    }

const center = document.querySelectorAll(".centro");
    for (let i = 0; i < center.length; i++) {
        center[i].addEventListener("click", function() {
        center[i].classList.remove('click-red', 'click-blue', 'click-yel');
        center[i].classList.toggle(color);	       
        console.log(center[i].id);
        });
    }


const Leche = document.querySelectorAll(".cuadro-leche");
    for (let i = 0; i < Leche.length; i++) {
        Leche[i].addEventListener("click", function() {
        Leche[i].classList.remove('click-red', 'click-blue', 'click-yel');
        Leche[i].classList.toggle(color);
        });
    }

const cenLeche = document.querySelectorAll(".centro-leche");
    for (let i = 0; i < cenLeche.length; i++) {
        cenLeche[i].addEventListener("click", function() {
        cenLeche[i].classList.remove('click-red', 'click-blue', 'click-yel');
        cenLeche[i].classList.toggle(color);	       
        });
    }

function selcolor(option){
    switch (option) {
        case '1': return 'click-red';  break;
        case '2': return 'click-blue'; break;
        case '3': return 'click-yel';  break;
        default:  return 'kill';	   break;
    }
}

//ver la funcionalidad siguiente
function tieneClass(el, cl) {
    return ( !!el.className && !!el.className.match(new RegExp('\\b('+cl+')\\b')));

    //console.log(elem.matches('.click-red')); // true
    //console.log(elem.classList.contains(clase))
    //return new RegExp('(\\s|^)'+clase+'(\\s|$)').test(elem.className);  
}

document.getElementById('btGuardar').addEventListener('click', function(){
// document.getElementsByClassName('rojo prueba');
    const cbox = document.querySelectorAll(".cuadro");//  console.log('cuadro')
    for (let i = 0; i < cbox.length; i++) {  check(cbox[i].id);       }

    const center = document.querySelectorAll(".centro");//  
    for (let i = 0; i < center.length; i++) {  check(center[i].id);    }

    const leche = document.querySelectorAll(".cuadro-leche");
    for (let i = 0; i < leche.length; i++) {  check(leche[i].id);      }

    const cenLeche = document.querySelectorAll(".centro-leche");
    for (let i = 0; i < cenLeche.length; i++) { check(cenLeche[i].id); }

    guardar = guardar.substring(0, guardar.length - 1);//quita la coma final
    console.log(guardar); 
    registrar(guardar);
    guardar = '';
})

function check(opcion){        
    if (document.getElementById(opcion).classList.contains('click-red')) 
        guardar = guardar + 'red'+ opcion +',';
    if (document.getElementById(opcion).classList.contains('click-blue')) 
        guardar = guardar + 'blu'+ opcion +',';
    if (document.getElementById(opcion).classList.contains('click-yel')) 
        guardar = guardar + 'yel'+ opcion + ',';
}


function registrar(guardar){
    //guardar es el det
    //conseguir el patientid, ogdate
    arr2=new Object(); arr2['det'] = guardar; arr2['ogid'] = ogid;  arr2['pat'] = localStorage.xcli;
    const dato=new FormData(); dato.append('campos',JSON.stringify(arr2));
    fURL = base_url+'K_og/setOg'; save(fURL, dato);
}

const afterSave = data=>{
    switch (data[1]) {
      case 'setOg': 
        if (ogid === 0) ogid=data[0];  
        break;
      default:console.log('someaction og', data[1]); break;
    } 
  
  }
  