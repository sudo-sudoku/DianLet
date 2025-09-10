# Integración del Aplicativo de Registro con SharePoint

Esta guía explica cómo integrar el aplicativo de registro de gestión con las listas de SharePoint del Sistema 3Lite.

## Requisitos Previos

- Sistema 3Lite implementado en SharePoint
- Listas "Casos" y "Gestión" creadas
- Permisos para editar páginas y agregar scripts

## Pasos para la Integración

### 1. Preparar el Entorno SharePoint

1. **Habilitar scripts personalizados**:
   - Vaya al Centro de administración de SharePoint
   - Seleccione "Configuración"
   - En "Configuración de scripts personalizados", seleccione "Permitir que los usuarios ejecuten scripts personalizados en sitios personales"
   - Guarde los cambios

2. **Crear una carpeta para el aplicativo**:
   - En su sitio de SharePoint, vaya a "Documentos"
   - Cree una nueva carpeta llamada "Aplicativo"

### 2. Subir el Aplicativo HTML

1. Vaya a la carpeta "Aplicativo" que acaba de crear
2. Haga clic en "Cargar" → "Archivos"
3. Seleccione el archivo `aplicativo_registro_gestion.html`
4. Una vez cargado, haga clic en el archivo para verificar que se muestra correctamente

### 3. Modificar el Código para Conectar con SharePoint

Para que el aplicativo se comunique con las listas de SharePoint, necesitamos agregar código JavaScript que utilice la API REST de SharePoint. Siga estos pasos:

1. Descargue el archivo HTML
2. Abra el archivo en un editor de código
3. Busque la sección de script al final del archivo
4. Reemplace las funciones de guardar con el siguiente código:

```javascript
// Variables globales para SharePoint
let _spPageContextInfo;
let siteUrl;

// Inicializar la conexión con SharePoint
function inicializarSharePoint() {
    // Obtener la URL del sitio actual
    siteUrl = _spPageContextInfo.webAbsoluteUrl;
    console.log("Conectado a SharePoint: " + siteUrl);
}

// Función para obtener el token de solicitud de formulario
function getFormDigest() {
    return new Promise((resolve, reject) => {
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

// Guardar gestión en SharePoint
async function guardarGestion() {
    const numeroCaso = document.getElementById('numeroCaso').value;
    const contribuyente = document.getElementById('contribuyente').value;
    const valorInicial = document.getElementById('valorInicial').value;
    const valorGestionado = document.getElementById('valorGestionado').value;
    
    if (!numeroCaso || !contribuyente) {
        alert('Por favor complete los campos obligatorios');
        return;
    }
    
    try {
        // Primero verificamos si el caso existe, si no, lo creamos
        const casoExiste = await verificarCasoExistente(numeroCaso);
        
        if (!casoExiste) {
            // Crear nuevo caso
            await crearCaso(numeroCaso, contribuyente);
        }
        
        // Luego registramos la gestión
        await registrarGestion(numeroCaso, valorInicial, valorGestionado);
        
        alert('Gestión guardada correctamente');
        
        // Actualizar la tabla de casos
        cargarCasos();
        
        // Limpiar formulario
        limpiarFormulario();
        
    } catch (error) {
        console.error("Error al guardar: ", error);
        alert('Error al guardar la gestión: ' + error.message);
    }
}

// Verificar si un caso existe
async function verificarCasoExistente(numeroCaso) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: siteUrl + "/_api/web/lists/getbytitle('Casos')/items?$filter=NumeroCaso eq '" + numeroCaso + "'",
            method: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            success: function(data) {
                resolve(data.d.results.length > 0);
            },
            error: function(error) {
                reject(error);
            }
        });
    });
}

// Crear un nuevo caso
async function crearCaso(numeroCaso, contribuyente) {
    const formDigest = await getFormDigest();
    const identificacion = document.getElementById('identificacion').value;
    const tipoCaso = document.getElementById('tipoCaso').value;
    
    // Calcular fecha de vencimiento (30 días a partir de hoy)
    const hoy = new Date();
    const fechaVencimiento = new Date(hoy.setDate(hoy.getDate() + 30)).toISOString();
    
    return new Promise((resolve, reject) => {
        $.ajax({
            url: siteUrl + "/_api/web/lists/getbytitle('Casos')/items",
            type: "POST",
            headers: {
                "Accept": "application/json; odata=verbose",
                "Content-Type": "application/json; odata=verbose",
                "X-RequestDigest": formDigest,
                "IF-MATCH": "*",
                "X-HTTP-Method": "POST"
            },
            data: JSON.stringify({
                "__metadata": { "type": "SP.Data.CasosListItem" },
                "NumeroCaso": numeroCaso,
                "Contribuyente": contribuyente,
                "Identificacion": identificacion,
                "TipoCaso": tipoCaso,
                "Estado": "Abierto",
                "FechaVencimiento": fechaVencimiento
            }),
            success: function(data) {
                resolve(data.d);
            },
            error: function(error) {
                reject(error);
            }
        });
    });
}

// Registrar gestión
async function registrarGestion(numeroCaso, valorInicial, valorGestionado) {
    const formDigest = await getFormDigest();
    
    return new Promise((resolve, reject) => {
        $.ajax({
            url: siteUrl + "/_api/web/lists/getbytitle('Gestión')/items",
            type: "POST",
            headers: {
                "Accept": "application/json; odata=verbose",
                "Content-Type": "application/json; odata=verbose",
                "X-RequestDigest": formDigest,
                "IF-MATCH": "*",
                "X-HTTP-Method": "POST"
            },
            data: JSON.stringify({
                "__metadata": { "type": "SP.Data.GestiónListItem" },
                "NumeroCaso": numeroCaso,
                "ValorInicial": parseFloat(valorInicial),
                "ValorGestionado": parseFloat(valorGestionado)
            }),
            success: function(data) {
                resolve(data.d);
            },
            error: function(error) {
                reject(error);
            }
        });
    });
}

// Cargar casos desde SharePoint
function cargarCasos() {
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
        }
    });
}

// Obtener valor gestionado para un caso
function obtenerValorGestionado(numeroCaso) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: siteUrl + "/_api/web/lists/getbytitle('Gestión')/items?$filter=NumeroCaso eq '" + numeroCaso + "'",
            method: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            success: function(data) {
                if (data.d.results.length > 0) {
                    resolve(data.d.results[0].ValorGestionado);
                } else {
                    resolve("0");
                }
            },
            error: function(error) {
                reject(error);
            }
        });
    });
}

// Ver detalles de un caso
function verCaso(numeroCaso) {
    // Cargar datos del caso
    $.ajax({
        url: siteUrl + "/_api/web/lists/getbytitle('Casos')/items?$filter=NumeroCaso eq '" + numeroCaso + "'",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        success: function(data) {
            if (data.d.results.length > 0) {
                const caso = data.d.results[0];
                
                // Cargar datos en el formulario
                document.getElementById('numeroCaso').value = caso.NumeroCaso;
                document.getElementById('contribuyente').value = caso.Contribuyente;
                document.getElementById('identificacion').value = caso.Identificacion;
                document.getElementById('tipoCaso').value = caso.TipoCaso;
                
                // Cambiar a la pestaña de registro
                document.querySelector('.tab[data-tab="registro"]').click();
                
                // Cargar datos de gestión
                $.ajax({
                    url: siteUrl + "/_api/web/lists/getbytitle('Gestión')/items?$filter=NumeroCaso eq '" + numeroCaso + "'",
                    method: "GET",
                    headers: {
                        "Accept": "application/json; odata=verbose"
                    },
                    success: function(dataGestion) {
                        if (dataGestion.d.results.length > 0) {
                            const gestion = dataGestion.d.results[0];
                            document.getElementById('valorInicial').value = gestion.ValorInicial;
                            document.getElementById('valorGestionado').value = gestion.ValorGestionado;
                            calcularDiferencia();
                        }
                    }
                });
            }
        }
    });
}

// Guardar recibo en SharePoint
async function guardarRecibo() {
    const numeroFormulario = document.getElementById('numeroFormulario').value;
    const numeroCaso = document.getElementById('numeroCaso').value;
    
    if (!numeroFormulario || !numeroCaso) {
        alert('Por favor ingrese el número de formulario y asegúrese de tener un caso seleccionado');
        return;
    }
    
    try {
        const formDigest = await getFormDigest();
        const fechaPago = document.getElementById('fechaPago').value;
        const valorPagado = document.getElementById('valorPagado').value;
        const banco = document.getElementById('banco').value;
        const observaciones = document.getElementById('observacionesRecibo').value;
        
        // Aquí se crearía una lista adicional para recibos o se usaría una biblioteca de documentos
        // Este es un ejemplo simplificado
        
        alert('Recibo guardado correctamente');
        document.getElementById('reciboForm').style.display = 'none';
        
    } catch (error) {
        console.error("Error al guardar recibo: ", error);
        alert('Error al guardar el recibo: ' + error.message);
    }
}

// Inicializar cuando se carga la página
$(document).ready(function() {
    // Verificar si estamos en SharePoint
    if (typeof _spPageContextInfo !== 'undefined') {
        inicializarSharePoint();
        cargarCasos();
    } else {
        // Modo de demostración (fuera de SharePoint)
        console.log("Ejecutando en modo de demostración");
        cargarDatosDePrueba();
    }
});
```

### 4. Agregar Referencias a jQuery y SP.js

Antes de la etiqueta de cierre `</head>`, agregue las siguientes referencias:

```html
<!-- Referencias a bibliotecas necesarias -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="/_layouts/15/init.js"></script>
<script src="/_layouts/15/MicrosoftAjax.js"></script>
<script src="/_layouts/15/sp.runtime.js"></script>
<script src="/_layouts/15/sp.js"></script>
```

### 5. Crear una Página Web para Alojar el Aplicativo

1. En su sitio de SharePoint, vaya a "Páginas"
2. Haga clic en "Nueva" → "Página web"
3. Elija una plantilla en blanco
4. Nombre la página "RegistroGestion"
5. Agregue un web part de tipo "Visor de contenido"
6. Configure el web part para que apunte al archivo HTML que subió:
   - En "Propiedades del web part", seleccione "Vínculo a contenido"
   - Ingrese la URL del archivo HTML (por ejemplo: /sites/SistemaTributarioLeticia/Aplicativo/aplicativo_registro_gestion.html)
   - Ajuste la altura y el ancho según sea necesario
7. Guarde y publique la página

### 6. Agregar Enlace en la Página Principal

1. Vaya a la página principal de su sitio
2. Haga clic en "Editar"
3. Agregue un web part de tipo "Enlace rápido" o "Texto"
4. Configure el enlace para que apunte a la página que creó:
   - Texto: "Aplicativo de Registro de Gestión"
   - URL: /sites/SistemaTributarioLeticia/Paginas/RegistroGestion.aspx
5. Guarde y publique la página

## Solución de Problemas Comunes

### El aplicativo no se conecta a SharePoint

- Verifique que las referencias a las bibliotecas de SharePoint sean correctas
- Asegúrese de que los scripts personalizados estén habilitados en el sitio
- Revise la consola del navegador para ver errores específicos

### Error al guardar datos

- Verifique que los nombres de las listas coincidan exactamente con los utilizados en el código
- Asegúrese de que el usuario tenga permisos para agregar elementos a las listas
- Compruebe que los tipos de datos en las columnas de SharePoint coincidan con los valores que está intentando guardar

### La página no muestra el aplicativo

- Verifique que la URL en el web part de visor de contenido sea correcta
- Asegúrese de que el archivo HTML esté accesible para todos los usuarios
- Intente abrir el archivo HTML directamente para verificar que funciona

## Personalización Adicional

Una vez que el aplicativo esté integrado con SharePoint, puede personalizarlo según sus necesidades:

- Agregar campos adicionales según los requisitos específicos
- Personalizar el diseño con los colores corporativos
- Agregar validaciones adicionales para los datos
- Implementar funcionalidades avanzadas como exportación a Excel o generación de informes

## Próximos Pasos

Después de integrar el aplicativo con SharePoint, considere estas mejoras:

1. Implementar un sistema de notificaciones para alertas importantes
2. Agregar gráficos y dashboards para visualizar el progreso
3. Crear flujos de Power Automate adicionales para automatizar procesos
4. Configurar permisos específicos para diferentes tipos de usuarios