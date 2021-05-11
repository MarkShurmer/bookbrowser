import axios from "axios";

export const PAGE_SIZE = 20;

export type BooksParams = {
    page: number;
    filter?: string;
}

export type Book = {
    id: number;
    book_author: Array<string>;
    book_title: string;
    book_publication_year: number;
    book_publication_country: string;
    book_publication_city: string;
    book_pages: number;
}

type BookResponseData = {
    books: Array<Book>;
    count: number;
}

export type BookResult = {
    books: Array<Book>;
    areMoreItems: boolean;
    lastPage: number;
}

export const fetchBooks = async (params: BooksParams): Promise<BookResult> => {
    const {
        page = 1,
        filter
    } = params;

    try {
        const response = await axios.post<BookResponseData>('http://nyx.vima.ekt.gr:3000/api/books', {
            page,
            itemsPerPage: PAGE_SIZE,
            filters: filter ? [{ type: 'all', values: [filter] }] : undefined
        });

        const currentCount = PAGE_SIZE * page;

        return {
            books: response.data.books, areMoreItems:  response.data.count >= currentCount,
            lastPage: Math.ceil(response.data.count / PAGE_SIZE)
        };
    }
    catch (err) {
        console.error(err);
        return { books: [], areMoreItems: false, lastPage: 0 }
    }
};

