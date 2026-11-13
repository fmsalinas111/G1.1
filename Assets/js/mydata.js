
//console.log(bCard);
_$("#logoPreview").src = bCard.logo; if ((bCard.logo&&bCard.logo.length > 0))  show2(['logopreview']);  else hide2(['logopreview']); 
_$("#nombre_empresa").value = bCard.coName;
_$("#eslogan").value = bCard.slogan? bCard.slogan : '';
_$("#wsp").value = bCard.wsp;
_$("#fijo").value = bCard.fijo;
_$("#email").value = bCard.email;
_$("#horario").value = bCard.horario? bCard.horario : '';

_$("#direccion").value = bCard.direccion;
_$("#insta").value = bCard.insta;
_$("#face").value = bCard.face;
_$("#tik").value = bCard.tiktok;
_$("#web").value = bCard.web;
_$("#razon").value = bCard.razon;
_$("#cuit").value = bCard.cuit;
_$("#iva").value = bCard.iva;
_$("#alias").value = bCard.alias;
_$("#cbu").value = bCard.cbu;


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