import { useEffect, useState } from "react";
import Search from "./Search";

// esta es la const principal que contendrá el array
const MiApi = () => {
  // creamos una nueva const con un useState y dentro un array vacio 
  const [info, setInfo] = useState([]);

  // se define un nombre de variable que representará el estado que queremos guardar (info).
  //  luego definimos un nombre de una función que cambiará el estado (setInfo).

  // Fetch hace un request al endpoint res.json Transforma los resultados para que podamos leerlos fácilmente como un objeto de Javascript.
  // Los métodos fetch y json() devuelven un tipo de dato especial llamado promesa, estas promesas deben resolverse en algún momento pero esto puede demorar, para esperar el
// resultado utilizaremos await. este espera que una promesa se resuelva. Una regla importante es que que await solo puede ser utilizada dentro de una función declarada async.

const character = async () => {
    const url = "https://dragon-ball-super-api.herokuapp.com/api/characters";
    const response = await fetch(url);
    const data = await response.json();

    // en este bloque se seteará setInfo que lleva la const data entre parentesis para luego llamarla directamente por el nombre (info)
    setInfo(data);
  };
// useEffect se llama solo cuando haya un cambio en alguna dependencia, si el arreglo está vacío se está especificando que no depende de nada y
// por lo tanto, solo se llamará a la función al momento del montaje.
  useEffect(() => {
    character();
  }, []); 

  return (
    <div>
      {/* aca nos traemos la const data que ya esta en setInfo por eso la llamamos por el nombre(info) */}
      <Search info={info} />
      <div className="btn-order">
      {/* Este metodo sort se ocupa para ordenar el array, en este caso será alfabeticamente. */}
      <button className="btn-order" onClick={() => {   
                const sortedList = [...info].sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
                setInfo(sortedList)
            }}>Ascendente</button>

            <button className="btn-order" onClick={() => {   
                const sortedList = [...info].sort((a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0))
                setInfo(sortedList)
            }}>Descendente</button>
            </div>
      <div className="container-card">
        {/* desde aqui mostramos la informacion de cada card en el array desde la api */}
        {info.map((e) => (
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
  );
};

export default MiApi;
