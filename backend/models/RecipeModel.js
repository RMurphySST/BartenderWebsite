const mongoose = require('mongoose')

//Raw Ingredient Schema (used for ingredients list for later) should be defined here as:
// - name: String

const rawIngredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    abv: { type: Number, required: true }
}, { timestamps: true })

//Recipe Ingredient Schema should be defined here as:
// - name: String
// - amount: String
// - unit: String
// - optional: Boolean

const recipeIngredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    unit : { type: String, required: true },
    optional : { type: Boolean, required: true }
})

//Recipe Schema should be defined here as:
// - name: String
// - ingredients: Array of Ingredient Schemas
// - description: String
// - instructions: String
// - source: String

const cocktailRecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: [recipeIngredientSchema],
    description: { type: String, required: true },
    instructions: { type: String, required: true },
    source: { type: String, required: true }
}, { timestamps: true })

//Export the Models
module.exports = {
    RawIngredient: mongoose.model('RawIngredient', rawIngredientSchema),
    CocktailRecipe: mongoose.model('CocktailRecipe', cocktailRecipeSchema)
}