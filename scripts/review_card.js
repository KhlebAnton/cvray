 document.addEventListener('DOMContentLoaded', function() {
        const reviewTexts = document.querySelectorAll('.review__text');
        const reviewMoreButtons = document.querySelectorAll('.review_more');
        
        reviewTexts.forEach((textEl, index) => {
            const moreButton = reviewMoreButtons[index];
            
            if (textEl.scrollHeight > textEl.clientHeight) {
                moreButton.style.display = 'block';
            }
            
            moreButton.addEventListener('click', function() {
                if (textEl.classList.contains('expanded')) {
                    textEl.classList.remove('expanded');
                    moreButton.textContent = 'Развернуть';
                } else {
                    textEl.classList.add('expanded');
                    moreButton.textContent = 'Свернуть';
                }
            });
        });
    });