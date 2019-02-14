// Add event listeners and init
function init() {
    $("#start").hide();
    $("#actions").show();
    $("#newWord").on('click', getWord);
    $("#guess").keypress(function (e) {
        if (e.which === 13) {
            guess();
        }
    }).focus();
    $("#submitGuess").on('click', guess);
    $("#next").on('click', next)
        .hide();
    $("#nextWord").on('click', nextWord)
        .hide();
    $("#score").hide();

    getWord(event, true);
    resetPerson();
    timer.start({countdown: true, startValues: {seconds: 60}});
}

$("#start").on('click', init);
$("button[name='delete']").on('click', remove);

timer.addEventListener('secondTenthsUpdated', updateTimer);
timer.addEventListener('targetAchieved', endTimer);