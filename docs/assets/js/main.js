// HeadElf Documentation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeNavigation();
    initializeCodeCopy();
    initializeScrollSpy();
    initializeSearchHighlight();
    initializeTabNavigation();
    initializeLazyLoading();
});

// Navigation Enhancement
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-trigger');
    const navMenu = document.querySelector('.trigger');

    if (navToggle && navMenu) {
        navToggle.addEventListener('change', function() {
            if (this.checked) {
                navMenu.style.display = 'block';
            } else {
                navMenu.style.display = 'none';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.checked = false;
                navMenu.style.display = 'none';
            }
        });
    }

    // Add active class to current page link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.page-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

// Code Copy Functionality
function initializeCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach((codeBlock, index) => {
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-btn';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.setAttribute('aria-label', 'Copy code to clipboard');
        copyButton.setAttribute('title', 'Copy to clipboard');

        // Add copy button to code block container
        const preElement = codeBlock.parentElement;
        preElement.style.position = 'relative';
        preElement.appendChild(copyButton);

        // Copy functionality
        copyButton.addEventListener('click', async function() {
            try {
                await navigator.clipboard.writeText(codeBlock.textContent);

                // Visual feedback
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                copyButton.classList.add('copied');

                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                    copyButton.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);

                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = codeBlock.textContent;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);

                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            }
        });
    });

    // Add CSS for copy button
    const style = document.createElement('style');
    style.textContent = `
        .copy-btn {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            color: #666;
            cursor: pointer;
            padding: 0.25rem 0.5rem;
            font-size: 0.8rem;
            transition: all 0.2s ease;
            opacity: 0;
        }

        pre:hover .copy-btn {
            opacity: 1;
        }

        .copy-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            color: #333;
        }

        .copy-btn.copied {
            background: #27ae60;
            color: white;
            border-color: #27ae60;
        }
    `;
    document.head.appendChild(style);
}

// Scroll Spy for Table of Contents
function initializeScrollSpy() {
    const tocLinks = document.querySelectorAll('a[href^="#"]');
    const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');

    if (tocLinks.length === 0 || headings.length === 0) return;

    function updateActiveLink() {
        let activeHeading = null;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Find the currently visible heading
        headings.forEach(heading => {
            const rect = heading.getBoundingClientRect();
            if (rect.top <= 100) {
                activeHeading = heading;
            }
        });

        // Update active states
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (activeHeading && link.getAttribute('href') === '#' + activeHeading.id) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scroll for anchor links
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without triggering scroll
                history.pushState(null, null, '#' + targetId);
            }
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
}

// Search Highlight
function initializeSearchHighlight() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('highlight');

    if (searchQuery) {
        highlightText(searchQuery);
    }
}

function highlightText(query) {
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }

    textNodes.forEach(textNode => {
        if (textNode.textContent.toLowerCase().includes(query.toLowerCase())) {
            const highlightedText = textNode.textContent.replace(
                new RegExp(query, 'gi'),
                match => `<mark>${match}</mark>`
            );

            const wrapper = document.createElement('span');
            wrapper.innerHTML = highlightedText;
            textNode.parentNode.replaceChild(wrapper, textNode);
        }
    });
}

// Tab Navigation
function initializeTabNavigation() {
    const tabButtons = document.querySelectorAll('[data-tab]');
    const tabPanes = document.querySelectorAll('[data-tab-pane]');

    if (tabButtons.length === 0) return;

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            const targetPane = document.querySelector(`[data-tab-pane="${targetTab}"]`);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

// Lazy Loading for Images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance monitoring
function trackPagePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];

                // Log performance metrics (could be sent to analytics)
                console.log('Page Performance:', {
                    loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                    firstPaint: performance.getEntriesByType('paint').find(p => p.name === 'first-paint')?.startTime,
                    firstContentfulPaint: performance.getEntriesByType('paint').find(p => p.name === 'first-contentful-paint')?.startTime
                });
            }, 0);
        });
    }
}

// Initialize performance tracking
trackPagePerformance();

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Skip if user is typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch(e.key) {
        case '/':
            e.preventDefault();
            const searchInput = document.querySelector('input[type="search"]');
            if (searchInput) searchInput.focus();
            break;
        case 'Escape':
            // Close any open modals or menus
            const navToggle = document.querySelector('.nav-trigger');
            if (navToggle && navToggle.checked) {
                navToggle.checked = false;
            }
            break;
    }
});

// Add loading state management
window.addEventListener('beforeunload', function() {
    document.body.classList.add('loading');
});

// Theme switcher (if implemented)
function initializeThemeSwitcher() {
    const themeToggle = document.querySelector('[data-theme-toggle]');
    if (!themeToggle) return;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Print optimization
function optimizeForPrint() {
    window.addEventListener('beforeprint', function() {
        // Expand all collapsed sections
        const collapsedSections = document.querySelectorAll('[data-collapsed="true"]');
        collapsedSections.forEach(section => {
            section.setAttribute('data-collapsed', 'false');
        });
    });
}

optimizeForPrint();

// Error handling for broken images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';

        // Optionally show a placeholder
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.textContent = 'Image not available';
        e.target.parentNode.insertBefore(placeholder, e.target.nextSibling);
    }
}, true);

// Analytics integration (placeholder)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Track important interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-primary')) {
        trackEvent('engagement', 'primary_button_click', e.target.textContent);
    } else if (e.target.matches('.copy-btn')) {
        trackEvent('usage', 'code_copy', window.location.pathname);
    } else if (e.target.matches('a[href^="http"]')) {
        trackEvent('navigation', 'external_link_click', e.target.href);
    }
});

// Export functions for external use
window.HeadElfDocs = {
    highlightText,
    trackEvent,
    debounce
};