document.addEventListener('DOMContentLoaded', function() {
    const promocodeBlock = document.querySelector('.promocode');
    const input = promocodeBlock.querySelector('input');
    const applyBtn = promocodeBlock.querySelector('.promocode-apply');
    const removeBtn = promocodeBlock.querySelector('.promocode-remove');
    const errorMsg = promocodeBlock.querySelector('.err-msg');
    const applyPromocodeSpan = promocodeBlock.querySelector('.apply-promocode');
    
    updatePromoState();
    
    input.addEventListener('input', function() {
        updatePromoState();
    });
    
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            applyPromoCode();
        }
    });
    
    applyBtn.addEventListener('click', applyPromoCode);
    
    removeBtn.addEventListener('click', function() {
        input.value = '';
        applyPromocodeSpan.textContent = '';
        updatePromoState();
    });
    
    function applyPromoCode() {
        const promoValue = input.value.trim();
        
        if (promoValue === '') return;
        
        const isValidPromo = checkPromoCode(promoValue);
        
        promocodeBlock.classList.remove('is-value', 'is-access', 'is-error');
        
        if (isValidPromo) {
            applyPromocodeSpan.textContent = promoValue;
            promocodeBlock.classList.add('is-access');
        } else {
            promocodeBlock.classList.add('is-error');
        }
    }
    
    function updatePromoState() {
        promocodeBlock.classList.remove('is-value', 'is-access', 'is-error');
        
        if (input.value.trim() !== '') {
            promocodeBlock.classList.add('is-value');
        }
    }
    
    function checkPromoCode(code) {

        return code === 'весналето2025';
    }
});