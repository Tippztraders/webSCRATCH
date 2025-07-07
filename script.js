const slideContainer = document.querySelector('.carousel-slide'); 
const slides = document.querySelectorAll('.slide-img'); 
const dots = document.querySelectorAll('.dot'); 
let currentIndex = 0; 
// Slide function 
function showSlide(index) { 
if (index >= slides.length) currentIndex = 0; 
else if (index < 0) currentIndex = slides.length - 1; 
else currentIndex = index; 
slideContainer.style.transform = `translateX(-${currentIndex * 300}px)`; 
// Update dots 
dots.forEach(dot => dot.classList.remove('active')); 
dots[currentIndex].classList.add('active'); 
} 
// Click image to enlarge 
slideContainer.addEventListener('click', () => { 
const imageURL = slides[currentIndex].src; 
const win = window.open('', '_blank'); 
win.document.write(`<img src="${imageURL}" style="width:100%">`); 
}); 
// Auto-loop every 3 seconds 
setInterval(() => { 
showSlide(currentIndex + 1); 
}, 3000); 
// Initialize 
showSlide(currentIndex); 
