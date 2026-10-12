        localhost = false;
        if (window.location.hostname=="localhost") {
            document.querySelector('.captcha-container').setAttribute('style','display:none;');
            localhost = true;
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

        function handleSubmit(event) {
            event.preventDefault();

            // 1. Validar la trampa Honeypot
            const honeypot = document.getElementById('honeypot').value;
            if (honeypot !== "") {
                console.warn("Spam detectado vía honeypot.");
                return; 
            }

            // 2. Validar que el Captcha se haya resuelto
            // Cloudflare genera un token dentro de un campo 'cf-turnstile-response'
            const turnstileResponse = (localhost) ? "localhost" : document.querySelector('[name="cf-turnstile-response"]').value;
            if (!turnstileResponse) {
                alert("Por favor, completa el captcha para continuar.");
                return;
            }

            const storeName = createSlug(document.getElementById('storeName').value);
            const storeWhatsapp = document.getElementById('storeWhatsapp').value;
            // Si pasa todas las pruebas:
            //alert(`¡Genial! Tu tienda "${storeName}" ha pasado la validación de seguridad`);
            //save(storeName, turnstileResponse); // Aquí puedes enviar los datos al backend 
            // 1. Inicializas tu FormData con los datos básicos
            const dato = new FormData();  
            dato.append('ts', turnstileResponse);
            dato.append('tienda', storeName);
            dato.append('whatsapp', storeWhatsapp);

            // 2. También agregamos el campo trampa "honeypot" por seguridad            
            dato.append('honeypot', honeypot);

            // 3. Encapsulamos los productos de forma agrupada
            const filasProductos = document.querySelectorAll('.product-row');

            filasProductos.forEach((fila) => {
                // Buscamos los inputs específicos dentro de ESTA fila
                const nombre = fila.querySelector('input[name="pName[]"]').value;
                const precio = fila.querySelector('input[name="pPrice[]"]').value;
                const fotoInput = fila.querySelector('input[name="pPhoto[]"]');
                
                // PHP espera recibir arrays, por eso usamos los corchetes '[]' en el nombre de la variable
                dato.append('pName[]', nombre);  dato.append('pPrice[]', precio);
                
                // Mandamos el archivo real de la imagen (si el usuario la subió)
                if (fotoInput.files.length > 0) {
                    dato.append('pPhoto[]', fotoInput.files[0]);
                }
            });

            // 4. Enviamos al backend
            save(base_url + 'Storedemo/create', dato);
            
            // Nota de seguridad: En tu Backend (ej. Node.js, PHP, Python) debes tomar el valor de 
            // 'cf-turnstile-response' y enviarlo a Cloudflare junto con tu 'Secret Key' para 
            // hacer la verificación final antes de guardar en tu base de datos.
        }
        
        
function createSlug(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Borra los acentos
    .trim()
    .replace(/[^a-z0-9 -]/g, '') // Borra caracteres raros
    .replace(/\s+/g, '-');      // Cambia espacios por guiones
}



        
        
    