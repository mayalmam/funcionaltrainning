# Mi entreno · Pista eléctrica

Dirección 02 aprobada el 19 de octubre de 2026. Nombre provisional: Mi entreno.

## Sistema visual

| Uso | Color |
| --- | --- |
| Fondo | #111D35 |
| Acción principal / selección | #D5F43B |
| Formularios y tablas | #F4F7FA |
| Líneas de pista | #4164F4 |
| Texto secundario | #BBC8DC |

Tipografía de interfaz: Inter si está disponible localmente, system-ui como alternativa. Numerales: ui-monospace. Marca: Arial Black o system-ui, peso 900. No se descargan fuentes externas. El boceto usa una tipografía geométrica de referencia; la implementación utiliza fuentes del dispositivo.

Espaciado base: 8 px. Botones con área mínima de 44 px, radio 10 px. Tarjetas con radio 14 px y separación 18 px. Contenedor central máximo 1240 px. En móvil las tarjetas ocupan el 90 % del carrusel para anticipar la siguiente. Tablas de cargas con tres columnas y fondos claros. Foco visible lima y desplazamiento compatible con movimiento reducido.

Fotografía generada de material deportivo, guardada en assets/equipment.png. Las líneas azules y los números se combinan con la fotografía; las tablas y campos no llevan imágenes detrás. No hay peticiones de imágenes a terceros.

## Aplicaciones

Inicio: sesiones globales y específicas en dos carruseles; favoritos disponibles, valoración posterior a completar. Ficha: fotografía, temporizador original, instrucciones, cargas, guías y notas. La revisión se conserva dentro de la ficha actual: no se añade una ruta nueva ni un historial de ejecuciones que el modelo actual no admite.

Se mantienen las ocho sesiones reales de 60 minutos. Los 45 minutos, pesos y ejercicios del boceto eran ejemplos visuales, no cambios del programa.

## Persistencia

Se conservan las claves `ritmo-completed` y `ritmo-feedback-v1` y los identificadores de sesiones/ejercicios. No borrar ni renombrar estas claves. Los datos siguen en el navegador y dominio originales. Una previsualización en otro dominio no mostrará los datos del dominio de producción.

## Archivo de propuestas

- 01-direcciones.png: las tres direcciones iniciales, incluidas Fuerza editorial y Hierro y tiza.
- 02-pista-electrica.png: boceto aprobado de inicio, sesión y revisión.

El boceto es una referencia de dirección artística, no una captura de la aplicación. Esta primera implementación adapta la identidad a las funciones y contenidos reales.
