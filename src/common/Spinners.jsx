import React from 'react';
import { MetroSpinner } from "react-spinners-kit";
import { Segment, Loader, Dimmer, Image } from 'semantic-ui-react';
import blur_image from '../assets/images/short_aparagraph.png';

/**
 * Whole page loading spinner
 * @returns MetroSpinner
 */
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

/**
 * Symantic UI Blury image spinner
 * @returns BlurtImage Spinner
 */
export const BlurImageLoadingSpinner = () => {
    return (
        <Segment >
            <Dimmer active inverted>
                <Loader indeterminate inverted
                    content={<h4 className='paragraph'>Loading...Please wait!</h4>} />
            </Dimmer>
            <Image src={blur_image} />
        </Segment>
    )
}