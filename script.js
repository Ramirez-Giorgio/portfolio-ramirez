// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Toggle sidebar su mobile
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const sidebarClose = document.querySelector('.sidebar-close');
    
    // Aggiungi un pulsante per aprire la sidebar su mobile
    const sidebarToggle = document.createElement('button');
    sidebarToggle.className = 'sidebar-toggle';
    sidebarToggle.innerHTML = '<i class="fas fa-info-circle"></i>';
    sidebarToggle.setAttribute('aria-label', 'Apri informazioni');
    
    // Inserisci il pulsante nella navbar
    const navContainer = document.querySelector('.nav-container');
    if (navContainer && window.innerWidth <= 1024) {
        navContainer.appendChild(sidebarToggle);
        
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
        });
    }
    
    if (sidebarClose) {
        sidebarClose.addEventListener('click', function() {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            this.classList.remove('active');
        });
    }
    
    // Smooth scroll per i link interni
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Chiudi menu mobile se aperto
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                // Scroll smooth
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Evidenzia sezione attiva durante lo scroll
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    function highlightActiveSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    
    // Aggiungi effetto hover migliorato alle card delle competenze
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Gestione responsive della sidebar
    function handleSidebarResponsive() {
        if (window.innerWidth <= 1024) {
            // Su dispositivi mobili, sposta le informazioni della sidebar in un menu a tendina
            if (!document.querySelector('.sidebar-toggle')) {
                const sidebarToggle = document.createElement('button');
                sidebarToggle.className = 'sidebar-toggle';
                sidebarToggle.innerHTML = '<i class="fas fa-info-circle"></i>';
                sidebarToggle.setAttribute('aria-label', 'Apri informazioni');
                
                const navContainer = document.querySelector('.nav-container');
                if (navContainer) {
                    navContainer.appendChild(sidebarToggle);
                    
                    sidebarToggle.addEventListener('click', function() {
                        sidebar.classList.add('active');
                        sidebarOverlay.classList.add('active');
                    });
                }
            }
        } else {
            // Su desktop, mostra la sidebar normalmente
            const sidebarToggle = document.querySelector('.sidebar-toggle');
            if (sidebarToggle) {
                sidebarToggle.remove();
            }
            
            sidebar.classList.remove('active');
            if (sidebarOverlay) {
                sidebarOverlay.classList.remove('active');
            }
        }
    }
    
    // Gestisci il ridimensionamento della finestra
    window.addEventListener('resize', handleSidebarResponsive);
    handleSidebarResponsive(); // Esegui all'avvio
});