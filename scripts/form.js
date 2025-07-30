const phoneInputs = document.querySelectorAll('.phone-input');
if (phoneInputs.length) {
    phoneInputs.forEach(input => {
        var iti = window.intlTelInput(input, {
            nationalMode: true,
            initialCountry: 'auto',
            geoIpLookup: function (callback) {
                jQuery.get('https://ipinfo.io', function () { }, 'jsonp').always(function (resp) {
                    var countryCode = resp && resp.country ? resp.country : 'us';
                    callback(countryCode);
                });
            },
            utilsScript: './scripts/utils.js',
            preferredCountries: ['ru']
        });
        var handleChange = function () {
            var text = iti.isValidNumber() ? iti.getNumber() : '';
            iti.setNumber(text);
            input.value = text;
        };
        input.addEventListener('mouseleave', handleChange);
        input.addEventListener('change', handleChange);
    });
}
