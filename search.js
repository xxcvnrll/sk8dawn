document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    // Все карточки товаров (и Girls и Boys)
    const allCards = document.querySelectorAll(`
        .cardOne, .cardTwo, .cardThree, .cardFour, .cardFive, .cardSix, .cardSeven, 
        .cardEuight, .cardNine, .cardTen, .cardEleven, .cardTwelve, .cardThirteen, 
        .cardFourteen, .cardFifteen, .cardSixteen,
        .card1, .card2, .card3, .card4, .card5, .card6, .card7, .card8, .card9, 
        .card10, .card11, .card12
    `);
    
    searchButton.addEventListener('click', function() {
        const searchText = searchInput.value.toLowerCase().trim();
        
        // Если поле поиска пустое - показать все карточки
        if (searchText === '') {
            allCards.forEach(card => {
                card.style.display = 'block';
            });
            return;
        }
        
        // Поиск по названию товара
        allCards.forEach(card => {
            const productName = card.querySelector('.text-card').textContent.toLowerCase();
            
            if (productName.includes(searchText)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // Поиск при нажатии Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
    
    // Очистка поиска при удалении текста
    searchInput.addEventListener('input', function() {
        if (this.value === '') {
            searchButton.click();
        }
    });
});