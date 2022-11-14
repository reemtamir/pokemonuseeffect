import { useState, useEffect } from 'react';

const PopUp = ({ handleClick, pokemon }) => {
  const [abilityDescription, setAbilityDescription] = useState('');
  const { name, fancy, ability, url } = pokemon;
  useEffect(() => {
    const getPokemon = async () => {
      const response = await fetch(url);
      const responseData = await response.json();
      setAbilityDescription(responseData.effect_entries[1].short_effect);
    };

    getPokemon();
  }, [pokemon]);
  return (
    <>
      <div className="m-auto text-center" style={{ width: '35rem' }}>
        <img src={fancy} alt={`${name}'image`} />
        <h2 className="text-info"> {name.toUpperCase()}</h2>

        <p className="text-success fs-4">
          {' '}
          {ability.toUpperCase()}: {abilityDescription}
        </p>

        <div className="card-body">
          <button className="btn btn-info" onClick={handleClick}>
            Return
          </button>
        </div>
      </div>
    </>
  );
};

export default PopUp;
