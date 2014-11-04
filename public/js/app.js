// Question constructor
var Question = function(args) {
    this.uid = args.uid;
    this.question = args.question;
    this.options = args.options;
    this.answer = args.answer;
};

// Answer constructor
var Answer = function() {};
Answer.prototype = [];
Answer.prototype.push = function() {
    Array.prototype.push.call(this, arguments[0]);
    showResult();
};



/******************************************
	Create question objects
******************************************/

var q1 = new Question({
    id: 1,
    uid: 'q1',
    question: "What is the product name?",
    answer: ''
});

var q2 = new Question({
    uid: 'q2',
    question: "Is your product in budget?",
    options: [{
        label: "It's cheap",
        score: 10
    }, {
        label: "I can afford this",
        score: 5
    }, {
        label: "No, It's expensive.",
        score: 0
    }]
});

var q3 = new Question({
    uid: 'q3',
    question: "Is your product interesting?",
    options: [{
        label: "Boring",
        score: 0
    }, {
        label: "Meh",
        score: 5
    }, {
        label: "Awesome!",
        score: 10
    }, {
        label: "It's my dream to have this",
        score: 15
    }]
});

var q4 = new Question({
    uid: 'q4',
    question: "After buying ...",
    options: [{
        label: "I will hate myself a little",
        score: 0
    }, {
        label: "Nothing will change.",
        score: 5
    }, {
        label: "I will feel good.",
        score: 10
    }, {
        label: "My life might change.",
        score: 15
    }]
});

// Dump all the question objects in "questions" array
var questions = [q1, q2, q3, q4];


/******************************************
 Render Questions
*****************************************/
for (var i = 0; i < questions.length; i++) {

    var selector = i + 1;
    selector = 'q' + selector;

    $('#questions').append('<div class="qBox" id=' + selector + '><h4>' + questions[i].question + '</h4> <div id="btn-' + questions[i].uid + '"></div> </div>');

    if (questions[i].options) {
        questions[i].options.forEach(function(option) {
            $('#btn-' + questions[i].uid).append(' <button class="btn btn-lg btn-default btn-' + questions[i].uid + '" value=' + option.score + ' onclick="selectAnswer(' + selector + ',' + option.score + ')" >' + option.label + '</button>');
        });
    } else {

        // Textbox 
        var textBox = $('#' + selector).append('<input type="text" class="textBox"  id="txtq1" name="name">');

        // On textbox change asing its value to "var product" 
        textBox.change(function(event) {
            product = $('#' + event.target.id).val();

            // Scroll to next question
            $('html, body').animate({
                scrollTop: $('#q2').offset().top
            }, 1000);

        });

    }
};


var product = '';
var answer = new Answer();

function selectAnswer(obj, score) {
    $('.' + event.target.parentNode.id).removeClass('active btn-info');
    event.target.className += ' active btn-info';

    // Scroll to next div
    //console.log(event.target.parentNode.nextSibling.parentNode.nextSibling.id);
    var nextSibling = event.target.parentNode.nextSibling.parentNode.nextSibling;
    if (nextSibling) {
        var nextDiv = '#' + nextSibling.id;
        $('html, body').animate({
            scrollTop: $(nextDiv).offset().top
        }, 1000);
    } else {
        $('html, body').animate({
            scrollTop: $("#result").offset().top
        }, 1000);
    }


    // Removes duplicate values from answer(array)
    for (var i = 0; i < answer.length; i++) {
        if (answer[i].uid === obj.uid) {
            answer.splice(i, 1);
        }
    };

    answer.push({
        uid: obj.uid,
        score: score
    });
}


/******************************
	Show Result
******************************/
var showResult = function() {

	var report = {};
	var a2,a3,a4 = null;

	for(i in answer) {
		if(answer[i].uid === 'q2'){
			a2 = answer[i].score;
		}

		if(answer[i].uid === 'q3'){
			a3 = answer[i].score;
		}

		if(answer[i].uid === 'q4'){
			a4 = answer[i].score;
		}
	}

	if(a2 !== null && a3 !== null && a4 !== null) {
		
		//Budget
		if(a2 >= 5) {
			report.budget = true;
		} else {
			report.budget = false;
		}

		// Interesting 
		if(a3 > 10) {
			report.interesting = true;
		} else {
			report.interesting = false;
		}

		//Experience
		if(a4 > 5){
			report.experience = true;
		} else {
			report.experience = false;
		}



		if( report.budget==false && report.interesting == false && report.experience == false) {
			$('#message').html("000");
			console.log(a2,a3,a4);
		}

		if( report.budget==false && report.interesting == false && report.experience == true) {
			$('#message').html("001");
			console.log(a2,a3,a4);
		}

		if( report.budget==false && report.interesting == true && report.experience == false) {
			$('#message').html("010");
			console.log(a2,a3,a4);
		}

		if( report.budget==false && report.interesting == true && report.experience == true) {
			$('#message').html("011");
			console.log(a2,a3,a4);
		}

		if( report.budget==true && report.interesting == false && report.experience == false) {
			$('#message').html("100");
			console.log(a2,a3,a4);
		}

		if( report.budget==true && report.interesting == false && report.experience == true) {
			$('#message').html("101");
			console.log(a2,a3,a4);
		}

		if( report.budget==true && report.interesting == true && report.experience == false) {
			$('#message').html("110");
			console.log(a2,a3,a4);
		}

		if( report.budget==true && report.interesting == true && report.experience == true) {
			$('#message').html("111");
			console.log(a2,a3,a4);
		}



		


	} else {
		$('#message').html("");
	}


}
