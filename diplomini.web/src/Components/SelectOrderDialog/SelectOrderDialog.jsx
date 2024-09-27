const SelectOrderDialog = (
  {onSelectOption}
) => {
  const players = [{
    id: 1,
    name: "Dödspatrullen",
    color: "red"
  },
  {
    id: 2,
    name: "Bumbibjörnarna",
    color: "green"
  }]

  const options = [
    { Description: 'Move/Attack', Support: null, Color: null },
    ...players.map((player) => ({
      Description: `Support ${player.name}`,
      Support: player.name,
      Color: player.color,
    })),
  ];

  return (
    <>
      <div 
      style={{
        display: 'flex', 
        flexDirection: 'column', 
        maxWidth: '50%', 
        position: 'absolute', 
        top: '50%', 
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        backgroundColor: 'grey',
        opacity: '0.9'}}>
        <h3>Select order</h3>
        {options.map((option) => ( // Use parentheses for clarity
          <button 
          key={option.Description} 
          onClick={() => onSelectOption(option.Support)} 
          style={{
            backgroundColor: option.Color, 
            opacity: '0.9',
            borderRadius: '0'
            }}>
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