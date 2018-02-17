/* ======= Model ======= */
var model = {
	currentQues: null,
	qs:[
	{	
		quesNo: 1,
		desc: 'Which of the following numbers is farthest from the number 1 on the number line?',
		optA: '1',
		optB: '2',
		optC: '3',
		optD: '4',
		CorrectAns: 'optA',
		YourAns:'NA'
	},
	{	
		quesNo: 2,
		desc: 'A car got 33 miles per gallon using gasoline that cost $2.95 per gallon. Approximately what was the cost, in dollars, of the gasoline used in driving the car 350 miles?',
		optA: '1',
		optB: '2',
		optC: '3',
		optD: '4',
		CorrectAns: 'optB',
		YourAns:'NA'
	},
	{	
		quesNo: 3,
		desc: 'The figure above shows the graph of the function f, defined by f of x = the absolute value of 2x, end absolute value, + 4 for all numbers x. For which of the following functions g, defined for all numbers x, does the graph of g intersect the graph of f ?',
		optA: '1',
		optB: '2',
		optC: '3',
		optD: '4',
		CorrectAns: 'optC',
		YourAns:'NA'
	},
	{	
		quesNo: 4,
		desc: 'If 5x plus 32 equals 4 minus 2x what is the value of x ?',
		optA: '1',
		optB: '2',
		optC: '3',
		optD: '4',
		CorrectAns: 'optD',
		YourAns:'NA'
	}
	]
}



/* ======= Octopus ======= */

var octopus = {
	
	init: function() {
		model.currentQues = model.qs[0];
		quesListView.init();
		quesView.init();
		resultView.init();
    },
	
	getCurrentQuestion: function(){
		return model.currentQues;
	},
	
	getAllQuestions: function(){
		return model.qs;
	},
	
	setCurrentQuestion: function(question){
		model.currentQues = question;
	},
	
	updateCurrentQuestionYourAns: function(question,optSelected){	
			
		question.YourAns = optSelected;
		if(question.YourAns == question.CorrectAns){
				resultView.show();
		}
	}
	
	
	
}

var quesView = {
	init: function(){
		this.desc = document.getElementById("quesDesc");
		this.optA = document.getElementById("optA");
		this.optB = document.getElementById("optB");
		this.optC = document.getElementById("optC");
		this.optD = document.getElementById("optD");
		
		this.lbloptA = document.getElementById("lbloptA");
		this.lbloptB = document.getElementById("lbloptB");
		this.lbloptC = document.getElementById("lbloptC");
		this.lbloptD = document.getElementById("lbloptD");
		
		
		var radios = document.querySelectorAll('input');

		for(var i = radios.length; i--; ) {
			radios[i].addEventListener('click',(function(){
				return function(){
					var currentQs = octopus.getCurrentQuestion();
					octopus.updateCurrentQuestionYourAns(currentQs, this.getAttribute('id'));
				}
			})());
		}
		
		this.render();
	},
	
	render: function(){
	
		var currentQs = octopus.getCurrentQuestion();		
		this.desc.textContent = currentQs.desc;
		debugger;
		if(currentQs.YourAns == "optA"){
			this.optA.checked = true;
		}
		else if(currentQs.YourAns == "optB"){
			this.optB.checked = true;
		}
		else if(currentQs.YourAns == "optC"){
			this.optC.checked = true;
		}
		else if(currentQs.YourAns == "optD"){
			this.optD.checked = true;
		}
		else{
			this.optA.checked = false;
			this.optB.checked = false;
			this.optC.checked = false;
			this.optD.checked = false;
		}
		this.optA.value = currentQs.optA;		
		this.lbloptA.textContent = currentQs.optA;
		

		this.optB.value = currentQs.optB;
		this.lbloptB.textContent = currentQs.optB;
		

		this.optC.value = currentQs.optC;
		this.lbloptC.textContent = currentQs.optC;
		
		
		this.optD.value = currentQs.optD;	
		this.lbloptD.textContent = currentQs.optD;
		
		
		
	}
	
	
}

var quesListView = {
	
	init: function(){
		this.quesListEl = document.getElementById("quesList");
		this.render();
	},
	
	render: function(){
		
		var ques, elem, i;
		var quesList = octopus.getAllQuestions();
		this.quesListEl.innerHTML = '';
		for(i = 0; i < quesList.length ; i++)
		{
			ques = quesList[i];
			elem = document.createElement('button');
			//elem.addClass("btn btn-primary");
			elem.innerHTML  = ques.quesNo;
			elem.addEventListener('click',(function(questionCopy){
				return function(){
					octopus.setCurrentQuestion(questionCopy);
					quesView.render()
				}
			})(ques));
			this.quesListEl.append(elem);
			
		}
		
	}	
}

var resultView = {
	init: function(){
		var me = this;
		me.modal = document.getElementById('myModal');
		var span = document.getElementsByClassName("close-model")[0];
		span.onclick = function() {
			
			me.modal.style.display = "none";
		};
		window.onclick = function(event) {
			if (event.target == me.modal) {
				me.modal.style.display = "none";
			}
		};
	},
	show: function(){
		this.modal.style.display = "block";
	}
}
octopus.init();