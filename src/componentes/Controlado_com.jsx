import { useState } from 'react'

const Controlado_com = () => { 

    /*const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [state,setState] = useState('pendiente')
    */
    // si tenemos muchos campos en el formulario
    // es mejor tener un objeto useState para incluir todos los campos

   const [todo, setTodo] = useState({
        title:'Todo #01',
        description: 'Descripción #01',
        state: 'pendiente',
        priority: true
   })

   // desestructurando el objeto todo

   const {title, description, state, priority} = todo

    const handleSubmit = (e) => { 
        // e es el evento, que no es necesario enviarlo desde el onSubmit
        e.preventDefault()
        console.log(title, description, state, priority)
    }



    // optimizando onChange

    const handleChange = e => {
        //console.log(e.target.value)
        //console.log(e.target.name)
        
        //setTodo({...todo, priority: e.target.checked})

        /*
        setTodo({
            ...todo,
            [e.target.name] : e.target.type === 'checkbox' ? 
                e.target.checked : 
                e.target.value
        })
        */

        // desestructurando el objeto e.target

        const {name, type, checked, value}= e.target

        setTodo({
            ...todo,
            [name] : type === 'checkbox' ? checked : value
        })

        // no se puede colocar puntos como nombre de propiedad
        // entonces e.target.name se convierte en [e.target.name]

        //los objetos tambien se pueden acceder a traves de corchetes
        // todo.title equivale a todo["title"] *
        //////////////////////////////////////////////////
        // nombre de la propiedad entre parentesis
        //////////////////////////////////////////////////
        // esto por si la propiedad tuviera algun caracter extraño 
        //como guion o punto se interprete correctamente
        /* otro ejemplo: const titulo = "title" 
        todo[titulo]
        donde titulo corresponde a la propiedad "title"
        y se interpreta de manera correcta 
        */


    }

    
    /** value permite asociar cada input
     *  y podemos asignar estados correspondientes
     * 
     */

    return (
       <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Ingrese Todo" 
                className="form-control mb-2"
                name="title"
                value={title}
                onChange={handleChange}
                //onChange={(e) => setTodo({...todo, title: e.target.value})}
                // usamos spread operator
                // ...todo : es una copia de lo que se tenga en el objeto todo, manteniendo los valores de las propiedades
                // title: e.target.value modifica el valor de title con lo que se esta ingresando
                //onChange={(e) => setTitle(e.target.value)}
                //onChange={(e) => console.log(e.target.value)} 
                // target permite capturar input, value captura valor

                //defaultValue="Tarea #01"
            />
             <textarea 
                className="form-control mb-2" 
                placeholder='ingrese descripción' 
                name="description"
                value={description}
                onChange={handleChange}
                //onChange={(e) => setTodo({...todo, description: e.target.value})}
                //onChange={(e) => setDescription(e.target.value)} 
                //defaultValue="descripcion 1"
            />
            <div className='form-check'>
                <input type="checkbox" 
                    name="priority" 
                    className="form-check-input" 
                    id="inputCheck"
                    checked={priority}                    
                    onChange={handleChange}
                    //onChange={ e => setTodo({...todo, priority: e.target.checked})}
            />
            <label htmlFor='inputCheck'>Dar prioridad</label>
            </div>

            <select 
            className="form-select mb-2" 
            name="state"
            value={state}
            onChange={handleChange}
            //onChange={(e) => setTodo({...todo, state: e.target.value})}
            //onChange={(e) => setState(e.target.value)} 
            // defaultValue="completado" 
            >
                <option value="pendiente">Pendiente</option>
                <option value="completado">Completado</option>
            </select>
            <button type="submit" className="btn btn-primary">
                Procesar
            </button>
        </form>
    )
}

export default Controlado_com