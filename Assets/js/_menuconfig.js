function generarYGuardarMenu() {
    const itemsUI = document.querySelectorAll('#listaMenuVisual > div');
    let nuevoMenuJSON = [];

    itemsUI.forEach(item => {
        const estaActivo = item.querySelector('.toggle-item').checked;
        
        // Si el usuario desactivó la opción, la omitimos del menú
        if (!estaActivo) return; 

        const nombrePersonalizado = item.querySelector('input[type="text"]').value;
        const vista = item.getAttribute('data-view');
        const icono = item.querySelector('.fa-solid:not(.fa-grip-vertical)').className;

        // Construimos el objeto que entiende tu motor PHP
        nuevoMenuJSON.push({
            "icon": icono,
            "text": nombrePersonalizado,
            "view": vista
        });
    });

    // Enviamos este JSON limpio al backend PHP mediante fetch (sin que el usuario lo vea)
    enviarAlServidorPHP(nuevoMenuJSON);
}

async function enviarAlServidorPHP(menuArray) {
    try {
        const response = await fetch('/company/actualizar-menu', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ menu: menuArray })
        });
        
        const resultado = await response.json();
        if (resultado.status === 'success') {
            alert('¡Tu menú se ha actualizado correctamente!');
            location.reload(); // Recarga para ver reflejados los cambios
        }
    } catch (error) {
        alert('Hubo un error al guardar los cambios.');
    }
}



/*
// Función subMenu y renderNav que ya utilizas en tu frontend
function subMenu(tit="", ops="") {
    return `<details class="group [&_summary::-webkit-details-marker]:hidden">
                <summary class="flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition cursor-pointer select-none">
                    <div class="flex items-center">
                        <i class="fa-solid fa-database w-6"></i>
                        <span> ${tit} </span>
                    </div>
                    <i class="fa-solid fa-chevron-down text-xs transition-transform duration-200 group-open:rotate-180"></i>
                </summary>
                <div class="pl-10 pr-2 py-2 space-y-1 bg-slate-950/40 rounded-b-lg mt-1">
                    ${ops}
                </div>
            </details>`;
}

function renderNav(data) {
    let b = "";
    data.forEach(d => {
        if (d.view === "group") {
            let ops = d.options.map(o => `
                <a href="${o.view}" onclick="setLS('dttp', ${o.id})" class="block py-2 px-3 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-md transition">${o.text}</a>
            `).join("");
            b += subMenu(d.text, ops);
        } else {
            b += `<a href="${d.view}" class="flex items-center px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition">
                      <i class="${d.icon}"></i> ${d.text}
                  </a>`;
        }
    });
    document.getElementById("nav").innerHTML = b;
}

// Inicializar la vista previa al cargar la página leyendo el Textarea
document.addEventListener('DOMContentLoaded', () => {
    actualizarVistaPreviaDOM();

    // Evento para renderizar en tiempo real mientras el admin edita el JSON
    document.getElementById('jsonMenuInput').addEventListener('input', () => {
        actualizarVistaPreviaDOM();
    });
});

function actualizarVistaPreviaDOM() {
    const rawJson = document.getElementById('jsonMenuInput').value;
    try {
        const jsonData = JSON.parse(rawJson);
        renderNav(jsonData); // Actualiza el DOM en tiempo real
    } catch (e) {
        // Si hay un error de sintaxis en el JSON mientras escribe, no rompe la app
        console.encia("JSON inválido temporalmente mientras escribe...");
    }
}

// Enviar el nuevo JSON al backend PHP para actualizar la tabla companies
async function guardarMenuPersonalizado(e) {
    e.preventDefault();
    const rawJson = document.getElementById('jsonMenuInput').value;

    try {
        // Validar que sea un JSON válido antes de enviarlo
        const jsonParsed = JSON.parse(rawJson);

        const response = await fetch('/company/actualizar-menu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ menu: jsonParsed })
        });

        const result = await response.json();

        if (result.status === 'success') {
            alert('¡El menú de la compañía se ha actualizado exitosamente!');
        } else {
            alert('Error al guardar: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('El formato JSON no es válido. Revisa las comillas o corchetes antes de guardar.');
    }
}

*/