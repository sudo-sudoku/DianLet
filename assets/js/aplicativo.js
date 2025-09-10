// Cambio de pestañas
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(this.dataset.tab).classList.add('active');
        });
    });
    
    // Cargar datos de ejemplo
    cargarDatosDePrueba();
});

// Cálculo automático
function calcularDiferencia() {
    const valorInicial = parseFloat(document.getElementById('valorInicial').value) || 0;
    const valorGestionado = parseFloat(document.getElementById('valorGestionado').value) || 0;
    
    const diferencia = valorGestionado - valorInicial;
    let porcentaje = 0;
    
    if (valorInicial !== 0) {
        porcentaje = (valorGestionado / valorInicial * 100).toFixed(2);
    }
    
    document.getElementById('diferencia').value = diferencia;
    document.getElementById('porcentaje').value = porcentaje + '%';
}

// Mostrar formulario de recibo
function agregarRecibo() {
    document.getElementById('reciboForm').style.display = 'block';
}

// Ocultar formulario de recibo
function cancelarRecibo() {
    document.getElementById('reciboForm').style.display = 'none';
}

// Limpiar formulario
function limpiarFormulario() {
    document.getElementById('formGestion').reset();
    document.getElementById('diferencia').value = '';
    document.getElementById('porcentaje').value = '';
    document.getElementById('reciboForm').style.display = 'none';
}

// Guardar gestión (simulado)
function guardarGestion() {
    const numeroCaso = document.getElementById('numeroCaso').value;
    const contribuyente = document.getElementById('contribuyente').value;
    
    if (!numeroCaso || !contribuyente) {
        alert('Por favor complete los campos obligatorios');
        return;
    }
    
    // Aquí se conectaría con SharePoint para guardar los datos
    alert('Gestión guardada correctamente');
    
    // Agregar a la tabla de casos (simulado)
    const valorGestionado = document.getElementById('valorGestionado').value;
    const tipoCaso = document.getElementById('tipoCaso').value;
    
    const nuevaFila = `
        <tr>
            <td>${numeroCaso}</td>
            <td>${contribuyente}</td>
            <td>${tipoCaso}</td>
            <td>${valorGestionado}</td>
            <td><span class="badge badge-primary">Abierto</span></td>
            <td>
                <button class="btn btn-secondary" style="padding: 5px 10px; font-size: 12px;">Ver</button>
            </td>
        </tr>
    `;
    
    document.getElementById('tablaCasos').innerHTML += nuevaFila;
    limpiarFormulario();
}

// Guardar recibo (simulado)
function guardarRecibo() {
    const numeroFormulario = document.getElementById('numeroFormulario').value;
    
    if (!numeroFormulario) {
        alert('Por favor ingrese el número de formulario');
        return;
    }
    
    // Aquí se conectaría con SharePoint para guardar el recibo
    alert('Recibo guardado correctamente');
    document.getElementById('reciboForm').style.display = 'none';
}

// Cargar datos de ejemplo
function cargarDatosDePrueba() {
    const casosDePrueba = [
        {
            numero: 'CASO-2025-001',
            contribuyente: 'Empresa ABC',
            tipo: 'Fiscalización',
            valor: '600000',
            estado: 'Abierto'
        },
        {
            numero: 'CASO-2025-002',
            contribuyente: 'Juan Pérez',
            tipo: 'Devolución',
            valor: '500000',
            estado: 'En Proceso'
        },
        {
            numero: 'CASO-2025-003',
            contribuyente: 'Comercial XYZ',
            tipo: 'Recurso',
            valor: '450000',
            estado: 'Cerrado'
        }
    ];
    
    let tablaCasos = '';
    
    casosDePrueba.forEach(caso => {
        let badgeClass = 'badge-primary';
        if (caso.estado === 'En Proceso') badgeClass = 'badge-warning';
        if (caso.estado === 'Cerrado') badgeClass = 'badge-success';
        
        tablaCasos += `
            <tr>
                <td>${caso.numero}</td>
                <td>${caso.contribuyente}</td>
                <td>${caso.tipo}</td>
                <td>${caso.valor}</td>
                <td><span class="badge ${badgeClass}">${caso.estado}</span></td>
                <td>
                    <button class="btn btn-secondary" style="padding: 5px 10px; font-size: 12px;">Ver</button>
                </td>
            </tr>
        `;
    });
    
    if (document.getElementById('tablaCasos')) {
        document.getElementById('tablaCasos').innerHTML = tablaCasos;
    }
}

// Funciones para integración con SharePoint
// Variables globales para SharePoint
let _spPageContextInfo;
let siteUrl;

// Inicializar la conexión con SharePoint
function inicializarSharePoint() {
    // Verificar si estamos en SharePoint
    if (typeof _spPageContextInfo !== 'undefined') {
        // Obtener la URL del sitio actual
        siteUrl = _spPageContextInfo.webAbsoluteUrl;
        console.log("Conectado a SharePoint: " + siteUrl);
        
        // Cargar datos reales
        cargarCasos();
    } else {
        // Modo de demostración (fuera de SharePoint)
        console.log("Ejecutando en modo de demostración");
        cargarDatosDePrueba();
    }
}

// Función para obtener el token de solicitud de formulario
function getFormDigest() {
    return new Promise((resolve, reject) => {
        if (typeof $ === 'undefined') {
            console.error("jQuery no está disponible");
            reject("jQuery no está disponible");
            return;
        }
        
        $.ajax({
            url: siteUrl + "/_api/contextinfo",
            method: "POST",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            success: function(data) {
                resolve(data.d.GetContextWebInformation.FormDigestValue);
            },
            error: function(error) {
                reject(error);
            }
        });
    });
}

// Cargar casos desde SharePoint
function cargarCasos() {
    if (typeof $ === 'undefined') {
        console.error("jQuery no está disponible");
        return;
    }
    
    $.ajax({
        url: siteUrl + "/_api/web/lists/getbytitle('Casos')/items?$top=100",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        success: function(data) {
            const casos = data.d.results;
            let tablaCasos = '';
            
            casos.forEach(caso => {
                let badgeClass = 'badge-primary';
                if (caso.Estado === 'En Proceso') badgeClass = 'badge-warning';
                if (caso.Estado === 'Cerrado') badgeClass = 'badge-success';
                
                // Obtener valor gestionado
                obtenerValorGestionado(caso.NumeroCaso).then(valorGestionado => {
                    tablaCasos += `
                        <tr>
                            <td>${caso.NumeroCaso}</td>
                            <td>${caso.Contribuyente}</td>
                            <td>${caso.TipoCaso}</td>
                            <td>${valorGestionado}</td>
                            <td><span class="badge ${badgeClass}">${caso.Estado}</span></td>
                            <td>
                                <button class="btn btn-secondary" style="padding: 5px 10px; font-size: 12px;" onclick="verCaso('${caso.NumeroCaso}')">Ver</button>
                            </td>
                        </tr>
                    `;
                    
                    document.getElementById('tablaCasos').innerHTML = tablaCasos;
                });
            });
        },
        error: function(error) {
            console.error("Error al cargar casos: ", error);
            alert('Error al cargar los casos');
            // Cargar datos de ejemplo en caso de error
            cargarDatosDePrueba();
        }
    });
}

// Inicializar cuando se carga la página
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarOnLoad);
} else {
    inicializarOnLoad();
}

function inicializarOnLoad() {
    // Verificar si estamos en SharePoint
    if (typeof _spPageContextInfo !== 'undefined') {
        inicializarSharePoint();
    } else {
        // Modo de demostración (fuera de SharePoint)
        console.log("Ejecutando en modo de demostración");
        cargarDatosDePrueba();
    }
}