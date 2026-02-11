document.querySelector('form').addEventListener('submit', function(e)
{
    e.preventDefault();
    const selected = document.querySelector('input[type="radio"]:checked');
    document.getElementById('survey').style.display = 'none';
    document.getElementById('result').style.display = 'block';

    const span = document.querySelector('span');
    span.textContent = !selected ? '0' : selected.value;
});