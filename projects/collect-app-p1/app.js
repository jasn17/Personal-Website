// app.js
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const resultsList = document.getElementById('resultsList');
    const detailsSection = document.getElementById('details-section');
    const detailsContent = document.getElementById('detailsContent');
    const closeDetails = document.getElementById('closeDetails');
  
    let searchTimeout = null;
  
    // Listen to input changes for partial name search
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      clearTimeout(searchTimeout);
      if (query.length === 0) {
        resultsList.innerHTML = '';
        return;
      }
      // Debounce search for better performance
      searchTimeout = setTimeout(() => {
        // Call getCountryByName from api.js
        getCountryByName(query)
          .then(data => {
            displayResults(data);
          })
          .catch(err => {
            console.error('Error fetching countries:', err);
          });
      }, 300);
    });
  
    // Display search results in the resultsList
    function displayResults(countries) {
      resultsList.innerHTML = '';
      if (!countries || countries.length === 0) {
        resultsList.innerHTML = '<li>No results found.</li>';
        return;
      }
      countries.forEach(country => {
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
          if(e.key === 'Enter') {
            showCountryDetails(country.name);
          }
        });
        resultsList.appendChild(li);
      });
    }
  
    // Show detailed country information
    function showCountryDetails(countryName) {
      // Use getCountryByName to fetch full details
      getCountryByName(countryName)
        .then(response => {
          const country = response.data || response; // Adjust based on API response structure
          // Build details content
          detailsContent.innerHTML = `
            <h2>${country.name}</h2>
            <img src="${country.href.flag}" alt="Flag of ${country.name}" class="country-flag">
            <p><strong>Full Name:</strong> ${country.full_name || 'N/A'}</p>
            <p><strong>Capital:</strong> ${country.capital || 'N/A'}</p>
            <p><strong>Currency:</strong> ${country.currency || 'N/A'}</p>
            <p><strong>Population:</strong> ${country.population || 'N/A'}</p>
            <p><strong>Size:</strong> ${country.size || 'N/A'}</p>
            <p><strong>Continent:</strong> ${country.continent || 'N/A'}</p>
            <p><strong>Description:</strong> ${country.description || 'N/A'}</p>
            <!-- Add more details as needed -->
          `;
          detailsSection.classList.remove('hidden');
          detailsSection.setAttribute('aria-hidden', 'false');
        })
        .catch(err => {
          console.error('Error fetching country details:', err);
        });
    }
  
    // Close details view
    closeDetails.addEventListener('click', () => {
      detailsSection.classList.add('hidden');
      detailsSection.setAttribute('aria-hidden', 'true');
    });
  });  