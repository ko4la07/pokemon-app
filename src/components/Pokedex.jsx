import { useEffect, useState} from 'react';
import ModalCard from './ModalCard';
import Pagination from './Pagination';

const Pokedex = () => {

  const initialUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';

  const [dataPokemon, setDataPokemon] = useState([]); 
  const [pokemonToSearch, setPokemonToSearch] = useState();
  const [pokemonResult, setPokemonResult] = useState();
  const [sortPokemon, setSortPokemon] = useState();
  const [info, setInfo] = useState({});
  
  const fetchApi = async (url) => {
    let arrayLinksPokemon = [];
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        arrayLinksPokemon = data.results.map((pokemon) => pokemon.url);
        setInfo({next: data.next, previous: data.previous})
        console.log(data);
      })
      .catch((error) => console.log(error))

    let arrayPokemon = [];
    for (const link of arrayLinksPokemon) {
      let response = await fetch(link);
      response = await response.json();
      arrayPokemon.push(response);
    }
    // console.log(arrayPokemon);
    return arrayPokemon;
  };
  // fetchApi(initialUrl).then((data) => console.log(data));
  // console.log(info);

  // hook de react
  useEffect (() => {
    // fetchApi(initialUrl);
    fetchApi(initialUrl).then((data) => setDataPokemon(data))
  }, [])
  console.log(dataPokemon); // array de pokémon

  const searchingPokemon = (argument) => {
    const arrayNames = dataPokemon.map((pokemon) => pokemon.name);
    // console.log(arrayNames);
    arrayNames.includes(argument) ? setPokemonResult(argument) : setPokemonResult('There are no coincidences');
    document.querySelector('#input-search').value = '';
  };

  const filterData = (data) => {
    if( pokemonResult && pokemonResult !== 'There are no coincidences' ) {
      const arrayFilter = data.filter((pokemon) => pokemon.name === pokemonResult);
      // console.log(arrayFilter);
      return arrayFilter;
    } else if ( sortPokemon === 'all-pokemon' ) {
      const arraySort = data.sort((a,b) => a.id - b.id);
      return arraySort;
    } else if ( sortPokemon === 'decreasing' ) {
      const arraySort = data.sort((a,b) => b.id - a.id);
      return arraySort;
    } else if ( sortPokemon === 'A-Z' ) {
      const arraySortAZ = data.sort((a,b) => a.name.localeCompare(b.name));
      return arraySortAZ;
    } else if ( sortPokemon === 'Z-A' ) {
      const arraySortZA = data.sort((a,b) => b.name.localeCompare(a.name));
      return arraySortZA;
    } else if ( sortPokemon === 'Hp' ) {
      const arraySortHp = data.sort((a,b) => b.stats[0]['base_stat'] - a.stats[0]['base_stat']);
      return arraySortHp;
    } 
    return data;
  };

  const onPrevious = () => {
    fetchApi(info.previous).then((data) => setDataPokemon(data));
  };

  const onNext = () => {
    fetchApi(info.next).then((data) => setDataPokemon(data));
  };

  return (
    <main className="container-pokedex">
      <section>
        <div className ='search-sort'>
          <div>
            <input type="text" placeholder = 'Search by type' onChange = {(e) => setPokemonToSearch((e.target.value).toLowerCase())} id = 'input-search' />
              <button type = 'submit' onClick = {() => searchingPokemon(pokemonToSearch)}>Search</button>
          </div>
          <div>
            <select name="sort-pokemon" id="sort-pokemon" defaultValue = 'default' onChange={(e) => setSortPokemon(e.target.value)}> 
              <option value="default"> Sort the pokemon </option>
              <option value="all-pokemon"> Sort by lower number </option>
              <option value='decreasing'>Sort by top number </option>
              <option value="A-Z">Sort by name to A - Z</option>
              <option value="Z-A">Sort by name to Z -A </option>
              <option value="Hp">Sort by high Hp</option>
            </select>
          </div>
        </div>
      </section>
      <section className="App pokemon-cards">
      <div>
        {
          <strong>{pokemonResult}</strong>
        }
      </div>
      <Pagination prev = {info.previous} next = {info.next} onPrevious = {onPrevious} onNext = {onNext}/>
      <div className = 'container-allPokemon'>
        {
          filterData(dataPokemon).map((pokemon) => {
            return(
              <article key = {pokemon.id} className='card-pokemon'>
                <div className = 'card-number'>N° {pokemon.id}</div> 
                <div className = 'card-img'>
                  <img src = {pokemon.sprites.other['dream_world']['front_default']} alt = 'pokemon'></img>
                </div>
                <div className = 'card-information'>
                  <div className = 'card-name'><strong>{pokemon.name}</strong> <span>{pokemon.stats[0]['base_stat']} Hp</span> </div>
                  <div className = 'card-info'>
                    <div className = 'pokemon-wh'>
                      <p>{pokemon.weight} Kg</p>
                      <span>Weight</span>
                    </div>
                    <div id= 'type-pokemon'>
                      {
                        pokemon.types.map((element, index) => {
                          return (
                            <div key = {index} className = 'each-type'>
                              <img src = {require(`../assets/img/${element.type.name}.png`).default}  alt = 'type' style = {{width:'26px', height:'26px'}} />
                              <span>{element.type.name}</span>
                            </div>
                          )
                        })
                      }
                  </div>
                  </div>
                  <ModalCard data = {pokemon}/>
                </div>
              </article>
            ) 
          })
      }
      </div>
      <Pagination prev = {info.previous} next = {info.next} onPrevious = {onPrevious} onNext = {onNext}/>
      </section>
    </main>
  );
}

export default Pokedex;
