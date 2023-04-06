//React
import React, {useEffect, useRef, useState} from "react";

//assets
import ape_whistle from '../images/ape_whistle.gif';
import ape_logo from '../images/ape_logo.png';
import whistle_file from '../images/audio_whistle.m4a';

function LandingView() {
    const [whistle, setWhistle] = useState(false)
    const image_reference = useRef(null)
    const brand_reference = useRef(null)
    const alert_reference = useRef(null)

    const whistle_sound = new Audio()
    let touchEvent = 'ontouchstart' in window ? 'touchend' : 'click';

    useEffect(() => {
        // preload Images and Audio
        const img = new Image()
        const anim = new Image()

        img.src = ape_logo
        img.onload = () => {
            image_reference.current.addEventListener(touchEvent, (event) => showAnim(event))
        }
        anim.src = ape_whistle
        whistle_sound.src = whistle_file
    }, []);

    useEffect(() => {
        if (whistle) {
            image_reference.current.src = ape_whistle
            brand_reference.current.querySelectorAll(".ape_face").forEach((element) => {
                element.classList.add('flipped');
            });
        } else {
            let img = new Image()
            img.src = ape_logo
            img.onload = () => {
                image_reference.current.src = ape_logo
                image_reference.current.addEventListener(touchEvent, handleShowAnim)
            }

            brand_reference.current.querySelectorAll(".ape_face").forEach((element) => {
                element.classList.remove("flipped");
            });
        }
        return () => {
            if (image_reference.current) {
                image_reference.current.removeEventListener(touchEvent, handleShowAnim);
            }
        };

    }, [whistle]);

    const readApe = () => {
        return (
            <img
                id="teaser_image"
                className="teaser_image"
                ref={image_reference}
                src={ape_logo}
                alt={'apebase logo'}
            ></img>
        );
    }

    const readBrand = () => {
        return <div
            id='brand'
            className='brand'
            ref={brand_reference}
        >
            <span className='ape_face' style={{"--delay": 1}}>a</span>
            <span className='ape_face' style={{"--delay": 2}}>p</span>
            <span className='ape_face' style={{"--delay": 3}}>e</span>
            <span className='ape_face' style={{"--delay": 4}}>b</span>
            <span className='ape_face' style={{"--delay": 5}}>a</span>
            <span className='ape_face' style={{"--delay": 6}}>s</span>
            <span className='ape_face' style={{"--delay": 7}}>e</span>
        </div>
    }

    const readAlert = () => {
        return <div
            id='alert'
            className='alert_hidden'
            ref={alert_reference}
        >
            COMING SOON!
        </div>
    }

    const handleShowAnim = (event) => {
        showAnim(event);
    }
    const showAnim = () => {
        if (!whistle) {
            //sound.play must bet triggered before it is loaded for IOS. User must trigger action. oncanplaythrough not allowed as trigger
            whistle_sound.play();
            setWhistle(true);
            alert_reference.current.classList.add("alert_visible");
            alert_reference.current.classList.remove("alert_hidden");
            setTimeout(() => {
                setWhistle(false);
            }, 4390);
        }
    }

    return (<div id='view'
                 className='view'
    >
        {readApe()}
        {readBrand()}
        {readAlert()}
    </div>)
}


export default LandingView;