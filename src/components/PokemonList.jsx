import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [chosenPokemon, setChosenPokemon] = useState('');
  useEffect(() => {
    const getPokemonName = async () => {
      const response = await fetch(
        ' https://pokeapi.co/api/v2/pokemon/?limit=1154'
      );
      const responseData = await response.json();

      setPokemonList(responseData.results.map((result) => result.name).sort());
    };
    getPokemonName();
  }, []);

  return (
    <>
      <div className="m-auto text-center 2 form-select">
        <select
          className="mb-4"
          onChange={(e) => {
            setChosenPokemon(e.target.value);
          }}
          value={chosenPokemon}
        >
          {' '}
          <option>Chose Pokemon</option>
          {pokemonList.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {chosenPokemon && <PokemonCard chosenPokemon={chosenPokemon} />}
      </div>
    </>
  );
};
export default PokemonList;
