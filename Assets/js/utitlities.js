//esconder precio y nombre
var x = document.getElementsByClassName('p-name p-price');
for (var i = 0; i < x.length; i++) {
  x[i].style.display= "none";
}

//pasarLista
nombres = ["anna", "beth", "chris", "daniel", "ethan"]
function pasarLista(nombre, indice) {
    console.log(`Está el numero de estudiante ${indice + 1}  -${nombre} - presente? Sí!`)
    ;}
nombres.forEach((nombre, indice) => pasarLista(nombre, indice));

function is_json(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

/*
Eventos: cut, copy, paste
Estos eventos ocurren al cortar/copiar/pegar un valor.
Estos pertenecen a la clase ClipboardEvent y dan acceso a los datos cortados/copiados/pegados.
También podemos usar event.preventDefault() para cancelar la acción y que nada sea cortado/copiado/pegado.

El siguiente código también evita todo evento cut/copy/paste y muestra qué es los que estamos intentando cortar/copiar/pegar:
<input type="text" id="input">
*/
<script>
  input.onpaste = function(event) {
    alert("paste: " + event.clipboardData.getData('text/plain'));
    event.preventDefault();
  };

  input.oncut = input.oncopy = function(event) {
    alert(event.type + '-' + document.getSelection());
    event.preventDefault();
  };
</script>


/*acumulador o filtro  
for (x of obj) {
  if (ultimoValor!==x.data) {
     h+=` <div class = "someClass">
            <h3 class="text-center">${x.data} (${x.otherData})</h3>
            <p>${xx}</p> <p>sometext</p>
          </div>`;
    ultimoValor = x.data;
  }
}    
document.getElementById('cards').innerHTML = h; 
*/

arr = x.refes.split(','); 
var repetidos = {};
arr.forEach(function(numero){
  repetidos[numero] = (repetidos[numero] || 0) + 1;
});
console.log(repetidos);    

function cuantosRepetidos(array, elemento) {  contador = 0;
  for (i = 0; i < array.length; i++) {
    for(item of array[i]) {
      if(item === el)         contador++;    
    }
  }  return contador;
}



/*// mostrar u ocultar columnas:  table.column(0).visible(true); 
  for (var i = 0; i < 4; i++) {
      table.column(i).visible(false, false);
  }
  table.columns.adjust().draw(false); // adjust column sizing and redraw
  */
//quitar filtro: table.columns().search('').search('').draw();
//table.columns().search('').search('').draw();

//qrcode
//new QRCode(document.getElementById("qrcode"), "http://jindo.dev.naver.com/collie");
/*
function makeCode () {    
  var elText = document.getElementById("text");  
  if (!elText.value) {    alert("Input a text");    elText.focus();    return;  }
  qrcode.makeCode(elText.value);
}
makeCode();
gId('text').addEventListener("blur",(e)=>{makeCode();});
gId("text").addEventListener("keydown", function (e) {
    if (e.keyCode == 13) makeCode();
  });
*/


/**
 * Formatea un número con dos decimales, utilizando los separadores
 * de miles y decimales adecuados para una región específica.
 *
 * @param {number} numero El número que se quiere formatear.
 * @param {string} [locale=undefined] El código de idioma y país (ej. 'en-US', 'es-AR').
 * @returns {string} El número formateado.
 */
function formatearNumero(numero, locale = undefined) {
  // Configuración de las opciones de formato
  const opciones = {
    minimumFractionDigits: 2, // Asegura que siempre haya al menos dos decimales
    maximumFractionDigits: 2, // Limita el número de decimales a dos
  };
  // Se crea una instancia de Intl.NumberFormat para el locale especificado
  // Si no se especifica un locale, se usa el del navegador del usuario
  const formateador = new Intl.NumberFormat(locale, opciones);
  // Se formatea y se devuelve el número
  return formateador.format(numero);
}
// Obtiene el locale preferido del navegador del usuario
const localeDelNavegador = navigator.language;
// Formatea el número usando el locale del usuario
const numeroFormateado = formatearNumero(1234567.89, localeDelNavegador);
console.log(`Número formateado según el navegador del usuario (${localeDelNavegador}): ${numeroFormateado}`);

/*
Abre el archivo del que quieres eliminar las líneas vacías en Visual Studio Code.
Pulse Ctrl+ H(Windows/Linux) o Command+ H(Mac) para abrir el panel "Buscar y reemplazar".
En el campo “Buscar”, escriba:^\s*$\n
En el campo “Reemplazar”, déjelo en blanco.
Asegúrese de que el botón "Expresión regular" esté seleccionado en el panel "Buscar y reemplazar".
Haz clic en el botón “Reemplazar todo”.
*/