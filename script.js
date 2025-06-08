document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init("jKJoSw0xHb8v2YEfl"); // Replace with your actual public key

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Sticky Header on Scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 0);
        }
    });

    // Booking Form Handling
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitButton = bookingForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Send form data using emailjs.sendForm (make sure your form field names match your EmailJS template variables)
            emailjs.sendForm('service_h7mhapc', 'template_d802ize', this)
                .then(function() {
                    showFormMessage('Booking request sent! We\'ll contact you soon.', 'success');
                    bookingForm.reset();
                }, function(error) {
                    console.error('EmailJS error:', error);
                    showFormMessage('Failed to send. Please try again later.', 'error');
                })
                .finally(function() {
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                });
        });
    }

    function showFormMessage(message, type) {
        let formMessage = document.getElementById('form-message');
        if (!formMessage) {
            formMessage = document.createElement('div');
            formMessage.id = 'form-message';
            bookingForm.insertBefore(formMessage, bookingForm.firstChild);
        }
        formMessage.innerHTML = `<span style="color:${type === 'success' ? 'green' : 'red'};">${message}</span>`;
        setTimeout(() => formMessage.innerHTML = '', 5000);
    }

    // Image Modal for Gallery
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const imageModal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.getElementById('close-modal');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            modalImg.src = item.src;
            imageModal.style.display = 'flex';
        });
    });

    closeModal.addEventListener('click', () => {
        imageModal.style.display = 'none';
    });

    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });

});