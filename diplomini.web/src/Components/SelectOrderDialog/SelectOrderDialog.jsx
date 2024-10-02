import colorData from "../../../colorData";

const SelectOrderDialog = (
  { onSelectOption, players }
) => {

  const options = [
    { Description: 'Move/Attack', Support: null, Color: null },
    ...players.map((player) => ({
      Description: `Support ${player.factionName}`,
      Support: player.factionName,
      Color: colorData[player.color].CountryBase,
    })),
  ];

  return (
    <>
      <div 
        className="select-order-dialog">
        <h3>Select order</h3>
        {options.map((option) => (
          <button 
          key={option.Description} 
          onClick={() => onSelectOption(option.Support)} 
          style={{ backgroundColor: option.Color }}>
            <p>{option.Description}</p>
          </button>
        ))}
      </div>
      <div
        onClick={() => onSelectOption(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'black',
          opacity: '0.3',
          zIndex: 999
        }}
      />
    </>
  );
};

export default SelectOrderDialog;