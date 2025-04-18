document.addEventListener('DOMContentLoaded', function() {
    
    // Gérer le comportement du menu fixe au défilement
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    // Appliquer les styles noirs immédiatement
    if (header) {
        header.style.backgroundColor = '#121212';
        
        // Tous les liens de navigation
        const navLinks = header.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.style.color = '#f5f5f5';
        });
        
        // Le logo
        const logoText = header.querySelector('.logo h1');
        if (logoText) {
            logoText.style.color = '#9370db';
        }
        
        // Intervalle qui force la couleur noire toutes les 100ms
        setInterval(() => {
            header.style.backgroundColor = '#121212';
            navLinks.forEach(link => {
                link.style.color = '#f5f5f5';
            });
            if (logoText) {
                logoText.style.color = '#9370db';
            }
        }, 100);
    }
    
    if (header && heroSection) {
        // Ajouter une classe au header lors du défilement
        window.addEventListener('scroll', function() {
            // Forcer le style noir quelle que soit la position
            header.style.backgroundColor = '#121212';
            
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
                
                // Force le style de fond noir en cas de problème
                header.style.backgroundColor = '#121212';
                
                // Force les liens à rester en couleur claire
                const navLinks = header.querySelectorAll('nav ul li a');
                navLinks.forEach(link => {
                    link.style.color = '#f5f5f5';
                });
                
                // Force le logo à rester en violet
                const logoText = header.querySelector('.logo h1');
                if (logoText) {
                    logoText.style.color = '#9370db';
                }
            } else {
                header.classList.remove('scrolled');
                header.style.backgroundColor = '#121212';
            }
        });
        
        // Ajuster le padding du hero en fonction de la hauteur du header
        function adjustHeroPadding() {
            const headerHeight = header.offsetHeight;
            heroSection.style.marginTop = `${headerHeight}px`;
        }
        
        // Appeler une fois au chargement et lors du redimensionnement
        adjustHeroPadding();
        window.addEventListener('resize', adjustHeroPadding);
    }
    
    // Animation au défilement avec Intersection Observer
    const animatedElements = document.querySelectorAll('.feature, .testimonial, .cta');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        animatedElements.forEach(element => {
            element.classList.add('fade-in');
            observer.observe(element);
        });
    } else {
        // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
        animatedElements.forEach(element => {
            element.classList.add('animate');
        });
    }
    
    // Gestion du menu burger
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileNav = document.querySelector('nav.mobile-nav'); // Cibler la nav principale

    if (burgerMenu && mobileNav) {
        burgerMenu.addEventListener('click', function() {
            // Basculer l'état actif du bouton burger
            burgerMenu.classList.toggle('active');
            // Basculer l'état actif du menu mobile
            mobileNav.classList.toggle('active');
            
            // Mettre à jour l'attribut aria-expanded pour l'accessibilité
            const isExpanded = burgerMenu.getAttribute('aria-expanded') === 'true';
            burgerMenu.setAttribute('aria-expanded', !isExpanded);

            // Optionnel : Bloquer le scroll du body quand le menu est ouvert
            if (mobileNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Optionnel : Fermer le menu si on clique sur un lien
        const navLinks = mobileNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileNav.classList.contains('active')) {
                    burgerMenu.classList.remove('active');
                    mobileNav.classList.remove('active');
                    burgerMenu.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = ''; 
                }
            });
        });
    }
    
    // Animation des éléments au défilement (code existant)
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
    // Bouton retour en haut (code existant)
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Mise à jour dynamique de l'année du copyright
    const copyrightYearElement = document.querySelector('.copyright p');
    if (copyrightYearElement) {
        const currentYear = new Date().getFullYear();
        // Remplacer l'année hardcodée par l'année actuelle
        copyrightYearElement.textContent = copyrightYearElement.textContent.replace(/© \d{4}/, `© ${currentYear}`);
    }
}); 