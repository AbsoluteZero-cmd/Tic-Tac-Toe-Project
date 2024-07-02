const gameboard = (function() {
    const fieldSize = 3;
    let playingField;
    const tbl = document.querySelector('table');

    let currentPlayer = 'X';
    let movesCount = 0;
    let isEnd = false;
    let isDraw = false;

    const createField = () => {
        playingField = Array(fieldSize).fill().map(() => Array(fieldSize).fill(' '));
    }

    const displayField = () => {
        tbl.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            let row = document.createElement('tr');
            for(let j = 0; j < 3; j++) {
                let td = document.createElement('td');
                td.textContent = playingField[i][j];
                td.setAttribute('x', i);
                td.setAttribute('y', j);
        
                td.addEventListener('click', (e) => {
                    console.log({i, j});
                    if(isEnd) return;
                    if(makeMove(i, j) === false){
                        console.log('you cant move like that');
                    }
                    displayField();
                    
                    if(isWin()) {
                        isEnd = true;
                        document.querySelector('h2').textContent = `The winner is player ${currentPlayer === 'O' ? '1' : '2'}`;
                    }
                    if(movesCount === playingField.length * playingField.length && !isWin()) {
                        isEnd = true;
                        document.querySelector('h2').textContent = 'Its a draw';
                    }
                })
        
                row.appendChild(td);
            }
            tbl.appendChild(row);
        }
    }

    const startGame = () => {
        createField();
        displayField();
    }

    const canPut = (x, y) => {
        if(playingField[x][y] !== ' '){
            return false;
        }
        return true;
    };

    const makeMove = (x, y) => {
        if(!canPut(x, y)) return false;
        playingField[x][y] = currentPlayer;
        currentPlayer = (currentPlayer === 'X' ? 'O' : 'X');
        document.querySelector('h2').textContent = (currentPlayer === 'X' ? 'Player 1 turn' : 'Player 2 turn');
        movesCount++;
        return true;
    };

    const isWin = () => {
        
        for(let i = 0; i < playingField.length; i++){
            let is1 = true, is2 = true;
            for(let j = 0; j < playingField[i].length; j++){
                if(playingField[i][j] !== 'X') is1 = false;
                if(playingField[i][j] !== 'O') is2 = false;
            }
            if(is1 === true || is2 === true) return true;
        }

        for(let j = 0; j < playingField.length; j++){
            let is1 = true, is2 = true;
            for(let i = 0; i < playingField[j].length; i++){
                if(playingField[i][j] !== 'X') is1 = false;
                if(playingField[i][j] !== 'O') is2 = false;
            }
            if(is1 === true || is2 === true) return true;
        }

        let is1 = true, is2 = true;
        for(let i = 0; i < playingField.length; i++){
            if(playingField[i][i] !== 'X') is1 = false;
            if(playingField[i][i] !== 'O') is2 = false;
        }
        if(is1 === true || is2 === true) return true;

        is1 = true, is2 = true;
        for(let i = 0; i < playingField.length; i++){
            if(playingField[i][playingField.length - i - 1] !== 'X') is1 = false;
            if(playingField[i][playingField.length - i - 1] !== 'O') is2 = false;
        }
        if(is1 === true || is2 === true) return true;
        return false;
    };

    return {startGame};
})();

gameboard.startGame();