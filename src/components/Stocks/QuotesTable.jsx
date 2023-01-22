import React, { useReducer } from 'react';
import _ from 'lodash';
import { Table } from 'semantic-ui-react';
import { getFormattedDateTime } from '../../utils/DateTimeFormatter';

const quotesReducer = (state, action) => {
    switch (action.type) {
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
        quotes: [...quotes],
        direction: null,
    });

    return (
        <Table sortable celled textAlign='center' className='paragraph'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell
                        sorted={null}
                    >{`Price (₹)`}
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={state.column === 'time' ? state.direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'time' })}
                    >Time
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={state.column === 'valid_till' ? state.direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'valid_till' })}
                    >Valid till
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {state.quotes.map((quote, index) => (
                    <Table.Row key={index}>
                        <Table.Cell>{quote?.price}</Table.Cell>
                        <Table.Cell>{getFormattedDateTime(quote?.time)}</Table.Cell>
                        <Table.Cell>{getFormattedDateTime(quote?.valid_till)}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

export default QuotesTable;