var hangman = {
    alphabet: null,
    bodyPartsRemaining: null,
    word: null,
    lettersRemaining: null,
    state: null,
    guesses: '',

    // Entry point
    init: function () {
        var words = 'oppa hangman style,Square kids font by Grafito Design,Free Font Oswald by Vernon Adams,foo all bars,leave your lorem ipsum at home,bittitan is kewl,I heart rainbows,pool is a fun game,i miss doing things,unicorns fart rainbows,happiness is the truth,A leopard cannot change his spots,You took the words right out of my mouth,Stop building castles in the sky,A picture is worth a thousand words,Pseudoscience,Octogenarian,Ambidextrous,Pterodactyl,lynx,fjord'.toLowerCase().split(',');
        this.bodyPartsRemaining = "leg1,leg2,arm1,arm2,eyebrows,mouth,eyes".split(','); // Array of body parts (classes)
        this.alphabet = "abcdefghijklmnopqrstuvwxyz".split(''); // Array of available guesses
        this.word = words[Math.floor(Math.random()*words.length)].split(''); // Array of letters from a random phrase
        this.lettersRemaining = this.uniqArr(this.word); // Unguessed letters from our phrase
        $('.the-man .head,.the-man .torso').fadeIn(); // Display some hangman parts from the beginning
        this.generateBlocks();
        this.generateGameboard();
    },

    // Dedupes an array && removes entries matching " "
    uniqArr: function (a) {
        var result = [];
        a.forEach(function(item) {
            if (result.indexOf(item) < 0 && item !== " ") {
                result.push(item);
            }
        });
        return result;
    },

    // Handle jQuery keypress events
    handleKeypress: function(e) {
        if ((e.which === 10 || e.which === 13) && this.state)
            this.resetGame();
        if (!this.state)
            this.guessLetter(String.fromCharCode(e.which).toLowerCase());
    },

    // Action taken if the game ends and a prepared message must be displayed
    gameOver: function() {
        $('.blocks span').off('click'); // Do not let the player continue to play after victory/defeat
        $('.blocks-container, .game-board').css('opacity', '0.25');
        $('.man h3').html('');
        $('.underlay').fadeIn();
        this.state = 1;
    },

    // Generates our current game board from the game state and places it inside h1.blanks
    generateGameboard: function () {
        var result = '';
        for(var i = 0; i < this.word.length; i++) {
            if (this.word[i] === " ") {
                result += " &nbsp; ";
            } else if (this.lettersRemaining.indexOf(this.word[i]) === -1) {
                result += ' ' + this.word[i] + ' ';
            } else {
                result += " _ ";
            }
        }
        $('.blanks').html(result);
    },

    // Generates the section of blocks and attaches click handlers
    generateBlocks: function () {
        $('.blocks').html(this.generateLetters(this.alphabet));

        // Attach click handlers
        $('.blocks span').click(function () {
            hangman.guessLetter($(this).html().toLowerCase()[0]);
        });
    },

    // Generate a pattern of letters from the alphabet (remaining letters) array
    // For presentation, the string must follow this pattern:
    // a-B C,d e-F G,h i-J K,l m-N O,p q-R S,t u-V W,x y-Z
    // to display "blocks" from the font chosen
    generateLetters: function (alphabet) {
        var result = '';

        // Array of colors for blocks
        var colors = '#e74c3c,#e67e22,#3498db,#F2CA27,#2ecc71,#9b59b6, #D2527F'.split(',');

        for (var i = 0; i < alphabet.length; i++) {
            // Handles spaces between blocks and top/bottom portions
            var sep = ['-', ' ', ',', ' '];

            // Switches produces pattern: lower UPPER UPPER lower lower...
            var appendee = Math.floor((i+1)/2) % 2 ? alphabet[i].toUpperCase() : alphabet[i];

            // Modulus helps us iterate through the sep array by generating 0,1,2,3,..
            appendee += sep[i%4];

            // Append the appendee to the result, iterating through the array of colors
            result += '<span style="color: '+colors[i%7]+'">'+appendee+'</span>';
        }
        return result;
    },

    // Reveil the next body part
    reveilBodyPart: function () {
        var part = this.bodyPartsRemaining.pop();
        $('.the-man .man .'+part).fadeIn();
    },

    removeLetter: function (letter) {
        // Was our guess was successful?
        if (this.lettersRemaining.indexOf(letter) !== -1) {
            // Guessing success. Remove letter from lettersRemaining array
            this.lettersRemaining.splice(this.lettersRemaining.indexOf(letter), 1);
            var success = true;
        } else {
            // Obviously bad at guessing. Death, Imminent.
            this.reveilBodyPart();
            var success = false;
        }

        // Remove a letter from the alphabet array
        this.alphabet.splice(this.alphabet.indexOf(letter), 1);

        this.appendToPreviousGuesses(letter, success);
    },

    appendToPreviousGuesses: function (letter, success) {
        var color = success ? 'rgba(3, 201, 169, 0.5)' : 'rgba(217, 30, 24, 0.5)';

        // [jQuery Hack]: Make sure this stuff is being shown by attempting to fade it in each execution
        $('.prev').fadeIn();

        // Append a new guess to the guesses table
        this.guesses += '<span style="background: '+color+'">'+letter+'</span>';
        $('.guesses').html(this.guesses);

        // Display the number of bad guesses remaining until death
        $('.turns').html(this.bodyPartsRemaining.length + (this.bodyPartsRemaining.length === 1 ? ' guess ' : ' guesses ') + 'remaining');
    },

    guessLetter: function (letter) {
        if (this.alphabet.indexOf(letter) !== -1) {
            this.removeLetter(letter);
            this.checkVictoryConditions(); // Checks victory conditions
            this.generateBlocks(); // Regenerates the section of blocks
            this.generateGameboard(); // Regenerates the game board
        }
    },

    victory: function () {
        $('.hangman').hide();
        $('.nothangedman').fadeIn();
        $('.underlay h1').html('OMG THX! SO HAPPY I NOT DIE.<br><a onclick="hangman.resetGame()">Play again?</a>');
        this.gameOver();
    },

    defeat: function () {
        $('.hangman').hide();
        $('.hangedman').fadeIn();
        $('.turns').html('0 guesses remaining');
        $('.underlay h1').html('OMG, I DIE!<br> YOU LOST:(<br><a onclick="hangman.resetGame()">Play again?</a>');

        // Reveal phrase
        this.lettersRemaining = [];
        this.generateGameboard();

        this.gameOver();
    },

    // Checks game state and takes action if we are in a victory or defeated state
    checkVictoryConditions: function () {
        if (this.bodyPartsRemaining.length && !this.lettersRemaining.length) {
            this.victory();
        } else if (!this.bodyPartsRemaining.length) {
            this.defeat();
        }
    },

    resetGame: function () {
        // Post-game cleanup
        this.guesses = '';
        this.state = 0;
        $('.guesses, .turns').html('');
        $('.underlay, .hangedman, .nothangedman, .the-man svg.hangman path, .prev').hide();
        $('.hangman').fadeIn();
        $('.blocks-container, .game-board').css('opacity', '1');
        $('.man h3').html('POOR GUY GETTING HUNG:');

        // Re-initialize the game
        this.init();
    }
};

$(document).ready(function () {
    hangman.init();
});

// Alternative guessing from keyboardings
$(document).keypress(function (e) {
    hangman.handleKeypress(e);
});