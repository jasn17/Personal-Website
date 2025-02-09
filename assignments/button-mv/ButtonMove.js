let isMoving = false;
let totalSum = 0;
const buttons = new Map();
let intervalIds = [];
let currentSpeed = 3;
let movementInterval = 10;

document.getElementById('speedSlider').addEventListener('input', function(e) {
    currentSpeed = parseInt(e.target.value);
    document.getElementById('speedValue').textContent = currentSpeed;
});

function createButton() {
    const viewArea = document.querySelector('.view-area');
    const color = document.getElementById('colorSelect').value;
    const button = document.createElement('button');
    
    const number = Math.floor(Math.random() * 100) + 1;
    button.textContent = number;
    button.className = 'moving-button';
    button.style.backgroundColor = color;
    
    const maxWidth = viewArea.offsetWidth - 100;
    const maxHeight = viewArea.offsetHeight - 50;
    button.style.left = Math.random() * maxWidth + 'px';
    button.style.top = Math.random() * maxHeight + 'px';
    
    button.addEventListener('click', function() {
        this.style.backgroundColor = document.getElementById('colorSelect').value;
        totalSum += parseInt(this.textContent);
        document.getElementById('totalSum').textContent = totalSum;
    });

    buttons.set(button, { dx: 0, dy: 0 });
    viewArea.appendChild(button);

    if (isMoving) {
        const movement = buttons.get(button);
        movement.dx = (Math.random() * 4 - 2) * (currentSpeed/3);
        movement.dy = (Math.random() * 4 - 2) * (currentSpeed/3);
        
        const intervalId = setInterval(() => {
            moveButton(button, movement);
        }, movementInterval);
        intervalIds.push(intervalId);
    }

}

function toggleMovement() {
    const moveButton = document.getElementById('moveButton');
    isMoving = !isMoving; 
    
    if (isMoving) {
        moveButton.textContent = 'PAUSE';
        startMovement();
    } else {
        moveButton.textContent = 'MOVE';
        stopMovement();
    }
}

function startMovement() {
    buttons.forEach((movement, button) => {
        movement.dx = (Math.random() * 4 - 2) * (currentSpeed/3);
        movement.dy = (Math.random() * 4 - 2) * (currentSpeed/3);
        
        const intervalId = setInterval(() => {
            moveButton(button, movement);
        }, movementInterval);
        intervalIds.push(intervalId);
    });
}

function stopMovement() {
    intervalIds.forEach(clearInterval);
    intervalIds = [];
}

function moveButton(button, movement) {
    const rect = button.getBoundingClientRect();
    const viewArea = document.querySelector('.view-area').getBoundingClientRect();
    
    if (rect.left <= viewArea.left || rect.right >= viewArea.right) {
        movement.dx *= -1;
    }
    if (rect.top <= viewArea.top || rect.bottom >= viewArea.bottom) {
        movement.dy *= -1;
    }
    
    const newX = parseFloat(button.style.left || 0) + movement.dx;
    const newY = parseFloat(button.style.top || 0) + movement.dy;
    
    button.style.left = Math.max(0, Math.min(newX, viewArea.width - rect.width)) + 'px';
    button.style.top = Math.max(0, Math.min(newY, viewArea.height - rect.height)) + 'px';
}

function clearAll() {
    totalSum = 0;
    document.getElementById('totalSum').textContent = totalSum;
    
    const viewArea = document.querySelector('.view-area');
    buttons.forEach((_, button) => viewArea.removeChild(button));
    buttons.clear();
    
    stopMovement();
    intervalIds = [];
    
    isMoving = false;
    document.getElementById('moveButton').textContent = 'MOVE';
}