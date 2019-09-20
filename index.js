'use strict';

function validatePostcode(postcode){
    const regex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
    return regex.test(postcode) 
}

module.exports = validatePostcode;