
let musicPlaying = false

window.addEventListener('load', () => {
    launchConfetti()

    // Autoplay music (works since user clicked Yes to get here)
    const music = document.getElementById('bg-music')
    music.volume = 0.3
    music.play().catch(() => {})
    musicPlaying = true
    document.getElementById('music-toggle').textContent = '🔊'

    // ========== NEW: Initialize all new features ==========
    initLoveLetterModal()
    initMemoryDoor()
    initFlyingHearts()
    initSparkles()
    initRomanticParticles()
})

// ========== ORIGINAL CONFETTI FUNCTION (UNCHANGED) ==========
function launchConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ff85a2', '#ffb3c1', '#ff0000', '#ff6347', '#fff', '#ffdf00']
    const duration = 6000
    const end = Date.now() + duration

    // Initial big burst
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors
    })

    // Continuous side cannons
    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval)
            return
        }

        confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors
        })

        confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors
        })
    }, 300)
}

// ========== ORIGINAL MUSIC TOGGLE (UNCHANGED) ==========
function toggleMusic() {
    const music = document.getElementById('bg-music')
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

// ========== NEW FEATURE 1: Love Letter Modal ==========
function initLoveLetterModal() {
    const modal = document.getElementById('love-letter-modal')
    const closeBtn = document.getElementById('close-letter')
    
    // Show modal after 2 seconds
    setTimeout(() => {
        modal.classList.add('show')
        document.body.style.overflow = 'hidden' // Prevent scroll when modal open
    }, 2000)
    
    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show')
        document.body.style.overflow = 'auto'
    })
    
    // Close on backdrop click
    modal.querySelector('.modal-backdrop').addEventListener('click', () => {
        modal.classList.remove('show')
        document.body.style.overflow = 'auto'
    })
}

// ========== NEW FEATURE 2: Memory Door & Slideshow ==========
function initMemoryDoor() {
    const doorContainer = document.getElementById('door-container')
    const doorLeft = document.getElementById('door-left')
    const doorRight = document.getElementById('door-right')
    const slideshowContainer = document.getElementById('slideshow-container')
    const prevBtn = document.getElementById('prev-btn')
    const nextBtn = document.getElementById('next-btn')
    
    let currentSlide = 0
    let autoplayInterval = null
    let doorOpened = false
    
    // Door click handler
    doorContainer.addEventListener('click', () => {
        if (!doorOpened) {
            doorOpened = true
            doorLeft.classList.add('open')
            doorRight.classList.add('open')
            
            // Show slideshow after door animation
            setTimeout(() => {
                doorContainer.style.display = 'none'
                slideshowContainer.classList.add('visible')
                startAutoplay()
            }, 800)
        }
    })
    
    // Slideshow navigation
    const slides = document.querySelectorAll('.slide')
    const indicatorsContainer = document.getElementById('indicators')
    
    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div')
        indicator.classList.add('indicator')
        if (index === 0) indicator.classList.add('active')
        indicator.addEventListener('click', () => goToSlide(index))
        indicatorsContainer.appendChild(indicator)
    })
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'))
        document.querySelectorAll('.indicator').forEach(ind => ind.classList.remove('active'))
        
        slides[index].classList.add('active')
        document.querySelectorAll('.indicator')[index].classList.add('active')
        currentSlide = index
    }
    
    function goToSlide(index) {
        showSlide(index)
        resetAutoplay()
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length
        showSlide(currentSlide)
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length
        showSlide(currentSlide)
    }
    
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 3000)
    }
    
    function resetAutoplay() {
        clearInterval(autoplayInterval)
        startAutoplay()
    }
    
    prevBtn.addEventListener('click', () => {
        prevSlide()
        resetAutoplay()
    })
    
    nextBtn.addEventListener('click', () => {
        nextSlide()
        resetAutoplay()
    })
}

// ========== NEW FEATURE 3: Flying Clickable Hearts ==========
function initFlyingHearts() {
    const hearts = document.querySelectorAll('.flying-heart')
    
    hearts.forEach((heart, index) => {
        // Random animation delays and durations
        const delay = Math.random() * 2
        const duration = 8 + Math.random() * 4
        
        heart.style.animationDelay = `${delay}s`
        heart.style.animationDuration = `${duration}s`
        
        // Click handler
        heart.addEventListener('click', (e) => {
            const message = heart.getAttribute('data-message')
            showHeartMessage(message, e.clientX, e.clientY)
            
            // Add click animation
            heart.style.transform = 'scale(1.3)'
            setTimeout(() => {
                heart.style.transform = ''
            }, 300)
        })
    })
}

function showHeartMessage(message, x, y) {
    const messageBox = document.createElement('div')
    messageBox.className = 'heart-message-popup'
    messageBox.textContent = message
    messageBox.style.left = `${x}px`
    messageBox.style.top = `${y}px`
    
    document.body.appendChild(messageBox)
    
    // Trigger animation
    setTimeout(() => {
        messageBox.classList.add('show')
    }, 10)
    
    // Remove after animation
    setTimeout(() => {
        messageBox.classList.remove('show')
        setTimeout(() => {
            messageBox.remove()
        }, 500)
    }, 2500)
}

// ========== NEW FEATURE 4: Sparkles Animation ==========
function initSparkles() {
    const container = document.querySelector('.sparkles-container')
    
    function createSparkle() {
        const sparkle = document.createElement('div')
        sparkle.className = 'sparkle'
        sparkle.style.left = `${Math.random() * 100}%`
        sparkle.style.top = `${Math.random() * 100}%`
        sparkle.style.animationDelay = `${Math.random() * 3}s`
        
        container.appendChild(sparkle)
        
        setTimeout(() => {
            sparkle.remove()
        }, 3000)
    }
    
    // Create sparkles periodically
    setInterval(createSparkle, 500)
}

// ========== NEW FEATURE 5: Romantic Particles ==========
function initRomanticParticles() {
    const container = document.querySelector('.romantic-particles')
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div')
        particle.className = 'particle'
        particle.style.left = `${Math.random() * 100}%`
        particle.style.animationDelay = `${Math.random() * 5}s`
        particle.style.animationDuration = `${10 + Math.random() * 10}s`
        
        container.appendChild(particle)
    }
}
