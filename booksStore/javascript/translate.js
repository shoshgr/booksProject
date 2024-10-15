const translations = {
    en: {
        add: 'ADD',
        sortPrice: 'Sort by Price:',
        priceLowHigh: 'Price: Low to High',
        priceHighLow: 'Price: High to Low',
        previous: 'Previous',
        next: 'Next',
        id: 'ID',
        title: 'Title',
        price: 'Price',
        status: 'Status',
        actions: 'Actions',
        addBook: 'Add Book',
        updateBook: 'Update Book',
        close: 'Close',
        image: 'Image URL',
    },
    he: {
        add: 'הוסף',
        sortPrice: 'מיין לפי מחיר:',
        priceLowHigh: 'מחיר: נמוך לגבוה',
        priceHighLow: 'מחיר: גבוה לנמוך',
        previous: 'הקודם',
        next: 'הבא',
        id: 'מזהה',
        title: 'כותרת',
        price: 'מחיר',
        status: 'סטטוס',
        actions: 'פעולות',
        addBook: 'הוסף ספר',
        updateBook: 'עדכן ספר',
        close: 'סגור',
        image: 'כתובת תמונה',
    },
    es: {
        add: 'AÑADIR',
        sortPrice: 'Ordenar por precio:',
        priceLowHigh: 'Precio: Bajo a Alto',
        priceHighLow: 'Precio: Alto a Bajo',
        previous: 'Anterior',
        next: 'Siguiente',
        id: 'ID',
        title: 'Título',
        price: 'Precio',
        status: 'Estado',
        actions: 'Acciones',
        addBook: 'Añadir Libro',
        updateBook: 'Actualizar Libro',
        close: 'Cerrar',
        image: 'URL de la imagen',
    },
    fr: {
        add: 'AJOUTER',
        sortPrice: 'Trier par prix:',
        priceLowHigh: 'Prix: Bas à Haut',
        priceHighLow: 'Prix: Haut à Bas',
        previous: 'Précédent',
        next: 'Suivant',
        id: 'ID',
        title: 'Titre',
        price: 'Prix',
        status: 'Statut',
        actions: 'Actions',
        addBook: 'Ajouter un Livre',
        updateBook: 'Mettre à Jour',
        close: 'Fermer',
        image: 'URL de l\'image',
    },
};

document.getElementById('languageSelect').addEventListener('change', function () {
    const selectedLanguage = this.value;
    applyTranslations(selectedLanguage);
});

function applyTranslations(lang) {
    const elements = {
        addButton: document.getElementById('addButton'),
        sortPriceLabel: document.querySelector('label[for="sortPrice"]'),
        sortPriceLowHigh: document.querySelector('option[value="asc"]'),
        sortPriceHighLow: document.querySelector('option[value="desc"]'),
        prevPage: document.getElementById('prevPage'),
        nextPage: document.getElementById('nextPage'),
        idHeader: document.querySelector('th:nth-child(1)'),
        titleHeader: document.querySelector('th:nth-child(2)'),
        priceHeader: document.querySelector('th:nth-child(3)'),
        statusHeader: document.querySelector('th:nth-child(4)'),
        actionsHeader: document.querySelector('th:nth-child(5)'),
        addBtn: document.getElementById('addBtn'),
        updateBtn: document.getElementById('updateBtn'),
        closeForm: document.getElementById('closeForm'),
        bookImageUrl: document.querySelector('label[for="bookImageUrl"]')
    };

    elements.addButton.textContent = translations[lang].add;
    elements.sortPriceLabel.textContent = translations[lang].sortPrice;
    elements.sortPriceLowHigh.textContent = translations[lang].priceLowHigh;
    elements.sortPriceHighLow.textContent = translations[lang].priceHighLow;
    elements.prevPage.textContent = translations[lang].previous;
    elements.nextPage.textContent = translations[lang].next;
    elements.idHeader.textContent = translations[lang].id;
    elements.titleHeader.textContent = translations[lang].title;
    elements.priceHeader.textContent = translations[lang].price;
    elements.statusHeader.textContent = translations[lang].status;
    elements.actionsHeader.textContent = translations[lang].actions;
    elements.addBtn.textContent = translations[lang].addBook;
    elements.updateBtn.textContent = translations[lang].updateBook;
    elements.closeForm.textContent = translations[lang].close;
    elements.bookImageUrl.textContent = translations[lang].image;
}
