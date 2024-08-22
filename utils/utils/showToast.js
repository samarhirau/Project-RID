

function showToast(message, type = 'info') {
// Create the toast container if it doesn't exist
let container = document.querySelector('.toastify-container');
if (!container) {
container = document.createElement('div');
container.className = 'toastify-container';
document.body.appendChild(container);
}

// Create the toast element
const toast = document.createElement('div');
toast.className = `toastify-toast toastify-${type}`;

// Create the timer line element
const timerLine = document.createElement('div');
timerLine.className = 'timer-line';

toast.innerHTML = `
<span class="toastify-text">${message}</span>
<span class="toastify-close" onclick="this.parentElement.remove()">×</span>
`;

toast.appendChild(timerLine);

// Add the toast to the container
container.appendChild(toast);

// Trigger the timer line animation
setTimeout(() => {
timerLine.style.transform = 'translateX(0)'; // Start the animation
}, 100); // Small delay to ensure animation starts smoothly

// Remove the toast after 3 seconds
setTimeout(() => {
toast.remove();
}, 3000);
}
