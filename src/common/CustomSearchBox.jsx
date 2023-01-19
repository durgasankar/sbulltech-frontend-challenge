import React from 'react';
import { Input as SymInput, Icon as SymIcon } from 'semantic-ui-react';

const CustomSearchBox = (props) => {
    return (
        <SymInput
            icon={<SymIcon
                name='search'
                circular={true}
                link={true}
            />}
            placeholder='Search stock...'
        />
    )
}

export default CustomSearchBox;