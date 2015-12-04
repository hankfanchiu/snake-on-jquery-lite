var Board = require("./snake");

function View($el) {
  this.$el = $el;
  this.board = new Board();
  this.snake = this.board.snake;

  this.setupGrid();
  // this.renderGrid();

  // this.registerEvents();
  // setInterval(this.step.bind(this), 1000);
}

View.DIRECTION_KEYS = {
  87: "N",
  65: "W",
  83: "S",
  68: "E"
};

View.prototype.setupGrid = function () {
  var $row, $cell;

  for (var row = 0; row < 50; row++) {
    $row = $l('<div>').addClass('row').attr("id", row);

    for (var col = 0; col < 50; col++) {
      $cell = $l('<div>').addClass('cell').attr("id", col);

      $row.append($cell);
    }

    this.$el.append($row);
  }
};

View.prototype.renderGrid = function () {
  var snakeSegments = this.snake.segments;
  var x, y;
  var $row;
  var $cell = $l('.cell');

  for (var i = 0; i < snakeSegments.length; i++) {
    x = JSON.stringify(snakeSegments[i][0]);
    y = JSON.stringify(snakeSegments[i][1]);

    $row = this.$el.children().find('#' + x);
    $cell = $row.children().find('#' + y);
  }
};

View.prototype.registerEvents = function () {
  this.$el.on("keydown", this.handleKeyEvent.bind(this));
};

View.prototype.handleKeyEvent = function (e) {
  var direction = View.DIRECTION_KEYS[e.keyCode];

  if (direction) {
    this.snake.turn(direction);
  }
};

View.prototype.step = function () {
  this.snake.move();
  this.renderGrid();
};


module.exports = View;
