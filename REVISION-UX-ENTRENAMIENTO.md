# Revisión UX · Flujo de entrenamiento · 25 de octubre de 2026

Versión funcional para revisión y pruebas con personas. Mantiene Pista eléctrica y el programa de ocho sesiones. No es un dictamen de conformidad WCAG ni un estudio con participantes.

## Entregables implementados

| Solicitud | Resolución |
| --- | --- |
| Selección → entrenamiento → pausa → reanudación → finalización → historial | Flujo funcional en móvil; acceso desde cada tarjeta y desde el aviso de sesión en curso |
| Continuidad del cronómetro | Cierre y salida pausan, guardan y permiten recuperar el punto tras recargar; no reanudación automática |
| Registro del entrenamiento | Finalizar y guardar crea copia con fecha/hora, cargas, notas, valoración y tiempo activo; identificador por ejecución, sin sobrescribir sesiones repetidas el mismo día |
| Sesión nueva/en curso/completada | Estado textual y visual en la tarjeta, además de color; botón con nombre y acción específicos |
| Errores y ausencia de registros | Historial vacío con orientación; error de lectura/escritura sin borrar datos originales; reintento y copia descargable |
| Vista guiada | Paso actual, ejercicio, vuelta, repeticiones/tiempo, próximo ejercicio, carga, pausa y avance; ficha completa disponible |
| Descripciones de dibujos | Los SVG de la ficha y la guía reciben nombres específicos del movimiento e indicaciones, en lugar de «Esquema de postura» |
| Legibilidad/foco | Texto mayor en guía y ficha, acciones con área de 48–52 px, foco visible, mensajes de estado sin anunciar cada segundo |

El tiempo de descanso de cada bloque mantiene su duración total. Fuerza: 60 s de trabajo, 45 s de descanso y 15 s de cambio. Circuito: 40 s de trabajo, 15 s de descanso y 5 s de cambio. Se explicita cada fase con texto. El temporizador libre sigue separado y conserva su configuración y sonidos.

Al avanzar manualmente se salta tiempo de la planificación; el tiempo activo del registro cuenta solo los segundos efectivamente transcurridos. Se admite finalizar antes de completar el tiempo, indicándolo en la revisión. No interpreta automáticamente las cargas ni deduce progresión de fuerza a partir de texto libre.

## Evidencia de comprobación técnica

- 11 pruebas automáticas del motor, repositorio y temporizador libre: duración y límites, fases/vueltas, recuperación del punto, preservación de notas anteriores, dos ejecuciones el mismo día, finalización sin duplicados, fallo de escritura y datos corruptos sin sobrescritura.
- Recorrido manual en navegador a 375 px de ancho: historial vacío → elegir Base & equilibrio → comenzar → avanzar al primer ejercicio → anotar «2 × 10 kg» → pausar y cerrar → recargar → continuar. Recuperó el ejercicio, la carga y los 49:50 restantes. Después se reanudó, se finalizó y se recuperaron carga y nota desde el historial.
- Segunda sesión: estados Ejercicio, Descanso y Cambio de ejercicio; cierre durante la marcha; portada con sesión anterior completada y segunda en curso.
- Tecla Tab desde la carga de la guía lleva al control Pausar y muestra contorno visible. Cierre del diálogo devuelve el foco al botón de la sesión.
- Comparaciones de contraste calculadas para los pares principales (sRGB): texto #F4F7FA / #192944 = 13,54:1; secundario #C3CFE0 / #192944 = 9,24:1; lima #D5F43B / #111D35 = 13,46:1; descanso #B7C7FF / #192944 = 8,76:1; enlace #193FAF / #F4F7FA = 8,24:1. Estas comprobaciones parciales no cubren todos los estados ni certifican accesibilidad.

Las comprobaciones de almacenamiento lleno/bloqueado y JSON corrupto son simulaciones automatizadas del repositorio, no observaciones de un dispositivo real con el almacenamiento lleno. No se realizaron pruebas con participantes ni lector de pantalla real.

## Guion listo para la prueba con personas representativas

Propuesta de muestra: 5–6 personas que se parezcan al público real del gimnasio, con distinta experiencia deportiva y digital. Usar sus móviles habituales y un navegador de prueba sin datos personales de terceros. Explicar el objetivo y pedir permiso para tomar notas; no recoger información de salud innecesaria.

Tareas, sin explicar dónde están los botones:

1. Encuentra una sesión global y explica qué esperas que pase al elegirla.
2. Empieza el entrenamiento y localiza ejercicio, vuelta, siguiente movimiento y tiempo.
3. Introduce una carga y confirma si crees que se ha guardado.
4. Pausa y cierra la ficha. Vuelve a continuar. Repite tras recargar la página.
5. Consulta la ficha completa y regresa a la guía sin perder el punto.
6. Finaliza, añade una nota y comprueba que el entrenamiento quedó guardado.
7. Encuentra el registro y recupera la carga y la nota. Descarga el mes.
8. En un navegador limpio, explica el mensaje de historial vacío.

Registrar por tarea: éxito sin ayuda/con ayuda/no completada, tiempo, errores, dudas, texto confuso y comentario de la persona. No tratar estos resultados como medidos hasta realizar las sesiones.

Criterios de aceptación: ninguna carga perdida; mismo punto al continuar; finalización explícita y un único registro por ejecución; historial comprensible; fase reconocible sin depender del color; controles alcanzables en móvil y por teclado.

## Comprobaciones que siguen pendientes

- Pruebas con personas representativas, contraste de todos los estados, ampliación 200–400 %, TalkBack/VoiceOver y recorrido completo solo con teclado.
- Validación en Android/iOS reales, distintas orientaciones, interrupciones del sistema, cierres forzados y almacenamiento restringido.
- Revisión técnica de los esquemas de ejercicio con personal deportivo: son apoyos simplificados, no demostraciones completas de técnica.
- Uso simultáneo en varias pestañas no tiene bloqueo transaccional; evitar editar el mismo entrenamiento en dos pestañas a la vez. No hay cuentas, base de datos o sincronización.

## Datos y compatibilidad

Conserva `ritmo-feedback-v1`, `ritmo-completed` y `ritmo-training-log-v1`. Añade `ritmo-session-drafts-v1`. No migra ni borra claves antiguas. Los registros manuales anteriores siguen visibles, diferenciados de una ejecución finalizada. Las marcas de completada antiguas que no tenían registro no se convierten en entrenamientos fechados inventados.
