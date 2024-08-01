// ebook.js

// const books = [
//     {
//         image: 'https://m.media-amazon.com/images/I/51oTTzbiVIL.jpg',
//         title: "Developing a Hacker's Mindset: Publication Opened",
//         description: "Hackers by Steven Levy is a captivating exploration of the ...",
//         author: 'Steven Levy',
//         rating: 3.5,
//         publishYear: 1999
//     },
//     {
//         image: './assets/cover book images/ML-12x18-1-scaled.jpg',
//         title: 'Machine Learning Book by CSE Department, NIIST',
//         description: 'Cryptonomicon (1999) is a gripping novel that weaves together two...',
//         author: 'Shaun Dave',
//         rating: 3.5,
//         publishYear: 1999
//     }
// ];

const books = [
    {
                image: 'https://m.media-amazon.com/images/I/51oTTzbiVIL.jpg',
                title: "Developing a Hacker's Mindset: Publication Opened",
                description: "Hackers by Steven Levy is a captivating exploration of the ...",
                author: 'Steven Levy',
                rating: 1,
                publishYear: 1999
            },
            {
                image: './assets/cover book images/ML-12x18-1-scaled.jpg',
                title: 'Machine Learning Book by CSE Department, NIIST',
                description: 'Cryptonomicon (1999) is a gripping novel that weaves together two...',
                author: 'Shaun Dave',
                rating: 3.5,
                publishYear: 1999
            },
    {
        image: 'https://m.media-amazon.com/images/I/51llGFIyRLL._SL500_.jpg',
        title: 'Algorithms Unlocked',
        author: 'Thomas H. Cormen',
        description: 'An accessible introduction to algorithms and their applications.',
        rating: 3.5,
        publishYear: 2013
    },
    {
        image: 'https://m.media-amazon.com/images/I/51c2tO9AsRL._SL500_.jpg',
        title: 'Introduction to the Theory of Computation',
        author: 'Michael Sipser',
        description: 'A comprehensive introduction to the theory of computation.',
        rating: 4.7,
        publishYear: 2012
    },
    {
        image: 'https://m.media-amazon.com/images/I/51AG5EL2RDL._SL500_.jpg',
        title: 'Design and Analysis of Algorithms',
        author: 'Srinivasan Keshav',
        description: 'A practical approach to designing and analyzing algorithms.',
        rating: 4.3,
        publishYear: 2016
    },
    {
        image: 'https://m.media-amazon.com/images/I/41fBElEL-zL._SL500_.jpg',
        title: 'Artificial Intelligence: A Modern Approach',
        author: 'Stuart Russell and Peter Norvig',
        description: 'A comprehensive guide to the theory and practice of artificial intelligence.',
        rating: 4.8,
        publishYear: 2020
    },
    {
        image: 'https://m.media-amazon.com/images/I/41izRZK-JrL._SL500_.jpg',
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        author: 'Robert C. Martin',
        description: 'A guide to writing clean, maintainable code.',
        rating: 4.6,
        publishYear: 2008
    },
    {
        image: 'https://m.media-amazon.com/images/I/51CCmH-5BPL._SL500_.jpg',
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt and David Thomas',
        description: 'A practical guide to becoming a better programmer.',
        rating: 4.7,
        publishYear: 1999
    },
    {
        image: 'https://m.media-amazon.com/images/I/41V14e2fiFL._SL500_.jpg',
        title: 'Effective Java',
        author: 'Joshua Bloch',
        description: 'A comprehensive guide to best practices in Java programming.',
        rating: 4.9,
        publishYear: 2018
    },
    {
        image: 'https://m.media-amazon.com/images/I/41+AaXG1pRL._SL500_.jpg',
        title: 'Code: The Hidden Language of Computer Hardware and Software',
        author: 'Charles Petzold',
        description: 'An exploration of the inner workings of computers and how they execute code.',
        rating: 4.4,
        publishYear: 2000
    },
    {
        image: 'https://m.media-amazon.com/images/I/51UBJtqLr1L._SL500_.jpg',
        title: 'Computer Networking: A Top-Down Approach',
        author: 'James Kurose and Keith Ross',
        description: 'A top-down approach to understanding computer networking.',
        rating: 4.6,
        publishYear: 2016
    },
    {
        image: 'https://m.media-amazon.com/images/I/51yHjxWj6kL._SL500_.jpg',
        title: 'Database System Concepts',
        author: 'Abraham Silberschatz, Henry Korth, and S. Sudarshan',
        description: 'An introduction to database systems and their concepts.',
        rating: 4.5,
        publishYear: 2019
    },
    {
        image: 'https://m.media-amazon.com/images/I/51H9Cfw3Y-L._SL500_.jpg',
        title: 'Modern Operating Systems',
        author: 'Andrew S. Tanenbaum',
        description: 'A detailed study of modern operating systems and their design.',
        rating: 1.7,
        publishYear: 2015
    }
];


const moreBooks = [
    {
        image: 'https://m.media-amazon.com/images/I/415Z8IEPDpL._SL500_.jpg',
        title: 'Coders at Work: Trending Publication',
        publishYear: 2000
    },
    {
        image: 'https://m.media-amazon.com/images/I/519hB5niytL._SL500_.jpg',
        title: 'Building Microservices: Designing Systems',
        publishYear: 2004
    },
    {
        image: 'https://m.media-amazon.com/images/I/51Rxed9CgdL._SL500_.jpg',
        title: 'Hackers & Partners: Become Together',
        publishYear: 1998
    },
    {
        image: 'https://m.media-amazon.com/images/I/419zAwJJH4L._SL500_.jpg',
        title: 'Release It (Second Edition)',
        publishYear: 1996
    },
    {
        image: 'https://m.media-amazon.com/images/I/51szMmZEoeL._SL500_.jpg',
        title: 'HVAC Designing: Extra Publication Open',
        publishYear: 1995
    },
    {
        image: 'https://m.media-amazon.com/images/I/51E2055ZGUL._SL1000_.jpg',
        title: 'Clean Code Book: Year 2002',
        publishYear: 2002
    }
];

// Export the arrays
module.exports = { books, moreBooks };
