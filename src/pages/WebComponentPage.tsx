import React, { useState, useRef } from 'react';
import ExpandingCards from '../components/webcomponents/ExpandingCards';



const WebComponentPage = () => {
  //VALUES
  const [cardsBg, setCardsBg] = useState<string>('transparent');



  //RENDER
  return (
    <div className='container'>
        <h1 className='my-5 text-center'>WebComponent Page</h1>

        <div className="row">
            <div className="col-md-6 offset-md-3">
                <label htmlFor="cardsBg">Enter background color:</label>
                <input 
                    name='cardsBg'
                    type="text" 
                    value={cardsBg}
                    onChange={(e) => setCardsBg(e.target.value)}
                    className='form-control mb-2'
                    placeholder='Background color'
                />
            </div>
        </div>

        <div className='webcomponent-wrapper my-5' style={{width: '100%', height: '200px'}}>
            <ExpandingCards cardsBg={cardsBg} />
        </div>
    </div>
  )
}

export default WebComponentPage