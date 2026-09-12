import React from 'react';
import BookCards, { BookCardData } from './components/BookCards';

function App() {
  return (
    <div className="App p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">おすすめの本</h1>
      {BookCardData.map((book) => (
        <BookCards
          key={book.id}
          title={book.title}
          author={book.author}
          rating={book.rating}
          comment={book.comment}
        />
      ))}
    </div>
  );
}

export default App;