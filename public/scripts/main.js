function mainApp() {
    return {
        playerName: '',

        books: [
            {
                book_id: 1,
                title: "Harry Potter and the Philosopher's Stone",
                publication_year: 1997,
                total_chapters: 17
            },
            {
                book_id: 2,
                title: "Harry Potter and the Chamber of Secrets",
                publication_year: 1998,
                total_chapters: 18
            },
            {
                book_id: 3,
                title: "Harry Potter and the Prisoner of Azkaban",
                publication_year: 1999,
                total_chapters: 22
            },
            {
                book_id: 4,
                title: "Harry Potter and the Goblet of Fire",
                publication_year: 2000,
                total_chapters: 37
            },
            {
                book_id: 5,
                title: "Harry Potter and the Order of the Phoenix",
                publication_year: 2003,
                total_chapters: 38
            },
            {
                book_id: 6,
                title: "Harry Potter and the Half-Blood Prince",
                publication_year: 2005,
                total_chapters: 30
            },
            {
                book_id: 7,
                title: "Harry Potter and the Deathly Hallows",
                publication_year: 2007,
                total_chapters: 36
            }
        ],

        // Check if the player's name is valid
        get isNameValid() {
            return this.playerName.trim().length > 0;
        },

        // Navigate to the game page with the book ID
        startGame(bookId) {
            if (this.isNameValid) {
                window.location.href = `/game?bookId=${bookId}&playerName=${this.playerName}`;
            }
        }
    };
};
