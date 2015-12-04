// Coord class:

function Coord(position) {
  this.position = position;
};

Coord.DELTAS = {
  "N": [-1,  0],
  "S": [ 1,  0],
  "E": [ 0,  1],
  "W": [ 0, -1]
};

Coord.prototype.plus = function(direction) {
  var delta = Coord.DELTAS[direction];
  var row = this.position[0] + delta[0];
  var col = this.position[1] + delta[1];

  return new Coord([row, col]);
};

Coord.prototype.equals = function() {
  return this.position;
};

Coord.prototype.isOpposite = function(direction) {

};


// Snake class:

function Snake(direction) {
  this.direction = direction;
  this.segments = [];

  this.setup();
};

Snake.OPPOSITE_DIR = {
  "N": "S",
  "S": "N",
  "E": "W",
  "W": "E"
};

Snake.prototype.setup = function() {
  this.segments.push(new Coord([5, 5]));
  this.segments.push(new Coord([6, 5]));
  this.segments.push(new Coord([7, 5]));
};

Snake.prototype.move = function() {
  var head = this.segments[0];
  var newHead = head.plus(this.direction);

  this.segments.pop();
  this.segments.unshift(newHead);
};

Snake.prototype.turn = function(newDirection) {
  if (this.isValidTurn(newDirection)) {
    this.direction = newDirection;
  }
};

Snake.prototype.isValidTurn = function(newDirection) {
  var opposite = Snake.OPPOSITE_DIR[this.direction];

  return opposite === newDirection;
};


// Board class:

function Board() {
  this.snake = new Snake("N");
}


module.exports = Board;
