import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js"

const dataHeaderSearch = document.querySelector('[data-header-search]')
const dataHeaderSettings = document.querySelector('[data-header-settings]')
const dataListItems = document.querySelector('[data-list-items]')
const dataListMessage = document.querySelector('[data-list-message]')
const dataListButton = document.querySelector('[data-list-button]')
const dataListActive = document.querySelector('[data-list-active]')
const dataListBlur = document.querySelector('[data-list-blur]')
const dataListImage = document.querySelector('[data-list-image]')
const dataListTitle = document.querySelector('[data-list-title]')
const dataListSubtitle = document.querySelector('[data-list-subtitle]')
const dataListDescription = document.querySelector('[data-list-description]')
const dataListClose = document.querySelector('[data-list-close]')
const dataSearchOverlay = document.querySelector('[data-search-overlay]')
const dataSearchForm = document.querySelector('[data-search-form]')
const dataSearchTitle = document.querySelector('[data-search-title]')
const dataSearchGenres = document.querySelector('[data-search-genres]')
const dataSearchAuthors = document.querySelector('[data-search-authors]')
const dataSearchCancel = document.querySelector('[data-search-cancel]')
const dataSettingsOverlay = document.querySelector('[data-settings-overlay]')
const dataSettingsForm = document.querySelector('[data-settings-form]')
const dataSettingsTheme = document.querySelector('[data-settings-theme]')
const dataSettingsCancel = document.querySelector('[data-settings-cancel]')

const matches = books
let page = 1;



/**
 * checks if books is falsy or not an array, if either is true throw error message
 * checks if range is falsy or array less than 2, if either is true throw error message
 */

let range = [];
if (!books && !Array.isArray(books)) {
    throw new Error('Source required')
}

if (!range && range.length < 2) {
    throw new Error('Range must be an array with two numbers')
}

const fragment = document.createDocumentFragment()
const extracted = books.slice(0, 36)

/**
* for loop below creates a list of book previews
* extracts first 36 books from array called 'books'
*/
for (let i = 0; i < extracted.length; i++) {
    const { author: authorId, id, image, title } = extracted[i]
    const element = document.createElement('button')          //creates a new button
    element.classList = 'preview'
    element.setAttribute('data-preview', id)
    element.innerHTML = /* html */ `
        <img
            class="preview__image"
            src="${image}"
        />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[authorId]}</div>
        </div>
    `
    fragment.appendChild(element)       // appends button element to fragment doc
}

dataListItems.appendChild(fragment)

/**
 * creates a dropdownlist of book genres
 * creates a new docunment named 'genreOfBooks' to store options element
 */
const genreOfBook = document.createDocumentFragment()
const optionOfBooks = document.createElement('option')
optionOfBooks.value = 'any'
optionOfBooks.textContent = 'All Genres'
genreOfBook.appendChild(optionOfBooks)

/**
 * loops over the 'genre' object using a for...of loop
 * each time it loops, creates a new option element and sets its value attribute to current id
 * and textContent to current name
 * appends option element to genreOfBooks
 */
for (let [id, name] of Object.entries(genres)) {
    const optionsOfGenre = document.createElement('option')
    optionsOfGenre.value = id
    optionsOfGenre.textContent = name
    genreOfBook.appendChild(optionsOfGenre)
}

dataSearchGenres.appendChild(genreOfBook)

/**
 * creates a dropdownlist of book authors
 * creates a new docunment named 'authorOfBooks' to store options element
 */
const authorOfBook = document.createDocumentFragment()
const optionOfAuthors = document.createElement('option')
optionOfAuthors.value = 'any'
optionOfAuthors.textContent = 'All Authors'
authorOfBook.appendChild(optionOfAuthors)

/**
 * loops over the 'author' object using a for...of loop
 * each time it loops, creates a new option element and sets its value attribute to current id
 * and textContent to current name
 * appends option element to authorOfBook
 */
for (let [id, name] of Object.entries(authors)) {
    const authorList = document.createElement('option')
    authorList.value = id
    authorList.textContent = name
    authorOfBook.appendChild(authorList)
}

dataSearchAuthors.appendChild(authorOfBook)






/*-------------------Show more button-------------------------------*/
dataListButton.innerHTML = /* html */[
    `<span>Show more</span>
    <span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>`,
]

dataListButton == `Show more (${books.length} - ${BOOKS_PER_PAGE})`
dataListButton.disabled = !(matches.length - (page * BOOKS_PER_PAGE) > 0)



dataListButton.addEventListener('click', () => {

    const start = page * BOOKS_PER_PAGE;
    const end = start + BOOKS_PER_PAGE;
    const newBook = books.slice(start, end)
    const newBookFragment = document.createDocumentFragment();

    for (let i = 0; i < newBook.length; i++) {
        const moreBooks = newBook[i];
        const showPreview = createPreview(moreBooks);
        newBookFragment.appendChild(showPreview);
    }
    dataListItems.appendChild(newBookFragment);

    const remaining = matches.length - page * BOOKS_PER_PAGE;
    dataListButton.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
       `;
    dataListButton.disabled = remaining <= 0;
    page = page + 1
});

function createPreview(preview) {
    const { author: authorId, id, image, title } = preview;
    const moreBooks = document.createElement('button');
    moreBooks.classList = 'preview';
    moreBooks.setAttribute('data-preview', id);

    moreBooks.innerHTML = /* html */ `
        <img
            class="preview__image"
            src="${image}"
        />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[authorId]}</div>
        </div>
    `;
    return moreBooks

}

// dataListItems.innerHTML = ''
// fragment == document.createDocumentFragment()
// extracted = source.slice(range[0], range[1])



// dataListItems.appendChild(fragments)
// initial === matches.length - [page * BOOKS_PER_PAGE]
// remaining === hasRemaining ? initial : 0
// dataListButton.disabled = initial > 0




/*--------------------------------------------------------------------*/






/*--------------------------theme-----------------------------*/

//theme
const css = {
    day: ['10, 10, 20', '255, 255, 255'],
    night: ['255, 255, 255', '10, 10, 20']
};

// theme
window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
// dataSettingsTheme.value === window.matchMedia || window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';


// document.documentElement.style.setProperty('--color-dark', css[v][1]);
// document.documentElement.style.setProperty('--color-light', css[v][0]);



dataSettingsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formSubmit = new FormData(event.target)
    const option = Object.fromEntries(formSubmit)

    if (option.theme === 'night') {
        document.documentElement.style.setProperty('--color-light', css[option.theme][1])
        document.documentElement.style.setProperty('--color-dark', css[option.theme][0])
    } else if (option.theme === 'day') {
        document.documentElement.style.setProperty('--color-light', css[option.theme][1])
        document.documentElement.style.setProperty('--color-dark', css[option.theme][0])
    }
    dataSettingsOverlay.close()
})

/**
* when the 'dataHeaderSettings' element is clicked, function focuses on the input field
* checks if the settings overlay is open or not
*/
dataHeaderSettings.addEventListener('click', () => {
    dataSettingsTheme.focus();

    if (dataSettingsOverlay.open) {
        dataHeaderSettings.showModal()
    } else {
        dataSettingsOverlay.showModal();
    }
})

/**
* when cancel button is clicked, closes the setting overlay
*/
dataSettingsCancel.addEventListener('click', () => {
    dataSettingsOverlay.close();
})
/*-----------------------------------------------------------------------------------------------*/




/*------------------------------Search-----------------------------*/
/**
 * when the 'dataHeaderSearch' element is clicked, function focuses on the input field
 * checks if the search overlay is open or not
 */
dataHeaderSearch.addEventListener('click', () => {
    dataSearchTitle.focus();

    if (dataSearchOverlay.open) {
        dataHeaderSearch.showModal()
    } else {
        dataSearchOverlay.showModal();
    }
})

/**
 * when cancel button is clicked, closes the search overlay
 */
dataSearchCancel.addEventListener('click', () => {
    dataSearchOverlay.close();
})

// dataSearchOverlay.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target)
//     const result = Object.fromEntries(formData)
//     document.documentElement.style.setProperty('--color-dark', css[result.theme][0]);
//     document.documentElement.style.setProperty('--color-light', css[result.theme][1]);
//     if (dataSettingsOverlay.open) {
//         dataSettingsOverlay = false
//     }
// })

/*-------------------------------------------------------------------------------------------*/


/*------------------------Book filters--------------------------------*/
let booksList = [];

dataSearchForm.addEventListener('submit', (event) => {
    event.preventDefault();   // prevents default form submit behavior
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = [];

    for (const book of books) {
        const titleMatch = filters.title.trim() !== '' && book.title.toLowerCase().includes(filters.title.toLowerCase());  // use || instead of &&
        const authorMatch = filters.author !== 'any' && book.author.includes(filters.author)
        const genreMatch = filters.genre !== 'any' && book.genres.includes(filters.genre)

        if (titleMatch || authorMatch || genreMatch) {
            result.push(book);
        }
    }

    if (result.length > 0) {
        dataListMessage.classList.remove('list__message_show');
        dataListButton.disabled = true;
        dataListItems.innerHTML = '';

        const searchBooks = document.createDocumentFragment();

        for (let i = 0; i < result.length; i++) {
            const book = result[i];
            const bookPreview = createPreview(book);
            searchBooks.appendChild(bookPreview);
        }
        dataListItems.appendChild(searchBooks)
    } else {
        dataListMessage.classList.add('list__message_show');
        dataListButton.disabled = true;
        dataListItems.innerHTML = '';
    }






    window.scrollTo({ top: 0, behavior: 'smooth' });
    dataSearchOverlay.close();
    dataSearchForm.reset();



})

/*--------------------------------Book Preview-----------------------------------------*/

/**
 * when close button is clicked, closes the book preview
 */
dataListClose.addEventListener('click', () => {
    dataListActive.close();
})


/**
 * when event fires/book clicked on,
 * it brings up a preview of the book
 */
dataListItems.addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
        if (active) {
            break;
        }
        const previewId = node?.dataset?.preview

        for (const singleBook of books) {
            if (singleBook.id === previewId) {
                active = singleBook
            }
        }
    }

    if (!active) {
        return;
    }
    dataListActive.open = true;
    dataListImage.src = active.image;
    dataListBlur.src = active.image;
    dataListTitle.textContent = active.title;

    dataListSubtitle.textContent = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
    dataListDescription.textContent = active.description;
})
