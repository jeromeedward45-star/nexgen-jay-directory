 document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    const bentoGrid = document.querySelector('.bento-grid');

    if (!searchInput || !bentoGrid) return;

    const toolCards = bentoGrid.querySelectorAll('.bento-card');

    function filterTools(searchValue) {
        const searchKeywords = searchValue.toLowerCase().trim().split(/\s+/).filter(word => word.length > 0);

        toolCards.forEach(card => {
            if (searchKeywords.length === 0) {
                card.style.display = 'flex';
                requestAnimationFrame(() => {
                    card.classList.remove("hidden");
                });
                return;
            }

            const title = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
            const description = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : '';
            const category = card.querySelector('.category') || card.querySelector('span') ? (card.querySelector('.category') || card.querySelector('span')).textContent.toLowerCase() : '';

            const combinedCardText = `${title} ${description} ${category}`;
            const matchesAllKeywords = searchKeywords.every(keyword => combinedCardText.includes(keyword));

            if (matchesAllKeywords) {
                card.style.display = 'flex'; 
                requestAnimationFrame(() => {
                    card.classList.remove("hidden");
                });
            } else {
                card.classList.add("hidden"); 
                setTimeout(() => {
                    if (card.classList.contains("hidden")) {
                        card.style.display = 'none';
                    }
                }, 400); 
            }
        });
    }

    // Dynamic filtering as you type
    searchInput.addEventListener('input', (event) => {
        filterTools(event.target.value);
    });

    // Intercept and handle explicit 'Enter' key submissions inside the field
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            filterTools(searchInput.value);
        }
    });

    // Handle form submit placeholder / Modal functionality preserved
    const modalElement = document.getElementById('submitModal');
    const submitBtn = document.querySelector('.btn-primary');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const submissionForm = document.getElementById('submissionForm');

    if (submitBtn && modalElement) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalElement.style.display = 'flex';
        });
    }

    if (closeModalBtn && modalElement) {
        closeModalBtn.addEventListener('click', () => {
            modalElement.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (modalElement && event.target === modalElement) {
            modalElement.style.display = 'none';
        }
    });

    if (submissionForm && modalElement) {
        submissionForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Awesome! Your AI tool has been submitted for verification.');
            submissionForm.reset();
            modalElement.style.display = 'none';
        });
    }
});
