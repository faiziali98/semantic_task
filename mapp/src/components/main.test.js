import App from "./main";
import {render, fireEvent} from '@testing-library/react';


const mockedPromise = jest.fn();

jest.mock('react-graph-vis', () => ({
    __esModule: true,
    default: (params) => mockedPromise(params),
}));

describe("Test for App", () => {
    test('Testing components by text', () => {
        const { queryByText } = render(
            <App />,
        );
    
        expect(queryByText('Page Rank and Graph')).toBeTruthy();
        expect(queryByText('Node:')).toBeTruthy();
        expect(queryByText('Edge:')).toBeTruthy();
        expect(queryByText('Rounds:')).toBeTruthy();
    });

    test('Testing components By Role', () => {
        const { queryAllByRole } = render(
            <App />,
        );
        const buttons = queryAllByRole('button');
        expect(buttons).toHaveLength(3);
    });
})