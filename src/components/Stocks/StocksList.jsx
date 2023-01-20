import React, { useId } from 'react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
const getRandomNumbers = () => Math.random();
const StocksList = ({ stocks, headers }) => {
    console.log(stocks, headers);
    let id = useId();
    return (
        <>
            <Table celled>
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
                        stocks.map((stock, index) => {
                            console.log(stock);
                            return (
                                <Table.Row key={index * getRandomNumbers()}>
                                    {
                                        headers.map((header, index) => {
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
        </>
    )
}

export default StocksList;
