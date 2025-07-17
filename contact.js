document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent scrolling when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animated background for header
    const headerBg = document.querySelector('.header-background');
    if (headerBg) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            headerBg.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
        });
    }

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll, .option-card, .faq-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };
    
    // Initialize scroll animation
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const submitText = submitBtn.querySelector('.submit-text');
            const loadingIcon = submitBtn.querySelector('.loading-icon');
            
            submitText.style.display = 'none';
            loadingIcon.style.display = 'inline-block';
            
            // Validate form
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                const errorMsg = field.parentElement.querySelector('.error-message');
                
                if (!field.value.trim()) {
                    errorMsg.textContent = 'This field is required';
                    errorMsg.style.display = 'block';
                    field.style.borderColor = 'var(--accent)';
                    isValid = false;
                } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                    errorMsg.textContent = 'Please enter a valid email';
                    errorMsg.style.display = 'block';
                    field.style.borderColor = 'var(--accent)';
                    isValid = false;
                } else {
                    errorMsg.style.display = 'none';
                    field.style.borderColor = '#ddd';
                }
            });
            
            if (isValid) {
                // Simulate form submission
                setTimeout(() => {
                    submitText.style.display = 'inline-block';
                    loadingIcon.style.display = 'none';
                    
                    // Show success message (in a real app, this would be after actual submission)
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                }, 1500);
            } else {
                submitText.style.display = 'inline-block';
                loadingIcon.style.display = 'none';
            }
        });
    }

    // Chat Widget Toggle
    const chatWidget = document.querySelector('.chat-widget');
    const openChatBtn = document.querySelector('.open-chat');
    const closeChatBtn = document.querySelector('.close-chat');
    
    if (openChatBtn && chatWidget) {
        openChatBtn.addEventListener('click', () => {
            chatWidget.classList.add('active');
        });
    }
    
    if (closeChatBtn && chatWidget) {
        closeChatBtn.addEventListener('click', () => {
            chatWidget.classList.remove('active');
        });
    }

    // Simple chat functionality
    const chatInput = document.querySelector('.chat-input input');
    const chatSendBtn = document.querySelector('.chat-input button');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (chatSendBtn && chatInput) {
        chatSendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    function sendMessage() {
        const messageText = chatInput.value.trim();
        if (messageText) {
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.className = 'message sent';
            userMessage.innerHTML = `<p>${messageText}</p>`;
            chatMessages.appendChild(userMessage);
            
            // Clear input
            chatInput.value = '';
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate reply after a short delay
            setTimeout(() => {
                const replyMessage = document.createElement('div');
                replyMessage.className = 'message received';
                replyMessage.innerHTML = '<p>Thank you for your message. A mental health professional will respond shortly.</p>';
                chatMessages.appendChild(replyMessage);
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});
