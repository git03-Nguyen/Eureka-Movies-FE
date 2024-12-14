// {Name: Basic_example_for_AI_assistant}
// {Description: Learn how to create a dialog script with voice/text commands and text corpus for question answering}


const genres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]

const stringfienGenres = genres.map( ({name})=> name.toLowerCase() ).join('|');


intent(['What does this app do?', 'What can I do here?', 'What is this app about?', 'Tell me about app'], (p) => {
    p.play(`This is Eureka, an app where you can find the movies you love.
    	Try saying: 'Go to Comedy', 'Surpruse me', 'Search for Supermn', 'Make it dark', Log in
    `);
});


intent('Make it dark', (p)=>{
    p.play({ command: 'changeMode', mode: 'dark' });
    p.play('Batman likes this, I hope you will as well.');
});

intent('Make it light', (p)=>{
    p.play({ command: 'changeMode', mode: 'light' });
    p.play('Ahh, my eyes hurt. Looks good though.');
});

intent(['Log in', 'login'], (p)=>{
    p.play('Logging you in.');
    p.play({ command: 'login' });
});

intent(['Log out', 'logout'], (p)=>{
    p.play('Logging you out.');
    p.play({ command: 'logout' });
});

intent(`Go to $(GENRE ${stringfienGenres}|top rated|popular|upcoming)`, (p)=>{
    p.play(`Going to ${p.GENRE.value} category.`);
    p.play({ command: 'chooseGenre', genreOrCategory: p.GENRE.value, genres });
});


intent('Search for $(QUERY* (.*))', (p)=>{
    p.play(`Searching for ${p.QUERY.value}`);
    p.play({ command: 'search', query: p.QUERY.value });
});


intent(`Surprise me`, (p)=>{
    const selectedCategory = genres[Math.floor(Math.random() * genres.length)].name;
    p.play({ command: 'chooseGenre', genreOrCategory: selectedCategory, genres });
    p.play(`Sounds good. Enjoy some ${selectedCategory} movies.`);
});




