const shareBtn = document.querySelector('.fa.fa-share.share-icon');
const tooltip = document.querySelector('.tooltip');

shareBtn.addEventListener('click', evt => {
	shareBtn.classList.toggle('active-share');
	
	if(window.innerWidth < 500) {
		tooltip.classList.toggle('mobile-active');
	} else {
		tooltip.classList.toggle('desktop-active');
	}
});