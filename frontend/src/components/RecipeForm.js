import React, { useState } from 'react';
import { useRecipesContext } from '../hooks/useRecipesContext';

const RecipeForm = () => {

    // Destructure the dispatch function from the RecipeContext
    const { dispatch } = useRecipesContext();

    // State variables to store the form data
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', amount: '', unit: '', optional: false }]);
    const [instructions, setInstructions] = useState('');
    const [source, setSource] = useState('');
    const [error, setError] = useState(null);
    const [successfullyAdded, setSuccessfullyAdded] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a new recipe object
        const recipe = {
            name,
            description,
            ingredients,
            instructions,
            source
        }

        // Send a POST request to the API
        const response = await fetch('/api/recipes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe)
        });

        const json = await response.json();

        if(!response.ok) {
            setSuccessfullyAdded(null);
            setError(json.error);
            setEmptyFields(json.emptyFields);
            console.log('Error adding new recipe:', error);
        }
        if (response.ok) {
            //Set error to null and make the emptyFields array empty
            setError(null);
            setEmptyFields([]);

            console.log('New recipe added successfully: ', json);

            //Reset the form
            setName('');
            setDescription('');
            setIngredients([{ name: '', amount: '', unit: '', optional: false }]);
            setInstructions('');
            setSource('');

            //Set successfullyAdded to true
            setSuccessfullyAdded("Successfully Added: " + json.name);

            //Dispatch the CREATE_RECIPE action
            dispatch({ type: 'CREATE_RECIPE', payload: json });
        }
    }

    // Function to handle changes in the ingredients array
    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    };

    // Function to add a new ingredient to the ingredients array
    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', amount: '', unit: '', optional: false }]);
    };


    return (
        <form className="create-recipe" onSubmit={handleSubmit}>
            <h2>Add a New Recipe</h2>

            <label>Name:</label>
            <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className= {emptyFields.includes('name') ? 'empty-field' : ''}

            />

            <label>Description:</label>
            <input 
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className= {emptyFields.includes('description') ? 'empty-field' : ''}
            />

            <label>Instructions:</label>
            <input 
                type="text"
                onChange={(e) => setInstructions(e.target.value)}
                value={instructions}
                className= {emptyFields.includes('instructions') ? 'empty-field' : ''}
            />

            <label>Source:</label>
            <input 
                type="text"
                onChange={(e) => setSource(e.target.value)}
                value={source}
                className= {emptyFields.includes('source') ? 'empty-field' : ''}
            />

            <label>Ingredients:</label>
            <div className="ingredients-container">
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-row">
                        <input
                            type="text"
                            className="ingredient-input"
                            value={ingredient.name}
                            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                            placeholder="Name"
                        />
                        <input
                            type="number"
                            className="ingredient-input"
                            value={ingredient.amount}
                            onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                            placeholder="Amount"
                        />
                        <input
                            type="text"
                            className="ingredient-input"
                            value={ingredient.unit}
                            onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                            placeholder="Unit"
                        />
                        <div className="optional-container">
                            <input
                                type="checkbox"
                                checked={ingredient.optional}
                                onChange={(e) => handleIngredientChange(index, 'optional', e.target.checked)}
                            />
                            <label className='optional-label'>Optional</label>
                        </div>
                    </div>
                ))}
            </div>

            <button type="button" onClick={addIngredient}>+ Add Ingredient</button>
            <br />
            <br />

            <button type="submit">Add Recipe</button>
            
            {error && <div className="error">{error}</div>}
            {successfullyAdded && <div className="success-add">{successfullyAdded}</div>}

        </form>

    );
}

export default RecipeForm;