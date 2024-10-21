import React, { useState } from 'react';
import { useRecipesContext } from '../hooks/useRecipesContext';

const RecipeDetails = ({ recipe }) => {

    // Use the dispatch function from the RecipeContext
    const { dispatch } = useRecipesContext();

    // State variable to store the error data
    const [error, setError] = useState(null);

    // Function to delete a recipe
    const handleDelete = async () => {

        //Alert the user to confirm the deletion
        if (!window.confirm('Are you sure you want to delete this recipe?')) {
            return;
        }
        
        //For testing, just set error and return
        // Send a DELETE request to the API
        const response = await fetch(`/api/recipes/${recipe._id}`, {
            method: 'DELETE'
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.message || 'An error occurred while deleting the recipe');
            console.log('Error deleting recipe:', error);
        }
        if (response.ok) {
            console.log('Recipe deleted successfully:', json);

            // Dispatch an action to remove the recipe from the state
            dispatch({ type: 'DELETE_RECIPE', payload: recipe._id });

            //Set the error to null
            setError(null);
        }
    }


    return (
        <div className="recipe-details">
            <span className="date-added">[{new Date(recipe.createdAt).toLocaleDateString()}]</span> {/* Date Added Text */}
            <h2>{recipe.name}</h2>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.name} - {ingredient.amount} {ingredient.unit} {ingredient.optional ? '(optional)' : ''}</li>
                ))}
            </ul>
            <p><b>Directions:  </b>{recipe.description}</p>
            <p><b>Instructions:  </b>{recipe.instructions}</p>
            <p><b>Source:  </b>{recipe.source}</p>
            <div className="delete-recipe-div">
                <button className="material-symbols-outlined" onClick={handleDelete}>delete</button>
            </div>  
            {error && <div className="error">{error}</div>}
            
        </div>
    )
}

export default RecipeDetails;