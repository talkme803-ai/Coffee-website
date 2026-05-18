document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.flavor-card');
    const mainCup = document.getElementById('main-cup');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slider = document.querySelector('.flavor-slider');

    let currentIndex = 0;

    // Function to update the main display
    function updateFlavor(index) {
        // Remove active class from all cards
        cards.forEach(card => card.classList.remove('active'));
        
        // Add active class to selected card
        cards[index].classList.add('active');
        
        // Change Main Cup Image with animation
        mainCup.style.transform = 'scale(0.8) translateY(20px)';
        mainCup.style.opacity = '0';
        
        setTimeout(() => {
            mainCup.src = cards[index].getAttribute('data-img');
            mainCup.style.transform = 'scale(1) translateY(0)';
            mainCup.style.opacity = '1';
        }, 200);
    }

    // Click on individual cards
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentIndex = index;
            updateFlavor(currentIndex);
        });
    });

    // Next Button Click
    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to start
        }
        updateFlavor(currentIndex);
        slider.scrollLeft += 150;
    });

    // Prev Button Click
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = cards.length - 1; // Loop to end
        }
        updateFlavor(currentIndex);
        slider.scrollLeft -= 150;
    });
});
