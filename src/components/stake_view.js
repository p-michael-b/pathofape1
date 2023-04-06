//React
import React, {useEffect, useRef, useState} from "react";


//styles
import '../styles/stake_view.css';

function StakeView(props) {

    const dummy = `Interactions with
Public data happen here
Claims get staked and contested`

    return (<div id='view'
                 className='view'
    >
        {dummy}
    </div>)
}


export default StakeView;