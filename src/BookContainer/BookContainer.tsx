import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Form, FormControl, Pagination, Spinner } from 'react-bootstrap';
import { BookResult, fetchBooks } from '../api/books';
import NoResults from '../NoResults/NoResults';
import useQueryParam from '../query-param-hook/useQueryParam';
import Results from '../Results/Results';
import "./BookContainer.scss";

export default function BookContainer() {
    const [page, setPage] = useQueryParam('page', 1);
    const [isLoaded, setIsLoaded] = useState(false);
    const [result, setResult] = useState<BookResult>();
    const [filter, setFilter] = useState<string>('');


    useEffect(() => {
        // get our data
        const loadBooks = async () => {
            setIsLoaded(false);
            const result = await fetchBooks({ page, filter });
            setResult(result);
            setIsLoaded(true);
        };

        loadBooks();
    }, [page]);

    const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    }

    const gotoNextPage = (): void => {
        setPage(page + 1);
    }

    const gotoPrevPage = (): void => {
        setPage(page - 1);
    }

    const gotoFirstPage = (): void => {
        setPage(1);
    }

    const gotoLastPage = (): void => {
        setPage((result?.lastPage ?? 0));
    }

    const applyFilter = async () => {
        // get data with filter
        setPage(1);
        setIsLoaded(false);
        const result = await fetchBooks({ page, filter });
        setResult(result);
        setIsLoaded(true);
    }

    return (
        <div className="BookContainer" data-testid="container">
            <div className="SearchBar">
                <Form inline className="Search">
                    <FormControl type="text" placeholder="Enter filter" className="SearchInput" onChange={updateFilter} value={filter} role="textbox" />
                    <Button variant="outline-primary" onClick={applyFilter}>Filter</Button>
                </Form>

                <Pagination className="Pagination">
                    <Pagination.First onClick={gotoFirstPage} />
                    <Pagination.Prev disabled={page === 1} role="prev" onClick={gotoPrevPage} />
                    <Pagination.Next disabled={!result?.areMoreItems} role="next" onClick={gotoNextPage} />
                    <Pagination.Last onClick={gotoLastPage} />
                </Pagination>
            </div>
            <div className="Results">
                {!isLoaded ?
                    (
                        <Spinner animation="grow" role="loading" className="Spinner" />
                    )
                    :
                    (result && result.books.length > 0 ?
                        <Results books={result.books} />
                        : <NoResults />
                    )
                }
            </div>
        </div>
    )
}
