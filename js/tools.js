var word;
var freeSpin = true;
var spinCount = 1;
var currentPerson = 0;
var timer = new easytimer.Timer();
var hornSound = new Audio('vendor/sounds/horn.wav');
var clockSound = new Audio('vendor/sounds/clock.wav');

function setPoints() {
    $("tr[personId='" + people[currentPerson]['id'] + "'] td[name='points']").text(people[currentPerson]['points']);
}

function resetPerson() {
    if (people[currentPerson]['id'] > 0) {
        $("tr[personId='" + people[currentPerson-1]['id']  + "']").removeClass("table-primary");
    }else {
        $("tr[personId='" + people[people.length-1]['id']  + "']").removeClass("table-primary");
    }
    $("tr[personId='" + people[currentPerson]['id'] + "']").addClass("table-primary");
}

function shuffelWord (word){
    var check = word;
    do {
        var shuffledWord = '';
        word = word.split('');
        while (word.length > 0) {
            shuffledWord += word.splice(word.length * Math.random() << 0, 1);
        }
    }while(check == shuffledWord);

    return shuffledWord;
}