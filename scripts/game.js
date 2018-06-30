// create stage
var stage = acgraph.create('container');

// get bounds of stage
var bounds = stage.getBounds();

// calculate chip width/height
var CHIP_WIDTH = bounds.width / 4;
var CHIP_HEIGHT = bounds.height / 4;

// fill for chip
var FILL = {
    angle: -45,
    keys: [
        '0 #fff',
        '0.2 #aaa',
        '1 #000'
    ]
};

/**
 * Chip class.
 * @param {Array} board Game board.
 * @param {number} position Chip position.
 * @constructor
 */
function Chip(board, position) {
    this.board = board;
    // chip shape
    this.rect = stage.rect().stroke('black').fill(FILL);
    var textStyle = {
        fontSize: 40,
        hAlign: 'center',
        vAlign: 'middle',
        color: 'white',
        width: CHIP_WIDTH,
        height: CHIP_HEIGHT
    };
    // chip text
    this.text = stage.text(0, 0, board[position], textStyle);
    this.text.disablePointerEvents(true);

    this.setPosition(position);
    this.rect.listen('click', this.handleClick, false, this);
}


/**
 * Sets position to chip.
 * @param {number} newPosition New position.
 */
Chip.prototype.setPosition = function (newPosition) {
    var rowColumn, newBounds;
    this.position = newPosition;
    rowColumn = getRowColumnByIndex(newPosition);
    newBounds = getBoundsByRowColumn.apply(null, rowColumn);
    this.rect.setBounds(newBounds);
    this.text.x(newBounds.left).y(newBounds.top);
};


/**
 * Handles click of mouse.
 */
Chip.prototype.handleClick = function () {
    this.moveUp() || this.moveRight() || this.moveDown() || this.moveLeft();
};


/**
 * Move up action.
 * @return {boolean} Whether action performed.
 */
Chip.prototype.moveUp = function () {
    var newPosition = this.position - 4;
    if (this.board[newPosition] == 0) {
        this.board[this.position] = 0;
        this.setPosition(newPosition);
        this.board[newPosition] = this;
        if (this.checkBoard())
            alert('Congrats! You have won the game!');
        return true;
    }
    return false;
};


/**
 * Move down action.
 * @return {boolean} Whether action performed.
 */
Chip.prototype.moveDown = function () {
    var newPosition = this.position + 4;
    if (this.board[newPosition] == 0) {
        this.board[this.position] = 0;
        this.setPosition(newPosition);
        this.board[newPosition] = this;
        if (this.checkBoard())
            alert('Congrats! You have won the game!');
        return true;
    }
    return false;
};


/**
 * Move left action.
 * @return {boolean} Whether action performed.
 */
Chip.prototype.moveLeft = function () {
    var newPosition = this.position - 1;
    if (this.position % 4 > 0 && this.board[newPosition] == 0) {
        this.board[this.position] = 0;
        this.setPosition(newPosition);
        this.board[newPosition] = this;
        if (this.checkBoard())
            alert('Congrats! You have won the game!');
        return true;
    }
    return false;
};


/**
 * Move right action.
 * @return {boolean} Whether action performed.
 */
Chip.prototype.moveRight = function () {
    var newPosition = this.position + 1;
    if (this.position % 4 < 3 && this.board[newPosition] == 0) {
        this.board[this.position] = 0;
        this.setPosition(newPosition);
        this.board[newPosition] = this;
        if (this.checkBoard())
            alert('Congrats! You have won the game!');
        return true;
    }
    return false;
};


/**
 * Checks board.
 * @return {boolean} Whether game has been won.
 */
Chip.prototype.checkBoard = function () {
    // last element should be empty
    if (this.board[15] !== 0) return false;
    var win = true;
    for (var i = 0; i < 14; i++) {
        win = win && (+this.board[i].text.text() == (i + 1));
        if (!win) return false;
    }
    return win;
};

// helpers

/**
 * "Randomly" shuffles array.
 * @param {Array} arr Array to shuffle.
 */
function shuffle(arr) {
    var n = arr.length;
    for (var i = n - 1; i > 1; i--) {
        var j = Math.floor(Math.random() * (i + 1)); // take a random 0 <= j <= i
        var tmp = arr[j];
        arr[j] = arr[i];
        arr[i] = tmp;
    }
}


/**
 * Starts new game.
 */
function newGame() {
    shuffle(board);
    for (var i = 0; i < 16; i++) {
        var boardItem = board[i];
        if (boardItem) {
            if (boardItem instanceof Chip)
                boardItem.setPosition(i);
            else
                board[i] = new Chip(board, i);
        }
    }
}


/**
 * Get chip bounds by row and column.
 * @param {number} row Row.
 * @param {number} column Column.
 * @returns {graphics.math.Rect} Bounds.
 */
function getBoundsByRowColumn(row, column) {
    var left = column * CHIP_WIDTH;
    var top = row * CHIP_HEIGHT;
    var wShift = column == 3 ? 1 : 0;
    var hShift = row == 3 ? 1 : 0;
    return new acgraph.math.Rect(left + 0.5, top + 0.5, CHIP_WIDTH - wShift, CHIP_HEIGHT - hShift);
}


/**
 * Get row/column pair by index in array.
 * @param {number} index
 * @return {Array.<number, number>}
 */
function getRowColumnByIndex(index) {
    var column = index % 4;
    var row = (index - column) / 4;
    return [row, column]
}

// just for game generation
var board = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

// starts new game
newGame();

// finds index of zero chip
function findZero() {
    return board.indexOf(0);
}

// listener for keyboard
document.onkeyup = function (e) {
    //l37 u38 r39 d40
    if (e.keyCode > 36 && e.keyCode < 41) {
        var index = findZero();
        switch (e.keyCode) {
            case 37:
                if ((index % 4 < 3) && board[index + 1])
                    board[index + 1].moveLeft();
                break;
            case 38:
                if (board[index + 4])
                    board[index + 4].moveUp();
                break;
            case 39:
                if ((index % 4 > 0) && board[index - 1])
                    board[index - 1].moveRight();
                break;
            case 40:
                if (board[index - 4])
                    board[index - 4].moveDown();
                break;
        }
    }
};