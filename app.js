/* ======= Model ======= */
var model = {
	currentQues: null,
	qs:[
	{	
		quesNo: 1,
		desc: 'Who has got hieghest in M.Tech',
		optA: 'Harpal',
		optB: 'Sourabh',
		optC: 'Durgesh',
		optD: 'other',
		CorrectAns: 'optA',
		YourAns:'NA'
	},
	{	
		quesNo: 2,
		desc: "The absorption of ink by blotting paper involves",
		optA: 'viscosity of ink',
		optB: 'capillary action phenomenon',
		optC: 'diffusion of ink through the blotting',
		optD: 'siphon action',
		CorrectAns: 'optB',
		YourAns:'NA'
	},
	{	
		quesNo: 3,
		desc: 'Brass gets discoloured in air because of the presence of which of the following gases in air?',
		optA: 'Oxygen',
		optB: 'Hydrogen sulphide',
		optC: 'Carbon dioxide',
		optD: 'Nitrogen',
		CorrectAns: 'optB',
		YourAns:'NA'
	},
	{	
		quesNo: 4,
		desc: 'Which of the following is a non metal that remains liquid at room temperature?',
		optA: 'Phosphorous',
		optB: 'Bromine',
		optC: 'Chlorine',
		optD: 'Helium',
		CorrectAns: 'optB',
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