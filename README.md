# Sistema Tributario 3Lite DIAN Leticia

[![Estado](https://img.shields.io/badge/Estado-Estable-green.svg)](https://github.com/yourusername/Sistema-3Lite-DIAN-Leticia)
[![Versión](https://img.shields.io/badge/Versión-1.0.0-blue.svg)](https://github.com/yourusername/Sistema-3Lite-DIAN-Leticia/releases)
[![Licencia](https://img.shields.io/badge/Licencia-MIT-yellow.svg)](LICENSE)

Sistema simplificado para la gestión tributaria de DIAN Leticia, implementable en SharePoint en aproximadamente 45 minutos.

## 📋 Descripción

El Sistema Tributario 3Lite es una versión simplificada y eficiente para la gestión de casos tributarios, seguimiento de metas y registro de gestión. Diseñado específicamente para DIAN Leticia, este sistema se implementa en SharePoint y ofrece todas las funcionalidades esenciales en un paquete fácil de instalar y usar.

### Características Principales

- **Implementación rápida**: Aproximadamente 45 minutos siguiendo la guía paso a paso
- **Estructura simplificada**: Solo 3 listas principales (Casos, Gestión, Metas)
- **Dashboard visual**: Visualización clara de casos, metas y cumplimiento
- **Aplicativo de registro**: Interfaz web intuitiva para el registro de gestión
- **Alertas automáticas**: Notificaciones de casos próximos a vencer
- **Documentación completa**: Guías detalladas para implementación y uso

## 🚀 Implementación

### Requisitos Previos

- Microsoft 365 con acceso a SharePoint Online
- Permisos para crear sitios y listas en SharePoint
- Power Automate (anteriormente Flow) para los flujos de automatización
- Navegador web moderno (Chrome, Edge, Firefox)

### Guía Rápida de Implementación

1. Clone este repositorio o descargue los archivos
2. Siga la [Guía Rápida de Implementación](docs/guia_rapida_implementacion.md) (10 pasos, 45 minutos)
3. Para instrucciones más detalladas, consulte la [Guía de Implementación Completa](docs/guia_implementacion_completa.md)

## 📊 Estructura del Sistema

```
SISTEMA TRIBUTARIO 3LITE
│
├── SHAREPOINT
│   ├── Listas
│   │   ├── Casos
│   │   ├── Gestión
│   │   └── Metas
│   │
│   ├── Biblioteca de Documentos
│   │   └── Expedientes
│   │
│   └── Páginas
│       ├── Inicio (Dashboard)
│       └── Aplicativo de Registro
│
├── POWER AUTOMATE
│   └── Flujo de Alerta de Vencimiento
│
└── APLICATIVO WEB
    └── Registro de Gestión
```

## 📱 Aplicativo de Registro de Gestión

El sistema incluye un aplicativo web para el registro rápido y eficiente de la gestión tributaria:

- Interfaz amigable y responsiva
- Registro simplificado de casos y gestiones
- Cálculos automáticos de diferencias y porcentajes
- Gestión de recibos de pago
- Dashboard integrado con estadísticas

Para implementar el aplicativo, siga la [Guía de Integración con SharePoint](docs/integracion_sharepoint_aplicativo.md).

## 📚 Documentación

Este repositorio incluye documentación completa para la implementación y uso del sistema:

- [Guía de Implementación Completa](docs/guia_implementacion_completa.md)
- [Guía Rápida de Implementación](docs/guia_rapida_implementacion.md)
- [Implementación del Dashboard](docs/implementacion_dashboard.md)
- [Integración con SharePoint](docs/integracion_sharepoint_aplicativo.md)
- [Guía de Capacitación de Usuarios](docs/guia_capacitacion_usuarios.md)
- [Lista de Verificación Final](docs/lista_verificacion_final.md)
- [Preguntas Frecuentes](docs/preguntas_frecuentes.md)

## 📋 Plantillas

En la carpeta [templates](templates/) encontrará plantillas CSV para importar datos de ejemplo:

- [Plantilla de Casos](templates/plantilla_casos.csv)
- [Plantilla de Gestión](templates/plantilla_gestion.csv)
- [Plantilla de Metas](templates/plantilla_metas.csv)

## 🛠️ Desarrollo y Personalización

### Estructura del Código

```
src/
├── aplicativo_registro_gestion.html  # Aplicativo principal
│
assets/
├── css/
│   └── aplicativo.css                # Estilos del aplicativo
├── js/
│   └── aplicativo.js                 # Funcionalidad del aplicativo
└── img/
    └── ...                           # Imágenes y recursos gráficos
```

### Personalización

El sistema está diseñado para ser fácilmente personalizable:

1. Modifique los archivos CSS para adaptar la apariencia a su identidad visual
2. Edite el JavaScript para agregar o modificar funcionalidades
3. Actualice el HTML para cambiar la estructura del aplicativo

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Haga un Fork del repositorio
2. Cree una rama para su funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Haga commit de sus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Haga push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abra un Pull Request

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - vea el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

Para soporte o consultas:

- **Correo**: [correo@ejemplo.com](mailto:correo@ejemplo.com)
- **Issues**: [Reportar un problema](https://github.com/yourusername/Sistema-3Lite-DIAN-Leticia/issues)

---

Desarrollado con ❤️ para DIAN Leticia