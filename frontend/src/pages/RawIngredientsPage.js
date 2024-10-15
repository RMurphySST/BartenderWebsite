import { useEffect } from 'react';
import { useRawIngredientsContext } from '../hooks/useRawIngredientsContext';

//Components 
import RawIngredientDetails from '../components/RawIngredientDetails';
import RawIngredientForm from '../components/RawIngredientForm';

const RawIngredientsPage = () => {
    // Destructure the ingredients and error from the IngredientsContext
    const { ingredients, dispatch } = useRawIngredientsContext();

    //useEffect is used to fetch data from the server
    useEffect(() => {
        const fetchIngredients = async () => {
            // Fetch the ingredients from the server
            const res = await fetch('/api/ingredients');
            const json = await res.json();
            
            // Check if the response is ok and dispatch the data
            if (res.ok) {
                dispatch({type: 'SET_RAW_INGREDIENTS', payload: json})
            }
        }

        fetchIngredients()

    }, [])

    return (
        <div>Test</div>
        // <div className="rawIngredientsView">
        //     <div className="ingredients">
        //         {/* Check to make sure ingredients exist before mapping */}
        //         {ingredients && ingredients.map((ingredient) => (
        //             <RawIngredientDetails key={ingredient._id} ingredient={ingredient}/>

        //         ))}
        //     </div>
        //     <RawIngredientForm />
        // </div>
    )
    }

export default RawIngredientsPage;