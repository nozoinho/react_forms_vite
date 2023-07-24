import { useState } from 'react'

const Controlado = () => { 

   const [todo, setTodo] = useState({
        title:'Todo #01',
        description: 'Descripción #01',
        state: 'pendiente',
        priority: true
   })

   const [error,setError] = useState(false)

   const {title, description, state, priority} = todo

    
   const PintarError = () => {
        return(
        <div className='alert alert-danger'>
            Todos los campos son obligatorios
        </div>
        )
    }
   
   const handleSubmit = (e) => { 
        // e es el evento, que no es necesario enviarlo desde el onSubmit
        e.preventDefault()
        setError(false)
    
        if(!title.trim() || !description.trim()){return  setError(true)} 
        
        console.log(title, description, state, priority)

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
                Procesar
            </button>
            {
                error && <PintarError />
            }
        </form>
    )
}

export default Controlado