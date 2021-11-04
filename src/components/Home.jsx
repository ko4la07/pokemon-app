import { useEffect, useState} from 'react';
import ModalCard from './ModalCard';

const Home = () => {

  const initialUrl = 'https://pokeapi.co/api/v2/pokemon';

  const [dataPokemon, setDataPokemon] = useState([]); 
  const [pokemonToSearch, setPokemonToSearch] = useState();
  const [pokemonResult, setPokemonResult] = useState();

  
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

  const searchingPokemon = (argument) => {
    const arrayNames = dataPokemon.map((pokemon) => pokemon.name);
    // console.log(arrayNames);
    arrayNames.includes(argument) ? setPokemonResult(argument) : setPokemonResult('There are no coincidences');
    document.querySelector('#input-search').value = '';
  };

  const filterData = (data) => {
    if(pokemonResult && pokemonResult !== 'There are no coincidences') {
      const arrayFilter = data.filter((pokemon) => pokemon.name === pokemonResult);
      // console.log(arrayFilter);
      return arrayFilter;
    }
    return data;
  };

  return (
    <main className="App">
      <div>
      <div>
      <input type="text" placeholder = 'Search by type' onChange = {(e) => setPokemonToSearch((e.target.value).toLowerCase())}id = 'input-search' />
      <button type = 'submit' onClick = {() => searchingPokemon(pokemonToSearch)}>Search</button>
    </div>
    <div>
      {
        <strong>{pokemonResult}</strong>
      }
    </div>
      </div>
      <section className="App pokemon-cards">
      {
        filterData(dataPokemon).map((pokemon) => {
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
      </section>
    </main>
  );
}

export default Home;
