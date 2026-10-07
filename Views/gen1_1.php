

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?=dse();?></title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .card {
            background: white;
            max-width: 640px;
            width: 100%;
            padding: 48px 40px;
            border-radius: 32px;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.12);
            text-align: center;
        }

        .badge {
            display: inline-block;
            background: #eef2ff;
            color: #4f46e5;
            font-size: 13px;
            font-weight: 600;
            padding: 6px 16px;
            border-radius: 100px;
            letter-spacing: 0.3px;
            margin-bottom: 20px;
        }

        h1 {
            font-size: 34px;
            font-weight: 700;
            color: #0b1120;
            line-height: 1.2;
            margin-bottom: 12px;
        }

        h1 span {
            color: #4f46e5;
        }

        .subtitle {
            font-size: 18px;
            color: #4b5563;
            line-height: 1.6;
            margin-bottom: 28px;
        }

        .benefits {
            display: flex;
            flex-direction: column;
            gap: 10px;
            text-align: left;
            background: #f8fafc;
            padding: 20px 44px;
            border-radius: 16px;
            margin-bottom: 32px;
        }

        .benefits p {
            font-size: 15px;
            color: #1e293b;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .benefits p span {
            font-size: 20px;
        }

        .form-group {
            text-align: left;
            margin-bottom: 18px;
        }

        .form-group label {
            font-size: 14px;
            font-weight: 600;
            color: #1e293b;
            display: block;
            margin-bottom: 5px;
        }

        .form-group input {
            width: 100%;
            padding: 14px 16px;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 16px;
            transition: border 0.2s;
            background: #fafbfc;
        }

        .form-group input:focus {
            outline: none;
            border-color: #4f46e5;
            background: white;
        }

        .btn-primary {
            width: 100%;
            background: #4f46e5;
            color: white;
            border: none;
            padding: 16px;
            font-size: 18px;
            font-weight: 600;
            border-radius: 12px;
            cursor: pointer;
            transition: background 0.2s, transform 0.1s;
            margin-top: 6px;
        }

        .btn-primary:hover {
            background: #4338ca;
        }

        .btn-primary:active {
            transform: scale(0.98);
        }

        .btn-primary:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .disclaimer {
            font-size: 13px;
            color: #94a3b8;
            margin-top: 18px;
        }

        .success {
            display: none;
            background: #ecfdf5;
            border: 2px solid #10b981;
            border-radius: 16px;
            padding: 28px 20px;
            margin-top: 10px;
        }

        .success h2 {
            color: #065f46;
            font-size: 22px;
            margin-bottom: 8px;
        }

        .success p {
            color: #047857;
            font-size: 16px;
        }

        .success .emoji-big {
            font-size: 48px;
            display: block;
            margin-bottom: 10px;
        }

        .footer-note {
            margin-top: 28px;
            font-size: 13px;
            color: #94a3b8;
            border-top: 1px solid #e2e8f0;
            padding-top: 24px;
        }

        .footer-note a {
            color: #4f46e5;
            text-decoration: none;
            font-weight: 500;
        }

        @media (max-width: 480px) {
            .card {
                padding: 28px 20px;
            }

            h1 {
                font-size: 26px;
            }

            .subtitle {
                font-size: 16px;
            }

            .benefits {
                padding: 16px;
            }
        }
    </style>
</head>
<body>

    <div class="card" id="landing">
        <!-- Badge -->
        <div class="badge">🚀 Lanzamiento · Prueba gratuita</div>

        <!-- Título -->
        <h1>
            Crea tu tienda<br />
            en <span>1 minuto!!</span>
        </h1>

        <p class="subtitle">
            Sin registros, sin contraseñas:<br>
            <strong><?=dse();?>.com.ar/tu_negocio</strong> <br> con 3 productos de ejemplo.
        </p>

        <!-- Beneficios -->
        <div class="benefits">
            <p><span>⚡</span> Tu tienda lista en 1 minuto (literal)</p>
            <p><span>📱</span> Los pedidos te llegan por WhatsApp</p>
            <p><span>🆓</span> Probá gratis sin vueltas</p>
        </div>

        <!-- Formulario -->
        <form id="formPrueba" style= "display:none;">
            <div class="form-group">
                <label for="negocio">Nombre de tu negocio</label>
                <input type="text" id="negocio" placeholder="Ej: Panadería La Esquina" required />
            </div>

            <div class="form-group">
                <label for="whatsapp">Tu WhatsApp (con código de país)</label>
                <input type="tel" id="whatsapp" placeholder="Ej: +54 9 11 1234 5678" required />
            </div>

            <button type="submit" class="btn-primary" id="btnSubmit0">Crear mi tienda</a>
        </form>
        <button type="button" type="button" class="btn-primary" id="btnSubmit">Crear mi tienda</button>
        <p class="disclaimer">
            ✦ Sin compromiso. Sin mails. Solo tu WhatsApp para recibir pedidos.
        </p>

        <!-- Mensaje de éxito (oculto inicialmente) -->
        <div class="success" id="successMessage">
            <span class="emoji-big">🎉</span>
            <h2>¡Ya casi está!</h2>
            <p>
                En los próximos minutos recibirás un WhatsApp con el link de tu tienda
                <strong><?=server();?>/tu_negocio</strong>. 
            </p>
            <p style="margin-top: 12px; font-size: 14px;">
                ➡️ Compartilo con un amigo para que te haga un pedido de prueba.
            </p>
        </div>

        <!-- Footer -->
        <div class="footer-note">
            ¿Ya tenés cuenta? <a href="login">Iniciá sesión</a>
        </div>
    </div>

    <script>
        document.getElementById('btnSubmit').addEventListener('click', function (e) {
            e.preventDefault();

            const negocio = document.getElementById('negocio').value.trim();
            const whatsapp = document.getElementById('whatsapp').value.trim();
            const btn = document.getElementById('btnSubmit');

            // Validación básica
            /*if (!negocio || !whatsapp) {
                alert('Por favor, completá ambos campos.');
                return;
            }*/
            window.location.href = "creartienda";


            // Deshabilitar botón para evitar doble envío
            btn.disabled = true;
            btn.textContent = 'Enviando...';


            // === ACÁ CONECTÁS CON TU BACKEND ===
            // Opción A: Enviar a un webhook (ej: Make.com, Zapier, o tu API)
            // Opción B: Enviar por email (usando EmailJS o similar)
            // Opción C: Guardar en localStorage y mostrar mensaje (simulación)

            // ---- EJEMPLO DE ENVÍO A WEBHOOK (descomentar y usar) ----
            /*
            fetch('https://tu-webhook.com/endpoint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ negocio, whatsapp })
            })
            .then(response => {
                if (!response.ok) throw new Error('Error en el servidor');
                return response.json();
            })
            .then(data => {
                mostrarExito();
            })
            .catch(error => {
                alert('Hubo un error. Intentá de nuevo más tarde.');
                btn.disabled = false;
                btn.textContent = 'Crear mi tienda de prueba';
                console.error(error);
            });
            */

            // ---- SIMULACIÓN (para probar la landing) ----
            console.log('Datos enviados:', { negocio, whatsapp });

            // Simular demora de red
            setTimeout(() => {
                mostrarExito();
                btn.disabled = false;
                btn.textContent = 'Crear mi tienda de prueba';
            }, 1500);
        });

        function mostrarExito() {
            document.getElementById('formPrueba').style.display = 'none';
            document.querySelector('.disclaimer').style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';

            // Scroll suave al mensaje de éxito
            document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth' });
        }
    </script>

</body>
</html>