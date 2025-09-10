# Guía Paso a Paso: Implementación del Sistema 3Lite DIAN Leticia

Esta guía proporciona instrucciones claras y sencillas para implementar el Sistema Tributario 3Lite para DIAN Leticia, incluyendo la creación de un aplicativo sencillo para el registro de gestión.

## 📋 Índice
1. [Preparación](#preparación)
2. [Implementación del Sistema 3Lite en SharePoint](#implementación-del-sistema-3lite-en-sharepoint)
3. [Creación del Aplicativo de Registro de Gestión](#creación-del-aplicativo-de-registro-de-gestión)
4. [Integración y Pruebas](#integración-y-pruebas)
5. [Recursos Adicionales](#recursos-adicionales)

---

## Preparación

### Requisitos Previos
- Cuenta Microsoft 365 con permisos para crear sitios en SharePoint
- Navegador web actualizado (Chrome, Edge o Firefox)
- Conexión a internet estable
- Conocimientos básicos de SharePoint y HTML/CSS/JavaScript

### Herramientas Necesarias
- Microsoft SharePoint Online
- Microsoft Power Automate (anteriormente Flow)
- Editor de código (Visual Studio Code, Notepad++ o similar)
- Navegador web

---

## Implementación del Sistema 3Lite en SharePoint

### Paso 1: Crear el Sitio en SharePoint (5 minutos)
1. Abra su navegador e inicie sesión en [Microsoft 365](https://www.office.com)
2. Vaya a SharePoint haciendo clic en el icono de SharePoint
3. Haga clic en **"Crear sitio"**
4. Seleccione **"Sitio de equipo"**
5. Complete la información:
   - **Nombre del sitio**: SistemaTributarioLeticia
   - **Descripción**: Sistema de gestión tributaria para DIAN Leticia
   - **Privacidad**: Privado - solo miembros pueden acceder
6. Haga clic en **"Finalizar"**

### Paso 2: Crear las Listas Principales (15 minutos)

#### Lista 1: Casos
1. En su nuevo sitio, haga clic en **"+ Nuevo"** → **"Lista"**
2. Seleccione **"Lista en blanco"**
3. Nombre: **"Casos"**
4. Haga clic en **"Crear"**
5. Una vez creada, haga clic en **"+ Agregar columna"** y añada las siguientes:
   - **NumeroCaso** (Texto)
   - **Contribuyente** (Texto)
   - **Identificacion** (Texto)
   - **Estado** (Opción): Valores = Abierto, En Proceso, Cerrado
   - **TipoCaso** (Opción): Valores = Fiscalización, Devolución, Recurso, Otro
   - **FechaVencimiento** (Fecha)
   - **Responsable** (Persona o grupo)

#### Lista 2: Gestión
1. Repita el proceso para crear una nueva lista llamada **"Gestión"**
2. Agregue las siguientes columnas:
   - **NumeroCaso** (Texto)
   - **ValorInicial** (Número)
   - **ValorGestionado** (Número)
   - **Diferencia** (Número calculado): Fórmula = [ValorGestionado]-[ValorInicial]
   - **Porcentaje** (Número calculado): Fórmula = [ValorGestionado]/[ValorInicial]*100

#### Lista 3: Metas
1. Cree una tercera lista llamada **"Metas"**
2. Agregue las siguientes columnas:
   - **Periodo** (Texto)
   - **TipoMeta** (Opción): Valores = Recaudo, Fiscalización
   - **ValorMeta** (Número)
   - **ValorCumplido** (Número)
   - **Porcentaje** (Número calculado): Fórmula = [ValorCumplido]/[ValorMeta]*100

### Paso 3: Crear la Biblioteca de Documentos (2 minutos)
1. En su sitio, haga clic en **"+ Nuevo"** → **"Biblioteca de documentos"**
2. Nombre: **"Expedientes"**
3. Haga clic en **"Crear"**
4. Una vez creada, agregue las siguientes columnas:
   - **NumeroCaso** (Texto)
   - **TipoDocumento** (Opción): Valores = Declaración, Recibo, Resolución, Otro

### Paso 4: Importar Datos de Ejemplo (5 minutos)

#### Importar datos a la lista Casos
1. Descargue la plantilla [plantilla_casos.csv](../3Lite/plantilla_casos.csv)
2. En la lista Casos, haga clic en **"Editar en vista de cuadrícula"**
3. Haga clic en **"Importar"** → **"Desde CSV"**
4. Seleccione el archivo descargado y siga las instrucciones

#### Importar datos a las listas Gestión y Metas
1. Repita el proceso para importar [plantilla_gestion.csv](../3Lite/plantilla_gestion.csv) y [plantilla_metas.csv](../3Lite/plantilla_metas.csv)

### Paso 5: Configurar el Dashboard Principal (5 minutos)
1. Vaya a la página principal de su sitio
2. Haga clic en **"Editar"** en la esquina superior derecha
3. Haga clic en **"+"** para agregar un web part
4. Agregue los siguientes web parts:
   - **Lista**: Seleccione "Casos" y configure para mostrar solo casos abiertos
   - **Lista**: Seleccione "Metas" y configure para mostrar el periodo actual
   - **Gráfico rápido**: Conecte a la lista "Casos" y configure para mostrar casos por estado
   - **Gráfico rápido**: Conecte a la lista "Metas" y configure para mostrar cumplimiento
5. Organice los web parts según su preferencia
6. Haga clic en **"Publicar"** para guardar los cambios

### Paso 6: Crear Flujos de Automatización (10 minutos)

#### Flujo de Alerta de Vencimiento
1. Vaya a [Power Automate](https://make.powerautomate.com)
2. Haga clic en **"Crear"** → **"Flujo programado"**
3. Configure:
   - **Nombre del flujo**: AlertaVencimientoCasos
   - **Frecuencia**: Diaria
   - **Hora**: 8:00 AM
4. Haga clic en **"Crear"**
5. Agregue una acción **"Obtener elementos"** (SharePoint):
   - **Sitio**: [URL de su sitio]
   - **Lista**: Casos
   - **Filtro**: Estado ne 'Cerrado' and FechaVencimiento le addDays(utcNow(), 5)
6. Agregue una acción **"Aplicar a cada"**:
   - Seleccione el resultado de "Obtener elementos"
7. Dentro del bucle "Aplicar a cada", agregue **"Enviar correo"** (Office 365 Outlook):
   - **Para**: [Correo del responsable]
   - **Asunto**: Alerta: Caso próximo a vencer - [NumeroCaso]
   - **Cuerpo**: Mensaje informativo con los detalles del caso
8. Guarde y active el flujo

### Paso 7: Verificar la Implementación (3 minutos)
1. Navegue por las diferentes listas y la biblioteca
2. Verifique que los datos de ejemplo estén correctamente importados
3. Compruebe que el dashboard muestra la información correctamente
4. Verifique que el flujo de alerta está activo

---

## Creación del Aplicativo de Registro de Gestión

### Paso 8: Crear la Estructura del Aplicativo (10 minutos)
1. Cree una nueva carpeta en su sitio de SharePoint llamada **"Aplicativo"**
2. Dentro de esta carpeta, cree un nuevo archivo HTML llamado **"registro_gestion.html"**

### Paso 9: Desarrollar el Aplicativo de Registro (20 minutos)

Copie el siguiente código en el archivo HTML:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DIAN Registro de Gestión Leticia</title>
    <style>
        :root {
            --primary: #4472C4;
            --secondary: #70AD47;
            --accent: #FFC000;
            --danger: #C5504B;
            --light: #F5F5F5;
            --dark: #333333;
            --gray: #E0E0E0;
            --success: #5CB85C;
            --warning: #F0AD4E;
        }
        
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: var(--light);
            color: var(--dark);
            line-height: 1.6;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        header {
            background-color: var(--primary);
            color: white;
            padding: 15px 0;
            margin-bottom: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        header .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 24px;
            font-weight: bold;
        }
        
        .user-info {
            display: flex;
            align-items: center;
        }
        
        .user-info img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
        }
        
        .card {
            background-color: white;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            padding: 20px;
            margin-bottom: 20px;
        }
        
        .card-header {
            border-bottom: 1px solid var(--gray);
            padding-bottom: 10px;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .card-title {
            font-size: 18px;
            font-weight: bold;
            color: var(--primary);
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
        }
        
        input, select, textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid var(--gray);
            border-radius: 4px;
            font-size: 16px;
        }
        
        .row {
            display: flex;
            margin: 0 -10px;
        }
        
        .col {
            flex: 1;
            padding: 0 10px;
        }
        
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: var(--primary);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
        }
        
        .btn:hover {
            background-color: #365fa7;
        }
        
        .btn-secondary {
            background-color: var(--secondary);
        }
        
        .btn-secondary:hover {
            background-color: #5d9c3d;
        }
        
        .btn-danger {
            background-color: var(--danger);
        }
        
        .btn-danger:hover {
            background-color: #b13c37;
        }
        
        .text-right {
            text-align: right;
        }
        
        .alert {
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 20px;
            border-left: 4px solid;
        }
        
        .alert-success {
            background-color: #dff0d8;
            border-color: var(--success);
            color: #3c763d;
        }
        
        .alert-warning {
            background-color: #fcf8e3;
            border-color: var(--warning);
            color: #8a6d3b;
        }
        
        .table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .table th, .table td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid var(--gray);
        }
        
        .table th {
            background-color: var(--light);
            font-weight: bold;
        }
        
        .badge {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
        }
        
        .badge-primary {
            background-color: var(--primary);
            color: white;
        }
        
        .badge-success {
            background-color: var(--success);
            color: white;
        }
        
        .badge-warning {
            background-color: var(--warning);
            color: white;
        }
        
        .tabs {
            display: flex;
            margin-bottom: 20px;
            border-bottom: 1px solid var(--gray);
        }
        
        .tab {
            padding: 10px 20px;
            cursor: pointer;
            border-bottom: 3px solid transparent;
        }
        
        .tab.active {
            border-bottom: 3px solid var(--primary);
            font-weight: bold;
        }
        
        .tab-content {
            display: none;
        }
        
        .tab-content.active {
            display: block;
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="logo">DIAN Leticia - Registro de Gestión</div>
            <div class="user-info">
                <img src="https://via.placeholder.com/40" alt="Usuario">
                <span>Auditor Tributario</span>
            </div>
        </div>
    </header>
    
    <div class="container">
        <div class="tabs">
            <div class="tab active" data-tab="registro">Registro de Gestión</div>
            <div class="tab" data-tab="casos">Mis Casos</div>
        </div>
        
        <div id="registro" class="tab-content active">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Nuevo Registro de Gestión</div>
                </div>
                
                <form id="formGestion">
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="numeroCaso">Número de Caso</label>
                                <input type="text" id="numeroCaso" placeholder="Ej: CASO-2025-001">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label for="contribuyente">Contribuyente</label>
                                <input type="text" id="contribuyente" placeholder="Nombre o Razón Social">
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="identificacion">Identificación</label>
                                <input type="text" id="identificacion" placeholder="RUC o Documento">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label for="tipoCaso">Tipo de Caso</label>
                                <select id="tipoCaso">
                                    <option value="">Seleccione...</option>
                                    <option value="Fiscalización">Fiscalización</option>
                                    <option value="Devolución">Devolución</option>
                                    <option value="Recurso">Recurso</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="valorInicial">Valor Inicial</label>
                                <input type="number" id="valorInicial" placeholder="0.00" onchange="calcularDiferencia()">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label for="valorGestionado">Valor Gestionado</label>
                                <input type="number" id="valorGestionado" placeholder="0.00" onchange="calcularDiferencia()">
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="diferencia">Diferencia</label>
                                <input type="number" id="diferencia" readonly>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label for="porcentaje">Porcentaje</label>
                                <input type="text" id="porcentaje" readonly>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="observaciones">Observaciones</label>
                        <textarea id="observaciones" rows="3"></textarea>
                    </div>
                    
                    <div class="text-right">
                        <button type="button" class="btn btn-danger" onclick="limpiarFormulario()">Cancelar</button>
                        <button type="button" class="btn btn-secondary" onclick="agregarRecibo()">Agregar Recibo</button>
                        <button type="button" class="btn" onclick="guardarGestion()">Guardar</button>
                    </div>
                </form>
            </div>
            
            <div id="reciboForm" class="card" style="display: none;">
                <div class="card-header">
                    <div class="card-title">Agregar Recibo de Pago</div>
                </div>
                
                <form id="formRecibo">
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="numeroFormulario">Número de Formulario</label>
                                <input type="text" id="numeroFormulario" placeholder="Ej: 490-123456">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label for="fechaPago">Fecha de Pago</label>
                                <input type="date" id="fechaPago">
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="valorPagado">Valor Pagado</label>
                                <input type="number" id="valorPagado" placeholder="0.00">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label for="banco">Banco</label>
                                <select id="banco">
                                    <option value="">Seleccione...</option>
                                    <option value="Banco A">Banco A</option>
                                    <option value="Banco B">Banco B</option>
                                    <option value="Banco C">Banco C</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="observacionesRecibo">Observaciones</label>
                        <textarea id="observacionesRecibo" rows="2"></textarea>
                    </div>
                    
                    <div class="text-right">
                        <button type="button" class="btn btn-danger" onclick="cancelarRecibo()">Cancelar</button>
                        <button type="button" class="btn" onclick="guardarRecibo()">Guardar Recibo</button>
                    </div>
                </form>
            </div>
        </div>
        
        <div id="casos" class="tab-content">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Mis Casos</div>
                </div>
                
                <table class="table">
                    <thead>
                        <tr>
                            <th>Número</th>
                            <th>Contribuyente</th>
                            <th>Tipo</th>
                            <th>Valor Gestionado</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="tablaCasos">
                        <!-- Los casos se cargarán dinámicamente -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
    <script>
        // Cambio de pestañas
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                this.classList.add('active');
                document.getElementById(this.dataset.tab).classList.add('active');
            });
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
        window.onload = function() {
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
            
            document.getElementById('tablaCasos').innerHTML = tablaCasos;
        };
    </script>
</body>
</html>
```

### Paso 10: Integrar el Aplicativo con SharePoint (5 minutos)
1. En su sitio de SharePoint, vaya a la carpeta **"Aplicativo"**
2. Suba el archivo HTML que acaba de crear
3. Haga clic en el archivo para abrirlo y verificar que funciona correctamente
4. Agregue un enlace al aplicativo en la página principal del sitio:
   - Edite la página principal
   - Agregue un web part de tipo **"Enlace rápido"**
   - Configure el enlace para que apunte al archivo HTML
   - Guarde los cambios

---

## Integración y Pruebas

### Paso 11: Realizar Pruebas Completas (5 minutos)
1. Pruebe el flujo completo:
   - Cree un nuevo caso en la lista Casos
   - Registre gestión para ese caso usando el aplicativo
   - Verifique que los datos se guarden correctamente
   - Compruebe que el dashboard se actualice
2. Verifique que las alertas funcionen:
   - Cree un caso con fecha de vencimiento cercana
   - Espere a que se ejecute el flujo de alerta o ejecútelo manualmente
   - Verifique que se envíe el correo de alerta

### Paso 12: Documentar y Entregar (5 minutos)
1. Complete la lista de verificación final:
   - Abra el archivo [checklist_final.txt](../3Lite/checklist_final.txt)
   - Marque cada elemento completado
   - Agregue la fecha de implementación y su nombre
2. Prepare un correo para los usuarios con:
   - URL del sitio de SharePoint
   - Instrucciones básicas de uso
   - Enlace al aplicativo de registro de gestión
   - Contacto para soporte

---

## Recursos Adicionales

### Plantillas CSV
- [Plantilla de Casos](../3Lite/plantilla_casos.csv)
- [Plantilla de Gestión](../3Lite/plantilla_gestion.csv)
- [Plantilla de Metas](../3Lite/plantilla_metas.csv)

### Instrucciones para Flujos
- [Instrucciones para Flujo de Alerta](../3Lite/instrucciones_flujo_alerta.txt)

### Lista de Verificación Final
- [Checklist Final](../3Lite/checklist_final.txt)

---

## Tiempo Total de Implementación: 45 minutos

¡Felicidades! Ha implementado con éxito el Sistema Tributario 3Lite para DIAN Leticia, incluyendo un aplicativo sencillo para el registro de gestión. Este sistema le permitirá gestionar casos tributarios, realizar seguimiento de metas y registrar la gestión de manera eficiente.