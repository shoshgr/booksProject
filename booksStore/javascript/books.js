let books, length;
window.onload = function () {
    let currentPage = 1;
    const itemsPerPage = 5;



    async function fetchBooks() {
        try {
            const response = await fetch('http://localhost:8080/books');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            books = await response.json();
            console.log(books);
            length = books.length;
            displayBooks();
            return books;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return [];
        }
    }

    function setupPagination(totalItems) {
        document.getElementById("prevPage").disabled = currentPage === 1;
        document.getElementById("nextPage").disabled = currentPage === Math.ceil(totalItems / itemsPerPage);
    }

    function displayBooks() {
        setupPagination(length);
        const bookList = document.getElementById('book-list');
        bookList.innerHTML = '';

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, books.length);
        const paginatedBooks = books.slice(startIndex, endIndex);

        paginatedBooks.forEach(book => {
            const row = document.createElement('tr');

            row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td>${book.status ? 'Read' : 'Not Read'}</td>
            <td>
                <button class="update-button" data-book='${JSON.stringify(book)}'>
                    <i class="fas fa-edit"></i> <!-- אייקון של עדכון -->
                </button>
                <button class="delete-button" data-id="${book.id}">
                    <i class="fas fa-trash"></i> <!-- אייקון של מחיקה -->
                </button>
                <button class="show-button" data-book='${JSON.stringify(book)}'>
                    <i class="fas fa-eye"></i> <!-- אייקון של צפייה -->
                </button>
            </td>
        `;
            bookList.appendChild(row);
        });

        document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${Math.ceil(books.length / itemsPerPage)}`;
        addEventListeners();
    }



    document.getElementById("prevPage").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            displayBooks()
        }
    });

    document.getElementById("nextPage").addEventListener("click", () => {
        currentPage++;
        displayBooks();
    });


    fetchBooks();

    document.getElementById("sortPrice").addEventListener("change", () => {
        const sortOrder = document.getElementById("sortPrice").value;
        sortBooksByPrice(sortOrder);
    });

    function sortBooksByPrice(order) {
        const sortedBooks = books.sort((a, b) => {
            return order === "asc" ? a.price - b.price : b.price - a.price;
        });
        displayBooks(sortedBooks);
        setupPagination(sortedBooks.length);
    }




    function updateBook(book) {
        const formContainer = document.getElementById('formContainer');
        formContainer.style.display = "block";

        document.getElementById("addBtn").style.display = "none";
        document.getElementById("updateBtn").style.display = "block";
        document.getElementById('bookId').value = book.id;
        document.getElementById('bookTitle').value = book.title;
        document.getElementById('bookPrice').value = book.price;
        document.getElementById('bookImageUrl').value = book.image;
        document.getElementById('bookImageUrl').ariaReadOnly;
    }

    function deleteBook(id) {
        if (confirm(`Are you sure you want to delete book with ID: ${id}?`)) {
            fetch(`http://localhost:8080/books/${id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    console.log(`Book with ID: ${id} deleted successfully.`);
                    fetchBooks();
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }
    }
    let showContainer, bookImage, imageTitle, bookPrice

    function showBook(book) {
        showContainer = document.getElementById('showContainer');
        bookImage = document.getElementById('bookImage');
        imageTitle = document.getElementById('imageTitle');
        bookPrice = document.getElementById('bookPrice');
        bookPrice.innerHTML = "price : $" + book.price;

        bookImage.src = book.image;

        imageTitle.textContent = book.title;

        showContainer.style.display = "flex";

        showContainer.setAttribute('data-book-id', book.id);
        loadRating(book.id);
    }

    document.getElementById('closeShowContainer').addEventListener('click', function () {
        document.getElementById('showContainer').style.display = 'none';
    });

    function addEventListeners() {
        const updateButtons = document.querySelectorAll('.update-button');
        const deleteButtons = document.querySelectorAll('.delete-button');
        const showButtons = document.querySelectorAll('.show-button');

        updateButtons.forEach(button => {
            button.addEventListener('click', function () {
                const book = JSON.parse(this.dataset.book);
                updateBook(book);
            });
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const id = this.dataset.id;
                deleteBook(id);
            });
        });

        showButtons.forEach(button => {
            button.addEventListener('click', function () {
                const book = JSON.parse(this.dataset.book);
                showBook(book);
            });
        });
    }

    document.getElementById('addButton').addEventListener('click', function () {
        const formContainer = document.getElementById('formContainer');

        document.getElementById('bookId').value = "";
        document.getElementById('bookTitle').value = "";
        document.getElementById('bookPrice').value = "";
        document.getElementById('bookImageUrl').value = "";
        formContainer.style.display = formContainer.style.display === "none" ? "block" : "none";
    });

    document.getElementById('closeForm').addEventListener('click', function () {
        document.getElementById('formContainer').style.display = "none";
    });

    document.querySelector('.form').addEventListener('submit', function (event) {
        event.preventDefault();

        const bookId = document.getElementById('bookId').value;
        const bookTitle = document.getElementById('bookTitle').value;
        const bookPrice = document.getElementById('bookPrice').value;
        const bookImageUrl = document.getElementById('bookImageUrl').value;

        const bookData = {
            id: bookId,
            title: bookTitle,
            price: bookPrice,
            imageUrl: bookImageUrl
        };

        if (document.getElementById("updateBtn").style.display === "block") {

            fetch(`http://localhost:8080/books/${bookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Book updated successfully:', data);
                    document.getElementById('formContainer').style.display = "none";
                    fetchBooks();
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        } else {

            fetch('http://localhost:8080/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Book added successfully:', data);
                    document.getElementById('formContainer').style.display = "none";
                    fetchBooks();
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }
    });

    fetchBooks();
};

function loadRating(bookId) {
    const savedRatings = JSON.parse(localStorage.getItem('userRatings')) || {};
    const rating = savedRatings[bookId] || 0;
    setRating(bookId, rating);
}

function setRating(bookId, rating) {
    const stars = document.querySelectorAll(`#showContainer[data-book-id="${bookId}"] .star`);

    stars.forEach(s => {
        s.classList.remove('selected');
        if (s.getAttribute('data-value') <= rating) {
            s.classList.add('selected');
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.star');

    stars.forEach(star => {
        star.addEventListener('click', function () {
            const bookId = document.getElementById('showContainer').getAttribute('data-book-id');
            const rating = this.getAttribute('data-value');

            const savedRatings = JSON.parse(localStorage.getItem('userRatings')) || {};
            savedRatings[bookId] = rating;
            localStorage.setItem('userRatings', JSON.stringify(savedRatings));

            setRating(bookId, rating);
            console.log(`Selected rating for book ${bookId}: ${rating}`);
        });
    });
});
