// Navegación entre secciones
function mostrarSeccion(id) {
  document.querySelectorAll(".container").forEach((c) => (c.style.display = "none"));
  document.getElementById(id).style.display = "block";
}

// Elementos de audio
const musicaEstudio = document.getElementById("musicaEstudio");
const musicaDescanso = document.getElementById("musicaDescanso");
const sonidoAlarma = document.getElementById("alarma");

function detenerTodasLasMusicas() {
  musicaEstudio.pause();
  musicaEstudio.currentTime = 0;
  musicaDescanso.pause();
  musicaDescanso.currentTime = 0;
}

// Temporizador de estudio
let tiempoEstudio = 25 * 60;
let temporizador;
let enMarcha = false;

function actualizarTemporizador() {
  const minutos = Math.floor(tiempoEstudio / 60).toString().padStart(2, '0');
  const segundos = (tiempoEstudio % 60).toString().padStart(2, '0');
  document.getElementById("temporizador").textContent = `${minutos}:${segundos}`;
}

function iniciarTemporizador() {
  if (!enMarcha) {
    detenerTodasLasMusicas();
    musicaEstudio.play();

    temporizador = setInterval(() => {
      if (tiempoEstudio > 0) {
        tiempoEstudio--;
        actualizarTemporizador();
      } else {
        clearInterval(temporizador);
        enMarcha = false;
        musicaEstudio.pause();
        sonidoAlarma.play();
      }
    }, 1000);
    enMarcha = true;
  }
}

function pausarTemporizador() {
  clearInterval(temporizador);
  enMarcha = false;
  musicaEstudio.pause();
}

function reiniciarTemporizador() {
  clearInterval(temporizador);
  tiempoEstudio = 25 * 60;
  actualizarTemporizador();
  enMarcha = false;
  musicaEstudio.pause();
}

actualizarTemporizador();

// Temporizador de descanso
let tiempoDescanso = 5 * 60;
let descansoEnMarcha = false;
let temporizadorDescanso;

function actualizarTemporizadorDescanso() {
  const minutos = Math.floor(tiempoDescanso / 60).toString().padStart(2, '0');
  const segundos = (tiempoDescanso % 60).toString().padStart(2, '0');
  document.getElementById("temporizadorDescanso").textContent = `${minutos}:${segundos}`;
}

function iniciarDescanso() {
  if (!descansoEnMarcha) {
    detenerTodasLasMusicas();
    musicaDescanso.play();

    temporizadorDescanso = setInterval(() => {
      if (tiempoDescanso > 0) {
        tiempoDescanso--;
        actualizarTemporizadorDescanso();
      } else {
        clearInterval(temporizadorDescanso);
        descansoEnMarcha = false;
        musicaDescanso.pause();
        sonidoAlarma.play();
      }
    }, 1000);
    descansoEnMarcha = true;
  }
}

function pausarDescanso() {
  clearInterval(temporizadorDescanso);
  descansoEnMarcha = false;
  musicaDescanso.pause();
}

function reiniciarDescanso() {
  clearInterval(temporizadorDescanso);
  tiempoDescanso = 5 * 60;
  actualizarTemporizadorDescanso();
  descansoEnMarcha = false;
  musicaDescanso.pause();
}

actualizarTemporizadorDescanso();

// Lista de tareas
function agregarTarea() {
  const input = document.getElementById("nueva-tarea");
  const texto = input.value.trim();
  if (texto === "") return;

  const ul = document.getElementById("lista-tareas");

  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.textContent = texto;

  checkbox.addEventListener("change", () => {
    span.style.textDecoration = checkbox.checked ? "line-through" : "none";
  });

  const botonEliminar = document.createElement("button");
  botonEliminar.textContent = "❌";
  botonEliminar.onclick = () => ul.removeChild(li);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(botonEliminar);
  ul.appendChild(li);

  input.value = "";
}

function eliminarTodas() {
  document.getElementById("lista-tareas").innerHTML = "";
}



