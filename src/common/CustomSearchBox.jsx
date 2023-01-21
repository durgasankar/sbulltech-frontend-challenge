import React from 'react';
import { Input as SymInput, Icon as SymIcon } from 'semantic-ui-react';

const CustomSearchBox = ({ placeholder, onChange, value }) => {
    return (
        <SymInput
            icon={<SymIcon
                name='search'
                circular={true}
                link={true}
            />}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
    )
}

export default CustomSearchBox;