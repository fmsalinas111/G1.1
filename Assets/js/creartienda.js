localhost = false;
if (window.location.hostname=="localhost") {
    document.querySelector('.captcha-container').setAttribute('style','display:none;');
    localhost = true;
}

/**
 * Comprime una imagen en el cliente usando HTML5 Canvas
 * @param {File} file - Archivo de imagen original
 * @param {number} maxWidth - Ancho máximo permitido (ej: 1080px)
 * @param {number} quality - Calidad JPEG de 0.1 a 1.0 (ej: 0.7 = 70%)
 * @returns {Promise<File>} - Retorna la imagen comprimida lista para FormData
 */
function compressImage(file, maxWidth = 1080, quality = 0.75) {
    return new Promise((resolve, reject) => {
        // Si no es imagen, la dejamos pasar directo
        if (!file || !file.type.startsWith('image/')) {
            return resolve(file);
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                let width = img.width;
                let height = img.height;

                // Redimensionar proporcionalmente si supera el ancho máximo
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                // Convertir el canvas a Blob con compresión JPEG
                canvas.toBlob((blob) => {
                    if (!blob) {
                        return reject(new Error('Error al comprimir la imagen'));
                    }                    
                    // Recreamos un objeto File manteniendo el nombre original
                    const compressedFile = new File([blob], file.name, {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    });
                    resolve(compressedFile);
                }, 'image/jpeg', quality);
            };
            img.onerror = (error) => reject(error);
        };
        reader.onerror = (error) => reject(error);
    });
}


function previewThumbnail(input) {
    const preview = input.nextElementSibling;
    if (input.files && input.files[0]) {
        if (!input.files[0].type.startsWith('image/')) {
            alert('Por favor, selecciona solo archivos de imagen.');
            input.value = ''; // Limpia la selección incorrecta
            preview.src = ''; // Limpia la vista previa
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
        reader.readAsDataURL(input.files[0]);
    }
}

document.getElementById('storeForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    // 1. Validar la trampa Honeypot
    const honeypot = document.getElementById('honeypot').value;
    if (honeypot !== "") { 
        console.warn("Spam detectado vía honeypot."); 
        return; 
    }    

    // 2. Validar que el Captcha se haya resuelto
    const turnstileResponse = (localhost) ? "localhost" : document.querySelector('[name="cf-turnstile-response"]').value;
    if (!turnstileResponse) {
        alert("Por favor, completa el captcha para continuar.");
        return; 
    }

    const storeName = createSlug(document.getElementById('storeName').value);
    gId('storeName').value = storeName; // Actualiza el valor del input con el slug generado
    const storeWhatsapp = document.getElementById('storeWhatsapp').value;

    const btnSubmit = document.getElementById('btnSubmit');
    const spinnerText = document.getElementById('spinnerText');
    const btnText = document.getElementById('btnText');

    btnSubmit.disabled = true;
    spinnerText.style.display = 'inline-block';
    btnText.style.display = 'none';

    try {
        // 1. Inicializas tu FormData con los datos básicos
        const dato = new FormData();  
        dato.append('ts', turnstileResponse);
        dato.append('tienda', storeName);
        dato.append('whatsapp', storeWhatsapp);

        // 2. Campo trampa "honeypot"
        dato.append('honeypot', honeypot);

        // 3. Encapsulamos los productos usando un bucle for...of (Soporta await)
        const filasProductos = document.querySelectorAll('.product-row');

        for (const fila of filasProductos) {
            const nombre = fila.querySelector('input[name="pName[]"]').value;
            const precio = fila.querySelector('input[name="pPrice[]"]').value;
            const fotoInput = fila.querySelector('input[name="pPhoto[]"]');

            dato.append('pName[]', nombre);
            dato.append('pPrice[]', precio);

            // Comprimimos la foto de forma sincrónica antes de meterla al FormData
            if (fotoInput.files && fotoInput.files[0]) {
                const rawFile = fotoInput.files[0];            
                const compressedPhoto = await compressImage(rawFile, 1080, 0.75);            
                dato.append('pPhoto[]', compressedPhoto, rawFile.name);
            }
        }

        // 4. Enviamos al backend una vez que TODAS las fotos han sido procesadas
        save(base_url + 'Creartienda/create', dato);

    } catch (error) {
        console.error('Error en el proceso:', error);
        alert('Ocurrió un error al procesar el formulario.');
    } finally {
        // 5. Ocultar spinner y rehabilitar botón
        btnSubmit.disabled = false;
        spinnerText.style.display = 'none';
        btnText.style.display = 'inline-block';
    }
});

function createSlug(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Borra los acentos
    .trim()
    .replace(/[^a-z0-9 -]/g, '') // Borra caracteres raros
    .replace(/\s+/g, '-');      // Cambia espacios por guiones
}

const afterSave = data => {
  if (data[1] === 'create') {

    gIC('alerta').style.display = 'block';
    gIC('alerta').classList.add('alert-success');gIC('alerta').classList.remove('alert-warning');
    gId('alert-title').innerText = '¡Éxito!';  
    gId('animate').style.display = 'none';
    gId('alert-text').innerHTML = '¡Tienda creada con éxito! ' + `<a href="${base_url}${gId('storeName').value}">Ver mi tienda</a>`;
    //setCookie("usr", gId('storeName').value, 100); // 100 días
    //setCookie("co", data[0], 100); // 100 días
    guardarCookie("usr", gId('storeName').value, 100); // 100 días
    guardarCookie("co", data[0], 100); // 100 días
    setTimeout(function(){ gIC('alerta').style.display = 'block'; }, 2000);
    window.location.href = base_url + gId('storeName').value;
  } 
  if (data[1] === 'registrar') {
    document.querySelector('h2').textContent = 'Crea tu tienda';
    gId('register').style.display = 'none';
    gId('storeForm').style.display = 'block';
    gId('storeName').value = '';
    deleteCookie('usr');
    deleteCookie('co');
  }
}

const afterSaveFail = data => {
  if (data[0].trim() === 'ya existe!') {
    gIC('alerta').style.display = 'block';
    gIC('alerta').classList.add('alert-warning');gIC('alerta').classList.remove('alert-success');
    gId('alert-title').innerText = 'Error';
    gId('alert-text').innerText = data[0] + ' Elige otro nombre de tienda.';
    setTimeout(function(){ gIC('alerta').style.display = 'none'; }, 1500);
  }
}



gId('storeName').addEventListener('input', function() {
  const exists = stores.some(store => store.toLowerCase() === this.value.toLowerCase());
  if (exists) {
    gId('storeName').setCustomValidity('Este nombre de tienda ya existe. Por favor, elige otro.');  
  } else {
    gId('storeName').setCustomValidity(''); // Limpia el mensaje de error si no existe
  }
});

function init() {
    if (getCookie('usr') && getCookie('co')) {//move to init
        document.getElementById('warning-form').style.display = 'block';
        document.getElementById('storeForm').style.display = 'none';
        gId('ya-tenes').value = getCookie('usr');
        gIC('ya-tenes').textContent = getCookie('usr');
        //const createAnyway = confirm('ya tiene una tienda creada con este dispositivo, si continúa perderá la actual: '+getCookie('usr'));
    }
}
gId('btnotra').addEventListener('click', function() {
    document.getElementById('warning-form').style.display = 'none';
    document.getElementById('storeForm').style.display = 'block';
});

function register(e){
    gId('warning-form').style.display = 'none';
    document.querySelector('h2').textContent = 'Crea tu cuenta';
    gId('register').style.display = 'block';
}

function guardarCookie(nombre, valor, diasExpiracion) {
  try {
    const fecha = new Date();
    fecha.setTime(fecha.getTime() + (diasExpiracion * 24 * 60 * 60 * 1000));
    const expiracion = "expires=" + fecha.toUTCString();
    // Asignación estándar a document.cookie
    document.cookie = `${nombre}=${valor}; ${expiracion}; path=/; SameSite=Strict`;    
    return {result: true, message: "Cookie guardada correctamente."};
  } catch (error) {
    console.error("No se pudo guardar la cookie:", error.message);
    return {result: false, message: "Error al guardar la cookie."};
  }
}



gId('register').addEventListener('submit', async function(e) {
    e.preventDefault();
    const userName = (document.getElementById('username').value);
    gId('storeName').value = storeName; // Actualiza el valor del input con el slug generado
    const userWhatsapp = document.getElementById('userwhatsapp').value;
    const userEmail = document.getElementById('useremail').value;

    const btnSubmit = document.getElementById('btnRegister');
    const spinnerText = document.getElementById('spinnerRegister');
    const btnText = document.getElementById('btnRegisterText');

    btnSubmit.disabled = true;
    spinnerText.style.display = 'inline-block';
    btnText.style.display = 'none';

    try {
        // 1. Inicializas tu FormData con los datos básicos
        const dato = new FormData();  
        //dato.append('ts', turnstileResponse);
        dato.append('username', userName);
        dato.append('whatsapp', userWhatsapp);
        dato.append('usermail', userEmail);
        // 2. Campo trampa "honeypot"
        //dato.append('honeypot', honeypot);

        // 3. validamos las contraseñas
        const userPassword = document.getElementById('pass1').value;
        const userPasswordConfirm = document.getElementById('pass2').value;
        if (userPassword !== userPasswordConfirm) {
            //mostrar mensaje de error al usuario 
            alert('Las contraseñas no coinciden.');
            return;
        }
        dato.append('pass', userPassword);
        // 4. Enviamos al backend una vez que TODAS las fotos han sido procesadas
        save(base_url + 'Creartienda/registrar', dato);

    } catch (error) {
        console.error('Error en el proceso:', error);
        alert('Ocurrió un error al procesar el formulario.');
    } finally {
        // 5. Ocultar spinner y rehabilitar botón
        btnSubmit.disabled = false;
        spinnerText.style.display = 'none';
        btnText.style.display = 'inline-block';
        console.log('Formulario de registro procesado.');
        //mostrar formulario de creartienda
        gId('warning-form').style.display = 'none';
        gId('register').style.display = 'none';
        gId('storeForm').style.display = 'block';
        gId('storeName').value ='';
        deleteCookie('usr');
        deleteCookie('co');
    }
});


init();