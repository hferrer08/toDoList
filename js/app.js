let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

const input = document.querySelector("input");
const btnAgregar = document.querySelector(".btnAgregar");
const lista = document.querySelector("ul");
const mensajeVacio = document.querySelector(".mensajeVacio");

const guardarEnLocalStorage = () => {
  localStorage.setItem("tareas", JSON.stringify(tareas));
};

//Mensajes sweetAlert2

const sweetError = ( titulo, texto, textoFooter, icono) => {
  
  if (!icono || icono === undefined || icono === null){
    icono: 'error'
  }

  Swal.fire({
    icon: 'error',
    title: titulo,
    text: texto,
    footer: textoFooter
  });

};

const sweetConfirmacionEliminar = async (titulo) => {
  const result = await Swal.fire({
    title: titulo,
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Sí",
    denyButtonText: "No",
  });

  return result.isConfirmed;  // Retorna si el usuario confirmó (hizo clic en "Sí")
};








//Función revisa check
const revisaCambioCheck = (e) => {
  const li = e.target.closest("li");
  const textoTarea = li.querySelector("label").textContent.trim(); // Limpia espacios extra

  // Cambiar estilo del <li>
 // if (e.target.checked) {
  //  li.classList.add("text-decoration-line-through");
 // } else {
  //  li.classList.remove("text-decoration-line-through");
  //}

  // Actualizar el array de tareas
  const tareaIndex = tareas.findIndex((tarea) => tarea.texto.trim() === textoTarea.trim()); // Compara texto limpio
  if (tareaIndex !== -1) {
    tareas[tareaIndex].isChecked = e.target.checked; // Actualiza isChecked
    guardarEnLocalStorage(); // Guarda los cambios
    imprimeTareas();
  }
};

// Función agregar tarea
const agregaTarea = (e) => {
  e.preventDefault();
  const text = input.value.trim();

  if (text === "") {
    sweetError('Error',"Por favor, escribe una tarea.",'');
  } else {
    /*
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
    */

    tareas.push({ texto: text, isChecked: false }); // Agregamos la tarea al array
    // Ordenar el array antes de renderizar
    tareas.sort((a, b) => a.isChecked - b.isChecked);
    imprimeTareas();
    guardarEnLocalStorage(); // Guardamos el array actualizado en localStorage
    // Limpiar el input
    input.value = "";
    // Ocultar mensaje de lista vacía
    mensajeVacio.style.display = "none";
  }
};
//Función eliminar tarea
const eliminaTarea = async (e) => {


  const cambioAprobado = await sweetConfirmacionEliminar("¿Está seguro que desea eliminar esta tarea?");

  if (cambioAprobado) {

    const tarea = e.target.closest("li"); // Usamos closest para encontrar el li más cercano

    // Obtener el texto de la tarea, aquí asumimos que el texto está en un label dentro de li
    const textoTarea = tarea.querySelector("label").textContent.trim();  // O usa "span" si es un <span> el que contiene el texto

    // Eliminar la tarea del array
    const indice = tareas.findIndex(tarea => tarea.texto === textoTarea); // Usamos findIndex para buscar la tarea por su texto
    if (indice !== -1) {
      tareas.splice(indice, 1); // Eliminar solo la tarea específica
      guardarEnLocalStorage(); // Actualizar localStorage
      sweetError('Tarea eliminada.','','','info');
      imprimeTareas();
    }


} else{
  sweetError('No se han realizado cambios','','','info');
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

  lista.innerHTML = '';
  // Si ya existen tareas en localStorage, las mostramos
  if (tareas.length > 0) {


      // Ordenar las tareas: false arriba
      tareas.sort((a, b) => a.isChecked - b.isChecked);

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
  } 

  mostrarMensajeVacio();
};

imprimeTareas();

//Para habilitar el enter en la pantalla

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // Evita que se envíe un formulario si está presente
    const btnAgregar = document.querySelector(".btnAgregar");
    if (btnAgregar) {
      btnAgregar.click(); // Dispara el evento click del botón
    }
  }
});




