document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    const terminalContent = document.getElementById('terminal-content');
    
    let gameActive = false;
    let secretNumber = 0;
    let attempts = 0;

    document.body.className = 'dark';

    const commands = {
        help: `List of available commands: about, projects, contact, github, interests, theme, game, clear, help`,
        about: "Hi, I'm Oli Mebberson, a 15 year old Web Developer.",
        projects: 'Here are some of my projects: A personal dashboard, Sliffer, About Me, How many hours left, Pizza topping generator',
        contact: 'You can contact me at oli@mebberson.com.',
        github: 'You can find my github at @olii-dev',
        interests: 'I love music so so much! Hip-Hop, R&B, Pop, you name it! I also love to code, and I am always learning new things!',
        theme: 'To change the theme, use the command: theme <dark|light|solarized-dark|solarized-light>',
        game: 'Start a new game by typing "play", and guess the number between 1 and 100!',
        clear: 'Clear the terminal by typing "clear".'
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
                if (theme === 'dark' || theme === 'light' || theme === 'solarized-dark' || theme === 'solarized-light') {
                    setTheme(theme);
                    typeEffect(`Theme changed to ${theme}.`);
                } else {
                    typeEffect(`Try 'theme dark', 'theme light', 'theme solarized-dark', or 'theme solarized-light'! :)`);
                }
            } else if (input === 'clear') {
                clearTerminal();
            } else if (commands[input]) {
                typeEffect(commands[input]);
            } else {
                typeEffect(`Command not found: ${input}`);
            }
        }
    });

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
    }
});