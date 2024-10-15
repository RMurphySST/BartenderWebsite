const mongoose = require('mongoose')

//Raw Ingredient Schema (used for ingredients list for later) should be defined here as:
// - name: String

const rawIngredientSchema = new mongoose.Schema({
    name: { type: String, required: true }
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


// {
//     "name": "Margarita",
//     "ingredients": [
//         {
//             "name": "Tequila",
//             "amount": 2,
//             "unit": "oz",
//             "optional": false
//         },
//         {
//             "name": "Lime Juice",
//             "amount": 1,
//             "unit": "oz",
//             "optional": false
//         },
//         {
//             "name": "Triple Sec",
//             "amount": 1,
//             "unit": "oz",
//             "optional": false
//         },
//         {
//             "name": "Salt",
//             "amount": 1,
//             "unit": "dash",
//             "optional": true
//         }
//     ],
//     "description": "A classic tequila cocktail",
//     "instructions": "Shake all ingredients with ice and strain into a glass",
//     "source": "https://www.liquor.com/recipes/margarita/"
// }

//Do one for an old fashioned
// {
//     "name": "Old Fashioned",
//     "ingredients": [
//         {
//             "name": "Bourbon",
//             "amount": 2,
//             "unit": "oz",
//             "optional": false
//         },
//         {
//             "name": "Simple Syrup",
//             "amount": 0.5,
//             "unit": "oz",
//             "optional": false
//         },
//         {
//             "name": "Angostura Bitters",
//             "amount": 2,
//             "unit": "dashes",
//             "optional": false
//         },
//         {
//             "name": "Orange Peel",
//             "amount": 1,
//             "unit": "twist",
//             "optional": true
//         }
//     ],
//     "description": "A classic bourbon cocktail",
//     "instructions": "Stir all ingredients with ice and strain into a glass",
//     "source": "https://www.liquor.com/recipes/old-fashioned/"
// }

//Do one for a mojito
// {
//     "name": "Mojito",
//     "ingredients": [
//         {
//             "name": "White Rum",
//             "amount": 2,
//             "unit": "oz",
//             "optional": false
//         },
//         {
//             "name": "Lime Juice",
//             "amount": 1,
//             "unit": "oz",
//             "optional": false
//         },
//         {
//             "name": "Simple Syrup",
//             "amount": 0.5,
//             "unit": "oz",
//             "optional": false
//         },
//         {
//             "name": "Mint Leaves",
//             "amount": 6,
//             "unit": "leaves",
//             "optional": false
//         },
//         {
//             "name": "Soda Water",
//             "amount": 1,
//             "unit": "oz",
//             "optional": false
//         }
//     ],
//     "description": "A classic rum cocktail",
//     "instructions": "Muddle mint leaves with simple syrup and lime juice, add rum and ice, top with soda water",
//     "source": "https://www.liquor.com/recipes/mojito/"
// }
