// Animation Events: Listen for animationstart, animationiteration, and animationend
const animateBox = document.getElementById('animateBox');
const animationStatus = document.getElementById('animationStatus');

animateBox.addEventListener('animationstart', function() {
  animationStatus.textContent = 'Animation started';
});
animateBox.addEventListener('animationiteration', function() {
  animationStatus.textContent = 'Animation iteration';
});
animateBox.addEventListener('animationend', function() {
  animationStatus.textContent = 'Animation ended';
});

// Drag Events: Listen for dragstart, dragover, and drop events
const dragSource = document.getElementById('dragSource');
const dropZone = document.getElementById('dropZone');
const dragStatus = document.getElementById('dragStatus');

dragSource.addEventListener('dragstart', function(event) {
  dragStatus.textContent = 'Drag started';
  event.dataTransfer.setData('text/plain', 'Dragged Data');
});

dropZone.addEventListener('dragover', function(event) {
  event.preventDefault(); // Allow dropping
  dragStatus.textContent = 'Dragging over drop zone';
});

dropZone.addEventListener('drop', function(event) {
  event.preventDefault();
  dragStatus.textContent = 'Dropped!';
});

// Input Events: Update as the user types
const inputField = document.getElementById('inputField');
const inputStatus = document.getElementById('inputStatus');

inputField.addEventListener('input', function() {
  inputStatus.textContent = 'Current input: ' + inputField.value;
});

// Mouse Events: Change status on click, mouseover, and mouseout
const mouseButton = document.getElementById('mouseButton');
const mouseStatus = document.getElementById('mouseStatus');

mouseButton.addEventListener('click', function() {
  mouseStatus.textContent = 'Button clicked!';
});

mouseButton.addEventListener('mouseover', function() {
  mouseStatus.textContent = 'Mouse over button!';
});

mouseButton.addEventListener('mouseout', function() {
  mouseStatus.textContent = 'Mouse left button!';
});

// Focus Events: Update status on focus and blur
const focusInput = document.getElementById('focusInput');
const focusStatus = document.getElementById('focusStatus');

focusInput.addEventListener('focus', function() {
  focusStatus.textContent = 'Input focused';
});

focusInput.addEventListener('blur', function() {
  focusStatus.textContent = 'Input lost focus';
});
