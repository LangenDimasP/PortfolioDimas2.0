// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Testimonial Slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    
    // Set Current Year
    const currentYearEl = document.getElementById('current-year');
    
    // Visitor Counter
    const visitorCountEl = document.getElementById('visitor-count');
    
    // Download CV Button
    const downloadCvBtn = document.getElementById('download-cv');
    
    // Contact Me Button
    const contactMeBtn = document.getElementById('contact-me');
    
    // Progress Animation on Scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Project Cards
    const projectCards = document.querySelectorAll('.project-card');
    
    // Theme Toggle Functionality
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
    
    // Testimonial Slider Functionality
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialItems.forEach((item, i) => {
            item.style.display = i === index ? 'block' : 'none';
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Initialize testimonial display
    showTestimonial(currentTestimonial);
    
    // Add click event to dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentTestimonial = i;
            showTestimonial(currentTestimonial);
        });
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Set Current Year
    currentYearEl.textContent = new Date().getFullYear();
    
    // Simple Analytics
    let visitCount = parseInt(localStorage.getItem('visitCount') || '0');
    visitCount++;
    localStorage.setItem('visitCount', visitCount.toString());
    visitorCountEl.textContent = visitCount;
    
    // Download CV Button
    downloadCvBtn.addEventListener('click', function() {
        // In a real implementation, this would download your CV
        alert('CV Download would start here. In a real implementation, link this to your actual CV file.');
        
        // Tracking analytics
        console.log('CV Downloaded');
    });
    
    // Contact Me Button
    contactMeBtn.addEventListener('click', function() {
        // In a real implementation, this would open a contact form or mailto link
        window.location.href = 'mailto:email@example.com?subject=Kontak%20dari%20Portfolio';
    });
    
    // Animate skill bars on scroll
    function animateOnScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        skillBars.forEach(skillBar => {
            const skillTop = skillBar.getBoundingClientRect().top;
            
            if (skillTop < triggerBottom) {
                const percent = skillBar.getAttribute('data-percent');
                skillBar.style.width = percent;
            }
        });
    }
    
    // Initial check for elements in view
    animateOnScroll();
    
    // Add smooth animation on project cards when they come into view
    function animateProjectCards() {
        const triggerBottom = window.innerHeight * 0.8;
        
        projectCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            
            if (cardTop < triggerBottom) {
                // Staggered animation delay
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100 * index);
            }
        });
    }
    
    // Set initial styles for project cards (pastikan terlihat)
    projectCards.forEach(card => {
        card.style.opacity = '1'; // Ubah ke 1 agar langsung terlihat
        card.style.transform = 'translateY(0)'; // Posisi normal
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Initial check for project cards in view
    animateProjectCards();
    
    // Listen for scroll events
    window.addEventListener('scroll', function() {
        animateOnScroll();
        animateProjectCards();
    });
    
    // Intersection Observer for section animations
    if ('IntersectionObserver' in window) {
        const sections = document.querySelectorAll('.info-section');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    // Stop observing after animation
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Set initial styles and start observing
        sections.forEach(section => {
            section.style.opacity = '0.1'; // Bukan 0 agar tetap terlihat sedikit
            section.style.transform = 'translateY(10px)'; // Kurangi jarak transformasi
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            sectionObserver.observe(section);
        });
    }
    
    // Add smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add micro-interactions
    const allInteractiveElements = document.querySelectorAll('button, a, .project-card, .tag');
    
    allInteractiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Initialize any tooltips
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.style.position = 'relative';
        
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.textContent = tooltipText;
            tooltip.style.position = 'absolute';
            tooltip.style.bottom = '100%';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.padding = '5px 10px';
            tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            tooltip.style.color = 'white';
            tooltip.style.borderRadius = '5px';
            tooltip.style.fontSize = '12px';
            tooltip.style.whiteSpace = 'nowrap';
            tooltip.style.zIndex = '100';
            tooltip.style.opacity = '0';
            tooltip.style.transition = 'opacity 0.3s ease';
            
            this.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 10);
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
                
                setTimeout(() => {
                    tooltip.remove();
                }, 300);
            }
        });
    });
});