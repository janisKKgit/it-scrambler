var word;
var debug = false;
var freeSpin = true;
var spinCount = 1;
var currentPerson = 0;
var bonusPoints = 5;
var timer = new easytimer.Timer();
// Load sounds
var hornSound = new Audio('vendor/sounds/horn.wav');
var clockSound = new Audio('vendor/sounds/clock.wav');
var positiveSound = new Audio('vendor/sounds/positive.wav');
var negativeSound = new Audio('vendor/sounds/negative.wav');
var streakSound = new Audio('vendor/sounds/streak.wav');
var rollSound = new Audio('vendor/sounds/roll.wav');
var deleteSound = new Audio('vendor/sounds/delete.wav');

function setPoints() {
    $("tr[personId='" + people[currentPerson]['id'] + "'] td[name='points']").text(people[currentPerson]['points']);
}

function calculatePoints(guess) {
    var guessWord = guess.val();
    var noMistakes = true;
    for (var i = 0; i < word.length; i++) {
        if (guessWord[i] && guessWord[i].toLowerCase() === word[i]) {
            people[currentPerson]['points']++;
        }
        else {
            noMistakes = false;
            people[currentPerson]['points']--;
        }
    }

    if (noMistakes) {
        people[currentPerson]['points'] += bonusPoints;
        bonusPoints += 5;
        if (bonusPoints >= 15) {
            $("#streak").text(((bonusPoints - 5) / 5) + " in a row!")
                .css("font-size", (bonusPoints * 2) + "pt");
        }
    } else {
        $("#streak").text("");
        bonusPoints = 5;
    }
}

function resetPerson() {
    if (currentPerson > 0) {
        $("tr[personId='" + people[currentPerson - 1]['id'] + "']").removeClass("table-primary");
    } else {
        $("tr[personId='" + people[people.length - 1]['id'] + "']").removeClass("table-primary");
    }
    $("tr[personId='" + people[currentPerson]['id'] + "']").addClass("table-primary");
}

function shuffelWord(word) {
    var check = word;
    do {
        var shuffledWord = '';
        word = word.split('');
        while (word.length > 0) {
            shuffledWord += word.splice(word.length * Math.random() << 0, 1);
        }
    } while (check == shuffledWord);

    return shuffledWord;
}

// Timer functions
function updateTimer(e) {
    $('#clock').html(timer.getTimeValues().toString(['hours', 'minutes', 'seconds', 'secondTenths']));
    if (timer.getTotalTimeValues().seconds && timer.getTotalTimeValues().seconds % 10 === 0) {
        clockSound.play();
    }
}

function endTimer(e) {
    hornSound.play();
    $("#word").text("Time's up!");
    $("#score").hide();
    $("#nextWord").hide();
    $("#submitGuess").hide();
    $("#newWord").hide();
    $("#guess").attr("disabled", "disabled");

    $("#clock").css("color", "red");
    setTimeout(function () {
        $("#next").show();
    }, 3000);
}

function remove(e) {
    if (timer.getTotalTimeValues().seconds === 0) {
        var row = $(e.target.parentElement.parentElement);
        var personId = row.attr('personId');

        for (var i = 0; i < people.length; i++) {
            if (people[i]['id'] == personId) {
                people.splice(i, 1);
                row.remove();
                deleteSound.pause();
                deleteSound.currentTime = 0;
                deleteSound.play();
                // if removed current player than reset current to last
                if (i === currentPerson) {
                    if (i !== 0) {
                        currentPerson--;
                    }
                    resetPerson();
                }
                break;
            }
        }
    }
}