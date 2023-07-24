import Cat from "./componentes/Cat"
import Formulario from "./componentes/Formulario"
import { useEffect, useState } from 'react'
import Todos from "./componentes/Todos"

const intialStateTodos = JSON.parse(localStorage.getItem('todos')) || []
// se intenta obtener el string 'todos' con las tareas, en caso no hayan tareas se inicializa con un array vacío
// initalState debe estar fuera del componente antes de empezar la lógica de React

//const intialStateTodos = []
  /*
  {
    id: 1,
    title:'Todo #01',
    description: 'Descripción #01',
    state: true,
    priority: true
  },
  {
    id: 2,
    title:'Todo #02',
    description: 'Descripción #02',
    state: false,
    priority: false
  },
  {
    id: 3,
    title:'Todo #03',
    description: 'Descripción #03',
    state: false,
    priority: true
  }*/



const App = () => {

  const [todos,setTodos] = useState(intialStateTodos)

  // hook UseEffect: cada vez que un estado cambie, se ejecute una accion
  // useEffect se ejecuta siempre se ejecuta en el primer renderizado
  // en Main.jsx, React.StrictMode es un componente que realiza validaciones del codigo
  // por eso el useEffect se visualiza dos veces en la consola
  // useEffect(() => {console.log('UseEffect')})
  // en producción esto no ocurre
  // para evitar que se ejecuta el useEffect por cada accion realizada
  // se puede quitar el React.StrictMode
  // para que se ejecute una sola vez agregar los corchetes useEffect( () => {console.log('UseEffect')}, [] )



  useEffect(() => {
    // en esta zona vamos a guardar en el almacenamiento local (localstorage)
    // localstorage solo guarda string

    localStorage.setItem('todos', JSON.stringify(todos)) 
    // JSON.stringify transforma el array de tareas a string en formato json
    // 'todos' se refiere al codigo identificador del string


    //console.log('UseEffect')
  }, [todos]) // indica a useEffect que se ejecute cada vez que cambien las tareas

  const addTodo = todo => {
    setTodos([...todos, todo]) //spread operator
    // '...todos' envia el total de tareas, 
    //'todo' corresponde a una nueva tarea
    // otro forma : setTodo((prev) => [...prev,todo])
  }

  const deleteTodo = id => {
    const newArray = todos.filter(todo => todo.id !== id)
    // filter permite obtener un array de las tareas de manera iterada
    // luego tomamos cada tarea y retiramos la tarea de acuerdo al id enviado

    setTodos(newArray)
  }

  const updateTodo = id => {
    const newArray = todos.map( (todo) => {
      if(todo.id === id){
        todo.state = !todo.state
      }
      return todo
    })
    
    setTodos(newArray)
  }

  const orderTodo = arrayTodos => {
    return arrayTodos.sort((a,b) => {      
      if(a.priority) return -1
      if(b.priority) return 1
      if(a.priority === b.priority) return 0
    })
  }

  return (
    <div className='container mb-2'>
      <h1 className="my-5">Formularios</h1>    
      <Formulario addTodo={addTodo} />
      <Todos todos={orderTodo(todos)} deleteTodo={deleteTodo} updateTodo={updateTodo} />
    </div>
  )
}

export default App
