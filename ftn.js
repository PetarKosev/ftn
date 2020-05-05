(function() {
    'use strict';

    var flag = false;
    var numbers = [];
    var interval = null;

    for (var k = 1; k <= 100; k++) {
        numbers.push(k);
    }

    function shuffle(numbers) {
        return numbers.sort(function() {
            return Math.random() - 0.5;
        }).slice();
    }

    var shuffledNumbers = shuffle(numbers);

    var table = document.querySelector('.js-table');

    function drawNumbers() {
        for (var i = 0; i < 10; i++) {
            // create tr
            var tableRow = document.createElement('tr');
    
            for (var j = 0; j < 10; j++) {
                // create td
                var tableColumn = document.createElement('td');
    
                // add number
                tableColumn.textContent = shuffledNumbers.pop();
    
                // append td to tr
                tableRow.appendChild(tableColumn);
            }
    
            // append tr to table
            table.appendChild(tableRow);
        }
    }
    


    // function getRandomNumber(shuffledNumbers) {
    //     var randomNumber = shuffledNumbers[Math.floor(Math.random() * shuffledNumbers.length)];

    //     shuffledNumbers.splice(shuffledNumbers.indexOf(randomNumber), 1);

    //     return shuffledNumbers[Math.floor(Math.random() * shuffledNumbers.length)];;
    // }

    var currentNumber = 1;

    table.addEventListener('click', function(event) {
        var clickedElement = event.target;

        if (
            clickedElement.tagName.toLowerCase() === 'td' && 
            Number(clickedElement.textContent) === currentNumber &&
            !flag
        ) {
            clickedElement.textContent = '';

            if (currentNumber === 100) {
                clearInterval(interval);
                showWon();
                flag = true;
                return;
            }

            currentNumber++;
            
        }
    });

    var timer = document.querySelector('.js-timer');

    function drawTimer(){
        var seconds = 60;
        var minutes = 4;
    
        interval = setInterval(function() {
            if (minutes === 0 && seconds === 0) {
                clearInterval(interval);
                
                showGameOver();

                flag = true;
    
                return;
            }

            if (seconds === 0) {
                minutes--;
                seconds = 60;
            }
    
            seconds--;
    
            if (seconds >= 10) {
                timer.textContent = minutes + ':' + seconds;
            } else {
                timer.textContent = minutes + ':0' + seconds;
            }
        }, 10);
    }

    function showGameOver() {
        var mainTable = document.querySelector('.table');
        var backdrop = document.createElement('div');
        var gameOverStatement = document.createElement('div');
        var restartButton = document.createElement('button');

        restartButton.onclick = function() {
            backdrop.parentNode.removeChild(backdrop);

            resetGame();
        };

        restartButton.className = 'restart-button';
        restartButton.textContent = 'Play Again';

        gameOverStatement.textContent = 'GAME OVER';
        gameOverStatement.className = 'game-over';

        backdrop.className = 'backdrop';
        
        gameOverStatement.appendChild(restartButton);
        backdrop.appendChild(gameOverStatement);
        mainTable.appendChild(backdrop);
    }

    function showWon() {
        var mainTable = document.querySelector('.table');
        var backdrop = document.createElement('div');
        var gameWonStatement = document.createElement('div');
        var restartButton = document.createElement('button');

        restartButton.onclick = function() {
            backdrop.parentNode.removeChild(backdrop);

            resetGame();
        };

        restartButton.className = 'restart-button';
        restartButton.textContent = 'Play Again';

        gameWonStatement.textContent = 'GAME WON';
        gameWonStatement.className = 'game-won';

        backdrop.className = 'backdrop';
        
        gameWonStatement.appendChild(restartButton);
        backdrop.appendChild(gameWonStatement);
        mainTable.appendChild(backdrop);
    }

    var buttonNewGame = document.querySelector('.js-restart');

    buttonNewGame.addEventListener('click', resetGame);

    function resetGame() {
        currentNumber = 1;
        shuffledNumbers = shuffle(numbers);

        table.innerHTML = '';
        timer.innerHTML = '5:00';

        clearInterval(interval);

        drawNumbers();
        drawTimer();
        flag = false;
    }

    drawNumbers();
    drawTimer();
    
})();
