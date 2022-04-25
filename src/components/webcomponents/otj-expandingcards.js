
//CSS IMPORT
const template = document.createElement('template');
template.innerHTML = `
    <style>
        @import "otj-expandingcards.css"
    </style>
`;





class ExpandingCards extends HTMLElement {
    constructor() {
        super();

        //RENDER HTML
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                * {
                    -webkit-box-sizing: border-box;
                            box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }
            
                #container {
                    width: 100%;
                    height: 100%;
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-pack: center;
                        -ms-flex-pack: center;
                            justify-content: center;
                    -webkit-box-align: center;
                        -ms-flex-align: center;
                            align-items: center;
                    position: relative;
                }
                
                #container #cards-container {
                    width: 97.5%;
                    height: 92.5%;
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-orient: horizontal;
                    -webkit-box-direction: normal;
                        -ms-flex-direction: row;
                            flex-direction: row;
                    -webkit-box-pack: center;
                        -ms-flex-pack: center;
                            justify-content: center;
                    -webkit-box-align: center;
                        -ms-flex-align: center;
                            align-items: center;
                    -webkit-box-sizing: border-box;
                            box-sizing: border-box;
                }
                
                ::slotted(.card-content) {
                    height: 100%;
                    width: auto;
                    -webkit-box-flex: 0.5;
                        -ms-flex: 0.5;
                            flex: 0.5;
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-orient: vertical;
                    -webkit-box-direction: normal;
                        -ms-flex-direction: column;
                            flex-direction: column;
                    -webkit-box-pack: center;
                        -ms-flex-pack: center;
                            justify-content: center;
                    -webkit-box-align: center;
                        -ms-flex-align: center;
                            align-items: center;
                    -webkit-transition: all 0.5s ease-in;
                    transition: all 0.5s ease-in;
                    -webkit-box-sizing: border-box;
                            box-sizing: border-box;
                    margin: 5px !important;
                    border-radius: 5px;
                    position: relative;
                    cursor: pointer;
                    -webkit-box-shadow: 0 0 5px black;
                            box-shadow: 0 0 5px black;
                    overflow: hidden;
                }
                
                ::slotted(.active) {
                    -webkit-box-flex: 2;
                        -ms-flex: 2;
                            flex: 2;
                    cursor: auto;
                }
                
                @media (max-width: 700px) {
                    #container #cards-container {
                    -webkit-box-orient: vertical;
                    -webkit-box-direction: normal;
                        -ms-flex-direction: column;
                            flex-direction: column;
                    }
                    ::slotted(.card-content) {
                    height: auto;
                    width: 100%;
                    }
                }
            </style>
        
            <div id="container">
                <div id="cards-container">
                    <slot name="card1"></slot>
                    <slot name="card2"></slot>
                    <slot name="card3"></slot>
                    <slot name="card4"></slot>
                    <slot name="card5"></slot>
                    <slot name="card6"></slot>
                    <slot name="card7"></slot>
                    <slot name="card8"></slot>
                    <slot name="card9"></slot>
                    <slot name="card10"></slot>
                    <slot name="card11"></slot>
                    <slot name="card12"></slot>
                </div>
            </div>
        `;

        

        //VALUES
        this.container = this.shadowRoot.querySelector('#container');
        this.cardsContainer = this.shadowRoot.querySelector('#cards-container');
        this.slot1 = this.shadowRoot.querySelector('slot[name=card1]');
        this.slot2 = this.shadowRoot.querySelector('slot[name=card2]');
        this.slot3 = this.shadowRoot.querySelector('slot[name=card3]');
        this.slot4 = this.shadowRoot.querySelector('slot[name=card4]');
        this.slot5 = this.shadowRoot.querySelector('slot[name=card5]');
        this.slot6 = this.shadowRoot.querySelector('slot[name=card6]');
        this.slot7 = this.shadowRoot.querySelector('slot[name=card7]');
        this.slot8 = this.shadowRoot.querySelector('slot[name=card8]');
        this.slot9 = this.shadowRoot.querySelector('slot[name=card9]');
        this.slot10 = this.shadowRoot.querySelector('slot[name=card10]');
        this.slot11 = this.shadowRoot.querySelector('slot[name=card11]');
        this.slot12 = this.shadowRoot.querySelector('slot[name=card12]');
        this.allSlots = this.shadowRoot.querySelectorAll('slot');
    }



    //ON COMPONENT MOUNTED
    connectedCallback() {
        //apply styles
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.container.addEventListener('click', this.expandCard);
    }



    //GET AND LISTEN TO ATTRIBUTES
    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (oldValue === newValue) return;
        if (attributeName === 'backgroundcolor') this.container.style.backgroundColor = newValue;
    }

    static get observedAttributes() {
        return ['backgroundcolor'];
    }

    

    //CUSTOM METHODS
    expandCard(e) {
        if (e.target.id === "cards-container") return;
        if (e.target.id === "container") return;
        if (e.target.classList.contains('active')) {
            e.target.classList.remove('active');
            return;
        }

        //remove `.active` from all cards
        for (let item of e.target.parentElement.children) {
            if (item.classList.contains('active')) item.classList.remove('active');
        }

        //add `.active` to clicked card
        e.target.classList.add('active');
    }



    //CLEAN-UP
    disconnectedCallback() {
        this.container.removeEventListener('click', this.expandCard);
    }
}



customElements.define('otj-expandingcards', ExpandingCards);