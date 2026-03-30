const colorThemeBtn = document.querySelector('.toggle');

colorThemeBtn.addEventListener('click', (evt) => {
  let html = document.querySelector('html');
  let bgImg = document.querySelector('.bg-img');
  let bgImgStyleUrl = {
    darkDesktop : 'url(./images/bg-desktop-dark.jpg) no-repeat center center/cover',
    lightDesktop : 'url(./images/bg-desktop-light.jpg) no-repeat center center/cover',
    darkMobile : 'url(./images/bg-mobile-dark.jpg) no-repeat center center/cover',
    lightMobile : 'url(./images/bg-mobile-light.jpg) no-repeat center center/cover'
  };

  if(html.classList.contains('dark')) {
    html.classList.remove('dark');
    evt.target.style.background = 'url(./images/icon-moon.svg) no-repeat center';
    bgImg.style.background = window.innerWidth < 500
      ? bgImgStyleUrl.lightMobile
      : bgImgStyleUrl.lightDesktop;
  }
  else {
    html.classList.add('dark');
    evt.target.style.background = 'url(./images/icon-sun.svg) no-repeat center';
    bgImg.style.background = window.innerWidth < 500
      ? bgImgStyleUrl.darkMobile
      : bgImgStyleUrl.darkDesktop;
  }
});
