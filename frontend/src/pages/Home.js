import {useEffect} from 'react';
import { useRecipesContext } from '../hooks/useRecipesContext';

// Components
import RecipeDetails from '../components/RecipeDetails';
import RecipeForm from '../components/RecipeForm';


const Home = () => {
    // Destructure the recipes and error from the RecipeContext
    const { recipes, dispatch } = useRecipesContext();

    //useEffect is used to fetch data from the server
    useEffect(() => {
        const fetchRecipes = async () => {
            // Fetch the recipes from the server
            const res = await fetch('/api/recipes');
            const json = await res.json();
            
            // Check if the response is ok and dispatch the data
            if (res.ok) {
                dispatch({type: 'SET_RECIPES', payload: json})
            }
        }

        fetchRecipes()

    }, [])


    return (
        <div className="home">
            <div className="recipes">
                <h2>Showing All Recipes: {
                    recipes ? recipes.length : 0
                } Total</h2>
                {/* Check to make sure recipes exist before mapping */}
                {recipes && recipes.map((recipe) => (
                    <RecipeDetails key={recipe._id} recipe={recipe}/>

                ))}
                {/* If there are no recipes, display a message */}
                {/* {!recipes && <div className='error'>No Recipes Found, Check Backend Active</div>} */}
            </div>
            <RecipeForm />
        </div>
    )
    }

export default Home;