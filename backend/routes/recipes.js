const express = require('express')
const{
    createCocktailRecipe,
    getAllCocktailRecipes,
    getSingleCocktailRecipe,
    deleteCocktailRecipe,
    deleteRawIngredient,
    updateCocktailRecipe,
    addRawIngredient,
    getAllRawIngredients,
    getSingleRawIngredient
} = require('../controllers/recipeController')

const router = express.Router()

//POST a raw ingredient
router.post('/ingredients', addRawIngredient)

//GET all raw ingredients
router.get('/ingredients', getAllRawIngredients)

//GET a single raw ingredient
router.get('/ingredients/:id', getSingleRawIngredient)

//GET all cocktail recipes
router.get('/', getAllCocktailRecipes)

//GET a single cocktail recipe
router.get('/:id', getSingleCocktailRecipe)

//POST a new cocktail recipe
router.post('/', createCocktailRecipe)

//DELETE a cocktail recipe
router.delete('/:id', deleteCocktailRecipe)

//DELETE a raw ingredient
router.delete('/ingredients/:id', deleteRawIngredient)

//PATCH a cocktail recipe
router.patch('/:id', updateCocktailRecipe)

module.exports = router