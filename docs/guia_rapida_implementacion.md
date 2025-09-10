# Guía Rápida: Implementación Sistema 3Lite DIAN Leticia

Esta guía simplificada le permitirá implementar el Sistema Tributario 3Lite en aproximadamente 45 minutos.

## 🚀 Implementación en 10 Pasos

### Paso 1: Crear el Sitio (5 minutos)
1. Ir a [sharepoint.com](https://sharepoint.com)
2. Click en **"Crear sitio"** → **"Sitio de equipo"**
3. Nombre: **"SistemaTributarioLeticia"**
4. Click en **"Crear"**

### Paso 2: Crear las Listas (15 minutos)

#### Lista "Casos"
1. Click en **"Nueva"** → **"Lista"**
2. Agregar columnas:
   - **NumeroCaso** (Texto)
   - **Contribuyente** (Texto)
   - **Identificacion** (Texto)
   - **Estado** (Opción): Abierto, En Proceso, Cerrado
   - **TipoCaso** (Opción): Fiscalización, Devolución, Recurso, Otro
   - **FechaVencimiento** (Fecha)

#### Lista "Gestión"
1. Nueva lista: **"Gestión"**
2. Agregar columnas:
   - **NumeroCaso** (Texto)
   - **ValorInicial** (Número)
   - **ValorGestionado** (Número)
   - **Diferencia** (Número calculado = ValorGestionado-ValorInicial)
   - **Porcentaje** (Número calculado = ValorGestionado/ValorInicial*100)

#### Lista "Metas"
1. Nueva lista: **"Metas"**
2. Agregar columnas:
   - **Periodo** (Texto)
   - **TipoMeta** (Opción): Recaudo, Fiscalización
   - **ValorMeta** (Número)
   - **ValorCumplido** (Número)
   - **Porcentaje** (Número calculado = ValorCumplido/ValorMeta*100)

### Paso 3: Crear Biblioteca de Documentos (2 minutos)
1. Click en **"Nuevo"** → **"Biblioteca de documentos"**
2. Nombre: **"Expedientes"**

### Paso 4: Configurar Dashboard (5 minutos)
1. En la página principal, click en **"Editar"**
2. Agregar web parts:
   - **"Lista"** → Seleccionar "Casos"
   - **"Lista"** → Seleccionar "Metas"
   - **"Gráfico rápido"** → Mostrar casos por estado

### Paso 5: Crear Flujo de Alerta (5 minutos)
1. Ir a [powerautomate.com](https://powerautomate.com)
2. **"Crear"** → **"Flujo programado"**
3. Nombre: **"AlertaVencimiento"**
4. Frecuencia: Diaria
5. Agregar acciones:
   - **"Obtener elementos"** → Lista "Casos"
   - **"Filtrar"** → Estado ≠ "Cerrado" y FechaVencimiento ≤ hoy+5 días
   - **"Enviar correo"** → Al responsable

### Paso 6: Importar Datos de Ejemplo (3 minutos)
1. En cada lista, click en **"Editar en vista de cuadrícula"**
2. Click en **"Importar"** → **"Desde CSV"**
3. Seleccionar los archivos CSV proporcionados

### Paso 7: Implementar Aplicativo de Registro (5 minutos)
1. Crear carpeta **"Aplicativo"** en el sitio
2. Subir el archivo HTML del aplicativo de registro
3. Agregar enlace en la página principal

### Paso 8: Probar el Sistema (3 minutos)
1. Crear un nuevo caso
2. Registrar gestión usando el aplicativo
3. Verificar que los datos se guarden correctamente

### Paso 9: Compartir con Usuarios (2 minutos)
1. **"Configuración"** → **"Permisos del sitio"**
2. Agregar usuarios con rol **"Colaborador"**

### Paso 10: Activar Flujos (1 minuto)
1. En Power Automate, activar todos los flujos creados

## ✅ Verificación Final

Después de completar los 10 pasos:

- [ ] Sitio creado y accesible
- [ ] 3 listas principales funcionando
- [ ] Biblioteca de archivos disponible
- [ ] Dashboard muestra datos
- [ ] Flujos activos
- [ ] Aplicativo de registro funcionando
- [ ] Usuarios pueden acceder

## 📋 Recursos Incluidos

- Plantillas CSV para importar datos
- Archivo HTML del aplicativo de registro
- Instrucciones para flujos de automatización
- Lista de verificación final

## 🎯 Resultado Final

Al completar esta implementación, tendrá un sistema funcional que incluye:

1. Gestión de casos tributarios
2. Registro de gestión con cálculos automáticos
3. Seguimiento de metas
4. Alertas automáticas de vencimiento
5. Aplicativo web para registro de gestión

¡Felicidades! Ha implementado con éxito el Sistema Tributario 3Lite para DIAN Leticia.