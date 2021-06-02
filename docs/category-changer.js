const radioBtns = document.querySelectorAll('[name="categories"]');
const grid = document.querySelector('.grid');
const cardTitles = {
  css: 'HTML - CSS',
  js: 'HTML - CSS - JS',
  api: 'HTML - CSS - JS - API',
  collaborative: '<br><em>collaborative</em>'
};

const newbie = `
  ${HTMLcard('./newbie/3-col-card/3-col-card.html', 'https://www.frontendmentor.io/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdz209s6jk%2Fimage%2Fupload%2Fv1617293265%2FChallenges%2Fap7h50kkrdq7zclbokox.jpg&w=828&q=75', cardTitles.css)}
  ${HTMLcard('./newbie/single-price/single-price.html', 'https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_700/Challenges/i6wu7n5sthrxgfpfibvx.jpg', cardTitles.css)}
  ${HTMLcard('./newbie/profile-card-component/profile-card-component.html', 'https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_700/Challenges/dia0o9uigiiz4gebiqps.jpg', cardTitles.css)}
`;
const junior = `
  ${HTMLcard('./junior/testimonials-grid-section-main/testinomial-grid-section.html', 'https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_700/Challenges/hlfgqwj3chzij3t5erjv.jpg', cardTitles.css)}
  ${HTMLcard('https://brownny87.github.io/blogr-landing-page-main/', 'https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_700/Challenges/wdor1bppurckam2nrhwn.jpg', cardTitles.js + cardTitles.collaborative)}
`;
const intermediate = ``;
const advanced = ``;
const guru = ``;


radioBtns.forEach((input) => {
  input.addEventListener('change', () => {
    switch (input.value) {
      case 'newbie':
        grid.innerHTML = newbie;
        break;
      case 'junior':
        grid.innerHTML = junior;
        break;
      case 'intermediate':
        grid.innerHTML = intermediate;
        break;
      case 'advanced':
        grid.innerHTML = advanced;
        break;
      case 'guru':
        grid.innerHTML = guru;
        break;
    }
  })
});

window.onload = function() {
  const checkedBtn = document.querySelector('input[type="radio"]:checked');

  switch (checkedBtn.id) {
    case 'newbie':
      grid.innerHTML = newbie;
      break;
    case 'junior':
      grid.innerHTML = junior;
      break;
    case 'intermediate':
      grid.innerHTML = intermediate;
      break;
    case 'advanced':
      grid.innerHTML = advanced;
      break;
    case 'guru':
      grid.innerHTML = guru;
      break;
  }
};

function HTMLcard(url, imgURL, cardTitle) {
  return `
    <a href="${url}" class="card">
    <figure>
      <img src="${imgURL}" class="card-img">
      <figcaption>
        <h3 class="card-title">${cardTitle}</h3>
      </figcaption>
    </figure>
    </a>
  `;
}