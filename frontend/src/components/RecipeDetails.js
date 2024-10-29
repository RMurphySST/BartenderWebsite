import React, { useState } from 'react';
import { useRecipesContext } from '../hooks/useRecipesContext';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid2';


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
        <Card
            style = {{
                background: "#fff",
                borderRadius: "4px",
                margin: "20px auto",
                padding: "10px",
                position: "relative",
                boxShadow: "2px 2px 5px rgba(0,0,0,0.3)"}}
            sx = {{margin: "5em", padding:"1em"}}
            variant="outlined"
        >
            <span className="date-added">[{new Date(recipe.createdAt).toLocaleDateString()}]</span> {/* Date Added Text */}
            <Typography variant="h3" align="center">{recipe.name}</Typography>
            <Typography variant="caption" align="center" sx={{ display: 'block' }}>
            {recipe.description}
            </Typography>
            <Divider />
            <Grid container spacing={2} columns={16}>
                <Grid size={8}>
                    <Typography variant="h6">
                        Ingredients
                    </Typography>
                    <List sx={{ padding: 0}}>
                    {recipe.ingredients.map((ingredient, index) => (
                        <ListItem key={index} sx={{ p: 0, ml: 2}} >
                            <ListItemText
                            sx={{mt:0}}
                            primary={ingredient.name}
                            secondary={`${ingredient.amount} ${ingredient.unit} ${ingredient.optional ? "(optional)" : ""}`}
                            />
                    </ListItem>
                    ))}
                </List></Grid>
                <Grid size={8}>
                    <Typography variant="h6">
                        Instructions
                    </Typography>
                    <Typography variant="body1">
                        {recipe.instructions}
                    </Typography>
                </Grid>
            </Grid>
            
            <div className="delete-recipe-div">
                <button className="delete-recipe-button" onClick={handleDelete}>Delete</button>
            </div>  
            {error && <div className="error">{error}</div>}
            <Typography variant="caption" align="center" sx={{ display: 'block' }}>
                Source: {recipe.source}
            </Typography>
            
        {/* </div> */}
        </Card>
    )
}

export default RecipeDetails;