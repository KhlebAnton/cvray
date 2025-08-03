document.addEventListener('DOMContentLoaded', function() {
  const checkbox = document.querySelector('.checkbox-recipient input[type="checkbox"]');
  
  checkbox.addEventListener('change', function() {
    const orderItem = this.closest('.order-item');
    const allLabels = orderItem.querySelectorAll('label:not(.checkbox-recipient)');
    
    allLabels.forEach(label => {
      label.style.display = this.checked ? 'none' : '';
      
      const input = label.querySelector('input');
      if (input) {
        this.checked 
          ? input.removeAttribute('required') 
          : input.setAttribute('required', '');
      }
    });
  });


const accordionDropdowns = document.querySelectorAll('.accordion-item_input');
  
  accordionDropdowns.forEach(dropdown => {
    const display = dropdown.querySelector('.delivery-display');
    const input = dropdown.querySelector('input[type="text"]');
    const top = dropdown.querySelector('.accordion-item_top');
    const options = dropdown.querySelectorAll('.accordion-item_input-value');
    
    top.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
    });
    
    options.forEach(option => {
      option.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const value = this.getAttribute('data-value');
        const text = this.textContent;
        
        input.value = value;
        display.textContent = text;
        display.setAttribute('data-value', value);
        display.classList.add('is-active');
        dropdown.classList.add('is-active');
        dropdown.classList.remove('is-open');
      });
    });
    
    if (input.value) {
      const selectedOption = Array.from(options).find(
        opt => opt.getAttribute('data-value') === input.value
      );
      
      if (selectedOption) {
        display.textContent = selectedOption.textContent;
        display.setAttribute('data-value', input.value);
        display.classList.add('is-active');
        
      }
    }
    
    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('is-open');
      }
    });
  });
  
  
});

  