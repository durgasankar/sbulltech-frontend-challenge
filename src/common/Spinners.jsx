import React from 'react';
import { MetroSpinner } from "react-spinners-kit";

export const PageLoadingSpinner = () => {
    const isLoading = true;
    return (
        <div className="spinner-container">
            <div className="spinner-container--spinner">
                <MetroSpinner size={50}
                    color="#006CE6"
                    loading={isLoading}
                />
            </div>
        </div>
    )
};