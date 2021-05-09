import React, { useEffect, useState } from 'react'
import { Button, Form, FormControl, Pagination, Spinner } from 'react-bootstrap';
import { BookResult, fetchBooks } from '../api/books';
import NoResults from '../NoResults/NoResults';
import useQueryParam from '../query-param-hook/useQueryParam';
import Results from '../Results/Results';
import "./BookContainer.scss";

export default function BookContainer() {
    const [page, setPage] = useQueryParam('page', '1');
    const [isLoaded, setIsLoaded] = useState(false);
    const [result, setResult] = useState<BookResult>();

    useEffect(() => {

        // get our data
        const loadBooks = async () => {
            const result = await fetchBooks({ page: parseInt(page) });
            setResult(result);
            setIsLoaded(true);
        };
        void loadBooks();
        
    }, [page]);

    if (!isLoaded) {
        return (
            <Spinner animation="grow" role="loading" />
        )
    }

    return (
        <div className="BookContainer" data-testid="container">
            <div className="SearchBar">
                <Form inline className="Search">
                    <FormControl type="text" placeholder="Enter filter" className="SearchInput" />
                    <Button variant="outline-primary">Filter</Button>
                </Form>
            </div>
            <div className="Results">
                {result && result.books.length > 0 ?
                    <Results />
                    : <NoResults />
                }
            </div>
            <div className="Pagination">
                <Pagination>
                    <Pagination.First />
                    <Pagination.Prev disabled={parseInt(page) === 0} />
                    <Pagination.Next />
                </Pagination>
            </div>
        </div>
    )
}
