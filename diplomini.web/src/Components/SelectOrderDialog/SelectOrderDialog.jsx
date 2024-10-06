import colorData from "../../../colorData";

const SelectOrderDialog = (   // Modal window to collect order details from player - Assist/support is not yet implemented
  { onSelectOption, players }
) => {

  const options = [ // Fill out possible orders by looking through players
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
        {/* Buttons for each option */}
        {options.map((option) => (
          <button 
          key={option.Description} 
          onClick={() => onSelectOption(option.Support)} 
          style={{ backgroundColor: option.Color }}>
            <p>{option.Description}</p>
          </button>
        ))}
      </div>
      {/* Background overlay */}
      <div
        onClick={() => onSelectOption(false)} // Click to abort order creation
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