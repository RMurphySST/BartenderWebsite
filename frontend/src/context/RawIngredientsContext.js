import { createContext, useReducer } from "react";

// Create a context to store the rawingredients data
export const RawIngredientsContext = createContext()

// Create a reducer to update the rawingredients data
export const rawIngredientsReducer = (state, action) => {
    // Check the action type and update the state accordingly
    switch(action.type) {
        // Add a case to handle the SET_RAWINGREDIENTS action
        case 'SET_RAWINGREDIENTS':
            console.log("TEST:", action.payload)
            return {
                //Returns the rawingredients from the action payload
                rawingredients: action.payload
            }
        // Add a case to handle the CREATE_RAWINGREDIENTS action
        case 'CREATE_RAWINGREDIENT':
            return {
                // Add the new rawingredients to the beginning of the rawingredients array
                rawingredients: [action.payload, ...state.rawingredients]
            }
        // Add a case to handle the DELETE_RAWINGREDIENT action
        case 'DELETE_RAWINGREDIENT':
            return {
                // Filter out the rawingredients with the matching ID
                rawingredients: state.rawingredients.filter(rawingredient => rawingredient._id !== action.payload)
            }
        default:
            return state
    }
}

// Create a provider to store the rawingredients data
export const RawIngredientsContextProvider = ({ children}) => {

    // Create a reducer to update the rawingredients data
    const [state, dispatch] = useReducer(rawIngredientsReducer, {
        rawingredients: null,
        error: null
    })

    return(
        <RawIngredientsContext.Provider value={{...state, dispatch}}>
            {children}
        </RawIngredientsContext.Provider>
    )
}