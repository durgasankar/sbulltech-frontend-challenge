import React from 'react';

// Reusable custom Button Component
const CustomButton = (props) => {
    return (
        <button
            className='custom-button'
            onClick={props.onClick}
        >
            {props.buttonText}
        </button>
    )
}

export default CustomButton;
