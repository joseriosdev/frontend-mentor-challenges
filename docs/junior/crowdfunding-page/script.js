const key_siteIntiated = 'site_intiated';
const key_bookmarked = 'bookmarked';
const bookmarkElmt = document.querySelector('.bookmark-container');
//--
const burgerElmt = document.querySelector('.burger');
const burgerMenuElmt = document.querySelector('.burger-menu');
//--

//--
const moneyElmt = document.getElementById('money');
const moneyGoalElmt = document.getElementById('money-goal');
const totalBackersElmt = document.getElementById('total-backers');
const daysLeftElmt = document.getElementById('days-left');
const barElmt = document.getElementById('progress-bar');
const bambooLeftElmt = document.getElementById('bamboo-left');
const bambooCostElmt = document.getElementById('bamboo-cost');
const blackLeftElmt = document.getElementById('black-left');
const blackCostElmt = document.getElementById('black-cost');
const mahoganyLeftElmt = document.getElementById('mahogany-left');
const mahoganyCostElmt = document.getElementById('mahogany-cost');
const defaultValType = Object.freeze({ MONEY: 0, NUMBER: 1, OTHER: 2 });
const defaultValues = Object.freeze( //--didn't know 'get' and 'set' were really stuff here in JS
{
  money_raised:       { value: 75560, type: defaultValType.MONEY, element: moneyElmt },
  money_goal:         { value: 100000, type: defaultValType.MONEY, element: moneyGoalElmt },
  total_backers:      { value: 5007, type: defaultValType.NUMBER, element: totalBackersElmt },
  days_left:          { value: 56, type: defaultValType.NUMBER, element: daysLeftElmt },
  item_bamboo_left:   { value: 101, type: defaultValType.NUMBER, element: bambooLeftElmt },
  bamboo_cost:        { value: 25, type: defaultValType.MONEY, element: bambooCostElmt },
  item_black_left:    { value: 64, type: defaultValType.NUMBER, element: blackLeftElmt },
  black_cost:         { value: 75, type: defaultValType.MONEY, element: blackCostElmt },
  item_mahogany_left: { value: 0, type: defaultValType.NUMBER, element: mahoganyLeftElmt },
  mahogany_cost:      { value: 200, type: defaultValType.MONEY, element: mahoganyCostElmt },
  get progress_bar() {
    return { value: (this.money_raised.value / this.money_goal.value) * 100, type: defaultValType.OTHER, element: barElmt }
  }
});

/** -------- EVENTS -------- **/
const toggleModal = (id) => document.getElementById(id).classList.toggle('d-none');
const handleContentLoaded = () =>
{
  setUpDynamicValues();
  handleBookmark(bookmarkElmt, false);
};

document.addEventListener('DOMContentLoaded', handleContentLoaded);
document.getElementById('got-it-btn').addEventListener('click', () => toggleModal('success-modal'));
bookmarkElmt.addEventListener('mouseenter', () => handleBookmarkHover(true));
bookmarkElmt.addEventListener('mouseleave', () => handleBookmarkHover(false));


burgerElmt.addEventListener('click', () => 
{
  burgerMenuElmt.classList.toggle('open');
  burgerElmt.classList.toggle('ex');
  document.querySelector('body').classList.toggle('overflow-hidden');
});

function bookmarkClick(e, element)
{
  e.preventDefault();
  handleBookmark(element, true);
}
/** -------- END EVENTS -------- **/


/////////////////////////////////////////////////////////////////////////////
function handleModalSuccess(modalID, elementToListen)
{

}

function setUpDynamicValues(forceInitValues = false)
{
  const alreadySetUp = localStorage.getItem(key_siteIntiated);
  Object.keys(defaultValues).forEach(key =>
  {
    if(!alreadySetUp || forceInitValues)
    {
      const numberFormatter = new Intl.NumberFormat();
      const moneyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumSignificantDigits: 6
      });

      if(defaultValues[key].type === defaultValType.MONEY)
      {
        const newVal = moneyFormatter.format(defaultValues[key].value);
        defaultValues[key].element.innerText = newVal;
        localStorage.setItem(key, newVal);
      }
      else if(defaultValues[key].type === defaultValType.NUMBER)
      {
        const newVal = numberFormatter.format(defaultValues[key].value);
        defaultValues[key].element.innerText = newVal;
        localStorage.setItem(key, newVal);
      }
      else
      {
        const newVal = `${defaultValues[key].value}%`;
        defaultValues[key].element.style.setProperty('--before-progress-w', newVal);
        localStorage.setItem(key, newVal);
      }
    }
    else
    {
      const val = localStorage.getItem(key);
      
      if(defaultValues[key].type !== defaultValType.OTHER)
        defaultValues[key].element.innerText = val;
      else
        defaultValues[key].element.style.setProperty('--before-progress-w', val);

      if(key.startsWith('item_')) defaultValues[key].value <= 0
        ? document.querySelector(`.item-card:has(#${defaultValues[key].element.id})`).classList.add('inactive-pledge')
        : document.querySelector(`.item-card:has(#${defaultValues[key].element.id})`).classList.remove('inactive-pledge');  
    }
  });
  if(!alreadySetUp) localStorage.setItem(key_siteIntiated, '1');
}

function handleBookmark(element, toggle)
{
  const rootedStyles = window.getComputedStyle(document.documentElement);
  let isBookmarked = !!localStorage.getItem(key_bookmarked);
  const circle = document.querySelector('circle');
  const path = document.querySelector('path');
  const button = element.firstElementChild.nextElementSibling;

  if(toggle)
  {
    localStorage.setItem(key_bookmarked, isBookmarked ? '' : '1');
    isBookmarked = !isBookmarked;
  }

  if(isBookmarked)
  {
    circle.style.fill = rootedStyles.getPropertyValue('--cyan').trim();
    path.style.fill = 'white';
    button.textContent = 'Bookmarked';
    button.style.color = rootedStyles.getPropertyValue('--cyan').trim();
  }
  else
  {
    circle.style.fill = rootedStyles.getPropertyValue('--bookmark-circle').trim();
    path.style.fill = rootedStyles.getPropertyValue('--bookmark-path').trim();
    button.textContent = 'Bookmark';
    button.style.color = rootedStyles.getPropertyValue('--dark-grey').trim();
  }
}

function handleBookmarkHover(isEntered)
{
  const rootedStyles = window.getComputedStyle(document.documentElement);
  const isBookmarked = !!localStorage.getItem(key_bookmarked);
  const circle = document.querySelector('circle');
  const button = document.querySelector('.bookmark-btn');

  if(isBookmarked)
  {
    circle.style.fill = rootedStyles.getPropertyValue(isEntered ? '--dark-cyan' : '--cyan').trim();
    button.style.color = rootedStyles.getPropertyValue('--cyan').trim();
  }
  else
  {
    circle.style.fill = rootedStyles.getPropertyValue(isEntered ? '--dark-grey' : '--bookmark-circle').trim();
    button.style.color = rootedStyles.getPropertyValue('--dark-grey').trim();
  }
}