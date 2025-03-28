// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const searchInput = document.getElementById('searchInput');
    const resultsList = document.getElementById('resultsList');
    const detailsSection = document.getElementById('details-section');
    const detailsContent = document.getElementById('detailsContent');
    const closeDetails = document.getElementById('closeDetails');
  
    let allCountries = []; // Store all country data
    let searchTimeout = null; // Timeout for debouncing search input
  
    // Fetch all countries data (adjust per_page to fetch all)
    getAllCountries(300)
      .then(response => {
        allCountries = response.data; // Store fetched countries
      })
      .catch(err => {
        console.error('Error fetching all countries:', err); // Log errors
      });
  
    // Listen for input changes in the search box
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase(); // Get search query
      clearTimeout(searchTimeout); // Clear previous timeout
      searchTimeout = setTimeout(() => {
        if (query.length === 0) {
          resultsList.innerHTML = ''; // Clear results if query is empty
          return;
        }
        // Filter countries by name matching the query
        const filtered = allCountries.filter(country =>
          country.name.toLowerCase().includes(query)
        );
        displayResults(filtered); // Display filtered results
      }, 300); // Debounce delay
    });
  
    // Display search results in the list
    function displayResults(countriesArray) {
      resultsList.innerHTML = ''; // Clear previous results
      if (!countriesArray || countriesArray.length === 0) {
        resultsList.innerHTML = '<li>No results found.</li>'; // Show no results message
        return;
      }
      // Create list items for each country
      countriesArray.forEach(country => {
        const li = document.createElement('li');
        li.tabIndex = 0; // Make list item focusable
        li.innerHTML = `
          <img src="${country.href.flag}" alt="Flag of ${country.name}" class="country-flag">
          <div>
            <strong>${country.name}</strong><br>
            Capital: ${country.capital || 'N/A'}<br>
            Population: ${country.population || 'N/A'}
          </div>
        `;
        // Show details on click or Enter key press
        li.addEventListener('click', () => {
          showCountryDetails(country.name);
        });
        li.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            showCountryDetails(country.name);
          }
        });
        resultsList.appendChild(li); // Add item to the list
      });
    }
  
    // Show detailed information about a country
    function showCountryDetails(countryName) {
      // Find the country by name
      const country = allCountries.find(c => c.name.toLowerCase() === countryName.toLowerCase());
      if (country) {
        // Populate details section with country data
        detailsContent.innerHTML = `
          <h2>${country.name}</h2>
          <img src="${country.href.flag}" alt="Flag of ${country.name}" class="country-flag">
          <p><strong>Nation:</strong> ${country.full_name || 'N/A'}</p>
          <p><strong>Capital:</strong> ${country.capital || 'N/A'}</p>
          <p><strong>Currency:</strong> ${country.currency || 'N/A'}</p>
          <p><strong>Population:</strong> ${country.population || 'N/A'}</p>
          <p><strong>Size:</strong> ${country.size || 'N/A'}</p>
          <p><strong>Continent:</strong> ${country.continent || 'N/A'}</p>
        `;
        detailsSection.classList.remove('hidden'); // Show details section
        detailsSection.setAttribute('aria-hidden', 'false'); // Update accessibility
      } else {
        console.error('Country not found for details:', countryName); // Log error if not found
      }
    }
  
    // Close the details view
    closeDetails.addEventListener('click', () => {
      detailsSection.classList.add('hidden'); // Hide details section
      detailsSection.setAttribute('aria-hidden', 'true'); // Update accessibility
    });
});