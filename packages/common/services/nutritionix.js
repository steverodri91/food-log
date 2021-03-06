import axios from 'axios';
import humps from 'humps';
const BASE_URL = "https://trackapi.nutritionix.com/v2";

const NAT_LANG_FOOD_SEARCH = "/natural/nutrients"; //POST takes body
// const NAT_LANG_EXERCISE_SEARCH = "/natural/exercise"; //POST takes in other metrics along with body
const SEARCH = "/search/instant"; //GET //returns food from search query

// const USER_LOG = "/log/[userId]"; //GET  //gets food log of user
// const FOOD_INFO = "/log/{foodId}/detailed"; //GET  //gets detailed food info
// const BARCODE = "/log/barcode"; //GET  //gets a food by barcode
// const RECIPE = "/recipe";  //GET  //gets list of recipes
// const CUSTOM = "/custom_foods"; //GET  //gets list of custom foods

const APP_ID = process.env.REACT_APP_API_ID;
const APP_KEY = process.env.REACT_APP_API_KEY;
const USER_ID = 0;

//Headers

//Content-Type:application/json, x-app-id: NutritionixAppID, x-app-key: NutritionixAppKey


export async function getNatLangFoodResults(query){
  const resp = await axios({
    method: "post",
    headers: {
      "x-app-id": APP_ID,
      "x-app-key": APP_KEY,
      "x-remote-user-id": USER_ID
    },
    url: BASE_URL + NAT_LANG_FOOD_SEARCH,
    data: {
      query: query
    },
    transformResponse: [
      ...axios.defaults.transformResponse,
      data => humps.camelizeKeys(data)
    ]
  })
  return resp.data.foods
}

export async function getSingleItemResults(query){
  const QUERY = `?query=${query}`;
  const BRANDED = `&branded=true`;
  // const SELF = `&self=true`;
  const DETAILED = `&detailed=true`;
  const resp = await axios({
    method: "get",
    headers: {
      "x-app-id": APP_ID,
      "x-app-key": APP_KEY,
      "x-remote-user-id": USER_ID
    },
    url: BASE_URL + SEARCH + QUERY + DETAILED + BRANDED,
    transformResponse: [
      ...axios.defaults.transformResponse,
      data => humps.camelizeKeys(data)
    ]
  })
  return resp.data
}
