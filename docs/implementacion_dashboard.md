# Implementación del Dashboard para Sistema 3Lite

Esta guía detalla cómo implementar un dashboard efectivo en SharePoint para visualizar los datos clave del Sistema Tributario 3Lite.

## Objetivos del Dashboard

El dashboard del Sistema 3Lite debe proporcionar:

1. Visión general de casos por estado
2. Seguimiento de metas y cumplimiento
3. Alertas de casos próximos a vencer
4. Indicadores clave de desempeño

## Implementación Paso a Paso

### Paso 1: Preparar la Página Principal

1. Vaya a la página principal de su sitio de SharePoint
2. Haga clic en el botón **"Editar"** en la esquina superior derecha
3. Si hay contenido existente que desea conservar, considere reorganizarlo
4. Si desea empezar desde cero, puede eliminar los web parts existentes

### Paso 2: Agregar Web Parts Básicos

#### Web Part de Lista de Casos

1. Haga clic en el botón **"+"** para agregar un nuevo web part
2. Busque y seleccione **"Lista"**
3. En la configuración del web part:
   - Seleccione la lista **"Casos"**
   - Cree una vista personalizada:
     - Columnas a mostrar: NumeroCaso, Contribuyente, Estado, TipoCaso, FechaVencimiento
     - Filtro: Estado no es igual a "Cerrado"
     - Ordenar por: FechaVencimiento (Ascendente)
     - Límite: 5 elementos
   - Título: "Casos Activos"

#### Web Part de Lista de Metas

1. Agregue otro web part de tipo **"Lista"**
2. En la configuración:
   - Seleccione la lista **"Metas"**
   - Cree una vista personalizada:
     - Columnas a mostrar: Periodo, TipoMeta, ValorMeta, ValorCumplido, Porcentaje
     - Filtro: Periodo es igual al periodo actual (ej. "Q3-2025")
   - Título: "Metas del Periodo Actual"

### Paso 3: Agregar Gráficos

#### Gráfico de Casos por Estado

1. Agregue un web part de tipo **"Gráfico rápido"**
2. En la configuración:
   - Origen de datos: Lista "Casos"
   - Tipo de gráfico: Circular (Pie)
   - Agrupar por: Estado
   - Título: "Distribución de Casos por Estado"

#### Gráfico de Cumplimiento de Metas

1. Agregue otro web part de tipo **"Gráfico rápido"**
2. En la configuración:
   - Origen de datos: Lista "Metas"
   - Tipo de gráfico: Barras
   - Eje X: TipoMeta
   - Eje Y: Porcentaje
   - Título: "Porcentaje de Cumplimiento de Metas"

### Paso 4: Agregar Web Part de Casos Próximos a Vencer

1. Agregue un web part de tipo **"Lista"**
2. En la configuración:
   - Seleccione la lista **"Casos"**
   - Cree una vista personalizada:
     - Columnas a mostrar: NumeroCaso, Contribuyente, TipoCaso, FechaVencimiento
     - Filtro: 
       - Estado no es igual a "Cerrado" Y
       - FechaVencimiento es menor o igual a [Hoy]+10
     - Ordenar por: FechaVencimiento (Ascendente)
   - Título: "Casos Próximos a Vencer"
   - Estilo: Resaltar filas donde FechaVencimiento es menor o igual a [Hoy]+5

### Paso 5: Agregar Indicadores Clave (KPIs)

Para crear indicadores visuales de desempeño, puede utilizar el web part **"Texto"** con formato personalizado:

1. Agregue un web part de tipo **"Texto"**
2. Diseñe una sección de KPIs con HTML:

```html
<div style="display: flex; justify-content: space-between; margin: 20px 0;">
    <div style="text-align: center; padding: 15px; background-color: #f0f0f0; border-radius: 5px; width: 30%;">
        <h3 style="margin: 0; color: #333;">Casos Abiertos</h3>
        <p style="font-size: 24px; font-weight: bold; margin: 10px 0; color: #4472C4;">12</p>
    </div>
    <div style="text-align: center; padding: 15px; background-color: #f0f0f0; border-radius: 5px; width: 30%;">
        <h3 style="margin: 0; color: #333;">Cumplimiento</h3>
        <p style="font-size: 24px; font-weight: bold; margin: 10px 0; color: #70AD47;">68%</p>
    </div>
    <div style="text-align: center; padding: 15px; background-color: #f0f0f0; border-radius: 5px; width: 30%;">
        <h3 style="margin: 0; color: #333;">Por Vencer</h3>
        <p style="font-size: 24px; font-weight: bold; margin: 10px 0; color: #C5504B;">3</p>
    </div>
</div>
```

Nota: Deberá actualizar manualmente los valores en este HTML o considerar usar soluciones más avanzadas como Power BI para KPIs dinámicos.

### Paso 6: Organizar el Diseño

1. Reorganice los web parts arrastrándolos a las posiciones deseadas
2. Considere este orden para una visualización efectiva:
   - KPIs en la parte superior
   - Gráficos en la sección media
   - Listas detalladas en la parte inferior
3. Ajuste el ancho de las columnas según sea necesario
4. Utilice secciones para agrupar web parts relacionados

### Paso 7: Agregar Enlaces Rápidos

1. Agregue un web part de tipo **"Enlaces rápidos"**
2. Configure los siguientes enlaces:
   - "Registrar Nueva Gestión" → [URL del aplicativo de registro]
   - "Ver Todos los Casos" → [URL de la vista completa de la lista Casos]
   - "Reportes de Metas" → [URL de la vista completa de la lista Metas]
   - "Biblioteca de Expedientes" → [URL de la biblioteca de documentos]

### Paso 8: Personalizar Apariencia

1. Para cada web part, ajuste la configuración de apariencia:
   - Agregue bordes si es necesario
   - Ajuste el espaciado
   - Configure colores consistentes
2. Considere agregar un encabezado personalizado con el logo de DIAN Leticia

### Paso 9: Guardar y Publicar

1. Una vez satisfecho con el diseño, haga clic en **"Guardar como borrador"** para revisar
2. Previsualice cómo se verá para los usuarios
3. Si todo está correcto, haga clic en **"Publicar"**

### Paso 10: Configurar Actualizaciones Automáticas

Para mantener el dashboard actualizado:

1. En la configuración de la página, busque la opción de **"Actualización automática"**
2. Configure la página para actualizarse cada 15-30 minutos
3. Esto asegurará que los usuarios siempre vean datos actualizados

## Opciones Avanzadas

### Integración con Power BI

Para visualizaciones más avanzadas, considere crear un informe en Power BI:

1. Conecte Power BI a las listas de SharePoint
2. Cree visualizaciones interactivas
3. Publique el informe a Power BI Service
4. Agregue un web part de Power BI a la página de SharePoint

### Web Parts Personalizados

Si tiene conocimientos de desarrollo, puede crear web parts personalizados usando el SharePoint Framework (SPFx):

1. Desarrolle web parts que muestren exactamente la información que necesita
2. Implemente lógica personalizada para cálculos complejos
3. Cree visualizaciones específicas para su caso de uso

## Mejores Prácticas

1. **Simplicidad**: No sobrecargue el dashboard con demasiada información
2. **Relevancia**: Muestre solo los datos más importantes para la toma de decisiones
3. **Consistencia**: Mantenga un diseño y esquema de colores coherente
4. **Accesibilidad**: Asegúrese de que la información sea fácil de interpretar
5. **Rendimiento**: Limite el número de web parts para mantener tiempos de carga rápidos

## Ejemplos de Diseño

### Diseño Básico (2 columnas)

```
┌─────────────────────────────────────────────────────────────┐
│                         ENCABEZADO                          │
├─────────────────────────┬───────────────────────────────────┤
│                         │                                   │
│         KPIs            │       ENLACES RÁPIDOS             │
│                         │                                   │
├─────────────────────────┼───────────────────────────────────┤
│                         │                                   │
│   GRÁFICO DE CASOS      │    GRÁFICO DE CUMPLIMIENTO        │
│     POR ESTADO          │          DE METAS                 │
│                         │                                   │
├─────────────────────────┴───────────────────────────────────┤
│                                                             │
│                  CASOS PRÓXIMOS A VENCER                    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                      CASOS ACTIVOS                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Diseño Avanzado (3 columnas)

```
┌─────────────────────────────────────────────────────────────┐
│                         ENCABEZADO                          │
├─────────────┬─────────────────────────┬─────────────────────┤
│             │                         │                     │
│    KPI 1    │         KPI 2          │        KPI 3        │
│             │                         │                     │
├─────────────┼─────────────────────────┼─────────────────────┤
│             │                         │                     │
│  GRÁFICO    │                         │    ENLACES          │
│  CASOS      │     CASOS PRÓXIMOS      │    RÁPIDOS          │
│             │     A VENCER            │                     │
│             │                         │                     │
├─────────────┤                         ├─────────────────────┤
│             │                         │                     │
│  GRÁFICO    │                         │    METAS DEL        │
│  METAS      │                         │    PERIODO          │
│             │                         │                     │
└─────────────┴─────────────────────────┴─────────────────────┘
```

## Solución de Problemas

### Los gráficos no muestran datos
- Verifique que hay datos en las listas correspondientes
- Asegúrese de que la configuración del gráfico es correcta
- Intente cambiar el tipo de gráfico

### La página se carga lentamente
- Reduzca el número de web parts
- Simplifique las vistas de lista (menos columnas, menos elementos)
- Considere dividir el dashboard en múltiples páginas

### Los filtros no funcionan correctamente
- Verifique la sintaxis de los filtros
- Asegúrese de que los tipos de datos son correctos
- Pruebe filtros más simples primero y luego agregue complejidad

## Conclusión

Un dashboard bien diseñado es esencial para el éxito del Sistema 3Lite. Siguiendo esta guía, podrá crear una interfaz intuitiva y útil que permita a los usuarios visualizar rápidamente la información más importante y tomar decisiones basadas en datos.