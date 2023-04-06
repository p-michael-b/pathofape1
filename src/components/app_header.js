//React
import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

//Fontawesome
import {faMap} from '@fortawesome/free-regular-svg-icons'
import {faCampground, faCoins, faTableCells, faUserAstronaut} from '@fortawesome/free-solid-svg-icons'

//local components
import ApeMenu from './ape_menu.js';

//styles
import '../styles/app_header.css';

//assets
import ape_mini from "../images/ape_mini.png";

function AppHeader(props) {
    const [right_icon, setRightIcon] = useState(faMap);
    const right_reference = useRef(null)
    const {page, setPage, view, setView, ape_open, setApeOpen, blurView, sharpenView} = props;
    useEffect(() => {
        // preload Images and Audio
        const img = new Image()
        img.src = ape_mini
    }, [])

    useEffect(() => {
        if (right_reference.current) {
            let icon;
            switch (page) {
                case ('base'):
                    icon = faCampground;
                    break;
                case ('stakes') :
                    icon = faCoins;
                    break;
                case ('data') :
                    icon = view === 'space' ? faMap : faTableCells;
                    break;
                case ('ape') :
                    icon = faUserAstronaut;
                    break;
                default:
                    icon = faCampground;
            }
            setRightIcon(icon)
        }
    }, [page, view]);
    const handleMouseClick = (event, handler, index) => {
        if (event.type === 'click') {
            handler(event, index);
        }
    };
    const handleTouchEnd = (event, handler, index) => {
        //Mobile hack
        event.preventDefault();
        if (event.type === 'touchend') {
            handler(event, index);
        }
    };
    const handleApeOpen = () => {
        setApeOpen(true);
        blurView();
    };
    const handleApeClose = () => {
        setApeOpen(false);
        sharpenView();
    };
    const toggleView = () => {
        if (page === 'data') {
            let toggle = view === 'space' ? 'grid' : 'space';
            setView(toggle);
        }
    };
    const readApeIcon = () => {
        return <img
            id='ape_icon'
            className='ape_icon'
            src={ape_mini}
            onClick={(event) => handleMouseClick(event, handleApeOpen)}
            onTouchEnd={(event) => handleTouchEnd(event, handleApeOpen)}
            alt='Apebase Icon'
        />
    }
    const renderMenuModal = () => {
        if (ape_open) {
            return <ApeMenu
                ape_open={ape_open}
                setPage={setPage}
                setView={setView}
                handleApeOpen={handleApeOpen}
                handleApeClose={handleApeClose}
            />
        }
    }
    const renderLeftHeader = () => {
        return <div
            id='left_header'
            className='left_header'
        >
            {readApeIcon()}
            {renderMenuModal()}
        </div>
    }
    const renderCenterHeader = () => {
        return <div
            id='center_header'
            className='center_header'
        >
            WelComE To tHe JuNgLE
        </div>
    };
    const renderRightHeader = () => {
        if (page !== 'landing') {
            return <div
                id='right_header'
                className='right_header'
                onClick={(event) => handleMouseClick(event, toggleView)}
                onTouchEnd={(event) => handleTouchEnd(event, toggleView)}
            >
                <svg
                    id='view_icon'
                    className='view_icon'
                    ref={right_reference}
                >
                    <FontAwesomeIcon
                        id='right_icon'
                        className='right_icon'
                        icon={right_icon}
                        size="2xs"
                    />
                </svg>
            </div>
        }
    }


    return (
        <div
            id='header_container'
            className='header_container'
        >
            {renderLeftHeader()}
            {renderCenterHeader()}
            {renderRightHeader()}
        </div>
    );
}

export default AppHeader;