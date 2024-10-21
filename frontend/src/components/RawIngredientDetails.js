import React, { useState } from 'react';
import { useRawIngredientsContext } from '../hooks/useRawIngredientsContext';

const RawIngredientDetails = ({ ingredient }) => {

    // Use the dispatch function from the IngredientsContext
    const { dispatch } = useRawIngredientsContext();

    // State variable to store the error data
    const [error, setError] = useState(null);

    // Function to delete a ingredient
    const handleDelete = async () => {
        
        //For testing, just set error and return
        // Send a DELETE request to the API
        const response = await fetch(`/api/recipes/ingredients/${ingredient._id}`, {
            method: 'DELETE'
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.message || 'An error occurred while deleting the ingredient');
            console.log('Error deleting ingredient:', error);
        }
        if (response.ok) {
            console.log('Ingredient deleted successfully:', json);

            // Dispatch an action to remove the ingredient from the state
            dispatch({ type: 'DELETE_RAWINGREDIENT', payload: ingredient._id });

            //Set the error to null
            setError(null);
        }
    }

    return (
        <div className="ingredient-details">
            <span className="date-added">[{new Date(ingredient.createdAt).toLocaleDateString()}]</span> {/* Date Added Text */}
            <h2>{ingredient.name}</h2>
            <p>Est. ABV: {ingredient.abv}%</p>
            <div className="delete-ingredient-div">
            <button className="material-symbols-outlined" onClick={handleDelete}>delete</button>
            </div>  
            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default RawIngredientDetails;