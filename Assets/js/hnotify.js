const xcli    = localStorage.getItem('xcli');
const xname   = localStorage.getItem('xname');

botones = `<button  type='button' class='botonmodificar btn btn-warning btn-sm'>Mostrar consulta <i class='fa fa-edit'></i></button>`;

document.addEventListener('DOMContentLoaded', function() {
    table=$('#tableHisConsultas').DataTable({
        "aProcessing": true,  "aServerside": true,
        "language": {  "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"  },
        "ajax": { "url": " " + base_url + "/Hnotify/get_notify/"+xcli, "dataSrc": ""  },
        "columns": [
            { "data": "consid" },
            { "data": "notdate" },
            { "data": "nottime" },
            { "data": "subject" },
            { "data": "from" },
            { "data": "to" },
            { "data": null,"orderable": false},
        ],
        "columnDefs": [
         { targets: 0, visible: false},//id
         { targets: 6, "defaultContent":botones, data: null }],
        "responsieve": "true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [  [0, "desc"] ]
    });
})

