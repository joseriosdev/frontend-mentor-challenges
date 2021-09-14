const radioBtns = document.querySelectorAll('[name="categories"]');
const grid = document.querySelector('.grid');
const cardTitles = {
  css: 'HTML - CSS',
  js: 'HTML - CSS - JS',
  api: 'HTML - CSS - JS - API',
  collaborative: '<br><em>collaborative</em>'
};

const newbie = `
  ${HTMLcard('https://joseriosdev.github.io/four-card-feature-section/', 'https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_700/Challenges/a3b5gbgtfbtiqrdawpwp.jpg', cardTitles.css)}
  ${HTMLcard('./newbie/ping-coming-soom/ping-coming-soon.html', 'https://www.frontendmentor.io/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdz209s6jk%2Fimage%2Fupload%2Fq_auto%2Cw_700%2FChallenges%2Fqjiprcu1e19yvujjrflv.jpg&w=640&q=75', cardTitles.js)}
  ${HTMLcard('./newbie/3-col-card/3-col-card.html', 'https://www.frontendmentor.io/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdz209s6jk%2Fimage%2Fupload%2Fv1617293265%2FChallenges%2Fap7h50kkrdq7zclbokox.jpg&w=828&q=75', cardTitles.css)}
  ${HTMLcard('./newbie/profile-card-component/profile-card-component.html', 'https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_700/Challenges/dia0o9uigiiz4gebiqps.jpg', cardTitles.css)}
  ${HTMLcard('./newbie/single-price/single-price.html', 'https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_700/Challenges/i6wu7n5sthrxgfpfibvx.jpg', cardTitles.css)}
`;
const junior = `
  ${HTMLcard('https://brownny87.github.io/blogr-landing-page-main/', 'https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_700/Challenges/wdor1bppurckam2nrhwn.jpg', cardTitles.js + cardTitles.collaborative)}
  ${HTMLcard('./junior/testimonials-grid-section-main/testinomial-grid-section.html', 'https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_700/Challenges/hlfgqwj3chzij3t5erjv.jpg', cardTitles.css)}
`;
const intermediate = ``;
const advanced = ``;
const guru = ``;


radioBtns.forEach((input) => {
  input.addEventListener('change', () => {
    switchBetweenTabs(input.value);
  })
});

window.onload = function() {
  const checkedBtn = document.querySelector('input[type="radio"]:checked');
  switchBetweenTabs(checkedBtn.id);
};

function switchBetweenTabs(str) {
  switch (str) {
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
}

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