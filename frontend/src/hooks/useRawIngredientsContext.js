import { RawIngredientsContext } from '../context/RawIngredientsContext';
import { useContext } from 'react';

export const useRawIngredientsContext = () => {
    const context = useContext(RawIngredientsContext);

    if (!context) {
        throw new Error('useRawIngredientsContext must be used within a RawIngredientsContextProvider');
    }

    return context;
}