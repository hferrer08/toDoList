let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

const input = document.querySelector("input");
const btnAgregar = document.querySelector(".btnAgregar");
const lista = document.querySelector("ul");
const mensajeVacio = document.querySelector(".mensajeVacio");

const guardarEnLocalStorage = () => {
  localStorage.setItem("tareas", JSON.stringify(tareas));
};

//Función revisa check
const revisaCambioCheck = (e) => {
  const li = e.target.closest("li");
  const textoTarea = li.querySelector("label").textContent.trim(); // Limpia espacios extra

  // Cambiar estilo del <li>
  if (e.target.checked) {
    li.classList.add("text-decoration-line-through");
  } else {
    li.classList.remove("text-decoration-line-through");
  }

  // Actualizar el array de tareas
  const tareaIndex = tareas.findIndex((tarea) => tarea.texto.trim() === textoTarea.trim()); // Compara texto limpio
  if (tareaIndex !== -1) {
    tareas[tareaIndex].isChecked = e.target.checked; // Actualiza isChecked
    guardarEnLocalStorage(); // Guarda los cambios
  }
};

// Función agregar tarea
const agregaTarea = (e) => {
  e.preventDefault();
  const text = input.value.trim();

  if (text === "") {
    alert("Por favor, escribe una tarea.");
  } else {
    const li = document.createElement("li");

  

    // Crear checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input me-2";
    checkbox.style.marginRight = "10px";
  
    checkbox.addEventListener("change", revisaCambioCheck);

  

    const label = document.createElement("label");
     // Asocia el label al checkbox
    label.textContent = text; // Texto de la tarea
    label.className = "m-0";

    

    li.className =
      "list-group-item d-flex justify-content-between align-items-center list-group-item-dark";

    // Crear botón "Eliminar"
    const btnEliminar = document.createElement("button");

    btnEliminar.addEventListener("click", eliminaTarea);
    btnEliminar.className =
      "btn-floating btn-small waves-effect waves-light red";

    const iconoBasurero = document.createElement("i");
    iconoBasurero.className = "bi bi-trash";

    btnEliminar.appendChild(iconoBasurero);

    btnEliminar.addEventListener("click", eliminaTarea);

    li.appendChild(checkbox);
    li.appendChild(label);
    //Agrega el btnEliminar al li
    li.appendChild(btnEliminar);

    //Agrega la tarea a la lista
    lista.appendChild(li);

    tareas.push({ texto: text, isChecked: false }); // Agregamos la tarea al array
    guardarEnLocalStorage(); // Guardamos el array actualizado en localStorage

    // Limpiar el input
    input.value = "";
    // Ocultar mensaje de lista vacía
    mensajeVacio.style.display = "none";
  }
};
//Función eliminar tarea
const eliminaTarea = (e) => {
  const tarea = e.target.parentElement.parentElement;
  const textoTarea = tarea.firstChild.textContent;

  lista.removeChild(tarea);

  const indice = tareas.indexOf(textoTarea); // Encontrar el índice de la tarea
  if (indice !== -1) {
    tareas.splice(indice, 1); // Eliminar solo la tarea específica
    guardarEnLocalStorage(); // Actualizar localStorage
  }

  mostrarMensajeVacio();
};
//Función mostrar mensaje vacio
const mostrarMensajeVacio = () => {
  if (lista.children.length === 0) {
    mensajeVacio.style.display = "block";
  }
};

btnAgregar.addEventListener("click", agregaTarea);
//Para la primera carga
mostrarMensajeVacio();

const imprimeTareas = () => {
  // Si ya existen tareas en localStorage, las mostramos
  if (tareas.length > 0) {


      // Ordenar las tareas: true arriba
      tareas.sort((a, b) => b.isChecked - a.isChecked);

    // Recorremos el array de tareas y las agregamos al DOM
    tareas.forEach((tarea) => {
      const li = document.createElement("li");



      // Crear checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      // checkbox.className = "form-check-input me-2";
      checkbox.className = "form-check-input me-2"; // Clase Bootstrap
    checkbox.style.marginRight = "10px"; // Espaciado adicional
    
      checkbox.checked = tarea.isChecked; // Marcamos si está completada
      

      checkbox.addEventListener("change", revisaCambioCheck);

      li.appendChild(checkbox);

      const label = document.createElement("label");
   // Asocia el label al checkbox
    label.textContent = tarea.texto; // Texto de la tarea
    label.className = "m-0";

      li.appendChild(label);



      li.className =
        "list-group-item d-flex justify-content-between align-items-center list-group-item-dark mb-2";

        if (tarea.isChecked) {
          li.className = "list-group-item d-flex justify-content-between align-items-center list-group-item-dark mb-2 text-decoration-line-through"
        }


      // Crear botón "Eliminar"
      const btnEliminar = document.createElement("button");

      btnEliminar.addEventListener("click", eliminaTarea);
      btnEliminar.className =
        "btn-floating btn-small waves-effect waves-light red";

      const iconoBasurero = document.createElement("i");
      iconoBasurero.className = "bi bi-trash";

      btnEliminar.appendChild(iconoBasurero);
      //Agregar el check al li

      // Agregar el botón al <li>
      li.appendChild(btnEliminar);

      // Agregar el <li> a la lista
      lista.appendChild(li);
    });

    // Ocultar mensaje de lista vacía
    mensajeVacio.style.display = "none";
  } else {
    // Si no hay tareas, mostramos el mensaje de lista vacía
    mensajeVacio.style.display = "block";
  }
};

imprimeTareas();
