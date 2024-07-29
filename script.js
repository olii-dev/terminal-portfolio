document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    const terminalContent = document.getElementById('terminal-content');

    const commands = {
        help: `List of avaliable commands: aboutme, projects, contact, help`,
        about: 'Hi, I\'m Oli Mebberson, a 15 year old Web Developer.',
        projects: 'Here are some of my projects: Sliffer, About Me',
        contact: 'You can contact me at oli@mebberson.com.'
    };

    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const input = userInput.value.trim();
            userInput.value = '';
            terminalContent.innerHTML += `<div><span class="prompt">guest@portfolio:~$</span> ${input}</div>`;
            
            if (commands[input]) {
                typeEffect(commands[input]);
            } else {
                typeEffect(`Command not found: ${input}`);
            }
        }
    });

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
});
