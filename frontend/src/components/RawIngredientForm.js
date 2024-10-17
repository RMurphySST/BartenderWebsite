import React, { useState } from 'react';
import { useRawIngredientsContext } from '../hooks/useRawIngredientsContext';

const RawIngredientForm = () => {
    
        // Destructure the dispatch function from the IngredientsContext
        const { dispatch } = useRawIngredientsContext();
    
        // State variables to store the form data
        const [name, setName] = useState('');
        const [abv, setABV] = useState('');
        

        // State variable to store the error data
        const [error, setError] = useState(null);
        const [successfullyAdded, setSuccessfullyAdded] = useState(null);

        // Function to add a ingredient
        const handleAdd = async () => {
            // Create a new ingredient object
            const ingredient = {
                name,
                abv
            }

            // Send a POST request to the API
            const response = await fetch('/api/recipes/ingredients/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ingredient)
            });

            const json = await response.json();

            if(!response.ok) {
                setError("An error occurred while adding the ingredient: " + json.error);
                console.log('Error adding new ingredient:', error);
                setSuccessfullyAdded(null);
            }
            if (response.ok) {
                console.log('New ingredient added successfully: ', json);

                // Dispatch an action to add the ingredient to the state
                dispatch({ type: 'CREATE_RAWINGREDIENT', payload: json });

                //Set the error to null
                setError(null);

                // Set the successfully added message
                setSuccessfullyAdded(json.name);
            }
        }

    return (
        <div className="ingredient-form">
            <h2>Add New Ingredient</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="ABV" value={abv} onChange={(e) => setABV(e.target.value)} />
            <button onClick={handleAdd}>Add</button>
            {error && <div className="error">{error}</div>}
            {successfullyAdded && <div className="success">Successfully added: {name}</div>}
        </div>
    );
}

export default RawIngredientForm;