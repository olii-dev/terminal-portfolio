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
        "Favorite show: Ted Lasso or Mythic Quest",
        "Favorite programming language: CSS (It's where all the magic happens... ✨)",
        "Favorite hobby: Programming/Gaming",
        "Favorite animal: Dogs (Miniature Schnauzer)",
        "Favorite season: Winter or maybe Summer I don't know :(",
        "Favorite sport: Formula 1's",
        "Favorite superhero: Spider-Man",
        "Favorite emoji: 🫡",
        "Favorite game: Fall Guys",
        "Favorite song: Real Love by Childish Gambino or Karma by AJR",
        "Favorite IDE: Visual Studio Code"
    ];

    const lolList = [
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "Why do Java developers wear glasses? Because they don't C#.",
        "How many programmers does it take to change a light bulb? None. It's a hardware problem.",
        "Why do programmers always mix up Halloween and Christmas? Because Oct 31 equals Dec 25!",
        "What screams 'I'm insecure'? http://",
        "Why do programmers hate nature? It has too many bugs.",
        "How do you comfort a JavaScript bug? You console it.",
        "Why did the programmer quit his job? He didn't get arrays.",
        "What's a programmer's favorite hangout place? The Foo Bar.",
        "There are only 10 kinds of people in this world: those who understand binary and those who don't.",
        "Why did the developer go broke? Because he used up all his cache.",
        "What did the router say to the doctor? 'It hurts when IP!'",
        "Why do Python programmers wear glasses? Because they can't C.",
        "Why did the integer drown? Because it couldn't float!",
        "Why was the developer unhappy at their job? They wanted arrays.",
        "Why did the functions stop calling each other? Because they had constant arguments.",
        "Why do programmers prefer the dark? Because the sun gives them a 'tan error'.",
        "Why did the database administrator leave his wife? She had one-to-many relationships.",
        "How many programmers does it take to screw in a light bulb? None, that's a hardware problem!",
        "Why was the JavaScript developer sad? Because they didn't Node how to Express themselves.",
    ];    

    const commands = {
        help: `List of available commands: about, projects, contact, github, interests, randominfo, toolstack, theme, game, clear, help, lol, secret, motivate`,
        about: "Hey, I'm Oli Mebberson, a 15-year-old Web Developer from Australia!.",
        projects: 'Here are my projects: Personal dashboard, Sliffer, About Me, Stashr, BytaOS (Coming Soon) & more! (Go here to see them: https://github.com/olii-dev?tab=repositories)',
        contact: 'You can contact me at oli@mebberson.com',
        github: 'You can find my GitHub at https://github.com/olii-dev',
        interests: 'I love music so so much! Hip-Hop, R&B, Pop, you name it! I also love to code (HACK), and I am always learning new things! I love (ROLL)ing out updates too, aswell as playing video games and jailbreaking :O',
        theme: 'To change the theme, use the command: theme <dark|light|solarised-dark|solarised-light>',
        game: 'Start a new game by typing "play", and guess the number between 1 and 100!',
        clear: 'Clear the terminal by typing "clear".',
        randominfo: () => {
            const selectedInfo = getRandomInfo(infoList, 3);
            return selectedInfo.join(', ');
        },
        toolstack: 'I use HTML5, CSS, JavaScript, GitHub, Visual Studio Code, ChatGPT, Radxa X4 and Ubuntu!',
        lol: () => {
            return getRandomJoke(lolList);
        },
        secret: 'There are 2 secret commands in this terminal. Can you find them? ;) (Psst, type "hint" if you need help)',
        hint: 'Try searching "interests" into the terminal!',
        motivate: () => {
            const motivationalQuotes = [
                "Believe you can and you're halfway there.",
                "The only way to do great work is to love what you do.",
                "Success is not the key to happiness. Happiness is the key to success.",
                "Don't watch the clock; do what it does. Keep going.",
                "The future belongs to those who believe in the beauty of their dreams.",
                "You are never too old to set another goal or to dream a new dream.",
                "The only limit to our realization of tomorrow is our doubts of today.",
                "Act as if what you do makes a difference. It does.",
                "Success usually comes to those who are too busy to be looking for it.",
                "Don't be afraid to give up the good to go for the great."
            ];
            return getRandomJoke(motivationalQuotes);
        }
    };

    let inactivityTimer;

    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            typeEffect("Idle time is perfect for discovering hidden features...").then((line) => {
                idleMessageLine = line;
            });
        }, 100000);
    }

    resetInactivityTimer();

    let idleMessageLine = null;

    userInput.addEventListener('keydown', function(event) {
    if (idleMessageLine) {
        idleMessageLine.remove();
        idleMessageLine = null;
    }

    resetInactivityTimer();

        if (event.key === 'Enter') {
            let input = userInput.value.trim().toLowerCase();
            userInput.value = '';
            terminalContent.innerHTML += `<div><span class="prompt">olii-dev@portfolio:~$</span> ${input}</div>`;

        terminalContent.scrollTop = terminalContent.scrollHeight;
        userInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
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
                if (['dark', 'light', 'solarised-dark', 'solarised-light'].includes(theme)) {
                    setTheme(theme);
                    typeEffect(`Theme changed to ${theme}.`);
                } else {
                    typeEffect(`Try 'theme dark', 'theme light', 'theme solarised-dark', or 'theme solarised-light'! :)`);
                }
            } else if (input === 'clear') {
                clearTerminal();
                typeEffect("▒▓░ Keep exploring... ░▓▒").then((line) => {
                    setTimeout(() => {
                        line.remove();
                    }, 2000);
                });
            } else if (input === 'rickroll') {
                rickroll();
            } else if (input === 'hack') {
                startHackSequence();
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
        return new Promise((resolve) => {
            const line = document.createElement('div');
            terminalContent.appendChild(line);
            let i = 0;
            const interval = setInterval(() => {
                line.textContent += text[i];
                i++;
                if (i >= text.length) {
                    clearInterval(interval);
                    resolve(line);
                }
                terminalContent.scrollTop = terminalContent.scrollHeight;
                userInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 10);
        });
    }
    
    function setTheme(theme) {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }
    
    function rickroll() {
        typeEffect("Hmm, what's this? 🤔");
        setTimeout(() => {
            typeEffect("Oh, you want to be rickrolled?");
        }, 1000);
        setTimeout(() => {
            typeEffect("Ok! I'm never gonna give you up!");
        }, 2000);
        setTimeout(() => {
            window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ&autoplay=1', '_blank');
        }, 4000);
    }
    
    function getRandomItems(list, count) {
        const shuffled = list.slice().sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function getRandomJoke(jokesList) {
        const randomIndex = Math.floor(Math.random() * jokesList.length);
        return jokesList[randomIndex];
    }

    function startHackSequence() {
        const hackMessages = [
            { message: 'Initialising hack protocol...', delay: 1000 },
            { message: 'Connecting to the server [██████████████████] 100%', delay: 3000 },
            { message: 'Bypassing security...', delay: 4000 },
            { message: 'Injecting payload...', delay: 3000 },
            { message: 'Retrieving data...', delay: 4000 },
            { message: 'Decrypting files...', delay: 3000 },
            { message: 'Hack complete! Access granted.', delay: 4000 },
            { message: 'Downloading "virus1" to your device...', delay: 9000 },
            { message: 'Succesfully downloaded "virus1" to your device!', delay: 3000 },
            { message: 'Now running "virus1"...', delay: 2000 },
            { message: 'Your device has been compromised! :)', delay: 1000 },
            { message: 'I suggest backing up your device now as it will be erased in 5 hours.', delay: 10000 },
            { message: 'P.S: You just got trolled! You may no longer worry!' },
        ];
    
        let index = 0;

        function displayNextMessage() {
            if (index < hackMessages.length) {
                typeEffect(hackMessages[index].message);
                setTimeout(() => {
                    index++;
                    displayNextMessage();
                }, hackMessages[index].delay);
            }
        }
    
        displayNextMessage();
    }
});    