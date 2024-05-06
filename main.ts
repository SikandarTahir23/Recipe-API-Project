import axios, { AxiosRequestConfig } from 'axios';
import inquirer from 'inquirer';
import chalk from "chalk"

async function fetchRecipe(query: string) {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe',
    params: { query },
    headers: {
      'X-RapidAPI-Key': 'f02251ccebmshdfad8df46ea52f8p15aaa6jsn132f93690f1c',
      'X-RapidAPI-Host': 'recipe-by-api-ninjas.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
}

async function main() {
  const { query } = await inquirer.prompt([
    {
      type: 'input',
      name: 'query',
      message: chalk.redBright('Enter recipe search query:'),
    },
  ]);

  const recipe = await fetchRecipe(query);
  if (recipe) {
    console.log(recipe);
  } else {
    console.log('Failed to fetch recipe.');
  }
}

main();