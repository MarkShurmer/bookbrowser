
import { render } from "@testing-library/react";
import BookContainer from "./BookContainer";
import { BookResult, BooksParams, fetchBooks } from '../api/books';
import { act } from "react-dom/test-utils";

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
        await act(async () => {
            const { getByRole } = render(<BookContainer />);
            expect(getByRole("loading")).not.toBeNull();
        })
    });

    it('should load container', async () => {
        const { findByTestId } = render(<BookContainer />);

        expect(await findByTestId("container")).not.toBeNull();
    });

    it('should be showing filter input', async () => {
        const { findByPlaceholderText } = render(<BookContainer />);

        expect(await findByPlaceholderText("Enter filter")).not.toBeNull();
    });

    it('should be showing results when there are books returned', async () => {
        (fetchBooks as jest.MockedFunction<fetchBooksFunc>).mockResolvedValue({
            areMoreItems: true, books: books
        })

        const { findByTestId } = render(<BookContainer />);

        expect(await findByTestId("results")).not.toBeNull();
    })

    it('should be showing no results when there are no books', async () => {
        (fetchBooks as jest.MockedFunction<fetchBooksFunc>).mockResolvedValueOnce({
            areMoreItems: false, books: []
        })
        const { findByTestId } = render(<BookContainer />);

        expect(await findByTestId("no-results")).not.toBeNull();
    })



})
