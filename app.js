/* ======= Model ======= */
var model = {
	currentQues: null,
	qs:[
	{	
		quesNo: 1,
		desc: 'The name of faculty, whos conversation with student was this <br \><b>sir</b>: kyu baat kar rhe ho.<br \><b>student</b>: mai nhi sir ye bol raha tha. <br \> <b>sir</b>: wo jale, mare, kate usme aag lag jaye, tu apna muh band rakh',
		optA: 'Mr. Sachin Sharma',
		optB: 'Mr.Ashok kumar ahuja',
		optC: 'Mr. A k raja',
		optD: 'Mr Shatish',
		CorrectAns: 'optB',
		YourAns:'NA'
	},
	{	
		quesNo: 2,
		desc: "Whos name was Dadda",
		optA: 'Mr. Sachin Sharma',
		optB: 'Mr.Ashok kumar ahuja',
		optC: 'Mr. A k raja',
		optD: 'Mr Shatish',
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
		desc: 'Which of the following numbers is farthest from the number 1 on the number line?',
		optA: '1',
		optB: '2',
		optC: '3',
		optD: '4',
		CorrectAns: 'optD',
		YourAns:'NA'
	},
	{	
		quesNo: 5,
		desc: 'If 5x plus 32 equals 4 minus 2x what is the value of x ?',
		optA: '1',
		optB: '2',
		optC: '3',
		optD: '4',
		CorrectAns: 'optD',
		YourAns:'NA'
	},
	{	
		quesNo: 6,
		desc: 'Which of the following numbers is farthest from the number 1 on the number line?',
		optA: '1',
		optB: '2',
		optC: '3',
		optD: '4',
		CorrectAns: 'optD',
		YourAns:'NA'
	},
	{	
		quesNo: 7,
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
				resultView.show("Correct");
		}
		else{
			resultView.show("InCorrect");
		}
	},
	getScores: function(){
		var i,isCorrect,count = 0;
		for(i=0;i< model.qs.length;i++)
		{
			if(model.qs[i].CorrectAns === model.qs[i].YourAns)
			{
				count++ ;
			}
		}
		return "You got " + count +" out of " + model.qs.length +" ";
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
		this.desc.innerHTML = currentQs.desc;
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
		this.btnResult = document.getElementById("btnSubmit");
		this.btnResult.onclick = function(){
			//resultView.show(octopus.getScores());
			alert(octopus.getScores());
			window.location.reload();
			//setTimeout(function(){  }, 3000);
			
		};
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
			
			elem.innerHTML  = ques.quesNo;
			elem.addEventListener('click',(function(questionCopy){
				return function(){
					this.style.background = "red";
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
		me.modalbodyContent = document.getElementsByClassName('modal-body')[0];
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
	show: function(bodyContent){
		this.modal.style.display = "block";
		this.modalbodyContent.innerHTML = bodyContent;
	}
}
octopus.init();