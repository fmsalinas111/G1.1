let params = new URLSearchParams(location.search);
let pyd = params.get('pyd');
let ft = params.get('ft');
var qrcode = new QRCode("qrcode");

gId('pdf').addEventListener('click', ()=> pdf())
function pdf() {
    window.scrollTo(0,0);
    var element = document.getElementById('receipt');
    var opt = {
      margin:0, // Elimina todos los márgenes [arriba, izquierda, abajo, derecha]
      filename: 'recibo.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },      
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] } // Evita que corte elementos a la mitad
    };
    html2pdf().set(opt).from(element).save();    
}

const rHead = cli =>{
  h=`
    <strong>Nro:</strong> ${cli.pyd}<br>
    <strong>Fecha:</strong> ${cli.fec_receipt}<br>
    <strong>Cliente:</strong> ${cli.nombre}<br>    
  `;
  gIC('receipt-info').innerHTML = h;
  gIC('amount-number').innerText = cli.abono;
  gIC('amount-words').innerText = numeroALetras(cli.abono);
  //console.log(cli, cli.company_data);
  if (cli.company_data) {
      // Inyectamos el nombre en el elemento con ID 'coName'
      gIC('logo').innerText = cli.company_data.coName || 'Empresa S.A.'; 
      // Inyectamos la dirección, teléfono, etc., en el elemento con ID 'coDetails'
      gIC('company-details').innerHTML = `
          ${cli.company_data.direccion || 'Dirección no disponible'}<br>
          Tel: ${cli.company_data.wsp || '-'}<br>
           ${cli.company_data.cuit || '-'}
      `;
      gId('concept').innerText = cli.concept
      if (APP>0){
        qr=`${base_url}receipt?pyd=${cli.pyd}&ft=${cli.ft}`;
        qrcode.makeCode(qr);}else{
          gId('valid').innerText = 'documento válido'
          gIC('qr-code').setAttribute('style','display:none;');
        }
  }
}


function numeroALetras(num) {
    const unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const decenas = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const decenasMas = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const centenas = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    function centena(num) {
        if (num === 0) return 'cero';
        let output = '';
        let c = Math.floor(num / 100);
        let resto = num % 100;
        let d = Math.floor(resto / 10);
        let u = resto % 10;
        if (c > 0) output += centenas[c] + ' ';
        if (c === 1 && resto === 0) return 'cien';

        if (resto < 10) output += unidades[resto];
        else if (resto >= 10 && resto < 20) output += decenas[u];
        else {
            output += decenasMas[d];
            if (u > 0) output += ' y ' + unidades[u];
        }
        return output.trim();
    }

    if (num === 0) return 'cero';
    let millones = Math.floor(num / 1000000);
    let miles = Math.floor((num % 1000000) / 1000);
    let cientos = num % 1000;
    
    let res = [];
    if (millones > 0) {
        let txt = millones === 1 ? 'un millón' : centena(millones) + ' millones';
        res.push(txt);
    }
    if (miles > 0) {
        let txt = miles === 1 ? 'mil' : centena(miles) + ' mil';
        res.push(txt);
    }
    if (cientos > 0) {
        res.push(centena(cientos));
    }
    return res.join(' ');
}

async function obtenerDatos(data) {
    try {// 'await' pausa la ejecución hasta que la promesa se resuelva
        const resultado = await getSome3('receipt/gReceipt/'+data,{"ft":ft}); 
        rHead (resultado); // Muestra el resultado final
    } catch (error) {        console.error("Hubo un error:", error);    }
}

if (!pyd) {r = getLSobj('receipt');  pyd=r.pyd;ft=r.ft;}
console.log(pyd, ft);
obtenerDatos(pyd);
