(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
  };


  View.prototype.bindEvents = function () {
    var that = this;

    this.$el.find('.grid').on("click", function(e){
      var $cell = $(e.target);
      if (typeof $cell.attr("class") === "undefined") {
        that.makeMove($cell);
      }
    });
  };

  View.prototype.makeMove = function ($square) {
    var mark = this.game.currentPlayer;
    var id = $square.data("id");
    var pos = [parseInt(id/3), id%3];
    $square.append(mark);

    if (mark === 'x') {
      $square.addClass("x_cell");
    } else {
      $square.addClass("o_cell");
    }
    
    this.game.playMove(pos, mark);
    this.checkGameState();
  };

  View.prototype.checkGameState = function () {
    var winner = this.game.winner();
    if (this.game.isOver()) {
      if (winner === null) {
        alert("Game over.");
      } else {
        alert("Congratulations, " + winner + "!");
      }
    }
  };

  View.prototype.setupBoard = function () {
    var view = this;
    view.$el.append("<ul class='grid group'>");
    var $ul = $(".grid");

    for (var i = 0; i < 9; i++){
      var $li = $("<li></li>");
      $li.data("id", i);
      $ul.append($li);
    }
  };
})();
