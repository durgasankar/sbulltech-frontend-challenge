import React from 'react';

// Reusable custom Button Component
export const CustomButton = (props) => {
    return (
        <button
            className='custom-button'
            onClick={props.onClick}
        >
            {props.buttonText}
        </button>
    )
}

// Reusable Custom Close button Component
export const CrossButton = props => {
    return (
        <button className='close-button'>
            X
        </button>
    )
}
