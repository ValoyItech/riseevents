// Initialize AOS
AOS.init();

// Sidebar Toggle
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        sidebar.classList.remove('active');
    });
});

// Hero Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const videoHero = document.getElementById('video-hero');
const heroSlideshow = document.querySelector('.hero-slideshow');

// Play video on load without looping
videoHero.loop = false; // Disable looping
videoHero.play();

// When video ends, start slideshow
videoHero.addEventListener('ended', function() {
    videoHero.style.display = 'none';
    heroSlideshow.style.display = 'block';
    startSlideshow();
});

// Start slideshow
function startSlideshow() {
    // Initialize first slide
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    setInterval(() => {
        // Remove active class from current slide and dot
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to new slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // Reinitialize AOS for new slide
        AOS.refresh();
    }, 5000); // Change slide every 5 seconds
}

// Dot navigation
dots.forEach(dot => {
    dot.addEventListener('click', function() {
        const slideIndex = parseInt(this.getAttribute('data-slide'));
        
        // Remove active class from current slide and dot
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Update current slide
        currentSlide = slideIndex;
        
        // Add active class to new slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // Reinitialize AOS for new slide
        AOS.refresh();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".gallery-item");
    let images = [
        "images/lan1.jpg", "images/lan2.jpg", "images/lan3.jpg",
        "images/lan4.jpg", "images/lan5.jpg", "images/lan6.jpg", "images/lan7.jpg",
        "images/lan8.jpg", "images/lan9.jpg", "images/lan10.jpg", "images/lan11.jpg",
        "images/lan12.jpg", "images/lan13.jpg", "images/lan14.jpg", "images/lan15.jpg",
        "images/lan16.jpg", "images/lan17.jpg"
    ];
    
    let usedImages = [...images]; // Create a copy of images to track used ones
    
    galleryItems.forEach((item) => {
        let imgElement = item.querySelector("img");
        
        if (usedImages.length === 0) {
            usedImages = [...images]; // Reset if all images are used
        }
        
        let randomIndex = Math.floor(Math.random() * usedImages.length);
        imgElement.src = usedImages[randomIndex];
        usedImages.splice(randomIndex, 1); // Remove the used image
        
        setInterval(() => {
            if (usedImages.length === 0) {
                usedImages = [...images]; // Reset images when all are used
            }
            let newRandomIndex = Math.floor(Math.random() * usedImages.length);
            imgElement.src = usedImages[newRandomIndex];
            usedImages.splice(newRandomIndex, 1);
        }, 3000); // Change image every 3 seconds
    });

    // Floating WhatsApp Icon
    const whatsappButton = document.createElement("a");
    whatsappButton.href = "https://wa.me/27813378767";
    whatsappButton.target = "_blank";
    whatsappButton.classList.add("whatsapp-float");
    whatsappButton.innerHTML = "<img src='images/whatsapp.png' alt='Chat to Us'> <span>Chat to us</span>";
    document.body.appendChild(whatsappButton);
    
    const servicesSection = document.getElementById("services");
    const footerSection = document.querySelector("footer");
    
    window.addEventListener("scroll", () => {
        const servicesPosition = servicesSection.getBoundingClientRect().top;
        const footerPosition = footerSection.getBoundingClientRect().top;
        
        if (servicesPosition < window.innerHeight && footerPosition > window.innerHeight) {
            whatsappButton.style.display = "flex";
        } else {
            whatsappButton.style.display = "none";
        }
    });
});
