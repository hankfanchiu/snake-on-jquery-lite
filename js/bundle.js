/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var View = __webpack_require__(1);
	
	$l(function() {
	  var $figure = $l(".snake");
	  new View($figure);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(2);
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map