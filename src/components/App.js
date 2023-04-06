//React
import React, {useState, useEffect, useRef} from 'react';

//local components
import AppHeader from './app_header.js';
import LandingView from './landing_view.js';
import BaseView from './base_view.js';
import StakeView from './stake_view.js';
import DataView from './data_view.js';
import ApeView from './ape_view.js';

//styles
import '../styles/App.css';

//assets
import background_image from '../images/jungle_background.png';


function App() {
    const [state, setState] = useState({
        background: background_image,
        page: 'landing',
        view: 'grid',
        ape_open: false,
    });

    const bg_reference = useRef(null)

    useEffect(() => {
        const bg = new Image()
        bg.src = background_image
        bg.onload = () => {
            setState(prevState => ({ ...prevState, background: background_image }));
        }
    }, [])
    const blurView = () => {
        if (bg_reference.current) {
            bg_reference.current.classList.remove("sharpened");
            bg_reference.current.classList.add("blurred");
        }
    }
    const sharpenView = () => {
        if (bg_reference.current) {
            bg_reference.current.classList.remove("blurred");
            bg_reference.current.classList.add("sharpened");
        }
    }
    const renderView = () => {
        if (state.page === 'landing') {
            return <LandingView
            />
        }
        if (state.page === 'base') {
            return <BaseView
            />
        }
        if (state.page === 'stakes') {
            return <StakeView
            />
        }
        if (state.page === 'data') {
            return <DataView
            />
        }
        if (state.page === 'ape') {
            return <ApeView
            />
        }
    }

    return (
        <div
            id='background'
            className='background'
            ref={bg_reference}
            style={{backgroundImage: `url(${state.background})`}}
        >
            <AppHeader
                view={state.view}
                setView={view => setState(prevState => ({ ...prevState, view }))}
                page={state.page}
                setPage={page => setState(prevState => ({ ...prevState, page }))}
                ape_open={state.ape_open}
                setApeOpen={ape_open => setState(prevState => ({ ...prevState, ape_open }))}
                blurView={blurView}
                sharpenView={sharpenView}
            />
            {renderView()}
        </div>
    );
}
export default App;
