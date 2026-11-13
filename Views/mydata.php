

<?php 
    headerAdmin2($data); 
    echo "<script >     const bCard =".$data['bcard'].";  </script>";  
?>

<main class="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">                
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
    
        <div class="bg-slate-900 text-white p-6 md:p-8">
            <h1 class="text-2xl md:text-3xl font-bold flex items-center gap-3">
                <i class="fa-solid fa-store text-blue-400"></i>
                Perfil             </h1>
            <p class="text-slate-400 text-sm mt-1">Configura la información visible de tu negocio.</p>
        </div>

        <form id="formPerfilNegocio" class="p-6 md:p-8 space-y-8" enctype="multipart/form-data">

            <section class="space-y-4">
                <h2 class="text-lg font-semibold text-slate-800 border-b pb-2 flex items-center gap-2">
                    <i class="fa-solid fa-id-card text-blue-600"></i> Identidad e Imágenes
                </h2>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-50 transition">
                        <div class="w-24 h-24 mb-3 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 relative">
                            <img id="logoPreview" class="logopreview w-full h-full object-cover hidden" alt="Logo ">
                            <i id="logoPlaceholder" class="fa-solid fa-image text-3xl text-slate-400"></i>
                        </div>
                        <label class="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition">
                            <i class="fa-solid fa-upload mr-1"></i> Subir Logo
                            <input type="file" id="logoInput" name="logo" accept="image/*" class="hidden" onchange="previewImage(this, 'logoPreview', 'logoPlaceholder')">
                        </label>
                        <span class="text-[11px] text-slate-400 mt-2">Recomendado: 500x500 px</span>
                    </div>

                    <div class="md:col-span-2 space-y-4">
                        <div>
                            <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Nombre Comercial / Fantasía *</label>
                            <input type="text" id="nombre_empresa" name="nombre_empresa" required 
                            placeholder="Ej. Mi Tienda Modas" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm">
                        </div>
                        <div>
                            <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Eslogan / Breve Descripción</label>
                            <input type="text" id="eslogan" name="eslogan" placeholder="Ej. Ropa y accesorios con estilo único" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm">
                        </div>
                    </div>
                </div>

                <div class="mt-4">
                    <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Imagen de Portada / Banner para la Web</label>
                    <input type="file" name="banner" accept="image/*" class="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer">
                </div>
            </section>


            <section class="space-y-4">
                <h2 class="text-lg font-semibold text-slate-800 border-b pb-2 flex items-center gap-2">
                    <i class="fa-solid fa-location-dot text-blue-600"></i> Contacto y Ubicación
                </h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">WhatsApp de Pedidos *</label>
                        <div class="flex">
                            <span class="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm"><i class="fa-brands fa-whatsapp text-emerald-500 mr-1"></i> +54</span>
                            <input type="tel" id="wsp"  name="whatsapp" required placeholder="1123456789" class="w-full px-4 py-2.5 rounded-r-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm">
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Teléfono Fijo / Alternativo</label>
                        <input type="tel" id="fijo" name="telefono" placeholder="011 4444-5555" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm">
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Email Público de Contacto</label>
                        <input type="email" id="email" name="email_contacto" placeholder="contacto@mitienda.com" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm">
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Horarios de Atención</label>
                        <input type="text" id="horario" name="horarios" placeholder="Lun a Vie de 9 a 18 hs" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm">
                    </div>

                    <div class="md:col-span-2">
                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Dirección Física / Local</label>
                        <input type="text" id="direccion" name="direccion" placeholder="Av. Corrientes 1234, CABA" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm">
                    </div>
                </div>
            </section>


            <section class="space-y-4">
                <h2 class="text-lg font-semibold text-slate-800 border-b pb-2 flex items-center gap-2">
                    <i class="fa-solid fa-share-nodes text-blue-600"></i> Redes Sociales
                </h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Instagram (@usuario)</label>
                        <div class="flex">
                            <span class="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm"><i class="fa-brands fa-instagram text-pink-600"></i></span>
                            <input type="text" id="insta" name="instagram" placeholder="mitienda.oficial" class="w-full px-4 py-2.5 rounded-r-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm">
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Facebook (Página / Usuario)</label>
                        <div class="flex">
                            <span class="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm"><i class="fa-brands fa-facebook text-blue-600"></i></span>
                            <input type="text" id="face" name="facebook" placeholder="facebook.com/mitienda" class="w-full px-4 py-2.5 rounded-r-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm">
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">TikTok</label>
                        <div class="flex">
                            <span class="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm"><i class="fa-brands fa-tiktok text-slate-800"></i></span>
                            <input type="text" id="tik" name="tiktok" placeholder="@mitienda" class="w-full px-4 py-2.5 rounded-r-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm">
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Sitio Web Propio / Dominio</label>
                        <div class="flex">
                            <span class="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm"><i class="fa-solid fa-globe text-slate-500"></i></span>
                            <input type="url" id="web" name="sitio_web" placeholder="https://www.mitienda.com" class="w-full px-4 py-2.5 rounded-r-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm">
                        </div>
                    </div>
                </div>
            </section>


            <section class="space-y-4">
                <h2 class="text-lg font-semibold text-slate-800 border-b pb-2 flex items-center gap-2">
                    <i class="fa-solid fa-file-invoice-dollar text-blue-600"></i> Datos Fiscales y de Cobro
                </h2>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Razon Social / Titular</label>
                        <input type="text" id="razon" name="razon_social" placeholder="Juan Pérez / Empresa S.A." class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm">
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">CUIT / CUIL / NIF</label>
                        <input type="text" id="cuit" name="cuit" placeholder="20-35678901-9" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm">
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Condición IVA</label>
                        <select name="condicion_iva" id="iva"  class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm bg-white">
                            <option value="1">Monotributo</option>
                            <option value="2">Responsable Inscripto</option>
                            <option value="3">Exento</option>
                            <option value="4">Consumidor Final</option>
                        </select>
                    </div>

                    <div class="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 mt-2">
                        <div>
                            <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Alias Bancario</label>
                            <input type="text" id="alias" name="alias_banco" placeholder="MI.TIENDA.PAGO" class="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm">
                        </div>
                        <div>
                            <label class="block text-xs font-bold uppercase text-slate-600 mb-1">CBU / CVU</label>
                            <input type="text" id="cbu" name="cbu_banco" placeholder="0000003100000000000000" class="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm">
                        </div>
                    </div>
                </div>
            </section>

            <div class="pt-4 border-t border-slate-200 flex justify-end">
                <button type="submit" class="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                    <i class="fa-solid fa-floppy-disk"></i> Guardar Configuración
                </button>
            </div>

        </form>
    </div>

</main>
            
        </div>
        
        <br> <br> <br>     <br> <br> <br>
        <br> <br> <br>
        

    <script>
        function previewImage(input, previewId, placeholderId) {
            const preview = document.getElementById(previewId);
            const placeholder = document.getElementById(placeholderId);
            
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.classList.remove('hidden');
                    if (placeholder) placeholder.classList.add('hidden');
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
    </script>
    <?php   
    
        footerAdmin2($data); 
    
        
    
    ?>
