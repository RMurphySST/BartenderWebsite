import {useEffect} from 'react';
import { useRawIngredientsContext } from '../hooks/useRawIngredientsContext';

//Components 
import RawIngredientDetails from '../components/RawIngredientDetails';
import RawIngredientForm from '../components/RawIngredientForm';

const RawIngredientsPage = () => {
    // Destructure the ingredients and error from the IngredientsContext
    const { rawingredients, dispatch } = useRawIngredientsContext();

    //useEffect is used to fetch data from the server
    useEffect(() => {
        const fetchIngredients = async () => {
            
            // Fetch the ingredients from the server
            const res = await fetch('/api/recipes/ingredients');
            const json = await res.json();

            // Check if the response is ok and dispatch the data
            if (res.ok) {
                dispatch({type: 'SET_RAWINGREDIENTS', payload: json})
            }
        }

        fetchIngredients()
    }, [])

    return (
        <div className="raw-ingredients">
            <div className="ingredients">
                <h2>Showing All Ingredients: {
                    rawingredients ? rawingredients.length : 0
                } Total</h2>
                {/* Check to make sure ingredients exist before mapping */}
                {rawingredients && rawingredients.map((ingredient) => (
                    <RawIngredientDetails key={ingredient._id} ingredient={ingredient}/>

                ))}
            </div>
            <RawIngredientForm />
        </div>
    );
}

export default RawIngredientsPage;