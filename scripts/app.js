console.log("app.js loaded");

document.addEventListener('DOMContentLoaded', () => {
    // Determine if we are inside a subdirectory
    const depth = window.location.pathname.split('/').length - 2;
    const pathPrefix = depth > 0 ? '../'.repeat(depth) : '';

    console.log("Detected path depth:", depth);
    console.log("Using path prefix:", pathPrefix);

    // Fetch and insert the Navbar
    fetch(pathPrefix + 'navbar.html')
        .then(response => {
            if (!response.ok) throw new Error('Network error: ' + response.statusText);
            return response.text();
        })
        .then(html => {
            document.getElementById('navbar-placeholder').innerHTML = html;
            console.log("Navbar loaded successfully.");
        })
        .catch(error => console.error('Error loading navbar:', error));

    // Fetch and insert the Footer
    fetch(pathPrefix + 'footer.html')
        .then(response => {
            if (!response.ok) throw new Error('Network error: ' + response.statusText);
            return response.text();
        })
        .then(html => {
            document.getElementById('footer-placeholder').innerHTML = html;
            console.log("Footer loaded successfully.");
        })
        .catch(error => console.error('Error loading footer:', error));
});

const styleSheet = document.createElement('style');
const keyframes = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .hero-content {
        animation: fadeIn 1.5s ease-in-out;
    }
`;