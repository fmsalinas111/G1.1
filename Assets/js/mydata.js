
//console.log(bCard);
$("#logoPreview").src = bCard.logo; if ((bCard.logo&&bCard.logo.length > 0))  show2(['logopreview']);  else hide2(['logopreview']); 
$("#nombre_empresa").value = bCard.coName;
$("#eslogan").value = bCard.slogan? bCard.slogan : '';
$("#wsp").value = bCard.wsp;
$("#fijo").value = bCard.fijo;
$("#email").value = bCard.email;
$("#horario").value = bCard.horario? bCard.horario : '';

$("#direccion").value = bCard.direccion;
$("#insta").value = bCard.insta;
$("#face").value = bCard.face;
$("#tik").value = bCard.tiktok;
$("#web").value = bCard.web;
$("#razon").value = bCard.razon;
$("#cuit").value = bCard.cuit;
$("#iva").value = bCard.iva;
$("#alias").value = bCard.alias;
$("#cbu").value = bCard.cbu;


document.getElementById('formPerfilNegocio').addEventListener('submit', async function(e) {
    e.preventDefault();    
    // FormData captura automáticamente todos los inputs (textos, selects y archivos)
    const formData = new FormData(this);    // crear función setSome o similar
    console.log(base_url + 'mydata/setPerfil');
    try {
        const response = await fetch(base_url + 'mydata/setPerfil', {
            method: 'POST', body: formData
        });        
        const result = await response.json();
        console.log('Respuesta del servidor:', result);
        if (result.success) {
            alert('¡Datos guardados correctamente!');
        } else {
            alert('Error: ' + result.message);
        }
    } catch (err) {
        console.error('Error enviando datos:', err);
    }
});