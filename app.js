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
styleSheet.innerHTML = keyframes;
document.head.appendChild(styleSheet);
