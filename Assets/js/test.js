nav5= [
  {
    "icon": "fa-solid fa-chart-line",
    "text": "Dashboard",
    "view": "dash"
  },
  {
    "icon": "fa-solid fa-cash-register",
    "text": "Punto de Venta (POS)",
    "view": "ssale"
  },
  {
    "icon": "fa-solid fa-store",
    "text": "Tienda Virtual",
    "view": "page_dinamica"
  },
  {
    "icon": "fa-solid fa-boxes-stacked",
    "text": "Productos",
    "view": "prods"
  },
  {
    "icon": "fa-solid fa-wallet",
    "text": "Clientes",
    "view": "clprpames"
  },
  {
    "icon": "fa-solid fa-database",
    "text": "Datos",
    "view": "group",
    "options": [
      { "id": "16", "text": "Colores", "view": "daten" },
      { "id": "1", "text": "Marcas", "view": "daten" },
      { "id": "3", "text": "Categorías", "view": "daten" }
    ]
  },
  {
    "icon": "fa-solid fa-users-gear",
    "text": "Mis Datos",
    "view": "mydata"
  }
];
nav2= [
  {
    "icon": "fa-solid fa-chart-line",
    "text": "Dashboard",
    "view": "dash"
  },
  {
    "icon": "fa-solid fa-cash-register",
    "text": "Punto de Venta (POS)",
    "view": "ssale"
  },
  {
    "icon": "fa-solid fa-store",
    "text": "Tienda Virtual",
    "view": "page_dinamica"
  },
  {
    "icon": "fa-solid fa-boxes-stacked",
    "text": "Activos",
    "view": "prods"
  },
  {
    "icon": "fa-solid fa-wallet",
    "text": "Inquilinos",
    "view": "clprpames"
  },
  {
    "icon": "fa-solid fa-database",
    "text": "Datos",
    "view": "group",
    "options": [
      { "id": "16", "text": "Colores", "view": "daten" },
      { "id": "1", "text": "Marcas", "view": "daten" },
      { "id": "3", "text": "Categorías", "view": "daten" }
    ]
  },
  {
    "icon": "fa-solid fa-database",
    "text": "Cuentas",
    "view": "group",
    "options": [
      { "id": "16", "text": "x cobrar", "view": "cpacos" },
      { "id": "1", "text": "x pagar", "view": "cpacos" },
      { "id": "3", "text": "Bancos", "view": "daten" }
    ]
  },
];

function subMenu (tit="",ops=""){
	return`  <details class="group [&_summary::-webkit-details-marker]:hidden">
                        <summary class="flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition cursor-pointer select-none">
                            <div class="flex items-center">
                                <i class="fa-solid fa-database w-6"></i>
                                <span>  ${tit} </span>
                            </div>
                            <i class="fa-solid fa-chevron-down text-xs transition-transform duration-200 group-open:rotate-180"></i>
                        </summary>
                        <!-- Sub-opciones -->
                        <div class="pl-10 pr-2 py-2 space-y-1 bg-slate-950/40 rounded-b-lg mt-1">
                            ${ops}
                        </div>
                    </details>`
                    }
let b=""; ops="";
const renderNav = data=>{ 
  data.forEach(d=>{    
  	if (d.view==="group"){
  		ops=d.options.map(o => `
  				<a href="${o.view}" onclick="setLS('dttp', ${o.id})" class="block py-2 px-3 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-md transition">${o.text}</a>
 		`).join("");;  
 		b+=subMenu(d.text,ops);
  	}else{
  		b+=`<a  href="${d.view}" class="flex items-center px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition">
                        <i class="${d.icon}"></i> ${d.text}
                    </a>`;
  	}
  });
  _$("#nav").innerHTML=b;
};
renderNav(nav2);
