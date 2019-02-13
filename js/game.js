
function getWord(event,forced){
    word = words[Math.floor(Math.random()*words.length)];

    $("#word").text(shuffelWord(word));

    if (!forced && !freeSpin){
        people[currentPerson]['points'] -= spinCount;
        spinCount++;
        setPoints();
    }else if (!forced && freeSpin) {
        freeSpin = false;
        $("#newWord").addClass("btn-danger")
                     .removeClass("btn-success");
    }
    $("#guess").val("")
               .attr('maxlength',word.length);
}

function guess(){
    var guess = $("#guess");
    var guessWord = guess.val();
    var oldPoints = people[currentPerson]['points'];

    for(var i = 0; i < word.length; i++) {
        if (guessWord[i] === word[i]) {
            people[currentPerson]['points'] ++;
        }
        else {
            people[currentPerson]['points'] -- ;
        }
    }
    setPoints();

    var dif = people[currentPerson]['points'] - oldPoints;

    var score = $("#score");
    if (dif > 0){
        score.text("+" + dif + " punkti");
        score.css('color', 'green');
    }else if (dif < 0) {
        score.css('color', 'red');
        score.text(dif + " punkti");
    }else{
        score.css('color', 'blue');
        score.text("0 punkti");
    }

    $("#word").text("Atbilde - " + word );
    guess.attr("disabled","disabled");
    score.show();
    $("#nextWord").show()
              .focus();
    $("#submitGuess").hide();
    $("#newWord").hide();
}

function nextWord() {
    getWord(event,true);
    $("#newWord").removeClass("btn-danger")
        .addClass("btn-success")
        .show();
    $("#guess").removeAttr("disabled");
    $("#next").hide();
    $("#nextWord").hide();
    $("#submitGuess").show();
    $("#score").hide();
}

function next(event){
    currentPerson++;
    if (currentPerson >= people.length) {
        currentPerson = 0;
    }
    getWord(event,true);
    freeSpin = true;
    spinCount = 1;
    $("#newWord").removeClass("btn-danger")
        .addClass("btn-success")
        .show();
    $("#guess").removeAttr("disabled");
    $("#next").hide();
    $("#nextWord").hide();
    $("#submitGuess").show();
    $("#score").hide();
    $("#clock").css("color","black");
    resetPerson();
    timer.start({countdown: true, startValues: {seconds: 60}});
}

function remove(e) {
    var row = $(e.target.parentElement.parentElement);
    var personId = row.attr('personId');

    for(var i = 0; i < people.length; i++) {
        if (people[i]['id'] == personId) {
            people.splice(i, 1);
            row.remove();
            break;
        }
    }
}

