import { useEffect, useState } from 'react';
import PopUp from './PopUp';

const PokemonCard = ({ chosenPokemon }) => {
  const [pokemon, setPokemon] = useState(null);
  const [isFront, setIsFront] = useState(true);
  const [isPreset, setIsPreset] = useState(false);

  useEffect(() => {
    const getPokemon = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${chosenPokemon}`
      );
      const responseData = await response.json();
      const {
        id,
        name,
        sprites: {
          front_shiny: front,
          back_shiny: back,
          other: {
            dream_world: { front_default: fancy },
          },
        },
      } = responseData;
      setPokemon({
        name: name,
        id: id,
        img: isFront ? front : back,
        fancy: fancy,
      });
    };

    getPokemon();
  }, [chosenPokemon, isFront, isPreset]);
  const showImg = () => {
    setIsPreset(true);
  };
  const handleClick = () => {
    setIsPreset(false);
  };
  return (
    <>
      {pokemon && !isPreset && (
        <div className="card m-auto text-center" style={{ width: '18rem' }}>
          <img
            src={pokemon.img}
            className="card-img-top"
            alt={`${pokemon.name}'s image`}
          />
          <h2 className="card-title text-center">
            {pokemon.name.toUpperCase()}
          </h2>
          <div className="card-body">
            <button
              onClick={() => setIsFront((isFront) => !isFront)}
              className="btn btn-primary me-3 "
            >
              Click
            </button>

            <button className="btn btn-dark me-3 " onClick={showImg}>
              Click{' '}
            </button>
          </div>
        </div>
      )}
      {isPreset && <PopUp pokemon={pokemon} handleClick={handleClick} />}
    </>
  );
};

export default PokemonCard;
