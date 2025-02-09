document.addEventListener("DOMContentLoaded", function() {
    const colors = ["red", "green", "blue"];
    
    let clickCounts = { red: 0, green: 0, blue: 0 };
    let hoverCounts = { red: 0, green: 0, blue: 0 };

    colors.forEach(color => {
        const button = document.querySelector(`.${color}-button`);
        const clickCountDisplay = document.querySelector(`.${color}-section .button-click-count`);
        const hoverCountDisplay = document.querySelector(`.${color}-section .button-hover-count`);

        button.addEventListener("click", function() {
            document.body.style.backgroundColor = color;
            clickCounts[color]++;
            clickCountDisplay.textContent = `${color.toUpperCase()} Click Count: ${clickCounts[color]}`;
        });

        button.addEventListener("mouseenter", function() {
            hoverCounts[color]++;
            hoverCountDisplay.textContent = `${color.toUpperCase()} Hover Count: ${hoverCounts[color]}`;
        });
    });
});
