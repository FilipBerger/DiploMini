const SelectOrderTypeDialog = (
  {onSelectOption}
) => {
  const players = [{
    id: 1,
    name: "Dödspatrullen",
    color: "red"
  },
  {
    id: 2,
    name: "Bumbibörnarna",
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

  // const onOrderSelect = (support) => {
  //   handleSelectOption(support); // Call the provided prop if available
  // };

  return (
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
  );
};

export default SelectOrderTypeDialog;