import { useEffect } from 'react';
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
                {/* Check to make sure recipes exist before mapping */}
                {recipes && recipes.map((recipe) => (
                    <RecipeDetails key={recipe._id} recipe={recipe}/>

                ))}
            </div>
            <RecipeForm />
        </div>
    )
    }

export default Home;