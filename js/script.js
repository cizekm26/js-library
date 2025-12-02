let myLibrary = [];

function Book(id, title, author, pages, isRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.read = function() {
    this.isRead = true;
}

function addBookToLibrary(title, author, pages) {
    let id = crypto.randomUUID();
    myLibrary.push(new Book(id, title, author, pages, false));
}

function displayBooks() {
    const table = document.querySelector("#js-table");
    table.innerHTML = '';
    myLibrary.forEach(book => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', book.id);
        const titleColumn = document.createElement('td');
        const authorColumn = document.createElement('td');
        const pagesColumn = document.createElement('td');
        const actionsColumn = document.createElement('td');
        const readColumn = document.createElement('td');
        const removeButton = document.createElement('button');
        const viewButton = document.createElement('button');
        titleColumn.textContent = book.title;
        authorColumn.textContent = book.author;
        pagesColumn.textContent = book.pages;
        readColumn.textContent = book.isRead;
        removeButton.textContent = 'Remove';
        viewButton.textContent = 'Read';
        removeButton.setAttribute('class', 'removeBtn');
        viewButton.setAttribute('class', 'readBtn');
        actionsColumn.appendChild(removeButton);
        actionsColumn.appendChild(viewButton);
        removeButton.addEventListener("click", () => {
            const bookId = removeButton.closest("tr").getAttribute('data-id');
            myLibrary = myLibrary.filter(book => book.id !== bookId);
            displayBooks();
        });
        viewButton.addEventListener("click", () => {
            const bookId = removeButton.closest("tr").getAttribute('data-id');
            book = myLibrary.find(book => book.id === bookId);
            book.read();
            displayBooks();
        });
        row.appendChild(titleColumn);
        row.appendChild(authorColumn);
        row.appendChild(pagesColumn);
        row.appendChild(readColumn);
        row.appendChild(actionsColumn);
        table.appendChild(row);
    });
}

const addBtn = document.getElementById("addBtn");
const bookDialog = document.getElementById("bookDialog");
const saveBtn = document.getElementById("saveBtn");
const removeButtons = document.getElementsByClassName("remove-btn");


addBtn.addEventListener("click", () => {
    bookDialog.showModal();
});

saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;
    const pages = document.getElementById("bookPages").value;
    addBookToLibrary(title, author, pages);
    displayBooks();
    bookDialog.close();
});