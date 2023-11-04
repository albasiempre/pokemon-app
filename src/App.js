import { useEffect, useState } from 'react';
import './App.css';
import './components/Card/Card.css';
import Card from "./components/Card/Card"
import Navbar from "./components/Navbar/Navbar"

import {getAllPokemon, getPokemon} from './utils/pokemon';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");


  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialURL);
      LoadPokemon(res.results);
      setPrevURL(res.previous);
      setNextURL(res.next);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const LoadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
      let pokemonRecord = getPokemon(pokemon.url);
      return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const handleNextPage = async  () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    await LoadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handlePrevPage = async () => {
    if(!prevURL) return;
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await LoadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };


  return (
    <>
    <Navbar/>
    <div className="App">
      {
        loading ? (
          <div>ロード中、、、、</div>
        ): (
          <>
          <div className="pokemonCardContainer">
          {pokemonData.map((pokemon, i) =>  {
            return <Card key={i} pokemon={pokemon}/>;
          })}
          </div>
          <div className="btn">
            <button onClick={handlePrevPage}>前へ</button>
            <button onClick={handleNextPage}>次へ</button>
          </div>
          </>
        )
      }
    </div>
    </>
  );

}

export default App;
