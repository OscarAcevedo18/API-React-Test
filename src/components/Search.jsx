import { useState } from "react";
import Swal from "sweetalert2";

// useState es el objeto interno del componente

const Search = ({ info }) => {
  const [filterWarrior, setFilterWarriors] = useState("");
  const [filterSearch, setFilterSearch] = useState([]);

  // se define un nombre de variable que representará el estado que queremos guardar (filterSearch).
  //  luego definimos un nombre de una función que cambiará el estado (setFilterSearch).

  const Character = (e) => {
    e.preventDefault();
    // este if es en caso de que no se ingrese un nombre aparezca un alert avisando el error
    if (filterWarrior === "") {
      Swal.fire({
        title: "Ups!!!",
        text: "Debes Ingresar Un Guerrero",
        imageUrl:
          "https://i.gifer.com/origin/63/63cd3d5e7bc71c7d3abb65d4ce79ed9c.gif",
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: "Custom image",
      });
      return;
    } 
      //  ubicacion para filtrar los personajes 
    const result = info.filter((e) => e.name.toLowerCase().includes(filterWarrior));
    setFilterSearch(result);
    // console.log(filterSearch);
  };

  return (
    <div>
      <div className="container-title" fixed="top">
        <h1 className="title"> API Dragon Ball Super </h1> 
        <div className="container-bar">
          <h3 className="sub">Buscador de Guerreros</h3>
          {/* este es el formulario para buscar el personaje que guste el cliente */}
          <form className="container-bar" onSubmit={Character}>
            <input
            // aca le pasamos el valor al input
              value={filterWarrior}
              className="search"
              // para capturar el evento de que el input fue modificado se utiliza onChange
              // e.target.value Esto nos debería mostrar directamente los caracteres que se están agregando al input del formulario
              onChange={(e) => setFilterWarriors(e.target.value)}
              type="text"
              placeholder="Busca un Guerrero"
            ></input>
              {/* /* Aqui comienza el boton */}
            <button type="submit" className="btn">
              Buscar Guerrero
            </button>
            <a className="dev" href="https://oscaracevedo18.github.io/API-React-Test/">Volver a la lista</a>
              {/* aqui comienza el formulario */}
          </form>
          <div>
            {/* acá comienza el filtro, primero se mostrará un h2 con una frase si el filtro es exitoso */}
            {filterSearch.length > 0 ? <h2 className="ghost">Resultado:</h2> : null}
            {/* desde aquí empezamos a filtrar las card para que al ingresar el nombre aparezca la card seleccionada */}
            {filterSearch.map((e) => (
              <div className="card" key={e.id}>
                <img className="img-card" src={e.imageUrl} alt="" />
                <div className="text-card">
                  <h2>{e.name}</h2>
                  <h4>{e.specie}</h4>
                  <h4>{e.transform}</h4>
                  <h4>{e.role}</h4>
                  <h4>{e.status}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
