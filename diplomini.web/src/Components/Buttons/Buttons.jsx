const SubmitButton = () => {
    const handleSubmit = async () => {
        const response = await fetch('https://localhost:7026/PostOrders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
            [
  {
    "armyId": 1,
    "faction": "string",
    "ownerId": 1,
    "contest": true,
    "support": true,
    "assistFaction": "string",
    "target": "CountryA",
    "origin": "CountryB"
  }
],
            ),
        });
        //console.log(response); 
    };

    return (
        <div>
            <button onClick={handleSubmit}>Submit Order</button>
        </div>
    );
};

export default SubmitButton;
