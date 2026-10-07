
    <style>
        /* Estilos base para el botón que activa la acción */
        .btn-delete {
            padding: 10px 20px;
            background-color: #ff4d4d;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-family: sans-serif;
            font-size: 14px;
        }

        /* Estilos del contenedor del diálogo */
        dialog {
            border: none;
            border-radius: 12px;
            padding: 24px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            font-family: sans-serif;
        }

        /* Estilo del fondo oscuro (backdrop) */
        dialog::backdrop {
            background-color: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(2px); /* Un sutil desenfoque moderno */
        }

        dialog h3 {
            margin-top: 0;
            color: #333;
        }

        dialog p {
            color: #666;
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 24px;
        }

        /* Contenedor de los botones */
        .dialog-actions {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
        }

        /* Estilos de los botones del diálogo */
        .btn {
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            border: none;
        }

        .btn-cancel {
            background-color: #f3f4f6;
            color: #4b5563;
        }

        .btn-confirm {
            background-color: #2563eb;
            color: white;
        }
        
        .btn-cancel:hover { background-color: #e5e7eb; }
        .btn-confirm:hover { background-color: #1d4ed8; }
    </style>
</head>


    <!-- Botón disparador -->
       
    <button class="btn-delete" id="btnEliminar" style="display:none;">Eliminar Cuenta</button>
  
    <!-- Estructura del diálogo -->
    <dialog id="customConfirm">
        <h3>¿Confirmar acción?</h3>
        <p>Esta acción no se puede deshacer. ¿Estás seguro de que deseas continuar con el proceso?</p>
        <div class="dialog-actions">
            <button class="btn btn-cancel" id="btnCancelar">Cancelar</button>
            <button class="btn btn-confirm" id="btnConfirmar">Confirmar</button>
        </div>
    </dialog>

    <script>
        const btnEliminar = document.getElementById('btnEliminar');
        const customConfirm = document.getElementById('customConfirm');
        const btnCancelar = document.getElementById('btnCancelar');
        const btnConfirmar = document.getElementById('btnConfirmar');

        // Abre el diálogo de forma modal (bloquea la interacción de fondo)
        btnEliminar.addEventListener('click', () => {
            customConfirm.showModal();
        });

        // Opción Cancelar
        btnCancelar.addEventListener('click', () => {
            customConfirm.close();
            console.log('Acción cancelada');
        });

        // Opción Confirmar
        btnConfirmar.addEventListener('click', () => {
            customConfirm.close();
            console.log('Acción confirmada');
            // Aquí ejecutas tu lógica (ej. una petición fetch)
            
        });

        // Opcional: Cerrar si hacen clic fuera del recuadro blanco
        customConfirm.addEventListener('click', (e) => {
            const dialogDimensions = customConfirm.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                customConfirm.close();
            }
        });
    </script>

