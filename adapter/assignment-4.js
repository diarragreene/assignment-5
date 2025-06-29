import previous_assignment from './assignment-3';
;
;
// If multiple filters are provided, any book that matches at least one of them should be returned
// Within a single filter, a book would need to match all the given conditions
async function listBooks(filters) {
    return await previous_assignment.listBooks(filters);
}
async function createOrUpdateBook(book) {
    return await previous_assignment.createOrUpdateBook(book);
}
async function removeBook(book) {
    await previous_assignment.removeBook(book);
}
async function lookupBookById(book) {
    const result = await fetch(`http://localhost:3000/books/${book}`);
    if (result.ok) {
        return await result.json();
    }
    else {
        throw new Error('Couldnt Find Book');
    }
}
async function placeBooksOnShelf(bookId, numberOfBooks, shelf) {
    const result = await fetch(`http://localhost:3000/warehouse/${bookId}/${shelf}/${numberOfBooks}`, { method: 'put' });
    if (!result.ok) {
        throw new Error('Couldnt Place on Shelf');
    }
}
async function orderBooks(order) {
    const result = await fetch('http://localhost:3000/order', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order })
    });
    if (!result.ok) {
        throw new Error('Couldnt Place on Shelf');
    }
    return { orderId: await result.text() };
}
async function findBookOnShelf(book) {
    const result = await fetch(`http://localhost:3000/warehouse/${book}`);
    if (result.ok) {
        const results = (await result.json());
        const shelfArray = [];
        for (const shelf of Object.keys(results)) {
            shelfArray.push({
                shelf,
                count: results[shelf]
            });
        }
        return shelfArray;
    }
    else {
        throw new Error('Couldnt Find Book');
    }
}
async function fulfilOrder(order, booksFulfilled) {
    const result = await fetch(`http://localhost:3000/fulfil/${order}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booksFulfilled)
    });
    if (!result.ok) {
        throw new Error(`Couldnt Fulfil ${await result.text()}`);
    }
}
async function listOrders() {
    const result = await fetch('http://localhost:3000/order');
    if (result.ok) {
        return await result.json();
    }
    else {
        throw new Error('Couldnt Find Book');
    }
}
const assignment = 'assignment-4';
export default {
    assignment,
    createOrUpdateBook,
    removeBook,
    listBooks,
    placeBooksOnShelf,
    orderBooks,
    findBookOnShelf,
    fulfilOrder,
    listOrders,
    lookupBookById
};
