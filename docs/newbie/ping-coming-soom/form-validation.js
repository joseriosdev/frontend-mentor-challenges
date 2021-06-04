const form = document.querySelector('form');
const email = document.querySelector('.email');

email.classList.remove('red-border');

form.addEventListener('submit', evt => {
	evt.preventDefault();

	const feedBackText = document.querySelector('.invalid-feedback');
	const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,7})$/;

	if(regex.test(email.value)) {
		email.classList.remove('red-border');
		feedBackText.classList.remove('is-invalid');
	} else {
		email.classList.add('red-border');
		feedBackText.classList.add('is-invalid');
	}
});