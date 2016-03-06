"use strict";

// JavaScript Document
$(document).ready(function() {
    const socket = io.connect();
    console.log(socket);
    var x = "x";
    var o = "o";
    var count = 0;
    var o_win = 0;
    var x_win = 0;

    // runs on each o click to see if o user won
    function o_won() {
        if ($("#one").hasClass('o') && $("#two").hasClass('o') && $("#three").hasClass('o') ||
        $("#four").hasClass('o') && $("#five").hasClass('o') && $("#six").hasClass('o') ||
        $("#seven").hasClass('o') && $("#eight").hasClass('o') && $("#nine").hasClass('o') ||
        $("#one").hasClass('o') && $("#four").hasClass('o') && $("#seven").hasClass('o') ||
        $("#two").hasClass('o') && $("#five").hasClass('o') && $("#eight").hasClass('o') ||
        $("#three").hasClass('o') && $("#six").hasClass('o') && $("#nine").hasClass('o') ||
        $("#one").hasClass('o') && $("#five").hasClass('o') && $("#nine").hasClass('o') ||
        $("#three").hasClass('o') && $("#five").hasClass('o') && $("#seven").hasClass('o')) {
            alert('O wins');
            count = 0;
            o_win++;
            $('#o_win').text(o_win);
        }
    }

    // runs on each x click to see if x user won
    function x_won() {
        if ($("#one").hasClass('x') && $("#two").hasClass('x') && $("#three").hasClass('x') ||
        $("#four").hasClass('x') && $("#five").hasClass('x') && $("#six").hasClass('x') ||
        $("#seven").hasClass('x') && $("#eight").hasClass('x') && $("#nine").hasClass('x') ||
        $("#one").hasClass('x') && $("#four").hasClass('x') && $("#seven").hasClass('x') ||
        $("#two").hasClass('x') && $("#five").hasClass('x') && $("#eight").hasClass('x') ||
        $("#three").hasClass('x') && $("#six").hasClass('x') && $("#nine").hasClass('x') ||
        $("#one").hasClass('x') && $("#five").hasClass('x') && $("#nine").hasClass('x') ||
        $("#three").hasClass('x') && $("#five").hasClass('x') && $("#seven").hasClass('x')) {
            alert('X wins');
            count = 0;
            x_win++;
            $('#x_win').text(x_win);
        }
    }

    // ---------------------
    // -------- SOCKET STUFF
    // ---------------------

    socket.on('o moved', function(info) {
        console.log("someone moved!", info.count, info.move);
        const oMoveNum = `#${info.move}`;
        console.log("move is: ", oMoveNum);
        count = info.count;
        console.log(`count is now: ${count}`);
        $(`${oMoveNum}`).addClass('disable o btn-primary').html('o');
        o_won();
    });
    socket.on('x moved', function(info) {
        console.log("someone moved!", info.count, info.move);
        const xMoveNum = `#${info.move}`;
        console.log("move is: ", xMoveNum);
        count = info.count;
        console.log(`count is now: ${count}`);
        $(`${xMoveNum}`).addClass('disable x btn-info').html('x');
        x_won();
    });

    // ---------------------------
    // -------- SOCKET STUFF ENDS
    // ---------------------------




    $('#game li').click(function() {
        // tests for O winner already exists
        if ($("#one").hasClass('o') && $("#two").hasClass('o') && $("#three").hasClass('o') ||
        $("#four").hasClass('o') && $("#five").hasClass('o') && $("#six").hasClass('o') ||
        $("#seven").hasClass('o') && $("#eight").hasClass('o') && $("#nine").hasClass('o') ||
        $("#one").hasClass('o') && $("#four").hasClass('o') && $("#seven").hasClass('o') ||
        $("#two").hasClass('o') && $("#five").hasClass('o') && $("#eight").hasClass('o') ||
        $("#three").hasClass('o') && $("#six").hasClass('o') && $("#nine").hasClass('o') ||
        $("#one").hasClass('o') && $("#five").hasClass('o') && $("#nine").hasClass('o') ||
        $("#three").hasClass('o') && $("#five").hasClass('o') && $("#seven").hasClass('o')) {

            alert('O has won the game. Start a new game');
            $("#game li").text("+");
            $("#game li").removeClass('disable');
            $("#game li").removeClass('o');
            $("#game li").removeClass('x');
            $("#game li").removeClass('btn-primary');
            $("#game li").removeClass('btn-info');
        // tests for X winner already exists
        } else if ($("#one").hasClass('x') && $("#two").hasClass('x') && $("#three").hasClass('x') ||
        $("#four").hasClass('x') && $("#five").hasClass('x') && $("#six").hasClass('x') ||
        $("#seven").hasClass('x') && $("#eight").hasClass('x') && $("#nine").hasClass('x') ||
        $("#one").hasClass('x') && $("#four").hasClass('x') && $("#seven").hasClass('x') ||
        $("#two").hasClass('x') && $("#five").hasClass('x') && $("#eight").hasClass('x') ||
        $("#three").hasClass('x') && $("#six").hasClass('x') && $("#nine").hasClass('x') ||
        $("#one").hasClass('x') && $("#five").hasClass('x') && $("#nine").hasClass('x') ||
        $("#three").hasClass('x') && $("#five").hasClass('x') && $("#seven").hasClass('x')) {

            alert('X wins has won the game. Start a new game');
            $("#game li").text("+");
            $("#game li").removeClass('disable');
            $("#game li").removeClass('o');
            $("#game li").removeClass('x');
            $("#game li").removeClass('btn-primary');
            $("#game li").removeClass('btn-info');
        // tests if all squares are clicked but there is no winner
        } else if (count === 9) {

            alert('Its a tie. It will restart.');
            $("#game li").text("+");
            $("#game li").removeClass('disable');
            $("#game li").removeClass('o');
            $("#game li").removeClass('x');
            $("#game li").removeClass('btn-primary');
            $("#game li").removeClass('btn-info');
            count = 0;
        // tests if square is already clicked
        } else if ($(this).hasClass('disable')) {
            alert('Already selected');
        // checks for o's turn move
        } else if (count%2 === 0) {
            count++;
            $(this).text(o);
            $(this).addClass('disable o btn-primary');
            // send to other user
            socket.emit('o moved', {
                count: count,
                move: this.id
            });

            o_won();
        // checks for x's turn move
        } else {
            console.log("x: ", this);
            count++;
            $(this).text(x);
            $(this).addClass('disable x btn-info');
            // send to other user
            socket.emit('x moved', {
                count: count,
                move: this.id
            });
            x_won();
        }

    }); // end game click function

    $("#reset").click(function() {
        $("#game li").text("+");
        $("#game li").removeClass('disable');
        $("#game li").removeClass('o');
        $("#game li").removeClass('x');
        $("#game li").removeClass('btn-primary');
        $("#game li").removeClass('btn-info');
        count = 0;
    });
});
