var app = {
    questionCount: 0,
    isAnswered: false,
    time: 30,
    timerInterval: 0,
    correctAnswerCount: 0,
    wrongAnswerCount: 0,
    unansweredCount: 0,

    questions: {
        question0: {
            question: "What is the biggest dog?",
            choice: [
                'GreatDane',
                'San Bernardo',
                'Chihuahua de los Pirineos',
                'Xolo',
            ],
            answer: 'GreatDane',

        },
        question1: {
            question: "What is the smallest dog?",
            choice: [
                'Chihuahua',
                'Mini Chihuahua',
                'Cocker',
                'German Pastor',
            ],
            answer: 'Chihuahua',
        },
        question2: {
            question: "What is the fastest dog?",
            choice: [
                'Cocker',
                'Chihuahua',
                'Greyhounds',
                'None'
            ],
            answer: 'Greyhounds',
        },
        question3: {
            question: "What is the cheaper dog?",
            choice: [
                'Callejero',
                'Chihuahua',
                'Greyhounds',
                'none',
            ],
            answer: 'Callejero',
        },
        question4: {
            question: "Guess my dog name?",
            choice: [
                'Olivia',
                'Camila',
                'Goofy',
                'Cooper'
            ],
            answer: 'Olivia',
        },
        question5: {
            question: 'Guess my dog breed?',
            choice: [
                'Great Dane',
                'Cocker',
                'Chihuahua',
                'You dont have a dog'
            ],
            answer: 'GreatDane',
        },
    },

    init: function() {
        app.questionCount = 0;
        app.isAnswered = false;
        app.time = 30;
        app.timerInterval = 0;
        app.correctAnswerCount = 0;
        app.wrongAnswerCount = 0;
        app.unansweredCount = 0;
    },

    printFirstQuestions: function() {
        app.startTimer();
        var html = "<div class='question'> 1) " + app.questions.question0.question + "</div>"
        html += '<ul id="question0">';
        for (var i = 0; i < app.questions.question0.choice.length; i++) {
            html += "<li id='" + app.questions.question0.choice[i] + "' class='answers'>" ;
            html += '<button class="btn btn-primary btn-answers">';
            html += app.questions.question0.choice[i] + "</button></li>";
        }
        html += '</ul>';
        $("#questions").html(html);
    },

    printNextQuestion: function() {
        app.isAnswered = false;
        app.startTimer();
        app.questionCount++;
        if (app.questionCount == Object.keys(app.questions).length) {
            app.questionCount = 0;
            clearInterval(timerInterval);
            app.printResult();
        } else {
            app.printQuestion();
        }
    },

    //print questions
    printQuestion: function() {
        var q = 'question' + app.questionCount;
        var html = "<div class='question'>" + (app.questionCount + 1) + ") " + app.questions[q].question + "</div>"
        html += '<ul id="' + q + '" class="touch">';
        for (var i = 0; i < app.questions[q].choice.length; i++) {
            html += "<li class='answers' id='" + app.questions[q].choice[i] + "'>";
            html += '<button class="btn btn-primary btn-answers">';
            html += app.questions[q].choice[i] + "</button></li>";
        }
        html += '</ul>';
        $("#questions").html(html);
    },

    //check answer is correct, wrong or not entered
    printAnswer: function(parentId, childId) {
        var html = "";
        app.printTime();
        if (childId == app.questions[parentId].answer) {
            html += "<div id='correctOrWrong' style='color:#17A589;'>Correct !!</div>";
            app.correctAnswerCount++;
        } else {
            if (!app.isAnswered) {
                html += "<div id='noAnswer'>Out of Time !!</div>"
                app.unansweredCount++;
            } else {
                html += "<div id='correctOrWrong' style='color:red;'>Wrong !!</div>"
                app.wrongAnswerCount++;
            }
            html += "<div id='correctAnswer'>The correct answer is:  <b> " + app.questions[parentId].answer + " </b></div>";
        }
        html += "<div><img width='200' height='150' src='assets/images/" + app.questions[parentId].answer + ".jpg'></div>";
        $("#questions").html(html);
        setTimeout(app.printNextQuestion, 2000);
    },

    //print result
    printResult: function() {
        $("#timer").empty();
        var html = "<div id='noAnswer'>All Done. Here is how you did !</div>"
        html += "<div class='correctAnswer'>Correct Answers : <b> " + app.correctAnswerCount + "</b></div>"
        html += "<div class='correctAnswer'>Incorrect Answers : <b> " + app.wrongAnswerCount + "</b></div>"
        html += "<div class='correctAnswer'>Unanswered : <b> " + app.unansweredCount + "</b></div>"
        html += "<button class='btn btn-md btn-primary' id='startOver'> Start Over</button>"
        $("#questions").html(html);
    },

    //starts timer
    startTimer: function() {
        app.time = 30;
        app.printTime();
        timerInterval = setInterval(app.timer, 1000)
    },

    timer: function() {
        app.time--;
        app.printTime();
        app.timeUp();
    },

    //check ran out of time
    timeUp: function() {
        if (app.time == '00') {
            clearInterval(timerInterval);
            var q = 'question' + app.questionCount;
            app.printAnswer(q, " ");
        }
    },

    //display time in seconds
    printTime: function() {
        $("#timer").html("Time Remaining: " + app.timeConverter(app.time) + " seconds");
    },

    // displays seconds in 2 digits
    timeConverter: function(time) {
        var seconds = time;
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return seconds;
    },

    //setup event handlers
    setupEventHandlers: function() {
        $("#start").on('click', function() {
            app.printFirstQuestions();
        });

        $("#questions").on('click', '.answers', function() {
            app.isAnswered = true;
            clearInterval(timerInterval);
            var parentId = $(this).parent().attr('id');
            var childId = $(this).attr('id');
            app.printAnswer(parentId, childId);
        });

        $("#questions").on('click', '#startOver', function() {
            app.init();
            app.printFirstQuestions();
        });
    },
} //End trivia object

$(document).ready(function() {
app.setupEventHandlers();
});
