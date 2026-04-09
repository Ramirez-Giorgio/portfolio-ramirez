
        // Script per la navigazione
        document.addEventListener('DOMContentLoaded', function() {
            // Menu mobile toggle
            const menuToggle = document.querySelector('.menu-toggle');
            const navMenu = document.querySelector('.nav-menu');
            
            if (menuToggle && navMenu) {
                menuToggle.addEventListener('click', function() {
                    navMenu.classList.toggle('active');
                    this.classList.toggle('active');
                });
            }
            
            // Toggle sidebar su mobile
            const sidebar = document.querySelector('.sidebar');
            const sidebarOverlay = document.querySelector('.sidebar-overlay');
            const sidebarClose = document.querySelector('.sidebar-close');
            
            // Crea pulsante per aprire sidebar su mobile
            const sidebarToggle = document.createElement('button');
            sidebarToggle.className = 'sidebar-toggle';
            sidebarToggle.innerHTML = '<i class="fas fa-info-circle"></i>';
            sidebarToggle.setAttribute('aria-label', 'Apri informazioni');
            
            // Aggiungi il pulsante solo su mobile
            const navContainer = document.querySelector('.nav-container');
            function setupSidebarToggle() {
                if (window.innerWidth <= 768 && navContainer && !document.querySelector('.sidebar-toggle')) {
                    navContainer.appendChild(sidebarToggle);
                    
                    sidebarToggle.addEventListener('click', function() {
                        if (sidebar) sidebar.classList.add('active');
                        if (sidebarOverlay) sidebarOverlay.classList.add('active');
                    });
                } else {
                    const existingToggle = document.querySelector('.sidebar-toggle');
                    if (existingToggle) existingToggle.remove();
                }
            }
            
            if (sidebarClose) {
                sidebarClose.addEventListener('click', function() {
                    if (sidebar) sidebar.classList.remove('active');
                    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
                });
            }
            
            if (sidebarOverlay) {
                sidebarOverlay.addEventListener('click', function() {
                    if (sidebar) sidebar.classList.remove('active');
                    this.classList.remove('active');
                });
            }
            
            // Navigazione progetti
            const projectNavBtns = document.querySelectorAll('.project-nav-btn');
            const projectLinks = document.querySelectorAll('.project-link');
            const projects = document.querySelectorAll('.project');
            
            function switchProject(targetId) {
                // Aggiorna bottoni attivi
                projectNavBtns.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.getAttribute('data-target') === targetId) {
                        btn.classList.add('active');
                    }
                });
                
                // Mostra/nascondi progetti
                projects.forEach(project => {
                    project.classList.remove('active-project');
                    if (project.id === targetId) {
                        project.classList.add('active-project');
                    }
                });
                
                // Scroll al progetto
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
            
            // Aggiungi event listener ai bottoni
            projectNavBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const targetId = this.getAttribute('data-target');
                    switchProject(targetId);
                });
            });
            
            // Aggiungi event listener ai link (anche quelli nei teaser)
            projectLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('data-target');
                    switchProject(targetId);
                });
            });
            
            // Smooth scroll per i link interni (escludendo i link dei progetti)
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                if (anchor.classList.contains('project-link')) return;
                
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href === '#') return;
                    
                    e.preventDefault();
                    const targetElement = document.querySelector(href);
                    
                    if (targetElement) {
                        // Chiudi menu mobile se aperto
                        if (navMenu && navMenu.classList.contains('active')) {
                            navMenu.classList.remove('active');
                            if (menuToggle) menuToggle.classList.remove('active');
                        }
                        
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Funzione per copiare il codice
            const copyBtn = document.querySelector('.copy-btn');
            if (copyBtn) {
                copyBtn.addEventListener('click', function() {
                    const codeElement = document.querySelector('.code-container code');
                    if (codeElement) {
                        const textToCopy = codeElement.textContent;
                        navigator.clipboard.writeText(textToCopy).then(() => {
                            const originalText = this.innerHTML;
                            this.innerHTML = '<i class="fas fa-check"></i> Copiato!';
                            setTimeout(() => {
                                this.innerHTML = originalText;
                            }, 2000);
                        }).catch(err => {
                            console.error('Errore nella copia:', err);
                            // Fallback per browser che non supportano clipboard API
                            const textArea = document.createElement('textarea');
                            textArea.value = textToCopy;
                            document.body.appendChild(textArea);
                            textArea.select();
                            document.execCommand('copy');
                            document.body.removeChild(textArea);
                            
                            const originalText = this.innerHTML;
                            this.innerHTML = '<i class="fas fa-check"></i> Copiato!';
                            setTimeout(() => {
                                this.innerHTML = originalText;
                            }, 2000);
                        });
                    }
                });
            }
            
            // Gestione responsive
            window.addEventListener('resize', setupSidebarToggle);
            setupSidebarToggle(); // Esegui all'avvio
        });