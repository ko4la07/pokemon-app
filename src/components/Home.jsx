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
                        <img src = {require(`../assets/img/${element.type.name}.png`).default}  alt = 'type' style = {{width:'26px', height:'26px'}} />
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
    </div>
  );
}

export default Home;
