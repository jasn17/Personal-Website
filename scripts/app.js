console.log("app.js loaded");

const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';

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

// Append the keyframes to the style element
styleSheet.innerHTML = keyframes;
document.head.appendChild(styleSheet);

document.addEventListener('DOMContentLoaded', () => {
    fetch('navbar.html')
        .then(response => {
            if (!response.ok) {
            throw new Error('Network error: ' + response.statusText);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('navbar-placeholder').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });

    fetch('footer.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network error: ' + response.statusText);
        }
        return response.text();
      })
      .then(html => {
        document.getElementById('footer-placeholder').innerHTML = html;
      })
      .catch(error => {
        console.error('Error loading footer:', error);
      });
  });
