class AnimationEngine {
    constructor() {
        this.easings = this.initEasings();
        this.runningAnimations = new Map(); // Track active animations for cleanup
        this.menuState = 'closed';
    }
    initEasings() {
        return {
            linear: (t) => t,
            ease: (t) => {
                const t2 = t * t;
                const t3 = t2 * t;
                return -2.75 * t3 * t2 + 11 * t2 * t2 + -15.5 * t3 + 8 * t2 + 0.25 * t;
            },
            easeIn: (t) => {
                const t2 = t * t;
                const t3 = t2 * t;
                return -1 * t3 * t2 + 3 * t2 * t2 + -3 * t3 + 2 * t2;
            },
            easeOut: (t) => {
                const t2 = t * t;
                const t3 = t2 * t;
                return 0.3 * t3 * t2 + -1.6 * t2 * t2 + 2.2 * t3 + -1.8 * t2 + 1.9 * t;
            },
            easeInOut: (t) => {
                const t2 = t * t;
                const t3 = t2 * t;
                return 2 * t3 * t2 + -5 * t2 * t2 + 2 * t3 + 2 * t2;
            }
        };
    }

    animate(element, properties, options = {}) {
        const {
            duration = 450,
            delay = 0,
            easing = 'easeInOut',
            onComplete = null
        } = options;

        if (!element) {
            console.warn('[Animations] Element not found:', element);
            return;
        }

        const easingFn = this.easings[easing] || this.easings.easeInOut;
        const startTime = performance.now() + delay;
        const startValues = {};

        for (const prop in properties) {
            const computed = window.getComputedStyle(element);
            if (prop === 'translateY' || prop === 'translateX') {
                const transform = computed.transform;
                if (transform && transform !== 'none') {
                    const matrix = transform.match(/matrix.*\((.+)\)/);
                    if (matrix) {
                        const values = matrix[1].split(', ');
                        startValues[prop] = parseFloat(prop === 'translateX' ? values[4] : values[5]) || 0;
                    } else if (element.style.transform) {
                        const regex = new RegExp(`${prop}\\(([^)]+)px`);
                        const match = element.style.transform.match(regex);
                        startValues[prop] = match ? parseFloat(match[1]) : 0;
                    } else {
                        startValues[prop] = 0;
                    }
                } else if (element.style.transform) {
                    const regex = new RegExp(`${prop}\\(([^)]+)px`);
                    const match = element.style.transform.match(regex);
                    startValues[prop] = match ? parseFloat(match[1]) : 0;
                } else {
                    startValues[prop] = 0;
                }
            } else if (prop === 'scale') {
                const transform = computed.transform;
                startValues[prop] = transform && transform !== 'none' ? 1 : 0;
            } else if (prop === 'opacity') {
                startValues[prop] = parseFloat(computed.opacity) || 0;
            }
        }

        const animate = (currentTime) => {
            if (currentTime < startTime) {
                requestAnimationFrame(animate);
                return;
            }

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easingFn(progress);

            let transformString = '';
            for (const prop in properties) {
                const start = startValues[prop];
                const end = properties[prop];
                const current = start + (end - start) * easedProgress;

                if (prop === 'translateY') {
                    transformString += `translateY(${current}px) `;
                } else if (prop === 'translateX') {
                    transformString += `translateX(${current}px) `;
                } else if (prop === 'scale') {
                    transformString += `scale(${current}) `;
                } else if (prop === 'opacity') {
                    element.style.opacity = current;
                } else if (prop === 'display') {
                    if (progress === 0 && end !== 'none') {
                        element.style.display = end;
                    } else if (progress === 1 && end === 'none') {
                        element.style.display = end;
                    }
                }
            }

            if (transformString) {
                element.style.transform = transformString.trim();
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else if (onComplete) {
                onComplete();
            }
        };

        requestAnimationFrame(animate);
    }

    // PAGE LOAD ANIMATIONS
    initPageLoadAnimations() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.runPageLoadAnimations());
        } else {
            this.runPageLoadAnimations();
        }
    }

    runPageLoadAnimations() {
        // Hide all sections initially for scroll reveal
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(60px)';
        });

        // Animation 1: Nav Appear (0ms → 450ms)
        const nav = document.querySelector('.nav');
        if (nav) {
            nav.style.transform = 'translateY(-150%)';
            this.animate(nav, { translateY: 0 }, {
                duration: 450,
                delay: 0,
                easing: 'easeInOut'
            });
        }

        // Animation 2: Hero Content Wrapper (0ms → 550ms)
        const hero = document.querySelector('.hero-content-wrapper');
        if (hero) {
            hero.style.transform = 'translateY(88px)';
            hero.style.opacity = '0';
            this.animate(hero, { translateY: 0, opacity: 1 }, {
                duration: 450,
                delay: 0,
                easing: 'easeInOut'
            });
        }

        // Animation 3: Availability Ellipses (0ms → 1200ms staggered)
        const ellipsis = document.querySelector('[id*="a8acba98-9f41-4af4-c935-b50efdd367df"]');
        if (ellipsis) {
            ellipsis.style.opacity = '1';
            
            // Stage 1: Fade out (400ms delay, 300ms duration, linear)
            setTimeout(() => {
                this.animate(ellipsis, { opacity: 0 }, {
                    duration: 300,
                    delay: 0,
                    easing: 'linear'
                });
            }, 400);
            
            // Stage 2: Fade in (900ms total delay, 300ms duration, easeInOut)
            setTimeout(() => {
                this.animate(ellipsis, { opacity: 1 }, {
                    duration: 300,
                    delay: 0,
                    easing: 'easeInOut'
                });
            }, 900);
        }

        // Animation 4: Block (Global) (200ms → 550ms)
        const blocks = document.querySelectorAll('.block');
        blocks.forEach(block => {
            block.style.transform = 'scale(0.85)';
            block.style.opacity = '0';
            this.animate(block, { scale: 1, opacity: 1 }, {
                duration: 350,
                delay: 200,
                easing: 'easeInOut'
            });
        });

        // Animation 5: Contact Section (200ms → 750ms)
        const contact = document.querySelector('.contact');
        if (contact) {
            contact.style.transform = 'translateY(88px)';
            contact.style.opacity = '0';
            this.animate(contact, { translateY: 0 }, {
                duration: 450,
                delay: 200,
                easing: 'easeInOut'
            });
            this.animate(contact, { opacity: 1 }, {
                duration: 450,
                delay: 300, // Slightly delayed opacity
                easing: 'easeInOut'
            });
        }

        // Animation 6: Float Button (300ms → 650ms)
        const floatButton = document.querySelector('.float-button');
        if (floatButton) {
            floatButton.style.transform = 'scale(0)';
            this.animate(floatButton, { scale: 1 }, {
                duration: 350,
                delay: 300,
                easing: 'easeInOut'
            });
        }
    }

    // INTERACTIVE ANIMATIONS

    // Nav Logo Hover Animation
    initNavLogoHover() {
        const navLogo = document.querySelector('.nav-logo');
        const navLogoImage = document.querySelector('.nav-logo-image');
        const hoverDuration = 250;
        
        if (!navLogo || !navLogoImage) return;

        navLogo.addEventListener('mouseenter', () => {
            this.animate(navLogoImage, { scale: 1.1 }, {
                duration: hoverDuration,
                easing: 'easeIn'
            });
        });

        navLogo.addEventListener('mouseleave', () => {
            this.animate(navLogoImage, { scale: 1 }, {
                duration: hoverDuration,
                easing: 'ease'
            });
        });
    }

    // Menu Adaptation Toggle Animation
    initMenuToggle() {
        const menuIcon = document.querySelector('.nav-menu-icon');
        const hamburgerIcon = document.querySelector('.nav-menu-icon.open');
        const closeIcon = document.querySelector('.nav-menu-icon.close');
        const menuPanel = document.querySelector('.nav-adaptation');

        if (!menuIcon || !hamburgerIcon || !closeIcon || !menuPanel) {
            console.warn('[Animations] Menu elements not found');
            return;
        }

        // Set initial states
        hamburgerIcon.style.display = 'block';
        hamburgerIcon.style.opacity = '1';
        closeIcon.style.display = 'none';
        closeIcon.style.opacity = '0';
        menuPanel.style.display = 'none';
        menuPanel.style.opacity = '0';

        menuIcon.addEventListener('click', () => {
            if (this.menuState === 'closed') {
                this.openMenu(hamburgerIcon, closeIcon, menuPanel);
            } else {
                this.closeMenu(hamburgerIcon, closeIcon, menuPanel);
            }
        });

        // Close menu when clicking nav links
        const navLinks = menuPanel.querySelectorAll('.nav-menu-item');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.menuState === 'open') {
                    this.closeMenu(hamburgerIcon, closeIcon, menuPanel);
                }
            });
        });
    }

    // Logo hover animation for "Worked With" section
    // CSS handles this now - just log initialization
    initLogoHover() {
        const logoWrappers = document.querySelectorAll('.logo-wrapper');
        if (logoWrappers.length > 0) {
            console.log(`[Animations] Logo wrappers found: ${logoWrappers.length} - CSS handles hover`);
        }
    }

    openMenu(hamburgerIcon, closeIcon, menuPanel) {
        this.menuState = 'open';

        // Hide hamburger, show X icon
        this.animate(hamburgerIcon, { opacity: 0 }, {
            duration: 350,
            easing: 'easeInOut',
            onComplete: () => {
                hamburgerIcon.style.display = 'none';
            }
        });

        closeIcon.style.display = 'flex';
        this.animate(closeIcon, { opacity: 1 }, {
            duration: 350,
            easing: 'easeInOut'
        });

        // Show menu panel
        menuPanel.style.display = 'flex';
        this.animate(menuPanel, { opacity: 1 }, {
            duration: 350,
            easing: 'easeInOut'
        });
    }

    closeMenu(hamburgerIcon, closeIcon, menuPanel) {
        this.menuState = 'closed';

        // Show hamburger, hide X icon
        this.animate(closeIcon, { opacity: 0 }, {
            duration: 350,
            easing: 'easeInOut',
            onComplete: () => {
                closeIcon.style.display = 'none';
            }
        });

        hamburgerIcon.style.display = 'flex';
        this.animate(hamburgerIcon, { opacity: 1 }, {
            duration: 350,
            easing: 'easeInOut'
        });

        // Hide menu panel
        this.animate(menuPanel, { opacity: 0 }, {
            duration: 350,
            easing: 'easeInOut',
            onComplete: () => {
                menuPanel.style.display = 'none';
            }
        });
    }

    // LIGHTBOX GALLERY
    initLightbox() {
        const lightboxLinks = document.querySelectorAll('.w-lightbox');
        
        lightboxLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get image data from JSON script
                const jsonScript = link.querySelector('.w-json');
                if (!jsonScript) return;
                
                try {
                    const data = JSON.parse(jsonScript.textContent);
                    if (data.items && data.items.length > 0) {
                        // Get clicked image URL
                        const clickedImageUrl = data.items[0].url;
                        // Collect all items from same group and open at correct index
                        this.collectGalleryItems(data.group, clickedImageUrl);
                    }
                } catch (err) {
                    console.error('[Lightbox] Failed to parse lightbox data:', err);
                }
            });
        });
        
        console.log('[Animations] Lightbox gallery initialized ✓');
    }

    // Collect all gallery items from the same group
    collectGalleryItems(group, clickedImageUrl) {
        const allLightboxLinks = document.querySelectorAll('.w-lightbox');
        const groupItems = [];
        let clickedIndex = 0;

        allLightboxLinks.forEach((link, index) => {
            const jsonScript = link.querySelector('.w-json');
            if (!jsonScript) return;

            try {
                const data = JSON.parse(jsonScript.textContent);
                if (data.group === group && data.items) {
                    // Add all items from this link's items array
                    data.items.forEach(item => {
                        // Check if this is the clicked image
                        if (item.url === clickedImageUrl) {
                            clickedIndex = groupItems.length;
                        }
                        groupItems.push(item);
                    });
                }
            } catch (err) {
                console.error('[Lightbox] Failed to parse group items:', err);
            }
        });

        // Open lightbox with collected items at correct index
        if (groupItems.length > 0) {
            this.openLightbox(groupItems, group, clickedIndex);
        }
    }

    // Open lightbox modal
    openLightbox(items, group, startIndex = 0) {
        // Clear any existing lightbox first
        const existingContainer = document.getElementById('lightbox-container');
        if (existingContainer) {
            existingContainer.remove();
        }

        // Store current gallery state
        this.currentGallery = {
            items: items,
            currentIndex: startIndex,
            group: group
        };

        // Create lightbox container
        const lightboxContainer = document.createElement('div');
        lightboxContainer.id = 'lightbox-container';
        lightboxContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 300ms ease-in-out;
            padding: clamp(10px, 3vw, 20px);
            overflow: hidden;
        `;
        document.body.appendChild(lightboxContainer);

        // Create main image viewer wrapper
        const imageViewerWrapper = document.createElement('div');
        imageViewerWrapper.className = 'lightbox-viewer-wrapper';
        imageViewerWrapper.style.cssText = `
            position: relative;
            width: 100%;
            max-width: 90vw;
            max-height: 60vh;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 100;
            margin-bottom: clamp(12px, 2vw, 20px);
            min-height: 200px;
        `;
        lightboxContainer.appendChild(imageViewerWrapper);

        // Create image viewer
        const imageViewer = document.createElement('div');
        imageViewer.className = 'lightbox-viewer';
        imageViewer.style.cssText = `
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        imageViewerWrapper.appendChild(imageViewer);

        // Create image element
        const img = document.createElement('img');
        img.className = 'lightbox-image';
        img.src = items[startIndex].url;
        img.alt = items[startIndex].origFileName || '';
        img.style.cssText = `
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            border-radius: 8px;
            opacity: 1;
            transition: opacity 300ms ease-in-out;
            cursor: pointer;
        `;
        imageViewer.appendChild(img);

        // Add click zones to image for left/right navigation
        if (items.length > 1) {
            img.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent closing when clicking image
                const rect = img.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const midpoint = rect.width / 2;
                
                if (clickX < midpoint) {
                    this.prevImage(); // Click left side -> prev image
                } else {
                    this.nextImage(); // Click right side -> next image
                }
            });
        } else {
            // Single image - don't close on click
            img.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        // Left arrow button - OUTSIDE IMAGE
        const leftBtn = document.createElement('button');
        leftBtn.className = 'lightbox-nav-btn lightbox-nav-prev';
        leftBtn.innerHTML = '‹';
        leftBtn.style.cssText = `
            position: absolute;
            left: clamp(-40px, -5vw, 10px);
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #888;
            font-size: clamp(32px, 8vw, 48px);
            cursor: pointer;
            padding: 0;
            width: 40px;
            height: 40px;
            display: ${items.length > 1 ? 'flex' : 'none'};
            align-items: center;
            justify-content: center;
            transition: color 300ms ease-in-out;
            line-height: 1;
        `;
        leftBtn.addEventListener('mouseover', () => {
            leftBtn.style.color = '#ffffff';
        });
        leftBtn.addEventListener('mouseleave', () => {
            leftBtn.style.color = '#888';
        });
        leftBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent closing
            this.prevImage();
        });
        imageViewerWrapper.appendChild(leftBtn);

        // Right arrow button - OUTSIDE IMAGE
        const rightBtn = document.createElement('button');
        rightBtn.className = 'lightbox-nav-btn lightbox-nav-next';
        rightBtn.innerHTML = '›';
        rightBtn.style.cssText = `
            position: absolute;
            right: clamp(-40px, -5vw, 10px);
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #888;
            font-size: clamp(32px, 8vw, 48px);
            cursor: pointer;
            padding: 0;
            width: 40px;
            height: 40px;
            display: ${items.length > 1 ? 'flex' : 'none'};
            align-items: center;
            justify-content: center;
            transition: color 300ms ease-in-out;
            line-height: 1;
        `;
        rightBtn.addEventListener('mouseover', () => {
            rightBtn.style.color = '#ffffff';
        });
        rightBtn.addEventListener('mouseleave', () => {
            rightBtn.style.color = '#888';
        });
        rightBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent closing
            this.nextImage();
        });
        imageViewerWrapper.appendChild(rightBtn);

        // Close button - TOP RIGHT
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: clamp(5px, 1vw, 15px);
            right: clamp(5px, 1vw, 15px);
            background: none;
            border: none;
            color: #888;
            font-size: 48px;
            cursor: pointer;
            padding: 0;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 300ms ease-in-out;
            line-height: 1;
            z-index: 200;
        `;
        closeBtn.addEventListener('mouseover', () => {
            closeBtn.style.color = '#ffffff';
        });
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.color = '#888';
        });
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeLightbox();
        });
        lightboxContainer.appendChild(closeBtn);

        // Create thumbnail gallery container at bottom
        if (items.length > 1) {
            const thumbnailContainer = document.createElement('div');
            thumbnailContainer.className = 'lightbox-thumbnails';
            thumbnailContainer.style.cssText = `
                display: flex;
                gap: clamp(8px, 2vw, 15px);
                margin-top: clamp(8px, 1.5vw, 15px);
                padding: 0;
                justify-content: center;
                align-items: flex-end;
                z-index: 50;
                position: relative;
                flex-wrap: wrap;
                width: 100%;
                max-width: 100%;
                max-height: 25vh;
                overflow-y: auto;
            `;

            // Prevent clicks on thumbnail container from closing
            thumbnailContainer.addEventListener('click', (e) => {
                e.stopPropagation();
            });

            items.forEach((item, index) => {
                const thumbImg = document.createElement('img');
                thumbImg.src = item.url;
                thumbImg.alt = `Thumbnail ${index + 1}`;
                const isActive = index === startIndex;
                thumbImg.className = 'lightbox-thumbnail';
                thumbImg.dataset.index = index;
                thumbImg.style.cssText = `
                    width: ${isActive ? 'clamp(70px, 12vw, 90px)' : 'clamp(50px, 8vw, 60px)'};
                    height: ${isActive ? 'clamp(70px, 12vw, 90px)' : 'clamp(50px, 8vw, 60px)'};
                    object-fit: cover;
                    border-radius: 4px;
                    cursor: pointer;
                    opacity: ${isActive ? '1' : '0.6'};
                    border: 2px solid ${isActive ? 'rgba(255, 255, 255, 0.8)' : 'transparent'};
                    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
                    flex-shrink: 0;
                `;
                
                thumbImg.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent closing
                    this.currentGallery.currentIndex = index;
                    this.updateLightboxImage();
                    this.updateThumbnails();
                });

                thumbImg.addEventListener('mouseover', () => {
                    if (index !== this.currentGallery.currentIndex) {
                        thumbImg.style.opacity = '0.8';
                    }
                });

                thumbImg.addEventListener('mouseleave', () => {
                    if (index !== this.currentGallery.currentIndex) {
                        thumbImg.style.opacity = '0.6';
                    }
                });

                thumbnailContainer.appendChild(thumbImg);
            });

            lightboxContainer.appendChild(thumbnailContainer);
        }

        // Show lightbox with animation
        lightboxContainer.style.pointerEvents = 'auto';
        this.animate(lightboxContainer, { opacity: 1 }, {
            duration: 300,
            easing: 'easeInOut'
        });

        // MAIN CLICK HANDLER: Close gallery when clicking anywhere except:
        // - image (stopPropagation)
        // - arrows (stopPropagation)
        // - thumbnails (stopPropagation)
        // - close button (stopPropagation)
        lightboxContainer.addEventListener('click', (e) => {
            this.closeLightbox();
        });

        // Keyboard controls
        const handleKeydown = (e) => {
            const container = document.getElementById('lightbox-container');
            if (!container || container.style.pointerEvents === 'none') {
                document.removeEventListener('keydown', handleKeydown);
                return;
            }

            switch (e.key) {
                case 'ArrowLeft':
                    if (items.length > 1) this.prevImage();
                    break;
                case 'ArrowRight':
                    if (items.length > 1) this.nextImage();
                    break;
                case 'Escape':
                    this.closeLightbox();
                    document.removeEventListener('keydown', handleKeydown);
                    break;
            }
        };
        document.addEventListener('keydown', handleKeydown);
    }

    // Navigate to next image
    nextImage() {
        if (!this.currentGallery) return;
        
        this.currentGallery.currentIndex = 
            (this.currentGallery.currentIndex + 1) % this.currentGallery.items.length;
        this.updateLightboxImage();
        this.updateThumbnails();
    }

    // Navigate to previous image
    prevImage() {
        if (!this.currentGallery) return;
        
        this.currentGallery.currentIndex = 
            (this.currentGallery.currentIndex - 1 + this.currentGallery.items.length) % 
            this.currentGallery.items.length;
        this.updateLightboxImage();
        this.updateThumbnails();
    }

    // Update lightbox image display with animation
    updateLightboxImage() {
        const img = document.querySelector('.lightbox-image');
        
        if (!img || !this.currentGallery) return;

        const item = this.currentGallery.items[this.currentGallery.currentIndex];
        
        // Fade out
        img.style.opacity = '0';
        
        // Change image after fade out
        setTimeout(() => {
            img.src = item.url;
            img.alt = item.origFileName;
            // Fade in
            img.style.opacity = '1';
        }, 150);
    }

    // Update thumbnail active state with animation
    updateThumbnails() {
        const thumbnails = document.querySelectorAll('.lightbox-thumbnail');
        thumbnails.forEach((thumb, index) => {
            if (index === this.currentGallery.currentIndex) {
                // Animate to active state
                thumb.style.width = 'clamp(70px, 12vw, 90px)';
                thumb.style.height = 'clamp(70px, 12vw, 90px)';
                thumb.style.opacity = '1';
                thumb.style.border = '2px solid rgba(255, 255, 255, 0.8)';
            } else {
                // Animate to inactive state
                thumb.style.width = 'clamp(50px, 8vw, 60px)';
                thumb.style.height = 'clamp(50px, 8vw, 60px)';
                thumb.style.opacity = '0.6';
                thumb.style.border = '2px solid transparent';
            }
        });
    }

    // Close lightbox
    closeLightbox() {
        const lightboxContainer = document.getElementById('lightbox-container');
        if (!lightboxContainer) return;

        // Immediately disable interaction
        lightboxContainer.style.pointerEvents = 'none';

        // Fade out animation
        this.animate(lightboxContainer, { opacity: 0 }, {
            duration: 250,
            easing: 'easeOut',
            onComplete: () => {
                // Completely remove the container
                if (lightboxContainer.parentNode) {
                    lightboxContainer.remove();
                }
                this.currentGallery = null;
            }
        });
    }

    // SCROLL REVEAL ANIMATIONS
    initScrollReveal() {
        const sections = document.querySelectorAll('.section');
        
        if (!sections.length) {
            console.warn('[Animations] No sections found for scroll reveal');
            return;
        }

        // Intersection Observer for scroll reveal
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
                    // Mark as revealed to prevent re-animation
                    entry.target.classList.add('revealed');
                    
                    // Ensure initial state is set
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(60px)';
                    
                    // Small delay to ensure styles are applied before animation
                    requestAnimationFrame(() => {
                        this.animate(entry.target, { 
                            translateY: 0, 
                            opacity: 1 
                        }, {
                            duration: 700,
                            delay: 0,
                            easing: 'easeInOut'
                        });
                    });
                }
            });
        }, {
            threshold: 0.15,     // Trigger when 15% of element is visible
            rootMargin: '0px 0px -100px 0px'  // Start animation before element fully enters
        });

        // Observe all sections
        sections.forEach(section => {
            observer.observe(section);
        });

        console.log(`[Animations] Scroll reveal initialized for ${sections.length} sections ✓`);
    }

    // SMOOTH SCROLL NAVIGATION
    initSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-menu-item');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                // Only handle nav-menu-item clicks with section IDs
                if (href && href.startsWith('#') && !link.classList.contains('w-lightbox')) {
                    e.preventDefault();
                    
                    // Remove hover state by forcing blur (removes :hover CSS state)
                    link.blur();
                    
                    const targetId = href.substring(1); // Remove #
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        this.smoothScrollTo(targetElement);
                    }
                }
            });
        });
        
        console.log('[Animations] Smooth scroll navigation initialized ✓');
    }

    // Animate smooth scroll to element
    smoothScrollTo(targetElement, duration = 800) {
        const startY = window.scrollY;
        const targetY = targetElement.offsetTop - 60; // 60px offset for nav
        const distance = targetY - startY;
        
        const easingFn = this.easings.easeInOut;
        const startTime = performance.now();
        
        const scroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easingFn(progress);
            
            window.scrollY = startY + distance * easedProgress;
            window.scrollTo(0, startY + distance * easedProgress);
            
            if (progress < 1) {
                requestAnimationFrame(scroll);
            }
        };
        
        requestAnimationFrame(scroll);
    }
    // Initialize status ellipse pulsing animation
    initStatusEllipsePulse() {
        const statusEllipseWrapper = document.querySelector('.status-ellipse-wrapper');
        const statusEllipse = document.querySelector('.status-ellipse');
        
        if (!statusEllipseWrapper || !statusEllipse) {
            console.warn('[Animations] Status ellipse elements not found');
            return;
        }

        // Start visible
        statusEllipseWrapper.style.opacity = '1';
        statusEllipse.style.opacity = '1';

        // Continuous pulsing - all phases equal
        // Total cycle: 3000ms, each phase: 750ms
        const pulse = () => {
            // Stay fully lit for 750ms
            setTimeout(() => {
                // Fade out (750ms)
                this.animate(statusEllipseWrapper, { opacity: 0.1 }, {
                    duration: 750,
                    easing: 'easeInOut'
                });
                this.animate(statusEllipse, { opacity: 0.1 }, {
                    duration: 750,
                    easing: 'easeInOut',
                    onComplete: () => {
                        // Stay dim for 750ms
                        setTimeout(() => {
                            // Fade back in (750ms)
                            this.animate(statusEllipseWrapper, { opacity: 1 }, {
                                duration: 750,
                                easing: 'easeInOut'
                            });
                            this.animate(statusEllipse, { opacity: 1 }, {
                                duration: 750,
                                easing: 'easeInOut',
                                onComplete: () => {
                                    // Repeat
                                    pulse();
                                }
                            });
                        }, 750);
                    }
                });
            }, 750);
        };

        // Start pulsing after page load
        setTimeout(pulse, 1000);
    }
    
    // Initialize all animations
    init() {
        console.log('[Animations] Initializing custom animations...');
        
        this.initPageLoadAnimations();
        this.initNavLogoHover();
        this.initMenuToggle();
        this.initSmoothScroll();
        this.initLightbox();
        this.initScrollReveal();
        this.initStatusEllipsePulse();
        this.initLogoHover();
        
        console.log('[Animations] All animations initialized ✓');
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.siteAnimations = new AnimationEngine();
        window.siteAnimations.init();
    });
} else {
    window.siteAnimations = new AnimationEngine();
    window.siteAnimations.init();
}
