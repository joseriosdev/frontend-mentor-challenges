const template = document.createElement('template');
template.innerHTML = `
  <style>
    main {
      margin: 2rem 0;
      border: 1px solid lightgray;
      border-radius: 5px;
      color: var(--dark-grey);
      font-weight: 400;
      cursor: pointer;
      transition: all .3s ease;
    } main:hover {
      border: 1px solid var(--cyan);
      box-shadow: var(--cyan) 0px 0px 9px 1px;
    } main:hover h4 {
      color: var(--cyan);
    } main:hover .circle {
      border: 1px solid var(--cyan);
    } 
    
    .card-on {
      border: 1px solid var(--cyan);
      box-shadow: var(--cyan) 0px 0px 9px 1px;
    } .card-on h4 {
      color: var(--cyan);
    } .card-on .circle {
      border: 1px solid var(--cyan);
    } .card-on .circle div {
      margin: 3px auto 0;
      padding: 0;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--cyan);
    }



    h5, h4 {
      margin: 0;
      color: black;
    }

    h5 {
      color: var(--cyan);
      cursor: pointer;
    }

    header {
      width: 90%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: left;
    }
    header, article, footer {
      padding: 20px;
    } article {
      padding-top: 0;
    }

    button {
      padding: 1rem 2rem;
      border: none;
      border-radius: 25px;
      font-weight: 500;
      background-color: var(--cyan);
      color: white;
      border: none;
    } button:hover {
      background-color: var(--dark-cyan);
      cursor: pointer;
    }

    input {
      width: 2rem;
      padding: .8rem 1.9rem;
      border-radius: 25px;
      border: 1px solid lightgray;
      font-weight: 900;
      color: black;
      outline: none;
    } input:hover {
      border: 1px solid var(--cyan);
    } .input-wrap::before {
      content: '$';
      position: relative;
      left: 20%;
      font-size: 1rem;
      font-weight: 700;
      color: var(--dark-grey);
    }

    .circle {
      width: 20px;
      height: 20px;
      margin-right: 1rem;
      border: 1px solid lightgray;
      border-radius: 50%;
    }

    footer {
      border-top: 1px solid lightgray;
      text-align: center;
    }
    footer div {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
    }

    .left {
      color: black;
      font-weight: bold;
      font-size: 19px;
    }

    .d-none {
      display: none;
    }

    .deactivated {
      opacity: .5;
    }

    @media (min-width: 500px) {
      .input-wrap { margin-right: 1rem }
      footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }
  </style>

  <main>
    <header>
      <div class="circle"><div></div></div>
      <div>
        <h4><slot name="title" /></h4>
        <h5>Pledge <span class="price"></span> or more</h5>
      </div>
    </header>
    
    <article>
      <p><slot name="description" /></p>
      <p><span class="left"></span> left</p>
    </article>

    <footer class="d-none">
      <p>Enter your pledge</p>
      <div>
        <span class="input-wrap"><input type="number" /></span>
        <button>Continue</button>
      </div>
    </footer>
  </main>
`;

class Cmp_ItemSupportModal extends HTMLElement
{
  constructor()
  {
    super();

    this._cost = 0;
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const left = this.getAttribute('left');
    const cost = this.getAttribute('cost');

    if(left && cost)
    {
      const item = localStorage.getItem(left);
      const item2 = localStorage.getItem(cost);
      let amount = parseFloat(item2.replace(/[^0-9.-]+/g, ''));
      this.cost = amount;
      this.shadowRoot.querySelector('.left').innerText = item ? item : '';
      this.shadowRoot.querySelector('.price').innerText = item2 ? item2 : '';
      this.shadowRoot.querySelector('input').value = amount;
    }
    else
    {
      this.shadowRoot.querySelector('h5').classList.add('d-none');
      this.shadowRoot.querySelector('article p:nth-of-type(2)').classList.add('d-none');
    }
  }

  get cost() { return this._cost; }
  set cost(value) { this._cost = value; }

  handleSelectedCard(e)
  {
    if(e.detail.on)
    {
      this.shadowRoot.querySelector('main').classList.add('card-on');
    }
  }

  handleInputChange(e)
  {
    if(e.target.value < this.cost) e.target.value = this.cost;
  }

  connectedCallback()
  {
    this.shadowRoot.querySelector('input').addEventListener('blur', this.handleInputChange.bind(this));
    this.addEventListener('click', () => {
      this.shadowRoot.querySelector('footer').classList.remove('d-none');
      const event = new CustomEvent('selected-card', {
        detail: { on: true },
        bubbles: true, // Allows the event to bubble up through the DOM
        composed: true // Allows the event to cross Shadow DOM boundaries
      });
      this.dispatchEvent(event);
    });

    

    this.addEventListener('selected-card', () => this.handleSelectedCard);
  }
}

window.customElements.define('item-support-modal', Cmp_ItemSupportModal);

/*1. The "Vanilla" JS Approach (Using connectedCallback) 
class DatabaseText extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<p>Loading...</p>`;
    this.data = "Loading...";
  }

  // Triggered when element is added to DOM
  async connectedCallback() {
    await this.fetchData();
    this.render();
  }

  async fetchData() {
    try {
      const response = await fetch('/api/get-text');
      const json = await response.json();
      this.data = json.content; // Assume API returns { content: "..." }
    } catch (error) {
      this.data = "Error loading text";
      console.error(error);
    }
  }

  render() {
    this.shadowRoot.innerHTML = `<p>${this.data}</p>`;
  }
}

customElements.define('database-text', DatabaseText);
---------

2. Using Reactive Properties (Best for updates)
class ReactiveDatabaseText extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._text = "Loading...";
  }

  // Define a setter to trigger re-render
  set text(value) {
    this._text = value;
    this.render();
  }

  get text() {
    return this._text;
  }

  async connectedCallback() {
    // Initial fetch
    const response = await fetch('/api/get-text');
    const json = await response.json();
    this.text = json.content; // Setter updates view
  }

  render() {
    this.shadowRoot.innerHTML = `<p>${this._text}</p>`;
  }
}
customElements.define('reactive-database-text', ReactiveDatabaseText);
-----



3. Using Attributes and attributeChangedCallback
static get observedAttributes() {
  return ['data-id'];
}

attributeChangedCallback(name, oldValue, newValue) {
  if (name === 'data-id' && oldValue !== newValue) {
    this.fetchData(newValue); // Re-fetch on ID change
  }
}

 */