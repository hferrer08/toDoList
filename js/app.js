

let tareas = JSON.parse(localStorage.getItem('tareas'))||[]

const input = document.querySelector("input");
const btnAgregar = document.querySelector(".btnAgregar");
const lista = document.querySelector("ul");
const mensajeVacio = document.querySelector(".mensajeVacio");




const guardarEnLocalStorage = () => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
};

// Función agregar tarea
const agregaTarea = (e) => {
  e.preventDefault();
  const text = input.value.trim();

  if (text === "") {
    alert("Por favor, escribe una tarea.");
  } else {
    const li = document.createElement("li");
    li.textContent = text;
    li.className = "list-group-item d-flex justify-content-between align-items-center list-group-item-dark"


     // Crear botón "Eliminar"
     const btnEliminar = document.createElement("button");
            
     btnEliminar.addEventListener("click", eliminaTarea);
     btnEliminar.className = "btn-floating btn-small waves-effect waves-light red"

     const iconoBasurero = document.createElement("i");
     iconoBasurero.className = "bi bi-trash"

     btnEliminar.appendChild(iconoBasurero);

     btnEliminar.addEventListener("click", eliminaTarea);

    //Agrega el btnEliminar al li
    li.appendChild(btnEliminar);


    //Agrega la tarea a la lista
    lista.appendChild(li);


    tareas.push(text); // Agregamos la tarea al array
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
        // Recorremos el array de tareas y las agregamos al DOM
        tareas.forEach((tarea) => {
            const li = document.createElement("li");
            li.textContent = tarea;
            li.className = "list-group-item d-flex justify-content-between align-items-center list-group-item-dark mb-2"

            // Crear botón "Eliminar"
            const btnEliminar = document.createElement("button");
            
            btnEliminar.addEventListener("click", eliminaTarea);
            btnEliminar.className = "btn-floating btn-small waves-effect waves-light red"

            const iconoBasurero = document.createElement("i");
            iconoBasurero.className = "bi bi-trash"

            btnEliminar.appendChild(iconoBasurero);

            btnEliminar.addEventListener("click", eliminaTarea);


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