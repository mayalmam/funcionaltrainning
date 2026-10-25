# funcionaltrainning

Web estática personal de entrenamiento funcional. Ocho sesiones de 60 minutos y una rotación de cuatro semanas, dos días por semana.

## Uso
Abre index.html en un navegador moderno. Sin dependencias ni instalación. Incluye fichas imprimibles, dibujos SVG, temporizador con fases y avisos opcionales, y progreso guardado en el navegador. Mantén la pantalla activa para los avisos. No hay cuentas ni sincronización.

## GitHub Pages
En Settings → Pages selecciona Deploy from a branch, main y / (root). La dirección habitual será https://mayalmam.github.io/funcionaltrainning/. El repositorio es público y Pages sirve la rama main desde la raíz.

## Plan
Semana 1: sesiones 1 y 5. Semana 2: 2 y 6. Semana 3: 3 y 7. Semana 4: 4 y 8. Deja un día sin esta rutina entre sesiones.

Cada sesión: calentamiento 10 min, fuerza 24 min (3 vueltas, 4 estaciones de 2 min), circuito 16 min (4 vueltas, 4 estaciones, 40/20), cardio suave 5 min, vuelta a la calma 5 min.

Los dibujos son esquemas de apoyo con instrucciones. Ajusta cargas y descansos a tu técnica y recuperación.

## Favoritos, valoraciones y notas
Cada sesión tiene marcador de favorito, me gusta y no me gusta, y notas con guardado automático. La valoración se habilita al marcar la sesión como completada. Un no me gusta no modifica nada por sí solo; muestra sustituciones predefinidas por fuerza, cardio o variedad. Puedes revisar los cambios y aplicarlos, y recuperar la versión anterior. No hay inteligencia artificial ni análisis automático de las notas. La duración permanece en 60 minutos.

Todos los datos personales se guardan solo en localStorage del navegador: no se suben al repositorio ni se sincronizan entre dispositivos o dominios. Al borrar los datos del navegador se perderán. Los avisos de error informan si no se puede guardar.

Identidad Mi entreno · Pista eléctrica: azul noche, lima y fotografía de material. Manual y propuestas conservadas en docs/diseno/.

Incluye movimientos sencillos de CrossFit sin gimnásticos ni levantamientos olímpicos complejos. El thruster se hace con mancuernas ligeras y puede sustituirse por sentadilla goblet.

## Material del centro y descarga del progreso

Entrada «Explora tu gimnasio» con fotos de poleas, prensa y rack. En ejercicios asociados, pulsa «Ver máquina» para consultar la ficha sin salir del entrenamiento.

Las cargas y notas siguen guardándose automáticamente. Para conservar una copia con fecha, pulsa «Finalizar y guardar» al terminar el entrenamiento: cada ejecución tiene un registro independiente. Desde «Mi progreso» puedes filtrar un mes y descargar CSV compatible con Excel o abrir el informe para imprimirlo / guardarlo como PDF. También puedes exportar las últimas cargas anteriores, sin fecha. No se pueden reconstruir meses previos al registro fechado. Todo permanece en este navegador.

## Cronómetros

El cronómetro de cada sesión permanece visible al desplazarse por su ficha: muestra el tiempo total, la fase y el intervalo restante, con pausa y reinicio. La nueva vista guiada conserva también la referencia del tiempo al desplazarse.

Debajo de los dos carruseles está «Temporizador libre». Permite configurar segundos de trabajo (1–3600), descanso (0–3600) y rondas (1–99). No añade descanso después de la última ronda. Se abre en vista ampliada; el botón de pantalla completa oculta las barras del navegador cuando este lo permite. Incluye sonido opcional, pausa, continuación y reinicio. Cerrar pausa el temporizador; las preferencias se conservan en este navegador, pero la cuenta en curso no sobrevive a una recarga. Para cambiar los tiempos de un entrenamiento iniciado, pulsa Reiniciar. La cuenta se calcula mediante tiempo transcurrido y se actualiza al volver a la pestaña; los avisos sonoros requieren que la app permanezca visible. Intenta mantener la pantalla activa en navegadores compatibles. No modifica cargas, notas ni registros de progreso.

Pruebas del motor de intervalos: `node --test tests/intervalos.test.cjs`.

### Avisos del temporizador libre

En «Sonido y volumen» puedes elegir triple pitido (opción inicial) o pitido marcado, ajustar el volumen y probar el sonido. El trabajo usa un tono más alto que el descanso; la finalización tiene un aviso más largo. Las preferencias se conservan en este navegador, sin cambiar notas ni cargas. El volumen multimedia del dispositivo sigue limitando el nivel audible. Las casillas de trabajo, descanso y rondas se alinean a la misma altura en móvil.

## Recorrido de entrenamiento y revisión UX

La selección distingue sesiones nuevas, en curso y completadas. «Entrenamiento guiado» muestra un paso cada vez, vuelta, siguiente ejercicio, tiempo, carga y controles de pausa/reanudación y avance. «Ficha completa» conserva la consulta de toda la sesión y su impresión.

Cerrar, cambiar de pestaña o salir de la app pausa el entrenamiento y guarda el punto actual en este navegador. Se puede reabrir o recargar y pulsar Continuar/Reanudar. Al llegar a cero se abre la revisión, sin marcar completada hasta pulsar «Finalizar y guardar». Se permite finalizar antes de tiempo, indicando el tiempo activo real; avanzar pasos no se cuenta como tiempo entrenado. La duración programada permanece en 60 minutos: fuerza 60 s + 45 s descanso + 15 s cambio; circuito 40 s + 15 s descanso + 5 s cambio.

Cada finalización conserva una copia fechada independiente, incluso si se repite la misma sesión en el mismo día. Se integra con las descargas mensuales existentes. Los antiguos registros manuales y las cargas/notas se conservan. «Historial de entrenamientos» permite recuperar esas copias; incluye estado vacío, errores y descarga de copia JSON para recuperación. La copia de seguridad se descarga, pero no hay importador ni sincronización entre dispositivos.

Guion de pruebas y límites de validación: [REVISION-UX-ENTRENAMIENTO.md](REVISION-UX-ENTRENAMIENTO.md). Pruebas de regresión: `node --test tests/*.test.cjs`.
