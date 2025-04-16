// api.js

// API token for authentication (replace with your actual token)
const API_TOKEN = '2376|DZbY784njh70piCtgAISKv0i6XQcypU6rVlhUok8';
const BASE_URL = 'https://restfulcountries.com/api/v1';

/**
 * Makes a GET request to the API.
 * @param {string} url - Full API endpoint URL.
 * @returns {Promise<Object>} - Parsed JSON response.
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
 * Fetches a country by name (exact or partial match).
 * @param {string} name - Country name or partial name.
 */
function getCountryByName(name) {
    const url = `${BASE_URL}/countries/${encodeURIComponent(name)}`;
    return apiGet(url);
}

/**
 * Fetches all countries with optional pagination.
 * @param {number} perPage - Number of results per page (default: 100).
 */
function getAllCountries(perPage = 100) {
    const url = `${BASE_URL}/countries?per_page=${perPage}`;
    return apiGet(url);
}

/**
 * Fetches countries filtered by continent.
 * @param {string} continent - Continent name.
 * @param {number} perPage - Number of results per page (default: 100).
 */
function getCountriesByContinent(continent, perPage = 100) {
    const url = `${BASE_URL}/countries?continent=${encodeURIComponent(continent)}&per_page=${perPage}`;
    return apiGet(url);
}

/**
 * Fetches countries within a population range.
 * @param {number} min - Minimum population.
 * @param {number} max - Maximum population.
 * @param {number} perPage - Number of results per page (default: 100).
 */
function getCountriesByPopulation(min, max, perPage = 100) {
    const url = `${BASE_URL}/countries?population_from=${min}&population_to=${max}&per_page=${perPage}`;
    return apiGet(url);
}

/**
 * Fetches countries within a size range (area in km²).
 * @param {number} min - Minimum size.
 * @param {number} max - Maximum size.
 * @param {number} perPage - Number of results per page (default: 100).
 */
function getCountriesBySize(min, max, perPage = 100) {
    const url = `${BASE_URL}/countries?size_from=${min}&size_to=${max}&per_page=${perPage}`;
    return apiGet(url);
}

/**
 * Fetches a country by its ISO2 code.
 * @param {string} iso2 - ISO2 country code (e.g., "US").
 */
function getCountryByISO2(iso2) {
    const url = `${BASE_URL}/countries?iso2=${encodeURIComponent(iso2)}`;
    return apiGet(url);
}

/**
 * Fetches a country by its ISO3 code.
 * @param {string} iso3 - ISO3 country code (e.g., "USA").
 */
function getCountryByISO3(iso3) {
    const url = `${BASE_URL}/countries?iso3=${encodeURIComponent(iso3)}`;
    return apiGet(url);
}
