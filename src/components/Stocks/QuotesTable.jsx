import React, { useReducer, useEffect } from 'react';
import _ from 'lodash';
import { Table } from 'semantic-ui-react';
import { getFormattedDateTime } from '../../utils/DateTimeFormatter';

const quotesReducer = (state, action) => {
    switch (action.type) {
        // case 'UPDATE_QUOTES': {
        //     return {
        //         ...state,
        //         quotes: state.quotes
        //     }
        // }
        case 'CHANGE_SORT':
            if (state.column === action.column) {
                return {
                    ...state,
                    quotes: state.quotes.reverse(),
                    direction: state.direction === 'ascending' ? 'descending' : 'ascending',
                }
            }
            return {
                column: action.column,
                quotes: _.sortBy(state.quotes, [action.column]),
                direction: 'ascending',
            }
        default: throw new Error('Failed to Sort');
    }
}

const QuotesTable = ({ quotes }) => {
    const [state, dispatch] = useReducer(quotesReducer, {
        column: null,
        quotes: quotes,
        direction: null,
    });

    useEffect(() => {
        // dispatch({ quotes: quotes, type: 'UPDATE_QUOTES' });
        state.quotes = quotes;
    }, [quotes, state])

    return (
        <Table sortable celled textAlign='center'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell
                        sorted={null}
                        className='paragraph'
                    >{`Price (₹)`}
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={state.column === 'time' ? state.direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'time' })}
                        className='paragraph'
                    >Time
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={state.column === 'valid_till' ? state.direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'valid_till' })}
                        className='paragraph'
                    >Valid till
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {state.quotes.map((quote, index) => (
                    <Table.Row key={index}>
                        <Table.Cell className='paragraph'>{Number(quote?.price).toFixed(2)}</Table.Cell>
                        <Table.Cell className='paragraph'>{getFormattedDateTime(quote?.time)}</Table.Cell>
                        <Table.Cell className='paragraph'>{getFormattedDateTime(quote?.valid_till)}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

export default QuotesTable;