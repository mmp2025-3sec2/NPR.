const tablaBase = document.querySelector("#tablaBase tbody");
const tablaAdicional = document.querySelector("#tablaAdicional tbody");

const fallasBase966H = [
  ["Sistema de Motor", "Pérdida de potencia o funcionamiento ineficiente del motor", 10, 6, 5, "Desgaste, falta de lubricación, fallas en filtros", "Sección 2"],
  ["Turbocompresor", "Pérdida de fuerza, humo excesivo y consumo de aceite", 8, 5, 6, "Verificar lubricación, admisión y reemplazar si presenta desgaste.", "Sección 2"],
  ["Filtro de aceite del motor", "Obstrucción del filtro que reduce la lubricación", 7, 3, 5, "Reemplazar filtro y verificar presión de aceite.", "Sección 2"],
  ["Filtro de aire", "Obstrucción del filtro que reduce la entrada de aire", 6, 4, 5, "Limpiar o reemplazar filtro de aire.", "Sección 2"],
  ["Filtro de combustible", "Obstrucción que reduce el flujo de combustible", 7, 5, 5, "Reemplazar filtro y purgar sistema.", "Sección 2"],
  ["Radiadores", "No enfría o presenta fugas", 10, 6, 5, "Limpiar radiador, reparar fugas y completar refrigerante.", "Sección 2"],
  ["Inyectores MEUI", "Mala inyección o cantidad incorrecta", 10, 6, 5, "Evaluar inyectores y corregir fallas de inyección.", "Sección 2"],
  ["Sistema Eléctrico", "Interrupción o falla en el suministro eléctrico", 7, 4, 5, "Inspeccionar cableado, fusibles, relés y alternador.", "Sección 2"],
  ["Fusibles", "Fusible quemado que interrumpe el circuito", 5, 3, 4, "Reemplazar fusible y revisar cortocircuitos.", "Sección 2"],
  ["Relés eléctricos", "Falla del relé que impide activación del circuito", 6, 3, 4, "Revisar relé y reemplazar si corresponde.", "Sección 2"],
  ["Baterías", "No suministra energía suficiente", 8, 5, 6, "Verificar carga, bornes y estado de batería.", "Sección 2"],
  ["Alternador", "No genera o no suministra energía", 7, 5, 5, "Revisar alternador, regulador y correa.", "Sección 2"],
  ["Arrancador", "No arranca o gira lento", 8, 5, 6, "Revisar solenoide, batería y motor de arranque.", "Sección 2"],
  ["Sistema Hidráulico", "Pérdida de presión o movimiento lento", 9, 7, 6, "Verificar fugas, bomba hidráulica y contaminación del aceite.", "Sección 2"],
  ["Filtros hidráulicos", "No filtra o restringe el flujo", 8, 5, 6, "Reemplazar filtros hidráulicos.", "Sección 2"],
  ["Mangueras hidráulicas", "Fuga o interrupción del flujo", 9, 6, 6, "Reemplazar mangueras dañadas y revisar conexiones.", "Sección 2"],
  ["Cilindros", "Movimiento débil o fugas", 9, 5, 5, "Cambiar sellos e inspeccionar vástago.", "Sección 2"],
  ["Válvula de control", "No regula correctamente", 9, 4, 5, "Inspeccionar válvula, limpieza y calibración.", "Sección 2"],
  ["Sistema de Transmisión", "Pérdida de fuerza o dificultad para avanzar", 10, 6, 6, "Verificar presión, aceite y componentes internos.", "Sección 2"],
  ["Filtros de transmisión", "No filtra o restringe el flujo", 7, 4, 5, "Reemplazar filtros de transmisión.", "Sección 2"],
  ["Bomba de carga", "Sin presión, baja presión o flujo insuficiente", 9, 5, 5, "Reparar fuga y verificar presión de carga.", "Sección 2"],
  ["Discos de embrague", "Deslizamiento o dificultad en cambios", 10, 6, 6, "Inspeccionar discos y presión de embragues.", "Sección 2"],
  ["Aceite de transmisión", "No lubrica o se contamina", 6, 4, 5, "Cambiar aceite y verificar contaminación.", "Sección 2"]
];

function crearSelect(valor = 1) {
  let html = `<select onchange="calcularTodo()">`;

  for (let i = 1; i <= 10; i++) {
    html += `<option value="${i}" ${i === valor ? "selected" : ""}>${i}</option>`;
  }

  html += `</select>`;
  return html;
}

function clasificarRiesgo(npr) {
  if (npr <= 100) return ["Bajo", "bajo"];
  if (npr <= 200) return ["Medio", "medio"];
  if (npr <= 500) return ["Alto", "alto"];
  return ["Crítico", "critico"];
}

function cargarFallasBase() {
  tablaBase.innerHTML = "";

  fallasBase966H.forEach(item => {
    let fila = document.createElement("tr");

    let s = item[2];
    let o = item[3];
    let d = item[4];
    let npr = s * o * d;
    let [texto, clase] = clasificarRiesgo(npr);

    fila.innerHTML = `
      <td>${item[0]}</td>
      <td>${item[1]}</td>
      <td>${s}</td>
      <td>${o}</td>
      <td>${d}</td>
      <td class="npr">${npr}</td>
      <td class="riesgo ${clase}">${texto}</td>
      <td>${item[5]}</td>
      <td>${item[6]}</td>
    `;

    tablaBase.appendChild(fila);
  });

  calcularTodo();
  actualizarResumenHistorial();
}

function agregarFilaAdicional() {
  let fila = document.createElement("tr");

  fila.innerHTML = `
    <td><input type="text" placeholder="Componente"></td>
    <td><input type="text" placeholder="Modo de falla"></td>
    <td>${crearSelect()}</td>
    <td>${crearSelect()}</td>
    <td>${crearSelect()}</td>
    <td class="npr">1</td>
    <td class="riesgo bajo">Bajo</td>
    <td><input type="text" placeholder="Acción correctiva"></td>
    <td><input type="text" placeholder="Responsable"></td>
  `;

  tablaAdicional.appendChild(fila);
  calcularTodo();
}

function calcularTodo() {
  let bajos = 0;
  let medios = 0;
  let altos = 0;
  let criticos = 0;

  let filas;
  const historial = document.getElementById("historialNPR");

    if (historial && historial.style.display === "block") {
    filas = document.querySelectorAll("#tablaBase tbody tr, #tablaAdicional tbody tr");
  } else {
    filas = document.querySelectorAll("#tablaAdicional tbody tr");
  }

  filas.forEach(fila => {
    let npr;

    const selects = fila.querySelectorAll("select");

    if (selects.length === 3) {
      let s = parseInt(selects[0].value);
      let o = parseInt(selects[1].value);
      let d = parseInt(selects[2].value);

      npr = s * o * d;
      fila.querySelector(".npr").textContent = npr;
    } else {
      npr = parseInt(fila.querySelector(".npr").textContent);
    }

    let [texto, clase] = clasificarRiesgo(npr);

    let celdaRiesgo = fila.querySelector(".riesgo");
    celdaRiesgo.textContent = texto;
    celdaRiesgo.className = "riesgo " + clase;
    let celdaNPR = fila.querySelector(".npr");

celdaNPR.className = "npr " + clase;

    if (clase === "bajo") bajos++;
    if (clase === "medio") medios++;
    if (clase === "alto") altos++;
    if (clase === "critico") criticos++;
  });

  document.getElementById("totalBajo").textContent = bajos;
  document.getElementById("totalMedio").textContent = medios;
  document.getElementById("totalAlto").textContent = altos;
  document.getElementById("totalCritico").textContent = criticos;
}

function limpiarAdicionales() {
  tablaAdicional.innerHTML = "";
  calcularTodo();
}

window.onload = function () {
  cargarFallasBase();
};
function mostrarHistorial(){

    const historial = document.getElementById("historialNPR");
    const boton = document.getElementById("btnHistorial");

    if(historial.classList.contains("historial-visible")){

        historial.classList.remove("historial-visible");

        boton.innerHTML="▶ Ver Historial de Evaluaciones NPR";

    }else{

        historial.classList.add("historial-visible");

        boton.innerHTML="▼ Ocultar Historial de Evaluaciones NPR";

    }
calcularTodo();
}
function abrirHistorial(){

    document.getElementById("modalHistorial").style.display="block";

    actualizarResumenHistorial();

}

function cerrarHistorial(){

    document.getElementById("modalHistorial").style.display="none";

}
function actualizarResumenHistorial(){

    let bajos=0;
    let medios=0;
    let altos=0;
    let criticos=0;

    const filas=document.querySelectorAll("#tablaBase tbody tr");

    filas.forEach(fila=>{

        const riesgo=fila.querySelector(".riesgo").textContent.trim();

        if(riesgo==="Bajo") bajos++;

        else if(riesgo==="Medio") medios++;

        else if(riesgo==="Alto") altos++;

        else if(riesgo==="Crítico") criticos++;

    });

    document.getElementById("histBajo").textContent=bajos;
    document.getElementById("histMedio").textContent=medios;
    document.getElementById("histAlto").textContent=altos;
    document.getElementById("histCritico").textContent=criticos;

}