function getWord(event, forced) {
    word = words[Math.floor(Math.random() * words.length)];

    $("#word").text(shuffelWord(word));

    if (!forced && !freeSpin) {
        people[currentPerson]['points'] -= spinCount;
        spinCount++;
        setPoints();
    } else if (!forced && freeSpin) {
        freeSpin = false;
        $("#newWord").addClass("btn-danger")
            .removeClass("btn-success");
    }
    if (!forced) {
        rollSound.pause();
        rollSound.currentTime = 0;
        rollSound.play();
    }
    if (debug) {
        console.log(word);
    }
    $("#guess").val("")
        .attr('maxlength', word.length);
}

function guess() {
    var guess = $("#guess");
    var oldPoints = people[currentPerson]['points'];
    calculatePoints(guess);
    setPoints();
    var dif = people[currentPerson]['points'] - oldPoints;

    var score = $("#score");
    if (dif > 0) {
        score.text("+" + dif + " punkti");
        score.css('color', 'green');
        if (bonusPoints >= 15) {
            streakSound.play();
        } else {
            positiveSound.play();
        }
    } else if (dif < 0) {
        score.css('color', 'red');
        score.text(dif + " punkti");
        negativeSound.play();
    } else {
        score.css('color', 'blue');
        score.text("0 punkti");
    }

    $("#word").text("Atbilde - " + word);
    guess.attr("disabled", "disabled");
    score.show();
    $("#nextWord").show()
        .focus();
    $("#submitGuess").hide();
    $("#newWord").hide();
}

function nextWord() {
    getWord(event, true);
    $("#newWord").show();
    $("#guess").removeAttr("disabled")
        .focus();
    $("#next").hide();
    $("#nextWord").hide();
    $("#submitGuess").show();
    $("#score").hide();
}

function next(event) {
    currentPerson++;
    if (currentPerson >= people.length) {
        currentPerson = 0;
    }
    getWord(event, true);
    bonusPoints = 5;
    freeSpin = true;
    spinCount = 1;
    $("#streak").text("");
    $("#newWord").removeClass("btn-danger")
        .addClass("btn-success")
        .show();
    $("#guess").removeAttr("disabled")
        .focus();
    $("#next").hide();
    $("#nextWord").hide();
    $("#submitGuess").show();
    $("#score").hide();
    $("#clock").css("color", "black");
    resetPerson();
    timer.start({countdown: true, startValues: {seconds: 60}});
}