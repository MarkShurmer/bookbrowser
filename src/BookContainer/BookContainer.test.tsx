
import { fireEvent, render, waitFor } from "@testing-library/react";
import BookContainer from "./BookContainer";
import { BookResult, BooksParams, fetchBooks } from '../api/books';

jest.mock('../api/books');

type fetchBooksFunc = (params: BooksParams) => Promise<BookResult>;

describe('Book Container', () => {

    const books = [
        {
            book_author: ['Mason Mount'], book_pages: 200, book_publication_country: 'UK',
            book_publication_city: 'London', book_publication_year: 2021, book_title: 'How to train dogs', id: 1
        }
    ];

    it('should show spinner', async () => {
        const { getByRole } = render(<BookContainer />);
        await waitFor(() => expect(getByRole("loading")).not.toBeNull());
    });

    it('should load container', async () => {
        const { getByTestId } = render(<BookContainer />);

        await waitFor(() => expect(getByTestId("container")).not.toBeNull());
    });

    it('should be showing filter input', async () => {
        const { getByPlaceholderText } = render(<BookContainer />);

        await waitFor(() => expect(getByPlaceholderText("Enter filter")).not.toBeNull());
    });

    it('should be showing results when there are books returned', async () => {

        (fetchBooks as jest.MockedFunction<fetchBooksFunc>).mockResolvedValue({
            areMoreItems: true, books: books, lastPage: 1
        })

        const { getByTestId } = render(<BookContainer />);

        await waitFor(() => expect(getByTestId("results")).not.toBeNull());
    })

    it('should be showing no results when there are no books', async () => {
        (fetchBooks as jest.MockedFunction<fetchBooksFunc>).mockResolvedValueOnce({
            areMoreItems: false, books: [], lastPage: 0
        })
        const { getByTestId } = render(<BookContainer />);

        await waitFor(() => expect(getByTestId("no-results")).not.toBeNull());
    })

    it('should disable prev button when on first page', async () => {
        const { getByRole } = render(<BookContainer />);

        await waitFor(() => expect(getByRole("prev").attributes["disabled"]).toBeTruthy());
    });

    it('should not disable prev button when on another page', async () => {
        // set the url
        delete window.location;
        window.location = new URL('https://www.example.com?page=2');

        // now create the component
        const { getByRole } = render(<BookContainer />);

        // check the button
        await waitFor(() => expect(getByRole("prev").attributes["disabled"]).toBeFalsy());
    });

    it('should not disable next button when not on last page', async () => {
        (fetchBooks as jest.MockedFunction<fetchBooksFunc>).mockResolvedValue({
            areMoreItems: false, books: books, lastPage: 2
        });
        const { getByRole } = render(<BookContainer />);

        await waitFor(() => expect(getByRole("next").attributes["disabled"]).toMatchObject({}));
    });

    it('should disable next button when on last page', async () => {
        (fetchBooks as jest.MockedFunction<fetchBooksFunc>).mockResolvedValue({
            areMoreItems: false, books: books, lastPage: 1
        });
        // set the url
        delete window.location;
        window.location = new URL('https://www.example.com?page=1');

        // now create the component
        const { getByRole } = render(<BookContainer />);

        // check the button
        await waitFor(() => expect(getByRole("next").attributes["disabled"]).toBeTruthy());
    });

    it('should apply filter when filter is clicked', () => {
        (fetchBooks as jest.MockedFunction<fetchBooksFunc>).mockResolvedValue({
            areMoreItems: false, books: books, lastPage: 1
        });

        // now create the component
        const { getByText } = render(<BookContainer />);

        fireEvent.click(getByText('Filter'));

        expect(fetchBooks).toHaveBeenCalledWith({ "filter": "", "page": 1 });

    });
});
