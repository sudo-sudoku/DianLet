# Lista de Verificación Final - Implementación Sistema 3Lite

Utilice esta lista de verificación para asegurarse de que todos los componentes del Sistema 3Lite han sido implementados correctamente.

## Preparación

- [ ] Cuenta Microsoft 365 con permisos para crear sitios en SharePoint
- [ ] Acceso a Power Automate (anteriormente Flow)
- [ ] Navegador web actualizado (Chrome, Edge o Firefox)
- [ ] Archivos CSV de plantilla disponibles para importación
- [ ] Archivo HTML del aplicativo de registro de gestión

## Implementación en SharePoint

### Sitio

- [ ] Sitio de SharePoint creado con el nombre "SistemaTributarioLeticia"
- [ ] Permisos configurados para los usuarios adecuados
- [ ] Navegación personalizada configurada (opcional)
- [ ] Tema y logo personalizados aplicados (opcional)

### Listas

#### Lista "Casos"
- [ ] Lista creada con el nombre correcto
- [ ] Columnas configuradas:
  - [ ] NumeroCaso (Texto)
  - [ ] Contribuyente (Texto)
  - [ ] Identificacion (Texto)
  - [ ] Estado (Opción): Abierto, En Proceso, Cerrado
  - [ ] TipoCaso (Opción): Fiscalización, Devolución, Recurso, Otro
  - [ ] FechaVencimiento (Fecha)
  - [ ] Responsable (Persona o grupo) - si aplica
- [ ] Datos de ejemplo importados o ingresados manualmente
- [ ] Vistas personalizadas creadas (por estado, próximos a vencer, etc.)

#### Lista "Gestión"
- [ ] Lista creada con el nombre correcto
- [ ] Columnas configuradas:
  - [ ] NumeroCaso (Texto)
  - [ ] ValorInicial (Número)
  - [ ] ValorGestionado (Número)
  - [ ] Diferencia (Número calculado = ValorGestionado-ValorInicial)
  - [ ] Porcentaje (Número calculado = ValorGestionado/ValorInicial*100)
- [ ] Datos de ejemplo importados o ingresados manualmente
- [ ] Vistas personalizadas creadas (si es necesario)

#### Lista "Metas"
- [ ] Lista creada con el nombre correcto
- [ ] Columnas configuradas:
  - [ ] Periodo (Texto)
  - [ ] TipoMeta (Opción): Recaudo, Fiscalización
  - [ ] ValorMeta (Número)
  - [ ] ValorCumplido (Número)
  - [ ] Porcentaje (Número calculado = ValorCumplido/ValorMeta*100)
- [ ] Datos de ejemplo importados o ingresados manualmente
- [ ] Vistas personalizadas creadas (por periodo, por tipo, etc.)

### Biblioteca de Documentos

- [ ] Biblioteca "Expedientes" creada
- [ ] Columnas adicionales configuradas:
  - [ ] NumeroCaso (Texto)
  - [ ] TipoDocumento (Opción): Declaración, Recibo, Resolución, Otro
- [ ] Carpetas organizadas por tipo de caso (opcional)
- [ ] Documentos de ejemplo subidos (opcional)

## Dashboard

- [ ] Página principal configurada como dashboard
- [ ] Web parts agregados:
  - [ ] Lista de casos activos
  - [ ] Lista de casos próximos a vencer
  - [ ] Lista de metas del periodo actual
  - [ ] Gráfico de casos por estado
  - [ ] Gráfico de cumplimiento de metas
  - [ ] Indicadores clave (KPIs)
  - [ ] Enlaces rápidos
- [ ] Diseño organizado y visualmente efectivo
- [ ] Todos los web parts muestran datos correctamente
- [ ] Actualización automática configurada (si es posible)

## Flujos de Automatización

### Flujo de Alerta de Vencimiento
- [ ] Flujo creado en Power Automate
- [ ] Configurado para ejecutarse diariamente
- [ ] Filtro correcto para casos próximos a vencer
- [ ] Plantilla de correo electrónico configurada
- [ ] Destinatarios correctos configurados
- [ ] Flujo activado y funcionando
- [ ] Prueba realizada para verificar funcionamiento

### Flujos Adicionales (Opcionales)
- [ ] Flujo de actualización automática de cumplimiento de metas
- [ ] Flujo de notificación de nuevos casos asignados
- [ ] Flujo de recordatorio semanal de casos pendientes

## Aplicativo de Registro de Gestión

- [ ] Archivo HTML subido a SharePoint
- [ ] Carpeta "Aplicativo" creada para almacenar el archivo
- [ ] Aplicativo accesible desde un enlace en la página principal
- [ ] Todas las funcionalidades del aplicativo probadas:
  - [ ] Registro de nueva gestión
  - [ ] Cálculos automáticos
  - [ ] Agregar recibo de pago
  - [ ] Consulta de casos registrados
- [ ] Integración con SharePoint configurada (si aplica)
- [ ] Estilos y diseño visual correctos
- [ ] Funciona en diferentes navegadores
- [ ] Funciona en dispositivos móviles (responsive)

## Pruebas Funcionales

- [ ] Crear un nuevo caso en la lista "Casos"
- [ ] Registrar gestión para ese caso usando el aplicativo
- [ ] Verificar que los datos se guarden correctamente en la lista "Gestión"
- [ ] Comprobar que los cálculos automáticos funcionen correctamente
- [ ] Verificar que el dashboard se actualice con el nuevo caso
- [ ] Crear un caso con fecha de vencimiento cercana para probar alertas
- [ ] Subir un documento a la biblioteca "Expedientes"
- [ ] Verificar que los filtros y vistas funcionen correctamente
- [ ] Probar la exportación de datos a Excel

## Capacitación y Documentación

- [ ] Guía de usuario final preparada
- [ ] Sesiones de capacitación programadas
- [ ] Materiales de capacitación listos
- [ ] Usuarios clave identificados para soporte inicial
- [ ] Documentación técnica completada
- [ ] Preguntas frecuentes documentadas
- [ ] Procedimientos de soporte establecidos

## Entrega y Cierre

- [ ] Todos los usuarios tienen acceso al sistema
- [ ] Permisos verificados para cada usuario
- [ ] Datos iniciales cargados y verificados
- [ ] Flujos de automatización activados
- [ ] Capacitación inicial completada
- [ ] Periodo de soporte post-implementación definido
- [ ] Procedimiento de retroalimentación establecido
- [ ] Contactos de soporte comunicados a todos los usuarios

## Notas Adicionales

Utilice este espacio para documentar cualquier personalización, configuración especial o consideración importante para su implementación específica:

_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________

## Firmas de Aprobación

**Implementador:**
Nombre: _________________________ Fecha: _____________
Firma: _________________________

**Responsable del Área:**
Nombre: _________________________ Fecha: _____________
Firma: _________________________

**Responsable de TI:**
Nombre: _________________________ Fecha: _____________
Firma: _________________________