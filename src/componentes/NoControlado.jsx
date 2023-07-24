import { useRef, useState } from 'react'

const NoControlado = () => { 

    // formularios

    /** dos opciones
     *  1) colocar a cada input un id y acceder a su valor a traves del value
     *  2) form data : hace recorrido por todos los datos y capturar sus valores correspondientes, tambien se puede hacer el envio del form data
     * para esta tecnica, se debe colocar la etiqueta name a cada variable
    */


    /**
     * React gestiona un virtual DOM de manera paralela
     * para compararlo con el DOM real (id="form")
     *  para ello son las referencias
     * con el hook useRef
     * 
     * 
     */
    
    /**hook useRef
     * referencias
     * permite hacer refencia al DOM 
     * para capturar elementos del DOM de forma manual
     */

    // const form = document.querySelector('#form')
    // va de la mano con el id="form"
    // se usa el DOM real
    
    const form = useRef(null)
    const [error, setError] =useState('')

    // usamos el virtual DOM de React
    // se inicializa en null porque aun no ha renderizado el formulario
    // por lo que no se debe colocar la variable "form"
    // proveniente del ref={form} 

    const handleSubmit = (e) => { 
        // e es el evento, que no es necesario enviarlo desde el onSubmit
        e.preventDefault()
        setError("")
        //console.log("me diste click") // prueba click
        //console.log(form.current) // contiene el formulario


        //console.log(new FormData(form.current)) // 
        // propiedad entries (entradas) es lo que nos interesa
        // debemos recorrer cada parte del formulario
        // para ello usamos el spread operator
        // spread operator: permite a un elemento iterable ser expandido

        // tener en cuenta los valores de name en cada parte del formulario

        const data = new FormData(form.current)
        console.log([...data.entries()]) // esto hace que lo que se encuentre dentro de entries sea un iterable
        // un array de arrays con cada name y value del formulario

        // mas cómodo es pasar todo a objeto en lugar de arrays
        
        //const dataObject = Object.fromEntries([...data.entries()])
        //console.log(dataObject)

        /** Object.fromEntries
         * saca cada uno de los elementos, los transforma en propiedad y
         * el valor lo pasa como valor
         * 
         * {title: 'Tarea #01', decription: 'descripcion 1', state: 'completado'}
         */

        // tambien se puede realizar la desestructuracion de dataObject

        const {title,description,state} = Object.fromEntries([...data.entries()])

        //console.log(title,description,state)

        // validar datos

        //console.log(!title.trim())

        // (title.trim() === "")
        if(!title.trim() || !description.trim() || !state.trim()) return setError("Llena todos los campos")
    
        // enviar datos

        console.log(title,description,state)

    }

    // este manejador de evento evita que el navegador 
    // haga el comportamiento por defecto,
    // es decir, enviar los datos del formulario a traves de search
    // tambien utiliza el metodo get implicitamente

    // forma tradicional
    /*document.addEventListener('submit', (evento) => {
        evento.preventDefault() 
    })*/


    // React puede pasar el evento sin que tengamos que indicarselo
    // entonces esta linea
    // <form onSubmit={(e) => handleSubmit(e)}>
    // es igual a 
    // <form onSubmit={handleSubmit}>

    return (
       // <form onSubmit={(e) => handleSubmit(e)}>
       // <form onSubmit={handleSubmit} id="form"}>
       <form onSubmit={handleSubmit} ref={form}>
            <input 
                type="text" 
                placeholder="Ingrese Todo" 
                className="form-control mb-2"
                name="title"
                defaultValue="Tarea #01"
            />
             <textarea 
                className="form-control mb-2" 
                placeholder='ingrese descripción' 
                name="description"
                defaultValue="descripcion 1"
            />
            <select 
            className="form-select mb-2" 
            name="state"
            defaultValue="completado" 
            >
                <option value="pendiente">Pendiente</option>
                <option value="completado">Completado</option>
            </select>
            <button type="submit" className="btn btn-primary">
                Procesar
            </button>
            {error !== '' && error}
        </form>
    )
}

export default NoControlado