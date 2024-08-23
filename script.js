document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    const terminalContent = document.getElementById('terminal-content');
    
    let gameActive = false;
    let secretNumber = 0;
    let attempts = 0;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        document.body.className = 'dark';
    }

    const infoList = [
        "Current grade: 10th",
        "Current age: 15",
        "Current location: Australia",
        `Oli's current time: ${new Date().toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Australia/Adelaide' })}`,
        "Current mood: Happy :)",
        "Best food: Snag with onion",
        "Best drink: Coca-Cola Vanilla",
        "Favorite color: Blue",
        "Favorite show: Ted Lasso",
        "Favorite programming language: CSS",
        "Favorite hobby: Gaming",
        "Favorite animal: Dogs",
        "Favorite season: Winter or maybe Summer I don't know :(",
        "Favorite sport: Formula 1's",
        "Favorite superhero: Spider-Man",
    ];

    const commands = {
        help: `List of available commands: about, projects, contact, github, interests, randominfo, toolstack, theme, game, clear, help`,
        about: "Hi, I'm Oli Mebberson, a 15 year old Web Developer.",
        projects: 'Here are my projects: Personal dashboard, Sliffer, About Me, How many hours left, Pizza topping generator, Portfolio, Penfolio.',
        contact: 'You can contact me at oli@mebberson.com',
        github: 'You can find my github at @olii-dev',
        interests: 'I love music so so much! Hip-Hop, R&B, Pop, you name it! I also love to code, and I am always learning new things!',
        theme: 'To change the theme, use the command: theme <dark|light|solarised-dark|solarised-light>',
        game: 'Start a new game by typing "play", and guess the number between 1 and 100!',
        clear: 'Clear the terminal by typing "clear".',
        randominfo: () => {
            const selectedInfo = getRandomInfo(infoList, 3);
            return selectedInfo.join(', ');
        },
        toolstack: 'I use HTML5, CSS, JavaScript, Github, Visual Studio Code, Netlify, Vercel',
    };

    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const input = userInput.value.trim();
            userInput.value = '';
            terminalContent.innerHTML += `<div><span class="prompt">olii-dev@portfolio:~$</span> ${input}</div>`;
            
            if (input === 'play') {
                if (!gameActive) {
                    startGame();
                } else {
                    typeEffect('A game is already in progress. Guess the number or type "end" to finish the game.');
                }
            } else if (input === 'end') {
                if (gameActive) {
                    endGame();
                } else {
                    typeEffect('No game is currently active.');
                }
            } else if (gameActive && !isNaN(input)) {
                guessNumber(Number(input));
            } else if (input.startsWith('theme')) {
                const theme = input.split(' ')[1];
                if (theme === 'dark' || theme === 'light' || theme === 'solarised-dark' || theme === 'solarised-light') {
                    setTheme(theme);
                    typeEffect(`Theme changed to ${theme}.`);
                } else {
                    typeEffect(`Try 'theme dark', 'theme light', 'theme solarised-dark', or 'theme solarised-light'! :)`);
                }
            } else if (input === 'clear') {
                clearTerminal();
            } else if (commands[input]) {
                typeEffect(typeof commands[input] === 'function' ? commands[input]() : commands[input]);
            } else {
                typeEffect(`Command not found: ${input}`);
            }
        }
    });

    function getRandomInfo(infoList, count) {
        const shuffled = infoList.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function startGame() {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        gameActive = true;
        typeEffect('Game started! Guess a number between 1 and 100.');
    }

    function guessNumber(guess) {
        attempts++;
        if (guess < secretNumber) {
            typeEffect('Too low! Try again.');
        } else if (guess > secretNumber) {
            typeEffect('Too high! Try again.');
        } else {
            typeEffect(`Congrats! You guessed the number '${secretNumber}' in ${attempts} attempts.`);
            endGame();
        }
    }

    function endGame() {
        gameActive = false;
        typeEffect('Game over! Type "play" to start a new game! :)');
    }

    function clearTerminal() {
        terminalContent.innerHTML = '';
    }

    function typeEffect(text) {
        const line = document.createElement('div');
        terminalContent.appendChild(line);
        let i = 0;
        const interval = setInterval(() => {
            line.textContent += text[i];
            i++;
            if (i >= text.length) {
                clearInterval(interval);
            }
            terminalContent.scrollTop = terminalContent.scrollHeight;
        }, 10);
    }

    function setTheme(theme) {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }
});