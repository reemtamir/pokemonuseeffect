import { useEffect, useState } from 'react';
import PopUp from './PopUp';

const PokemonCard = ({ chosenPokemon }) => {
  const [pokemon, setPokemon] = useState(null);
  const [isFront, setIsFront] = useState(true);
  const [isPressed, setIsPressed] = useState(false);

  let text = isFront ? 'back' : 'front';
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
            ['official-artwork']: { front_default: fancy },
          },
        },
      } = responseData;
      const {
        ability: { name: effectName, url },
      } = responseData.abilities[0];

      setPokemon({
        name: name,
        id: id,
        img: isFront ? front : back,
        fancy: fancy,
        ability: effectName,
        url: url,
      });
    };

    getPokemon();
  }, [chosenPokemon, isFront, isPressed]);
  const showImg = () => {
    setIsPressed(true);
  };
  const handleClick = () => {
    setIsPressed(false);
  };
  return (
    <>
      {pokemon && !isPressed && (
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
              {text}
            </button>

            <button className="btn btn-dark me-3 " onClick={showImg}>
              Show full image{' '}
            </button>
          </div>
        </div>
      )}
      {isPressed && <PopUp pokemon={pokemon} handleClick={handleClick} />}
    </>
  );
};

export default PokemonCard;
