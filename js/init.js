// Add event listeners and init
function init() {
    $("#start").hide();
    $("#actions").show();
    $("#newWord").on('click',getWord);
    $("#guess").keypress(function(e) {
        if(e.which === 13) {
            guess();
        }
    });
    $("#submitGuess").on('click',guess);
    $("#next").on('click',next)
        .hide();
    $("#nextWord").on('click',nextWord)
        .hide();
    $("#score").hide();

    getWord(event,true);
    resetPerson();
    timer.start({countdown: true, startValues: {seconds: 60}});
}

$("#start").on('click',init);
$("button[name='delete']").on('click',remove);

timer.addEventListener('secondTenthsUpdated', function (e) {
    $('#clock').html(timer.getTimeValues().toString(['hours', 'minutes', 'seconds', 'secondTenths']));
    if (timer.getTotalTimeValues().seconds && timer.getTotalTimeValues().seconds % 10 === 0  ) {
        clockSound.play();
    }
});
timer.addEventListener('targetAchieved', function (e) {
    hornSound.play();
    $("#word").text("Time's up!");
    $("#score").hide();
    $("#nextWord").hide();
    $("#submitGuess").hide();
    $("#newWord").hide();
    $("#guess").attr("disabled","disabled");

    $("#clock").css("color","red");
    setTimeout(function(){$("#next").show();}, 3000);
});