const radioBtns = document.querySelectorAll("[name='categories']");
const grid = document.querySelector(".grid");

const newbie = `
<a href="./newbie/single-price/single-price.html" class="card">
  <figure>
    <img src="https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_700/Challenges/i6wu7n5sthrxgfpfibvx.jpg" alt="desktop preview challenge" class="card-img">
    <figcaption>
      <h3 class="card-title">HTML - CSS</h3>
    </figcaption>
  </figure>
</a>
<a href="./newbie/profile-card-component/profile-card-component.html" class="card">
  <figure>
    <img src="https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_700/Challenges/dia0o9uigiiz4gebiqps.jpg" alt="desktop preview challenge" class="card-img">
    <figcaption>
      <h3 class="card-title">HTML - CSS</h3>
    </figcaption>
  </figure>
</a>
`;
const junior = `
<a href="./junior/testimonials-grid-section-main/testinomial-grid-section.html" class="card">
  <figure>
    <img src="https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_700/Challenges/hlfgqwj3chzij3t5erjv.jpg" alt="desktop preview challenge" class="card-img">
    <figcaption>
      <h3 class="card-title">HTML - CSS</h3>
    </figcaption>
  </figure>
</a>
<a href="https://brownny87.github.io/blogr-landing-page-main/" class="card">
  <figure>
    <img src="https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_700/Challenges/wdor1bppurckam2nrhwn.jpg" alt="desktop preview challenge" class="card-img">
    <figcaption>
      <h3 class="card-title">HTML - CSS - JS <br> <em>collaborative</em></h3> 
    </figcaption>
  </figure>
</a>
`;
const intermediate = ``;
const advanced = ``;
const guru = ``;


radioBtns.forEach((input) => {
  input.addEventListener("change", () => {
    switch (input.value) {
      case "newbie":
        grid.innerHTML = newbie;
        break;
      case "junior":
        grid.innerHTML = junior;
        break;
      case "intermediate":
        grid.innerHTML = intermediate;
        break;
      case "advanced":
        grid.innerHTML = advanced;
        break;
      case "guru":
        grid.innerHTML = guru;
        break;
    }
  })
});

window.onload = function() {
  const checkedBtn = document.querySelector("input[type='radio']:checked");

  switch (checkedBtn.id) {
    case "newbie":
      grid.innerHTML = newbie;
      break;
    case "junior":
      grid.innerHTML = junior;
      break;
    case "intermediate":
      grid.innerHTML = intermediate;
      break;
    case "advanced":
      grid.innerHTML = advanced;
      break;
    case "guru":
      grid.innerHTML = guru;
      break;
  }
};