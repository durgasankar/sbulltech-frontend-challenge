import React, { useContext } from 'react';
import { Icon, Menu, Table } from 'semantic-ui-react';
import { getFormattedDateTime } from '../../utils/DateTimeFormatter';
import { StocksSearchContext } from '../../context/StocksSearchContext';

const getRandomNumbers = () => Math.random();

const StocksList = ({ headers, stocks }) => {
    const { stockSearchData } = useContext(StocksSearchContext);
    console.log(stockSearchData);
    // console.log(stocks, headers);
    return (
        <Table celled selectable>
            <Table.Header>
                <Table.Row>
                    {
                        headers.map((header, index) => {
                            return (<Table.HeaderCell key={index}>{header}</Table.HeaderCell>)
                        })
                    }
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    stocks
                        .filter(stock =>
                            stock.Symbol?.toLowerCase().includes(stockSearchData)
                            || stock.Name?.toLowerCase().includes(stockSearchData))
                        .map((stock, index) => {
                            return (
                                <Table.Row key={index * getRandomNumbers()}>
                                    {
                                        headers.map((header, index) => {
                                            if (header === 'Validtill') {
                                                return (
                                                    <Table.Cell key={index * getRandomNumbers()} >{getFormattedDateTime(stock[header])}</Table.Cell>
                                                )
                                            }
                                            return (
                                                <Table.Cell key={index * getRandomNumbers()} >{stock[header]}</Table.Cell>
                                            )
                                        })
                                    }
                                </Table.Row>
                            )
                        })
                }
            </Table.Body>

            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='3'>
                        <Menu floated='right' pagination>
                            <Menu.Item as='a' icon>
                                <Icon name='chevron left' />
                            </Menu.Item>
                            <Menu.Item as='a'>1</Menu.Item>
                            <Menu.Item as='a'>2</Menu.Item>
                            <Menu.Item as='a'>3</Menu.Item>
                            <Menu.Item as='a'>4</Menu.Item>
                            <Menu.Item as='a' icon>
                                <Icon name='chevron right' />
                            </Menu.Item>
                        </Menu>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    )
}

export default StocksList;
