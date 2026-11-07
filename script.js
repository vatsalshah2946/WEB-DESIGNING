// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar-custom');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Booking form validation
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;
            const message = document.getElementById('message').value.trim();
            
            // Reset previous validation
            clearValidation();
            
            // Validation checks
            let isValid = true;
            
            if (!name) {
                showValidationError('name', 'Please enter your full name');
                isValid = false;
            }
            
            if (!phone || !/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
                showValidationError('phone', 'Please enter a valid 10-digit phone number');
                isValid = false;
            }
            
            if (!date || new Date(date) < new Date().toISOString().split('T')[0]) {
                showValidationError('date', 'Please select a valid future date');
                isValid = false;
            }
            
            if (!time) {
                showValidationError('time', 'Please select a time');
                isValid = false;
            }
            
            if (!guests) {
                showValidationError('guests', 'Please select number of guests');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate booking success
                showBookingSuccess(name, date, time, guests);
                bookingForm.reset();
            }
        });
    }

    // Set minimum date for booking to today
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.min = today;
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you within 24 hours.');
            contactForm.reset();
        });
    }

    // Gallery hover effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Animate on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and sections
    document.querySelectorAll('.card, .contact-info-card, .menu-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Validation helper functions
function showValidationError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const feedback = field.parentNode.querySelector('.invalid-feedback') || 
                    document.createElement('div');
    feedback.className = 'invalid-feedback';
    feedback.textContent = message;
    field.parentNode.appendChild(feedback);
    field.classList.add('is-invalid');
    field.focus();
}

function clearValidation() {
    document.querySelectorAll('.form-control, .form-select').forEach(field => {
        field.classList.remove('is-invalid');
    });
    document.querySelectorAll('.invalid-feedback').forEach(feedback => {
        feedback.remove();
    });
}

function showBookingSuccess(name, date, time, guests) {
    const successMessage = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <h4 class="alert-heading">
                <i class="fas fa-check-circle me-2"></i>Booking Confirmed!
            </h4>
            <p>Thank you <strong>${name}</strong>! Your table for <strong>${guests}</strong> 
            has been reserved for <strong>${date}</strong> at <strong>${time}</strong>.</p>
            <hr>
            <p class="mb-0">We'll send you a confirmation via SMS and email shortly.Thank you!!</p>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    // Insert success message at top of form
    const formCardBody = document.querySelector('.booking-card .card-body');
    formCardBody.insertAdjacentHTML('afterbegin', successMessage);
    
    // Scroll to top of form
    formCardBody.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-dismiss after 10 seconds
    setTimeout(() => {
        const alert = document.querySelector('.booking-card .alert-success');
        if (alert) {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }
    }, 10000);
}

// Preload images for better performance
window.addEventListener('load', function() {
    // Fade in body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}); 