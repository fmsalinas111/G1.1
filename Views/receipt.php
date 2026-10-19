
<!DOCTYPE html>
<html lang="es">
<head>
    <title>Recibo de Cobro</title>
    <style>
        :root {
            --primary: #2563eb;
            --secondary: #1e293b;
            --text-dark: #334155;
            --bg-light: #f8fafc;
        }

        body {
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            background-color: #e2e8f0;
            margin: 0;
            padding: 30px 20px;
            color: var(--text-dark);
        }

        .receipt-container {
            max-width: 800px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
            overflow: visible;
            border: 1px solid #e2e8f0;

            page-break-inside: avoid; /* Evita que el elemento se rompa entre páginas */
            height: auto
        }

        /* Encabezado */
        .header {
            background: var(--bg-light);
            padding: 40px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #f1f5f9;
        }

        .header-left .logo {
            font-size: 24px;
            font-weight: bold;
            color: var(--primary);
            margin-bottom: 8px;
        }

        .header-left .company-details {
            font-size: 14px;
            color: #64748b;
            line-height: 1.5;
        }

        .header-right {
            text-align: right;
        }

        .header-right h1 {
            margin: 0 0 15px 0;
            color: var(--secondary);
            font-size: 28px;
            text-transform: uppercase;
        }

        .receipt-info {
            font-size: 14px;
            line-height: 1.8;
            color: #475569;
        }

        /* Detalles */
        .content {
            padding: 40px;
        }

        .details-title {
            font-size: 18px;
            color: var(--secondary);
            margin-bottom: 20px;
            font-weight: 600;
        }

        .amount-box {
            background: var(--bg-light);
            border-left: 4px solid var(--primary);
            padding: 25px;
            border-radius: 0 8px 8px 0;
            margin-bottom: 30px;
        }

        .amount-number {
            font-size: 36px;
            font-weight: bold;
            color: var(--secondary);
            margin-bottom: 8px;
        }

        .amount-words {
            font-size: 15px;
            color: #64748b;
            font-style: italic;
        }

        /* Pie de página */
        .footer {
            padding: 0 40px 40px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .qr-code {
            text-align: center;
        }

        .qr-code img {
            width: 100px;
            height: 100px;
        }

        .qr-text {
            font-size: 12px;
            color: #94a3b8;
            margin-top: 5px;
        }

        /* Botón de exportar */
        .no-print {
            text-align: center;
            margin-top: 25px;
            padding-bottom: 30px;
        }

        .btn-export {
            background-color: var(--primary);
            color: white;
            border: none;
            padding: 12px 30px;
            font-size: 15px;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        .btn-export:hover {
            background-color: #1d4ed8;
        }

        /* Estilos para impresión y PDF */
        @media print {
            body {
                background: none;
                padding: 0;
            }

            .receipt-container {
                box-shadow: none;
                border: none;
            }

            .no-print {
                display: none;
            }
        }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js">
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js">
      
   </script>
</head>
<body>

    <div class="receipt-container" id="receipt">
        <!-- Encabezado -->
        <div class="header">
            <div class="header-left">
                <div class="logo">coName</div>
                <div class="company-details">
                    coAddress<br>
                    005917843150<br>                    
                </div>
            </div>
            <div class="header-right">
                <h1>Recibo</h1>
                <div class="receipt-info">
                    <strong>Nro:</strong> 0001-00004512<br>
                    <strong>Fecha:</strong> 28/05/2026<br>
                    <strong>Cliente:</strong> Juan Pérez<br>
                    
                </div>
            </div>
        </div>

        <!-- Detalle -->
        <div class="content">
            <div class="details-title">Detalle del Pago</div>
            <div class="amount-box">
                <div class="amount-number">sin datos válidos</div>
                <div class="amount-words">Son: Quince mil quinientos pesos con 00/100</div>
            </div>
        </div>

        <!-- Pie de página con QR -->
        <div class="footer">
            <div class="receipt-info">
                <strong>Concepto:</strong> Pago correspondiente a <u><span id="concept">servicios del mes de ....</span></u><br>
                <span id="valid" style="font-size: 13px; color: #64748b;">Emitido digitalmente. Sujeto a validación.</span>
            </div>
            <div class="qr-code" > 
                <!-- Reemplazar src con tu propio generador de QR o enlace de validación -->
                <input type="text" id="text" name="text" value ='793' style="display: none;" >
                <img src="receipt" alt="Código QR de validación" style="display: none;">
                <div class="qr-text">Escanear para validar</div>
                <div id="qrcode"></div>
                
            </div>
        </div>
    </div>

    <!-- Opciones de exportación -->
    <div class="no-print">
        <button class="btn-export" onclick="window.print()">Imprimir</button>
        <button class="btn-export" id="pdf" >Descargar pdf</button>
    </div>
    <span style="font-size: 13px; color: #64748b;">powdered by <a href="<?= base_url() ?>"><?= base_url() ?></a></span>    
<?php   footerAdmin($data); ?>
<a href=""></a>    
</body>
</html>
