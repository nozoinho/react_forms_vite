import { useState } from 'react'
import Swal from 'sweetalert2'

const Formulario = ({addTodo}) => { 

   const [todo, setTodo] = useState({
        title:'Todo #01',
        description: 'Descripción #01',
        state: 'pendiente',
        priority: true
   })

   //const [error,setError] = useState(false)

   const {title, description, state, priority} = todo

   /* 
   const PintarError = () => {
        return(
        <div className='alert alert-danger'>
            Todos los campos son obligatorios
        </div>
        )
    }*/
   
   const handleSubmit = (e) => { 
        // e es el evento, que no es necesario enviarlo desde el onSubmit
        e.preventDefault()
        //setError(false)
    
        //if(!title.trim() || !description.trim()){return  setError(true)} 
        
        if(!title.trim() || !description.trim()){
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Título y descripción obligatorios',
            //footer: '<a href="">Why do I have this issue?</a>'
          })
           // se coloca return para que el codigo no siga ejecutando
          // en caso de error
        }

        addTodo(
            {
                id: Date.now(), // se usa fecha para garantizar la diferencia entre cada tarea ingresada 
                ...todo, // pasamos los datos de la tarea que acabamos de ingresar
                state: state === 'completado' // esto devuelve true o false, sin necesidad de colocar el operador ternario condicion ? true : false
                // modificamos el valor de state ya que en el 
                //esquema principal del array 'todos' el state es booleano
            }
        )

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Todo agregado correctamente',
            showConfirmButton: false,
            timer: 1500 // desaparece en 1.5 segundos
          })

        //console.log(title, description, state, priority)

    }

    // optimizando onChange

    const handleChange = e => {
     
        const {name, type, checked, value}= e.target

        setTodo({
            ...todo,
            [name] : type === 'checkbox' ? checked : value
        })
        
    }
  

    return (
       <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Ingrese Todo" 
                className="form-control mb-2"
                name="title"
                value={title}
                onChange={handleChange}                
            />
             <textarea 
                className="form-control mb-2" 
                placeholder='ingrese descripción' 
                name="description"
                value={description}
                onChange={handleChange}
            />
            <div className='form-check'>
                <input type="checkbox" 
                    name="priority" 
                    className="form-check-input" 
                    id="inputCheck"
                    checked={priority}                    
                    onChange={handleChange}
            />
            <label htmlFor='inputCheck'>Dar prioridad</label>
            </div>

            <select 
            className="form-select mb-2" 
            name="state"
            value={state}
            onChange={handleChange}
            >
                <option value="pendiente">Pendiente</option>
                <option value="completado">Completado</option>
            </select>
            <button type="submit" className="btn btn-primary">
                Agregar Todo
            </button>
            {
               // error && <PintarError />
            }
        </form>
    )
}

export default Formulario