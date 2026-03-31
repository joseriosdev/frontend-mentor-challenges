import { defaultValues, defaultValType } from './db.js';
const bookmarkElmt = document.querySelector('.bookmark-container');
//--
const burgerElmt = document.querySelector('.burger');
const burgerMenuElmt = document.querySelector('.burger-menu');
//--
let isBookmarked = false;

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

document.querySelector('.main-btn').addEventListener('click', () =>
{
  document.getElementById('support-modal').classList.remove('d-none');
});

document.getElementById('close-support-modal-x').addEventListener('click', () =>
{
  document.getElementById('support-modal').classList.add('d-none');
});
/** -------- END EVENTS -------- **/


/////////////////////////////////////////////////////////////////////////////
function handleModalSuccess(modalID, elementToListen)
{

}

function setUpDynamicValues()
{
  Object.keys(defaultValues).forEach(key =>
  {
    const val = defaultValues[key];

    updateNum(val, key);
    confirmPledgeAvailability(key, val);
  });
}

function handleBookmark(element, toggle)
{
  const rootedStyles = window.getComputedStyle(document.documentElement);
  const circle = document.querySelector('circle');
  const path = document.querySelector('path');
  const button = element.firstElementChild.nextElementSibling;

  if(toggle)
  {
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

function updateNum(obj, key)
{
  const numberFormatter = new Intl.NumberFormat();
  const moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 6
  });

  if(obj.type === defaultValType.MONEY)
  {
    const newVal = moneyFormatter.format(obj.value);
    obj.element.innerText = newVal;
  }
  else if(obj.type === defaultValType.NUMBER)
  {
    const newVal = numberFormatter.format(obj.value);
    obj.element.innerText = newVal;
  }
  else
  {
    const newVal = `${obj.value}%`;
    obj.element.style.setProperty('--before-progress-w', newVal);
  }

  if (obj.value == 0)
  {
    confirmPledgeAvailability(key, obj);
  }
}

function confirmPledgeAvailability(key, val)
{
  if(key.startsWith('item_'))
  {
    const cardElmt =  document.querySelector(`.item-card:has(#${val.element.id})`);

    if (val.value <= 0)
    {
      cardElmt.classList.add('inactive-pledge');

      const btn = document.querySelector(`.item-card:has(#${val.element.id}) button`);
      btn.textContent = 'Out of Stock';
    }
    else
    {
      cardElmt.classList.remove('inactive-pledge');

      const btn = document.querySelector(`.item-card:has(#${val.element.id}) button`);
      btn.textContent = 'Select Reward';
      btn.addEventListener('click', () =>
      {
        document.getElementById('success-modal').classList.remove('d-none');
        val.value = val.value - 1;
        const s = key.split('_')[1];
        updateNum(val, key);
        defaultValues.money_raised.value += defaultValues[s + '_cost'].value;
        defaultValues.total_backers.value++;
        updateNum(defaultValues.total_backers, null);
        updateNum(defaultValues.money_raised, null);
        updateNum(defaultValues.progress_bar, null);
      });
    }
  }
}
