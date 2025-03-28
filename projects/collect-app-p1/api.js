// api.js

// Replace with your actual API token
const API_TOKEN = '2376|DZbY784njh70piCtgAISKv0i6XQcypU6rVlhUok8';
const BASE_URL = 'https://restfulcountries.com/api/v1';

/**
 * Generic function to make a GET request to the API.
 * @param {string} url - The full URL for the API call.
 */
function apiGet(url) {
  return fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
      return response.json();
    });
}

/**
 * Retrieve a list of countries matching the given name.
 * (Note: For partial search, we are preloading all countries.)
 * @param {string} name - The country name or partial name.
 */
function getCountryByName(name) {
  const url = `${BASE_URL}/countries/${encodeURIComponent(name)}`;
  return apiGet(url);
}

/**
 * Retrieve all countries (paginated).
 * @param {number} perPage - Number of countries per page.
 */
function getAllCountries(perPage = 100) {
  const url = `${BASE_URL}/countries?per_page=${perPage}`;
  return apiGet(url);
}

/**
 * Retrieve countries by continent.
 * @param {string} continent - The continent to filter by.
 * @param {number} perPage - Number of countries per page.
 */
function getCountriesByContinent(continent, perPage = 100) {
  const url = `${BASE_URL}/countries?continent=${encodeURIComponent(continent)}&per_page=${perPage}`;
  return apiGet(url);
}

/**
 * Retrieve countries by population range.
 * @param {number} min - Minimum population.
 * @param {number} max - Maximum population.
 * @param {number} perPage - Number of countries per page.
 */
function getCountriesByPopulation(min, max, perPage = 100) {
  const url = `${BASE_URL}/countries?population_from=${min}&population_to=${max}&per_page=${perPage}`;
  return apiGet(url);
}

/**
 * Retrieve countries by size range.
 * @param {number} min - Minimum size.
 * @param {number} max - Maximum size.
 * @param {number} perPage - Number of countries per page.
 */
function getCountriesBySize(min, max, perPage = 100) {
  const url = `${BASE_URL}/countries?size_from=${min}&size_to=${max}&per_page=${perPage}`;
  return apiGet(url);
}

/**
 * Retrieve country by ISO2 code.
 * @param {string} iso2 - The ISO2 code of the country.
 */
function getCountryByISO2(iso2) {
  const url = `${BASE_URL}/countries?iso2=${encodeURIComponent(iso2)}`;
  return apiGet(url);
}

/**
 * Retrieve country by ISO3 code.
 * @param {string} iso3 - The ISO3 code of the country.
 */
function getCountryByISO3(iso3) {
  const url = `${BASE_URL}/countries?iso3=${encodeURIComponent(iso3)}`;
  return apiGet(url);
}
