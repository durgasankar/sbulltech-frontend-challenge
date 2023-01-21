import React, { useContext, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import sbullLogo from '../assets/images/sensibull_logo.png';
import CustomSearchBox from './CustomSearchBox';
import { CustomButton } from './CustomButton';
import { StocksSearchContext } from '../context/StocksSearchContext';

export default function Header() {
    const { updateStockSearchData } = useContext(StocksSearchContext);
    const [search, setSearch] = useState('');
    // for reducing load on capturing event on everyOnchange event
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedStockSearch = useMemo(() => debounce(updateStockSearchData, 400), []);

    const handlesearchStocks = (event) => {
        const searchData = event.target.value;
        setSearch(searchData);
        debouncedStockSearch(searchData);
    }

    return (
        <header className="header">
            <div className="header__logo">
                <img src={sbullLogo} alt="sensibull-logo" className='header__logo--image' />
            </div>
            <div className="header__search">
                <CustomSearchBox
                    placeholder='Search stock...'
                    onChange={handlesearchStocks}
                    value={search}
                />
            </div>
            <div className="header__login">
                <CustomButton
                    buttonText='LOGIN'
                />
            </div>
        </header>
    )
}
