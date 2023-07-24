import { useState } from "react"

const Cat = () => {

    const [cat, setCat] = useState({name: 'Dexter',year: 5})

    const handleClick = () => {
        //console.log('me diste click')
        //setCat({name: 'Dexter', year: cat.year + 1})

        // uso de spread operator
        // ...cat hace copia del objeto cat para copiar los datos
        // tanto name como year
        // pero year se sobrescribe
        
        setCat({...cat, year: cat.year + 1})

        // otra opcion
        // pasar el objeto con funcion flecha
        // haciendo la misma operacion de copia de objeto y cambio de valor en el year
        //setCat((prev) => ({...prev, year: prev.year + 1}) )
    }

    return (
        <>
        <h2>{cat.name} - {cat.year}</h2>
        <button onClick={handleClick} className="btn btn-dark mb-2">update year</button>
        </>
    )
}

export default Cat