const { mongo } = require('mongoose')

const CocktailRecipe = require('../models/RecipeModel').CocktailRecipe
const RawIngredient = require('../models/RecipeModel').RawIngredient

//GET all cocktail recipes
const getAllCocktailRecipes = async (req, res) => {
    try
    {
        //Get the recipes in descending order of creation
        const allCocktailRecipes = await CocktailRecipe.find({}).sort({createdAt: -1})
        res.status(200).json(allCocktailRecipes)
    }
    catch (error)
    {
        res.status(400).json({error: error.message})
    }
}

//GET all raw ingredients
const getAllRawIngredients = async (req, res) => {
    try
    {
        const allRawIngredients = await RawIngredient.find({}).sort({name: 1})
        res.status(200).json(allRawIngredients)
    }
    catch (error)
    {
        res.status(400).json({error: error.message})
    }
}

//GET a single cocktail recipe by id
const getSingleCocktailRecipe = async (req, res) => {
    try
    {
        //Pull the id from the request parameters
        const { id } = req.params

        //Make sure the id is a valid ObjectId (24 characters long)
        if (!mongo.ObjectId.isValid(id))
        {
            return res.status(404).json({error: 'Invalid id, recipe not found'})
        }
        
        //Find the recipe by id
        const singleCocktailRecipe = await CocktailRecipe.findById(id)
        
        //If the recipe is not found, return a 404 error
        if (!singleCocktailRecipe)
        {
            return res.status(404).json({error: 'Recipe not found'})
        }

        //If the recipe is found, return the recipe
        res.status(200).json(singleCocktailRecipe)

    }
    catch (error)
    {
        res.status(400).json({error: error.message})
    }
}

//GET a single raw ingredient by id
const getSingleRawIngredient = async (req, res) => {
    try
    {
        const { id } = req.params

        if (!mongo.ObjectId.isValid(id))
        {
            return res.status(404).json({error: 'Invalid id, ingredient not found'})
        }

        const singleRawIngredient = await RawIngredient.findById(id)

        if (!singleRawIngredient)
        {
            return res.status(404).json({error: 'Ingredient not found'})
        }

        res.status(200).json(singleRawIngredient)
    }
    catch (error)
    {
        res.status(400).json({error: error.message})
    }
}

//POST a new cocktail recipe
const createCocktailRecipe = async (req, res) => {
    const { name, ingredients, description, instructions, source } = req.body

    let emptyFields = []

    //Check for empty fields
    if (!name)
    {
        emptyFields.push('name')
    }
    if (!ingredients)
    {
        emptyFields.push('ingredients')
    }
    if (!description)
    {
        emptyFields.push('description')
    }
    if (!instructions)
    {
        emptyFields.push('instructions')
    }
    if (!source)
    {
        emptyFields.push('source')
    }

    //If there are empty fields, return an error
    if (emptyFields.length > 0)
    {
        //Make the error message inot a string and log it to the console
        console.log(`The following fields are required: ${emptyFields.join(', ')}`)
        return res.status(400).json({error: `The following fields are required: ${emptyFields.join(', ')}`, emptyFields})
    }

    //If there are ingredients, check for empty fields in each ingredient
    ingredients.forEach((ingredient, index) => {
        if (!ingredient.name)
        {
            emptyFields.push(`ingredients[${index}].name`)
        }
        if (!ingredient.amount)
        {
            emptyFields.push(`ingredients[${index}].amount`)
        }
        if (!ingredient.unit)
        {
            emptyFields.push(`ingredients[${index}].unit`)
        }
    })

    //If there are empty fields, return an error
    if (emptyFields.length > 0)
    {
        //Make the error message inot a string and log it to the console
        console.log(`The following fields are required: ${emptyFields.join(', ')}`)
        return res.status(400).json({error: `All ingredient fields are required: ${emptyFields.join(', ')}`, emptyFields})
    }

    //If there are less than 2 ingredients, return an error
    if (ingredients.length < 2)
    {
        return res.status(400).json({error: 'A recipe must have at least 2 ingredients'})
    }

    //Check if the name is not already in use
    const existingRecipe = await CocktailRecipe.findOne({ name })

    if (existingRecipe)
    {
        return res.status(400).json({error: 'Recipe name already exists'})
    }

    // Create a new cocktail recipe
    try
    {
        const newCocktailRecipe = await CocktailRecipe.create({
            name,
            ingredients,
            description,
            instructions,
            source
        })
        res.status(200).json(newCocktailRecipe)
    }
    catch (error)
    {
        res.status(400).json({error: error.message})
    }
}

//Create a new raw ingredient
const addRawIngredient = async (req, res) => {
    try
    {
        const { name } = req.body

        //Make the name field required
        if (!name)
        {
            return res.status(400).json({error: 'Name is required'})
        }

        //Put the name in title case
        name = name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

        //Check if the name is not already in use
        const existingRawIngredient = await RawIngredient.findOne({ name })

        if (existingRawIngredient)
        {
            return res.status(400).json({error: 'Ingredient name already exists'})
        }

        const newRawIngredient = await RawIngredient.create({name})

        res.status(200).json(newRawIngredient)
    }
    catch (error)
    {
        res.status(400).json({error: error.message})
    }
}

//DELETE a cocktail recipe by id
const deleteCocktailRecipe = async (req, res) => {
    try
    {
        const { id } = req.params

        if (!mongo.ObjectId.isValid(id))
        {
            return res.status(404).json({error: 'Invalid id, recipe not found'})
        }

        const deletedRecipe = await CocktailRecipe.findOneAndDelete({_id: id})

        if (!deletedRecipe)
        {
            return res.status(404).json({error: 'Recipe not found'})
        }

        res.status(200).json(deletedRecipe)
    }
    catch (error)
    {
        res.status(400).json({error: error.message})
    }
}

//UPDATE a cocktail recipe by id
const updateCocktailRecipe = async (req, res) => {
    try
    {
        const { id } = req.params

        if (!mongo.ObjectId.isValid(id))
        {
            return res.status(404).json({error: 'Invalid id, recipe not found'})
        }

        //Update whatever fields are in the request body
        const updatedRecipe = await CocktailRecipe.findOneAndUpdate({_id: id},{
            ...req.body
        })

        if (!updatedRecipe)
        {
            return res.status(404).json({error: 'Recipe not found'})
        }

        res.status(200).json(updatedRecipe)
    }
    catch (error)
    {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createCocktailRecipe,
    getAllCocktailRecipes,
    getSingleCocktailRecipe,
    deleteCocktailRecipe,
    updateCocktailRecipe,
    addRawIngredient,
    getAllRawIngredients,
    getSingleRawIngredient
}
