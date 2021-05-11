import React from "react";
import Results from "./Results";
import { render } from "@testing-library/react";

describe('Results', () => {
    const books = [
        {
            book_author: ['Mason Mount'], book_pages: 200, book_publication_country: 'UK',
            book_publication_city: 'London', book_publication_year: 2021, book_title: 'How to train dogs', id: 1
        },
        {
            book_author: ['Alex Morgan'], book_pages: 200, book_publication_country: 'UK',
            book_publication_city: 'London', book_publication_year: 2021, book_title: 'How to train people', id: 2
        }
    ];

    it('should load with empty books', () => {
        const { getByTestId } = render(<Results books={[]} />);
        expect(getByTestId("results")).not.toBeNull();
    });

    it('should display one card with 1 book', () => {
        const { getAllByTestId } = render(<Results books={books.slice(0,1)} />);
        expect(getAllByTestId("card").length).toBe(1);
    });
    
    it('should display two cards with 2 books', () => {
        const { getAllByTestId } = render(<Results books={books} />);
        expect(getAllByTestId("card").length).toBe(2);
    });
    
})
