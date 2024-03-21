import React from 'react'
// import '../../public/css/spinner.css';

function Spinner() {
    return (
        <div>
            <div class="containers">
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div><br/>
                <div className='LoadingText'>Loading . . .</div>
            </div>
        </div>
    )
}

export default Spinner