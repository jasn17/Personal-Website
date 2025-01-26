// Create a <style> element to inject keyframes dynamically
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';

// Define keyframe animations
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
