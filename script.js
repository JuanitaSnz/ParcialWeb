
const mostrarT = document.getElementById("mostrar")
const filtrarCum = document.getElementById("filtrarCumplidas")
const agregarT= document.getElementById("agregarTarea")
const noCumplidasVi=document.getElementById("noCumplidasVigentes");
const cumplidasNoVi= document.getElementById("cumplidasNoVigentes")
const data = {
    "tasks":{
      "one":{
        "task":"Learning Javascript",
        "state":true,
        "end":"2020/10/21"
      },
      "two":{
        "task":"Reader Book Clean Code",
        "state":false,
        "end":"2023/12/31"
      },
      "three":{
        "task":"Running",
        "state":false,
        "end":"2023/06/25"
      },
      "four":{
        "task":"Pass the Evaluation",
        "state":false,
        "end":"2023/11/09"
      },
      "five":{
        "task":"Go to Karaoke",
        "state":true,
        "end":"2022/08/25"
      },
      "six":{
        "task":"Finish watching the serie",
        "state":false,
        "end":"2023/12/31"
      },
      "seven":{
        "task":"Controll Weight",
        "state":false,
        "end":"2020/11/22"
      }
    }
  }
  
  function mostrarTareas(){
    const tareas = document.getElementById("tareas");
    const ul = document.getElementById("lista");
    ul.innerHTML='';

    Object.keys(data.tasks).forEach(key =>{
          const tarea = data.tasks[key];
          const vencida = new Date(tarea.end) < new Date();
          const cumplida = tarea.state;
          const vigente = !cumplida && !vencida;
  
          const estilo = cumplida ? 'cumplida' : (vencida ? 'vencida' : 'vigente');
          const li = document.createElement('li');
          li.className=estilo;

          if(vigente && !cumplida){
            const cambiarEstado = document.createElement('button');
            cambiarEstado.textContent='Cambiar Estado';
            cambiarEstado.addEventListener('click',() =>cambiarEstadoTarea(key));
            li.appendChild(cambiarEstado);
          }

          li.textContent=`Tarea: ${tarea.task}, Estado : ${cumplida ? 'cumplida' : (vencida ? 'vencida' : 'vigente')}, Fecha Fin : ${tarea.end}`
          ul.appendChild(li);
          
      })
  }
  
 function filtrarCumplidas(){
    const tareas = document.getElementById("tareas");
    const ul = document.getElementById("lista");
  
    ul.innerHTML='';
    const tareasCumplidas = Object.keys(data.tasks)
    .map(key => data.tasks[key])
    .filter(tarea => tarea.state);

    tareasCumplidas.forEach(tarea =>{
        const li = document.createElement('li')
        li.className='cumplida';
        li.textContent=`Tarea ${tarea.task}, Estado : cumplida, Fecha Fin : ${tarea.end}`
        ul.appendChild(li);
    })
  }

  function filtrarNocumplidasVigentes(){
    const tareas = document.getElementById("tareas");
    const ul = document.getElementById("lista");
  
    ul.innerHTML='';
    const tareasCumplidas = Object.keys(data.tasks)
    .map(key => data.tasks[key])
    .filter(tarea => !tarea.state && new Date(tarea.end) >= new Date());

    tareasCumplidas.forEach(tarea =>{
        const li = document.createElement('li')
        li.className='vigente';
        li.textContent=`Tarea ${tarea.task}, Estado : Vigente, Fecha Fin : ${tarea.end}`
        ul.appendChild(li);
    })
    
  }

  function filtrarcumplidasNoVigentes(){
    const tareas = document.getElementById("tareas");
    const ul = document.getElementById("lista");
  
    ul.innerHTML='';
    const tareasCumplidas = Object.keys(data.tasks)
    .map(key => data.tasks[key])
    .filter(tarea => tarea.state && new Date(tarea.end) < new Date());

    tareasCumplidas.forEach(tarea =>{
        const li = document.createElement('li')
        li.className='cumplida';
        li.textContent=`Tarea ${tarea.task}, Estado : Vigente, Fecha Fin : ${tarea.end}`
        ul.appendChild(li);
    })
    
  }

  function agregarTarea(){
    const nombreTarea= document.getElementById("nombreTarea").value;
    const estadoTarea= document.getElementById("estadoTarea").value==="true";
    const fechaFin =document.getElementById("fechaFin").value;

    if(!nombreTarea || fechaFin ===""){
        alert('Por favor complete todos los campos')
        return;
    }
    const fechaLimite = new Date(fechaFin);
    const fechaActual = new Date();
    if(fechaLimite <fechaActual){
        alert('La fecha limite debe ser igual o superior a la fecha actual');
        return;
    }

    const numTareas = Object.keys(data.tasks).length
    if(numTareas >= 20){
        alert("Se ha alcanzado el número máximo de actividades")
        return;
    }
    const nuevaTarea ={
        task:nombreTarea,
        state:estadoTarea,
        end:fechaFin
    };

    const nuevaTareaKey =`task${Object.keys(data.tasks).length+1}`;
    data.tasks[nuevaTareaKey]=nuevaTarea;
    document.getElementById("nombreTarea").value="";
    document.getElementById("estadoTarea").value="true";
    document.getElementById("fechaFin").value="";
    mostrarTareas();
  }

  function cambiarEstadoTarea(key) {
    data.tasks[key].state = !data.tasks[key].state;
    mostrarTareas();
}
  mostrarT.addEventListener('click',mostrarTareas);
  filtrarCum.addEventListener('click',filtrarCumplidas); 
  agregarT.addEventListener('click',agregarTarea);
noCumplidasVi.addEventListener('click',filtrarNocumplidasVigentes);
cumplidasNoVi.addEventListener('click',filtrarcumplidasNoVigentes);

    
