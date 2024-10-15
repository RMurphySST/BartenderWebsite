import { createContext, useReducer } from "react";

// Create a context to store the rawingredients data
export const RawIngredientsContext = createContext()

// Create a reducer to update the rawingredients data
export const rawIngredientsReducer = (state, action) => {
    // Check the action type and update the state accordingly
    switch(action.type) {
        // Add a case to handle the SET_RAW_INGREDIENTS action
        case 'SET_RAW_INGREDIENTS':
            return {
                //Returns the rawingredients from the action payload
                raw_ingredients: action.payload
            }
        // Add a case to handle the CREATE_RAW_INGREDIENTS action
        case 'CREATE_RAW_INGREDIENT':
            return {
                // Add the new rawingredients to the beginning of the rawingredients array
                raw_ingredients: [action.payload, ...state.raw_ingredients]
            }
        // Add a case to handle the DELETE_RAW_INGREDIENT action
        case 'DELETE_RAW_INGREDIENT':
            return {
                // Filter out the rawingredients with the matching ID
                raw_ingredients: state.raw_ingredients.filter(raw_ingredient => raw_ingredient._id !== action.payload)
            }
        default:
            return state
    }
}

// Create a provider to store the rawingredients data
export const RawIngredientsContextProvider = ({ children}) => {

    // Create a reducer to update the rawingredients data
    const [state, dispatch] = useReducer(rawIngredientsReducer, {
        raw_ingredients: null,
        error: null
    })

    return(
        <RawIngredientsContext.Provider value={{...state, dispatch}}>
            {children}
        </RawIngredientsContext.Provider>
    )
}