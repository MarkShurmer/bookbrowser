import React from 'react'
import { Card} from 'react-bootstrap'
import { Book } from '../api/books';
import './Results.scss';

type ResultsProps = {
    books: Array<Book>;
}


export default function Results(props: ResultsProps) {
    const { books } = props;

    return (
        <div data-testid="results" className="Results">
            {books.map(book => (
                <Card border="primary" key={book.id} className="Book" data-testid="card">
                    <Card.Body>
                        <Card.Title className="h6">{book.book_title}</Card.Title>
                        <Card.Text className="Line">
                            Authors:{book.book_author.map((bookAuthor, index) => bookAuthor)}
                        </Card.Text>
                        <Card.Text className="Line">Pages: {book.book_pages}</Card.Text>
                        <Card.Text className="Line">
                            Publication year: {book.book_publication_year}
                        </Card.Text>
                        <Card.Text className="Line">
                            Publication country: {book.book_publication_country}
                        </Card.Text>
                        <Card.Text className="Line">
                            Publication city: {book.book_publication_city}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
       </div>
    )
}
