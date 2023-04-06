//React
import React, {useEffect, useRef, useState} from "react";

//styles
import '../styles/base_view.css';

function BaseView(props) {

    const dummy = `A highly customizable
view which allows a quick 
overview of what's what`

    return (<div id='view'
                 className='view'
    >
        {dummy}
            </div>)
}


export default BaseView;