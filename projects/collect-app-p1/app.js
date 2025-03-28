// app.js
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const resultsList = document.getElementById('resultsList');
    const detailsSection = document.getElementById('details-section');
    const detailsContent = document.getElementById('detailsContent');
    const closeDetails = document.getElementById('closeDetails');
  
    let allCountries = [];
    let searchTimeout = null;
  
    // Preload all countries data (adjust per_page to cover all available countries)
    getAllCountries(300)
      .then(response => {
        // Assume response.data is an array of country objects
        allCountries = response.data;
      })
      .catch(err => {
        console.error('Error fetching all countries:', err);
      });
  
    // Listen to input changes for partial search
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        if (query.length === 0) {
          resultsList.innerHTML = '';
          return;
        }
        // Filter allCountries array for partial matches in the country name
        const filtered = allCountries.filter(country =>
          country.name.toLowerCase().includes(query)
        );
        displayResults(filtered);
      }, 300);
    });
  
    // Display search results in the resultsList
    function displayResults(countriesArray) {
      resultsList.innerHTML = '';
      if (!countriesArray || countriesArray.length === 0) {
        resultsList.innerHTML = '<li>No results found.</li>';
        return;
      }
      countriesArray.forEach(country => {
        const li = document.createElement('li');
        li.tabIndex = 0;
        li.innerHTML = `
          <img src="${country.href.flag}" alt="Flag of ${country.name}" class="country-flag">
          <div>
            <strong>${country.name}</strong><br>
            Capital: ${country.capital || 'N/A'}<br>
            Population: ${country.population || 'N/A'}
          </div>
        `;
        li.addEventListener('click', () => {
          showCountryDetails(country.name);
        });
        li.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            showCountryDetails(country.name);
          }
        });
        resultsList.appendChild(li);
      });
    }
  
    // Show detailed country information
    function showCountryDetails(countryName) {
      // For the detailed view, find the country from the preloaded data
      const country = allCountries.find(c => c.name.toLowerCase() === countryName.toLowerCase());
      if (country) {
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
        detailsSection.classList.remove('hidden');
        detailsSection.setAttribute('aria-hidden', 'false');
      } else {
        console.error('Country not found for details:', countryName);
      }
    }
  
    // Close details view
    closeDetails.addEventListener('click', () => {
      detailsSection.classList.add('hidden');
      detailsSection.setAttribute('aria-hidden', 'true');
    });
  });
  