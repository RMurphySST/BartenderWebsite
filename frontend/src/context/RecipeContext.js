import { createContext, useReducer } from "react";

// Create a context to store the recipe data
export const RecipeContext = createContext()

// Create a reducer to update the recipe data
export const recipeReducer = (state, action) => {
    // Check the action type and update the state accordingly
    switch(action.type) {
        // Add a case to handle the SET_RECIPES action
        case 'SET_RECIPES':
            return {
                //Returns the recipes from the action payload
                recipes: action.payload
            }
        // Add a case to handle the CREATE_RECIPE action
        case 'CREATE_RECIPE':
            return {
                // Add the new recipe to the beginning of the recipes array
                recipes: [action.payload, ...state.recipes]
            }
        // Add a case to handle the DELETE_RECIPE action
        case 'DELETE_RECIPE':
            return {
                // Filter out the recipe with the matching ID
                recipes: state.recipes.filter(recipe => recipe._id !== action.payload)
            }
        default:
            return state
    }
}

// Create a provider to store the recipe data
export const RecipeContextProvider = ({ children}) => {

    // Create a reducer to update the recipe data
    const [state, dispatch] = useReducer(recipeReducer, {
        recipes: null,
        error: null
    })

    return(
        <RecipeContext.Provider value={{...state, dispatch}}>
            {children}
        </RecipeContext.Provider>
    )
}