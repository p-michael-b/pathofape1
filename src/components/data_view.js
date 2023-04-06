//React
import React, {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

//Fontawesome
import {faArrowUp, faArrowDown, faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';

//styles
import '../styles/data_view.css';

function DataView() {
    const navigation_reference = useRef(null);
    const button_reference = useRef(null);
    const row_reference = useRef(['yellow', 'green', 'white']);
    const column_reference = useRef(['yellow', 'green', 'white','yellow', 'green', 'white','yellow', 'green', 'white','purple']);
    const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown'];
    const color_grid = [];

    for (let i = 0; i < 10; i++) {
        const row = [];
        for (let j = 0; j < 3; j++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            row.push(color);
        }
        color_grid.push(row);
    }

    const [grid, setGrid] = useState(color_grid);
    const [navigation_available, setNavigationAvailable] = useState(true);

    const handleClick = (event) => {
        handleMouseClick(event, navigateGrid);
    }
    const handleTouch = (event) => handleTouchEnd(event, navigateGrid);
    const handleMouseClick = (event, handler) => {
        if (event.type === 'click') {
            handler(event);
        }
    };
    const handleTouchEnd = (event, handler) => {
        //Mobile hack
        event.preventDefault();
        if (event.type === 'touchend') {
            handler(event);
        }
    };

    useEffect(() => {
        if (navigation_reference.current) {
            const buttons = navigation_reference.current.childNodes;
            buttons.forEach((button) => {
                button.addEventListener('click', handleClick);
                button.addEventListener('touchend', handleTouch);
            });
            return () => {
                buttons.forEach((button) => {
                    button.removeEventListener('click', handleClick);
                    button.removeEventListener('touchend', handleTouch);
                });
            };
        }
    }, []);

    useEffect(() => {
        const buttons = navigation_reference.current.childNodes;
        buttons.forEach((button) => {
            if (navigation_available) {
                button.addEventListener('click', handleClick);
                button.addEventListener('touchend', handleTouch);
            } else {
                button.removeEventListener('click', handleClick);
                button.removeEventListener('touchend', handleTouch);
            }
        });


        return () => {
            buttons.forEach((button) => {
                button.removeEventListener('click', handleClick);
                button.removeEventListener('touchend', handleTouch);
            });
        };
    }, [navigation_available]);


    const applyClassChangeToElement = (element, method, change) => {
        element.classList[method === 'add' ? 'add' : 'remove'](change);
    }


    const switchClassChangeNorth = (method) => {
        document.querySelectorAll('.square_row').forEach((element, index) => {
            if (index === 0) {
                applyClassChangeToElement(element, method, 'animate_out_north')
            } else {
                applyClassChangeToElement(element, method, 'animate_up')
            }
        })
        applyClassChangeToElement(document.querySelector('.bottom_row'), method, 'animate_in_south');
    }

    const switchClassChangeSouth = (method) => {
        document.querySelectorAll('.square_row').forEach((element, index) => {
            if (index === grid.length - 1) {
                applyClassChangeToElement(element, method, 'animate_out_south')
            } else {
                applyClassChangeToElement(element, method, 'animate_down')
            }
        })
        applyClassChangeToElement(document.querySelector('.top_row'), method, 'animate_in_north');
    }

    const switchClassChangeWest = (method) => {
        document.querySelectorAll('.square_row').forEach((element) => {
            applyClassChangeToElement(element.childNodes[0], method, 'animate_out_west')
            applyClassChangeToElement(element.childNodes[1], method, 'animate_left')
            applyClassChangeToElement(element.childNodes[2], method, 'animate_left')
        })
        document.querySelectorAll('.right_square').forEach((element) => {
            applyClassChangeToElement(element, method, 'animate_in_east');
        })
    }

    const switchClassChangeEast = (method) => {
        document.querySelectorAll('.square_row').forEach((element) => {
            applyClassChangeToElement(element.childNodes[0], method, 'animate_right')
            applyClassChangeToElement(element.childNodes[1], method, 'animate_right')
            applyClassChangeToElement(element.childNodes[2], method, 'animate_out_east')
        })
        document.querySelectorAll('.left_square').forEach((element) => {
            applyClassChangeToElement(element, method, 'animate_in_west');
        })
    }


    const navigateNorth = () => {
        switchClassChangeNorth('add', 'north')
        setTimeout(() => {
            setNavigationAvailable(true);
            switchClassChangeNorth('remove')
            //need to make a deep copy here, else the button disablement gets circumvented by the old grid being further and further changed
            const new_grid = [...grid].slice(1);
            setGrid(() => [...new_grid, row_reference.current]);
            button_reference.current.classList.remove('ripple_stay')
        }, 330);
    }

    const navigateSouth = () => {
        switchClassChangeSouth('add')
        setTimeout(() => {
            setNavigationAvailable(true);
            switchClassChangeSouth('remove')
            //need to make a deep copy here, else the button disablement gets circumvented by the old grid being further and further changed
            const new_grid = [...grid];
            new_grid.pop();
            setGrid(() => [row_reference.current, ...new_grid]);
            button_reference.current.classList.remove('ripple_stay')
        }, 330);
    }

    const navigateWest = () => {
        switchClassChangeWest('add')
        setTimeout(() => {
            setNavigationAvailable(true);
            switchClassChangeWest('remove')
            // need to make a deep copy here, else the button disablement gets circumvented by the old grid being further and further changed
            const new_grid = [];
            grid.forEach((row, row_index) => {
               new_grid.push([row[1] ,row[2], column_reference.current[row_index]])
            });
            setGrid(() => [...new_grid]);
            button_reference.current.classList.remove('ripple_stay')
        }, 330);
    }

    const navigateEast = () => {
        switchClassChangeEast('add')
        setTimeout(() => {
            setNavigationAvailable(true);
            switchClassChangeEast('remove')
            //need to make a deep copy here, else the button disablement gets circumvented by the old grid being further and further changed
            const new_grid = [];
            grid.forEach((row, row_index) => {
                new_grid.push([column_reference.current[row_index], row[0] ,row[1] ])
            });
            setGrid(() => [...new_grid]);
            button_reference.current.classList.remove('ripple_stay')
        }, 330);
    }


    const updateRowReference = () => {
        const new_row = [];
        for (let j = 0; j < 3; j++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            new_row.push(color);
        }
        row_reference.current = new_row;
    }

    const updateColumnReference = () => {
        const new_column = [];
        for (let j = 0; j < 10; j++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            new_column.push(color);
        }
        column_reference.current = new_column;
    }
    const navigateGrid = (event) => {
        button_reference.current = event.currentTarget;
        button_reference.current.classList.add('ripple_stay')
        setNavigationAvailable(false);
        switch (parseInt(event.currentTarget.dataset.index)) {
            case (0):
                navigateNorth(event)
                updateRowReference()
                break;
            case (1) :
                navigateSouth(event)
                updateRowReference()
                break;
            case (2) :
                navigateWest(event)
                updateColumnReference()
                break;
            case (3) :
                navigateEast(event)
                updateColumnReference()
                break;
            default:
        }

    };

    const renderButton = (direction, icon, index) => {
        return <div
            className={`floating_button ${direction}`}
            data-index={index}
        >
            <div className="floating_button_bubble">
                <FontAwesomeIcon
                    icon={icon}
                    className='floating_button_icon'

                />
            </div>
        </div>
    }

    const renderSquareRow = (row, row_index) => {
        return <div
            className="square_row"
            key={row_index}
        >
            {row.map((column, column_index) => (
                renderDataSquare(column, column_index, column)
            ))}
        </div>
    }

    const renderDataSquare = (column, column_index, value) => {
        return <div
            className="data_square"
            key={column_index}
            // style={{backgroundColor: column}}
        >
            {value}
        </div>
    }

    const renderHeader = (value, index) => {
        return <div
            className="header_square"
            key={index}
        >
            {value}
        </div>
    }


    const renderGridHeader = () => {
        const headers= ['First Name', 'Second Name', 'A long address']
        return <div
            id="grid_header"
            className="grid_header"
        >
            {row_reference.current.map((column, column_index) => (
                renderHeader(headers[column_index], column_index)
            ))}
        </div>
    }

    const renderGridFooter = () => {
        const headers= ['36 rows selected', '1,399 rows total', 'Selection']
        return <div
            id="grid_footer"
            className="grid_footer"
        >
            {row_reference.current.map((column, column_index) => (
                renderHeader(headers[column_index], column_index)
            ))}
        </div>
    }



    const renderTopRow = () => {
        return <div
            id="top_row"
            className="top_row"
        >
            {row_reference.current.map((column, column_index) => (
                renderDataSquare(column, column_index, column)
            ))}
        </div>
    }

    const renderCornerSquare = () => {
        return <div
            id="corner_square"
            className="corner_square"
        >
            {renderDataSquare('white', 0)}
        </div>
    }


    const renderBottomRow = () => {
        return <div
            id="bottom_row"
            className="bottom_row"
        >
            {row_reference.current.map((column, column_index) => (
                renderDataSquare(column, column_index, column)
            ))}
        </div>
    }


    const renderLeftColumn = () => {
        return <div
            id="left_container"
            className="side_container"
        >
            {renderCornerSquare()}
            <div
                id="left_grid"
                className="side_grid"
            >

                {column_reference.current.map((row, row_index) => (
                    renderLeftSquare(row, row_index)
                ))}
            </div>
            {renderCornerSquare()}
        </div>

    }

    const renderRightColumn = () => {
        return <div
            id="right_container"
            className="side_container"
        >
            {renderCornerSquare()}
            <div
                id="right_grid"
                className="side_grid"
            >

                {column_reference.current.map((row, row_index) => (
                    renderRightSquare(row,row_index)
                ))}
            </div>
            {renderCornerSquare()}
        </div>
    }


    const renderLeftSquare = (row, index) => {
        return <div
            className="left_square"
            key={index}
            // style={{backgroundColor: row}}
        >
            {row}
        </div>
    }

    const renderRightSquare = (row, index) => {
        return <div
            className="right_square"
            key={index}
            // style={{backgroundColor: row}}
        >
            {row}
        </div>
    }


    const renderDataGrid = () => {
        return <div
            id='grid_container'
            className='grid_container'
        >
            {renderGridHeader()}
            {renderTopRow()}
            {renderGrid()}
            {renderBottomRow()}
            {renderGridFooter()}
        </div>
    }

    const renderGrid = () => {
        return <div
            id='data_grid'
            className='data_grid'
        >

            {grid.map((row, row_index) => (
                renderSquareRow(row, row_index)
            ))}
            <div
                id='button_container'
                className='button_container'
                ref={navigation_reference}
            >
                {renderButton('north_button', faArrowUp, 0)}
                {renderButton('south_button', faArrowDown, 1)}
                {renderButton('west_button', faArrowLeft, 2)}
                {renderButton('east_button', faArrowRight, 3)}
            </div>
        </div>
    }

    return (
        <div
            id='view'
            className='view'
        >
            <div
                id='view_container'
                className='view_container'
            >
                {renderLeftColumn()}
                {renderDataGrid()}
                {renderRightColumn()}
            </div>
        </div>)
}


export default DataView;