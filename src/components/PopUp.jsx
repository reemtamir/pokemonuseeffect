const PopUp = ({ handleClick, pokemon }) => {
  const { name, fancy } = pokemon;
  return (
    <>
      <div className="move">
        <div className="mb-5 ">
          <h2>{name.toUpperCase()}</h2>
          <img src={fancy} alt={`${name}'image`} />
        </div>
        <button className="btn btn-info" onClick={handleClick}>
          Return
        </button>
      </div>
    </>
  );
};

export default PopUp;
