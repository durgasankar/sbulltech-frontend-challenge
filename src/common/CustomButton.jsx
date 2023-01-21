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
export const CrossButton = ({ onClick, disabled, className }) => {
    return (
        <button
            className={`close-button ${className}`}
            onClick={onClick}
            disabled={disabled}
        >X
        </button>
    )
}
