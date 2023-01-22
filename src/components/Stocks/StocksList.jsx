import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Pagination } from 'semantic-ui-react';
import { getFormattedDateTime } from '../../utils/DateTimeFormatter';
import { StocksSearchContext } from '../../context/StocksSearchContext';
import QuotesModal from './QuotesModal';

// generate random numbers between 0 to 1
const getRandomNumbers = () => Math.random();

const totalPages = (totalCount, dataPerPage) => {
    const remainder = totalCount % dataPerPage;
    // efficient logic
    if (remainder < Math.round(dataPerPage / 2) && remainder > 0)
        return Math.round(totalCount / dataPerPage) + 1;
    return Math.round(totalCount / dataPerPage);
};

const StocksList = ({ headers, stocks }) => {
    const ROWS_PER_PAGE = 8;
    const INITIAL_ACTIVE_PAGINATION = 1;
    const { stockSearchData } = useContext(StocksSearchContext);

    const [currentActivePagination, setCurrentActivePagination] = useState(INITIAL_ACTIVE_PAGINATION);
    const [isQuotesModalOpen, setQuotesModalOpen] = useState(false);

    const filteredStocksLength = stocks.filter(stock =>
        stock.Symbol?.toLowerCase().includes(stockSearchData)
        || stock.Name?.toLowerCase().includes(stockSearchData)).length;

    const changePage = (event, data) => setCurrentActivePagination(data.activePage);

    const getQuotes = () => setQuotesModalOpen(!isQuotesModalOpen);

    return (
        <>
            <Table celled selectable className='paragraph' >
                <Table.Header>
                    <Table.Row>
                        {
                            headers.map((header, index) => {
                                return (<Table.HeaderCell className='paragraph' key={index}>{header}</Table.HeaderCell>)
                            })
                        }
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        stocks.filter(stock =>
                            stock.Symbol?.toLowerCase().includes(stockSearchData)
                            || stock.Name?.toLowerCase().includes(stockSearchData))
                            .slice((currentActivePagination - 1) * ROWS_PER_PAGE, currentActivePagination * ROWS_PER_PAGE)
                            .map((stock, index) => {
                                return (
                                    <Table.Row key={index * getRandomNumbers()}>
                                        {
                                            headers.map((header, index) => {
                                                if (header === 'Symbol') {
                                                    return (
                                                        <Table.Cell onClick={getQuotes} className='paragraph cell__symbol' key={index * getRandomNumbers()}>
                                                            <Link to={{
                                                                pathname: `/quotes/${stock['Symbol']}`
                                                            }}
                                                                state={{
                                                                    name: stock['Name'],
                                                                    // validTill: stock['Validtill']
                                                                }}
                                                            >
                                                                <span className='cell__symbol--link'>
                                                                    {stock[header]}
                                                                </span>
                                                            </Link>
                                                        </Table.Cell>
                                                    )
                                                }
                                                if (header === 'Validtill') {
                                                    return (
                                                        <Table.Cell className='paragraph' key={index * getRandomNumbers()} >
                                                            {getFormattedDateTime(stock[header])}
                                                        </Table.Cell>
                                                    )
                                                }
                                                return (
                                                    <Table.Cell className='paragraph' key={index * getRandomNumbers()} >
                                                        {stock[header]}
                                                    </Table.Cell>
                                                )
                                            })
                                        }
                                    </Table.Row>
                                )
                            })
                    }
                </Table.Body>
                {
                    filteredStocksLength > 0
                        ? <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan={headers.length}>
                                    <Pagination
                                        boundaryRange={0}
                                        activePage={currentActivePagination}
                                        ellipsisItem={null}
                                        firstItem={null}
                                        lastItem={null}
                                        siblingRange={3}
                                        totalPages={totalPages(filteredStocksLength, ROWS_PER_PAGE)}
                                        onPageChange={changePage}
                                    // size='mini'
                                    />
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                        : <span className='heading-terciary no-results-found'>Oops! No Results Found.</span>
                }
            </Table>
            {
                isQuotesModalOpen &&
                <QuotesModal isQuotesModalOpen={isQuotesModalOpen} setQuotesModalOpen={setQuotesModalOpen} />
            }
        </>
    )
}

export default StocksList;
