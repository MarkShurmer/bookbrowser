import axios from "axios";


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
}

export const fetchBooks = async (params: BooksParams): Promise<BookResult> => {
    const {
        page = 1,
        filter
    } = params;

    const response = await axios.post<BookResponseData>('http://nyx.vima.ekt.gr:3000/api/books', {
        page,
        itemsPerPage: 20,
        filters: filter ? [{type: 'all', values: [filter]}] : undefined
    });

    const currentCount = 20 * page;

    return { books: response.data.books, areMoreItems: currentCount >= response.data.count };
};

