# Preguntas Frecuentes y Solución de Problemas - Sistema 3Lite

Este documento responde a las preguntas más frecuentes y proporciona soluciones a los problemas comunes que pueden surgir durante la implementación y uso del Sistema 3Lite.

## Preguntas Frecuentes

### Generales

#### ¿Qué es el Sistema 3Lite?
El Sistema 3Lite es una versión simplificada del Sistema Tributario para DIAN Leticia, diseñada para ser implementada rápidamente (en aproximadamente 45 minutos) y con recursos mínimos. Incluye las funcionalidades esenciales para la gestión de casos tributarios, seguimiento de metas y registro de gestión.

#### ¿Qué necesito para implementar el Sistema 3Lite?
Necesita una cuenta de Microsoft 365 con permisos para crear sitios en SharePoint, acceso a Power Automate (anteriormente Flow), y conocimientos básicos de SharePoint.

#### ¿Puedo personalizar el Sistema 3Lite?
Sí, el Sistema 3Lite está diseñado para ser fácilmente personalizable. Puede agregar columnas adicionales a las listas, crear nuevos flujos de automatización, o modificar el aplicativo de registro según sus necesidades específicas.

### Implementación

#### ¿Cuánto tiempo toma implementar el Sistema 3Lite?
La implementación completa toma aproximadamente 45 minutos siguiendo la guía paso a paso.

#### ¿Necesito conocimientos de programación para implementar el Sistema 3Lite?
No se requieren conocimientos avanzados de programación. Sin embargo, conocimientos básicos de SharePoint y familiaridad con interfaces web serán útiles. Para personalizar el aplicativo de registro, conocimientos básicos de HTML, CSS y JavaScript serían beneficiosos.

#### ¿Puedo implementar solo partes del Sistema 3Lite?
Sí, el sistema es modular. Puede implementar solo las listas y el dashboard sin el aplicativo de registro, o viceversa, según sus necesidades.

### Uso

#### ¿Cómo agrego nuevos usuarios al sistema?
Vaya a la configuración del sitio de SharePoint, seleccione "Permisos del sitio" y agregue los usuarios con el nivel de permiso adecuado (generalmente "Colaborador" para usuarios regulares).

#### ¿Puedo acceder al sistema desde dispositivos móviles?
Sí, tanto SharePoint como el aplicativo de registro están diseñados para ser responsivos y funcionar en dispositivos móviles.

#### ¿Cómo puedo exportar datos del sistema?
SharePoint permite exportar datos de listas a Excel. En cada lista, haga clic en "Exportar a Excel" en la barra de herramientas.

## Solución de Problemas

### Problemas de Implementación

#### No puedo crear un sitio en SharePoint
**Problema**: Recibo un error al intentar crear un nuevo sitio.
**Solución**: Verifique que tiene los permisos necesarios para crear sitios. Contacte a su administrador de Microsoft 365 si es necesario.

#### Las columnas calculadas no funcionan correctamente
**Problema**: Las fórmulas en columnas calculadas no muestran los resultados esperados.
**Solución**: 
1. Verifique la sintaxis de la fórmula
2. Asegúrese de que los nombres de columna estén correctos y entre corchetes [NombreColumna]
3. Confirme que los tipos de datos son compatibles con la operación
4. Para porcentajes, multiplique por 100 explícitamente: `=[ValorGestionado]/[ValorInicial]*100`

#### No puedo crear flujos en Power Automate
**Problema**: No veo la opción para crear flujos o recibo errores.
**Solución**: 
1. Verifique que tiene licencia para usar Power Automate
2. Asegúrese de estar conectado con la misma cuenta que usa para SharePoint
3. Si recibe errores específicos, busque el código de error en la documentación de Microsoft

### Problemas con el Aplicativo de Registro

#### El aplicativo no se carga correctamente
**Problema**: La página está en blanco o muestra errores.
**Solución**:
1. Verifique que el archivo HTML se subió correctamente
2. Abra la consola del navegador (F12) para ver errores específicos
3. Asegúrese de que los scripts personalizados están habilitados en el sitio

#### No puedo guardar datos desde el aplicativo
**Problema**: Al hacer clic en "Guardar" no pasa nada o aparece un error.
**Solución**:
1. Verifique que completó todos los campos obligatorios
2. Revise la consola del navegador para errores específicos
3. Confirme que tiene permisos para agregar elementos a las listas
4. Verifique que los nombres de las listas en el código coinciden exactamente con los nombres en SharePoint

#### Los cálculos automáticos no funcionan
**Problema**: La diferencia o el porcentaje no se calculan automáticamente.
**Solución**:
1. Asegúrese de ingresar valores numéricos válidos
2. Verifique que el JavaScript está habilitado en su navegador
3. Revise la función `calcularDiferencia()` en el código

### Problemas con las Listas y el Dashboard

#### No puedo ver los gráficos en el dashboard
**Problema**: Los gráficos no aparecen o muestran "Sin datos".
**Solución**:
1. Verifique que hay datos en las listas correspondientes
2. Asegúrese de que el web part está configurado correctamente
3. Intente cambiar el tipo de gráfico
4. Actualice la página

#### Los datos importados no aparecen correctamente
**Problema**: Después de importar CSV, los datos no se muestran o tienen formato incorrecto.
**Solución**:
1. Verifique que el formato del CSV coincide con la estructura de la lista
2. Asegúrese de que los tipos de datos son compatibles
3. Revise si hay caracteres especiales o formatos que puedan causar problemas
4. Intente importar un archivo con menos registros para identificar problemas específicos

#### Las alertas no se envían
**Problema**: Los correos de alerta de vencimiento no llegan.
**Solución**:
1. Verifique que el flujo está activado en Power Automate
2. Revise el historial de ejecuciones del flujo para ver errores específicos
3. Asegúrese de que las direcciones de correo son correctas
4. Verifique que hay casos que cumplen con las condiciones del flujo (próximos a vencer)

## Mejores Prácticas

### Mantenimiento del Sistema

1. **Respaldo regular**: Exporte periódicamente los datos de las listas a Excel como respaldo
2. **Limpieza de datos**: Archive o elimine casos antiguos para mantener el rendimiento
3. **Verificación de flujos**: Revise mensualmente que los flujos automáticos siguen funcionando
4. **Actualización de permisos**: Mantenga actualizada la lista de usuarios con acceso al sistema

### Optimización del Rendimiento

1. **Vistas filtradas**: Cree vistas que muestren solo los datos relevantes para mejorar la carga
2. **Índices**: Para listas grandes, considere agregar índices a las columnas más utilizadas
3. **Paginación**: Configure las vistas para mostrar un número razonable de elementos por página
4. **Archivado**: Mueva datos históricos a listas de archivo para mantener las listas principales ligeras

### Seguridad

1. **Permisos mínimos**: Asigne a los usuarios solo los permisos que necesitan
2. **Auditoría**: Active el registro de auditoría para rastrear cambios importantes
3. **Validación de datos**: Implemente validación en las listas para prevenir datos incorrectos
4. **Revisión periódica**: Revise regularmente quién tiene acceso al sistema

## Recursos Adicionales

- [Documentación oficial de SharePoint](https://docs.microsoft.com/es-es/sharepoint/)
- [Centro de ayuda de Power Automate](https://docs.microsoft.com/es-es/power-automate/)
- [Foros de la comunidad de Microsoft 365](https://techcommunity.microsoft.com/t5/microsoft-365/ct-p/microsoft365)
- [Tutoriales de SharePoint en YouTube](https://www.youtube.com/results?search_query=sharepoint+tutorial)

## Contacto para Soporte

Si encuentra problemas que no puede resolver con esta guía, contacte a:

- Soporte técnico local: [Insertar contacto]
- Administrador de SharePoint: [Insertar contacto]
- Desarrollador del sistema: [Insertar contacto]