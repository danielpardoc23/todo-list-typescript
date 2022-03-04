let list = [
    {
        name: 'Tarea1',
        description: 'Tarea número 1',
        priority: 1,
        state: 'created'
    },
    {
        name: 'Tarea2',
        description: 'Tarea número 2',
        priority: 1,
        state: 'doing'
    },
    {
        name: 'Tarea3',
        description: 'Tarea número 3',
        priority: 4,
        state: 'done'
    },
    {
        name: 'Tarea4',
        description: 'Tarea número 4',
        priority: 3,
        state: 'deleted'
    },
    {
        name: 'Tarea5',
        description: 'Tarea número 5',
        priority: 4,
        state: 'created'
    },
    {
        name: 'Tarea6',
        description: 'Tarea número 6',
        priority: 3,
        state: 'doing'
    },
    {
        name: 'Tarea7',
        description: 'Tarea número 7',
        priority: 2,
        state: 'done'
    },
    {
        name: 'Tarea8',
        description: 'Tarea número 8',
        priority: 1,
        state: 'deleted'
    }
];
// task.name = ""
class Task {
    constructor(name, status, priority, description) {
        this._name = name;
        this._status = status;
        this._priority = priority;
        this._description = description;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
    }
    get priority() {
        return this._priority;
    }
    set priority(priority) {
        this._priority = priority;
    }
    get status() {
        return this._status;
    }
    set status(status) {
        this._status = status;
    }
}
const classList = [];
for (let i = 0; i < list.length; i++) {
    let newTask = new Task(list[i].name, list[i].state, list[i].priority, list[i].description);
    classList.push(newTask);
}
function orderList() {
    for (let i = 0; i < classList.length; i++) {
        for (let j = 0; j < classList.length; j++) {
            if (classList[i].priority < classList[j].priority) {
                let aux = classList[i];
                classList[i] = classList[j];
                classList[j] = aux;
            }
        }
    }
}
function addAllStatedLists() {
    addToStatedList("created");
    addToStatedList("doing");
    addToStatedList("done");
    addToStatedList("deleted");
}
function mostrarTodasLasListas() {
    orderList();
    mostrarLista();
    addAllStatedLists();
}
function mostrarLista() {
    let cadena = "";
    for (let i = 0; i < classList.length; i++) {
        cadena += "<div class='col-lg-4 tareaListaPrincipal'>"
            + "<ul>"
            + "<li><h3>" + classList[i].name + "</h3></li>"
            + "<li>" + classList[i].description + "</li>"
            + "<li>Prioridad: " + classList[i].priority;
        if (classList[i].priority === 1) {
            cadena += "&nbsp;<button onclick='lessPriority(`" + classList[i].name + "`)'>&#x2193;</button>";
        }
        else if (classList[i].priority === 4) {
            cadena += "&nbsp;<button onclick='morePriority(`" + classList[i].name + "`)'>&#x2191;</button>";
        }
        else {
            cadena += "&nbsp;<button onclick='morePriority(`" + classList[i].name + "`)'>&#x2191;</button> <button onclick='lessPriority(`" + list[i].name + "`)'>&#x2193;</button>";
        }
        cadena += "</li>"
            + "<li>Estado: " + classList[i].status + "</li>"
            + "</ul>"
            + "</div>";
    }
    document.getElementById("listaPrincipal").innerHTML = cadena;
}
function addToStatedList(state) {
    let cadena = '';
    for (let i = 0; i < list.length; i++) {
        if (classList[i].status === state) {
            cadena += "<div draggable='true' ondragstart='drag(event)' class='row tarea' id='" + classList[i].name + "'>"
                + "<div class='col-lg-7'>"
                + "<h5>" + classList[i].name + "</h5>"
                + "<div class='statedList'>"
                + "<span>" + classList[i].description + "</span><br>";
            if (classList[i].priority === 1) {
                cadena += "<span>Prioridad: " + classList[i].priority + "&nbsp;<button onclick='lessPriority(`" + classList[i].name + "`)'>&#x2193;</button></span><br>";
            }
            else if (classList[i].priority === 4) {
                cadena += "<span>Prioridad: " + classList[i].priority + "&nbsp;<button onclick='morePriority(`" + classList[i].name + "`)'>&#x2191;</button></span><br>";
            }
            else {
                cadena += "<span>Prioridad: " + classList[i].priority + "&nbsp;<button onclick='morePriority(`" + classList[i].name + "`)'>&#x2191;</button> <button onclick='lessPriority(`" + classList[i].name + "`)'>&#x2193;</button></span><br>";
            }
            cadena += "<span>Estado: " + classList[i].status + "</span>"
                + "</div>"
                + "</div>"
                + "<div class='col-lg-5'>";
            if (classList[i].status !== "deleted") {
                cadena += "<label id='etiqueta' for='" + classList[i].name + "'>Nuevo estado: &nbsp;&nbsp;</label>"
                    + "<select id='" + classList[i].name + "'>";
                if (classList[i].status === 'created') {
                    cadena += "<option value='created' selected>Created</option>"
                        + "<option value='doing'>Doing</option>"
                        + "<option value='done'>Done</option>";
                }
                else if (classList[i].status === 'doing') {
                    cadena += "<option value='created'>Created</option>"
                        + "<option value='doing' selected>Doing</option>"
                        + "<option value='done'>Done</option>";
                }
                else if (classList[i].status === 'done') {
                    cadena += "<option value='created'>Created</option>"
                        + "<option value='doing'>Doing</option>"
                        + "<option value='done' selected>Done</option>";
                }
                cadena += "</select><br>"
                    + "<button onclick='updateState(`" + classList[i].name + "`)' class='btn btn-primary botonTareaEstado'>Actualizar</button><br>";
            }
            cadena += "<button class='btn btn-danger botonTareaEliminar' onclick='deleteTask(`" + classList[i].name + "`)'>&#128465;</button>"
                + "</div>"
                + "</div><br>";
        }
    }
    let sitio = document.getElementById(state);
    sitio.innerHTML = cadena;
}
function addTask() {
    let nombre = document.getElementById("nombre").value;
    let descripcion = document.getElementById("descripcion").value;
    let prioridad = document.getElementById("prioridad").value;
    let estado = document.getElementById("estado").value;
    let valido = true;
    for (let i = 0; i < classList.length; i++) {
        if (classList[i].name === nombre) {
            valido = false;
        }
    }
    if (valido) {
        let nuevaTarea = {
            name: nombre,
            description: descripcion,
            priority: prioridad,
            state: estado
        };
        let task = new Task(nombre, estado, prioridad, descripcion);
        classList.push(task);
        document.getElementById("alerta").style.display = "none";
    }
    else {
        document.getElementById("alerta").style.display = "block";
    }
    mostrarTodasLasListas();
}
function updateState(name) {
    for (let i = 0; i < classList.length; i++) {
        if (name === classList[i].name) {
            let nuevoEstado = document.getElementById(name).value;
            classList[i].status = nuevoEstado;
        }
    }
    mostrarTodasLasListas();
}
function deleteTask(name) {
    let ok = confirm("¿Quiere eliminar la tarea " + name + "?");
    if (ok) {
        for (let i = 0; i < classList.length; i++) {
            if (name === classList[i].name) {
                if (classList[i].status === "deleted") {
                    classList.splice(i, 1);
                }
                else {
                    classList[i].status = "deleted";
                }
            }
        }
    }
    mostrarTodasLasListas();
}
function deleteList(state) {
    let ok = confirm("¿Quiere vaciar la lista " + state + "?");
    if (ok) {
        for (let i = 0; i < classList.length; i++) {
            if (classList[i].status === state) {
                classList[i].status = "deleted";
            }
        }
    }
    mostrarTodasLasListas();
}
function ocultar(state) {
    let contenedor = document.getElementById(state);
    let estilos = window.getComputedStyle(contenedor);
    let display = estilos.getPropertyValue('display');
    if (display === "block") {
        contenedor.style.display = 'none';
    }
    else {
        contenedor.style.display = 'block';
    }
}
function morePriority(name) {
    for (let i = 0; i < classList.length; i++) {
        if (classList[i].name == name) {
            let newPriority = classList[i].priority - 1;
            classList[i].priority = newPriority;
        }
    }
    mostrarTodasLasListas();
}
function lessPriority(name) {
    for (let i = 0; i < classList.length; i++) {
        if (classList[i].name === name) {
            let newPriority = classList[i].priority + 1;
            classList[i].priority = newPriority;
        }
    }
    mostrarTodasLasListas();
}
function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
    ev.preventDefault();
    var tarea = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(tarea));
    let nuevoEstado = document.getElementById(tarea).parentNode.id;
    if (nuevoEstado === 'doingContenedor') {
        nuevoEstado = 'doing';
    }
    else if (nuevoEstado === 'deletedContenedor') {
        nuevoEstado = 'deleted';
    }
    else if (nuevoEstado === 'doneContenedor') {
        nuevoEstado = 'done';
    }
    else if (nuevoEstado === 'createdContenedor') {
        nuevoEstado = 'created';
    }
    for (let i = 0; i < classList.length; i++) {
        if (tarea === classList[i].name) {
            classList[i].status = nuevoEstado;
        }
    }
    mostrarTodasLasListas();
}
mostrarTodasLasListas();
