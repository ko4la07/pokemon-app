import { useEffect, useState} from 'react';
import ModalCard from './ModalCard';

const Home = () => {

  const initialUrl = 'https://pokeapi.co/api/v2/pokemon';

  const [dataPokemon, setDataPokemon] = useState([]); 

  
  const fetchApi = async (url) => {
    let arrayPokemon = [];
    for (let i = 1; i < 152; i++) {
      let response = await fetch(`${url}/${i}`);
      response = await response.json();
      arrayPokemon.push(response);
    }
    return arrayPokemon;
  };
  // fetchApi(initialUrl).then((data) => console.log(data));

  // hook de react
  useEffect (() => {
    fetchApi(initialUrl).then((data) => setDataPokemon(data))
  }, [])
  // console.log(dataPokemon); // array de pokémon

  const pathTypes = (type) => {
    const pathImage = `../assets/img/${type}.png`;
    return pathImage;
  };

  return (
    <div className="App">
      {
        dataPokemon.map((pokemon) => {
          return(
            <article key = {pokemon.id}>
              <img src = {pokemon.sprites.other['dream_world']['front_default']} alt = 'pokemon'></img>
              <div> <strong>{pokemon.name}</strong> {pokemon.stats[0]['base_stat']} Hp </div>
              <div>
                <p>{pokemon.weight}</p>
                <span>Peso</span>
              </div>
              <div>
                {
                  pokemon.types.map((element, index) => {
                    return (
                      <div key = {index}>
                        <img src = {pathTypes(element.type.name)}  alt = 'type' />
                        <span>{element.type.name}</span>
                      </div>
                    )
                  })
                }
              </div>
              <ModalCard data = {pokemon}/>
            </article>
          ) 
        })
      }
      {/* <img src = {image} alt = 'pokemon'></img> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default Home;
