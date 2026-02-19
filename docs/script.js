const radioBtns = document.querySelectorAll('[name="categories"]');
const grid = document.querySelector('.grid');
const gridContent = {};

const fillGridContentObj = (projectsTypeArray) => {
  projectsTypeArray.forEach(projectType => {
    let htmlText = '';

    projectType.projects.forEach(proj => {
      htmlText +=  `
        <a href="${proj.url}" class="card">
        <figure>
          <img src="${proj.img}" class="card-img" alt="project image preview" />
          <figcaption>
            <h3 class="card-title">
              ${proj.title}
              <br/>
              <em>${proj.subtitle}</em>
            </h3>
          </figcaption>
        </figure>
        </a>
      `;
    });
    gridContent[projectType.level] = htmlText;
  });
};

radioBtns.forEach(input => input.addEventListener('change', () => switchBetweenTabs(input.value)));

document.addEventListener("DOMContentLoaded", () => {
  fetch('./rawProjectsData.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error getting Projects data. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(jsonData => {
      fillGridContentObj(jsonData);
      const checkedBtn = document.querySelector('input[type="radio"]:checked');
      switchBetweenTabs(checkedBtn.id);
    })
    .catch(error => console.error('Error fetching JSON:', error));
});

function switchBetweenTabs(projectType) {
  grid.innerHTML = gridContent[projectType];
}