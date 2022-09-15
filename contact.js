const form = document.getElementById('form');

let errors = [];

form.addEventListener('submit', (event) => {
    event.preventDefault();
    errors = [];

    const f = Object.values(form);

    for (const input of f) {
        console.log(`Input ${input.id} has value ${input.value}`);

        input.classList.remove('error')

        let isValid = true;


        switch (input.id) {
            case 'email':
                isValid = validateEmail(input.value);
                break;
            case 'name':
                validateName(input.value);
                break;
            case 'body':
                isValid = validateBody(input.value);
                break;
            case 'agree':
                isValid = validateAgreement(input.checked);
                break;
            default:
                break;
        }

        if (!isValid) {
            highlightInput(input);
        }

    }

    console.log(errors)

    // form.submit();
});


function validateEmail(email) {
    const hasAt = email.includes('@');
    const hasDot = email.includes('.');
    const count = email.split(/\@|\./).length;

    const isValid = hasDot && hasAt && (count >= 3);

    console.log(hasAt, hasDot, count, isValid)

    if (!isValid) {
        errors.push('The email is incorrect')
    }

    return isValid;



}

function validateName(name) {
    const isNotEmpty = name.length > 0;

    const isCapitalized = /[A-Z][a-zA-z\-]+/.test(name);

    const isValid = isNotEmpty && isCapitalized;

    if (!isValid) {
        errors.push('Name is incorrect');
    }

    return isValid;
}

function validateBody(body) {
    const isMinlength = body.length > 50;
    const isMaxlength = body.length < 2000;

    const isValid = isMinlength && isMaxlength;

    if (!isValid) {
        errors.push('Body must be between 50 and 200 chars');
    }

    return isValid;
}

function validateAgreement(Agreement) {
    if (!Agreement) {
        errors.push('You must agree!');
    }

    return Agreement;
}



function highlightInput(input) {
    input.classList.add('error')
}