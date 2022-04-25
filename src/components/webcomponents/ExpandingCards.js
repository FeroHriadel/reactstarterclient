import React from 'react';
import './otj-expandingcards';







const ExpandingCards = ({ cardsBg }) => {
  return (

        <otj-expandingcards backgroundcolor={cardsBg || 'transparent'}>
            <div slot="card1" className="card-content">
                <p style={{textAlign: 'center', margin: '10px'}}>web component example here</p>
            </div>

            <div slot="card2" className="card-content">
              <p  style={{textAlign: 'center', margin: '10px'}}>All these cards are one web component</p>
            </div>

            <div slot="card3" className="card-content">
              <p  style={{textAlign: 'center', margin: '10px'}}>So far it's only .js comaptible</p>
            </div>

            <div slot="card4" className="card-content">
              <p style={{textAlign: 'center', margin: '10px'}}>I will figure .ts on some later date</p>
            </div>
        </otj-expandingcards>

  )
}

export default ExpandingCards