import React from 'react';
import ReactDOM from 'react-dom';

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
    "armyId": 0,
    "faction": "string",
    "ownerId": 0,
    "contest": true,
    "support": true,
    "assistFaction": "string",
    "target": "TestCountry3",
    "origin": "TestCountry1"
  }
],
            ),
        });
        console.log(response); 
    };

    return (
        <div>
            <button onClick={handleSubmit}>Submit Order</button>
        </div>
    );
};

export default SubmitButton;
