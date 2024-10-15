import { RecipeContext } from '../context/RecipeContext';
import { useContext } from 'react';

export const useRecipesContext = () => {
    const context = useContext(RecipeContext);

    if (!context) {
        throw new Error('useRecipesContext must be used within a RecipesContextProvider');
    }

    return context;
}