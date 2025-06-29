import previous_assignment from './assignment-1';
;
async function listBooks(filters) {
    return await previous_assignment.listBooks(filters);
}
async function createOrUpdateBook(book) {
    const result = await fetch('http://localhost:3000/books', {
        method: 'POST',
        body: JSON.stringify(book),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (result.ok) {
        const res = await result.json();
        return res.id;
    }
    else {
        throw new Error('Failed to create or update book');
    }
}
async function removeBook(book) {
    const result = await fetch(`http://localhost:3000/books/${book}`, { method: 'DELETE' });
    if (!result.ok) {
        throw new Error('Failed to create or update book');
    }
}
const assignment = 'assignment-2';
export default {
    assignment,
    createOrUpdateBook,
    removeBook,
    listBooks
};
