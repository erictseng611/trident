document.addEventListener("DOMContentLoaded", function(event) {

    var allViews = document.querySelectorAll('.view');

    class home {
        constructor() {
            this.matchViewButton = document.getElementById('matchViewButton');
            this.scheduleViewButton = document.getElementById('scheduleViewButton');
            this.matchView = document.getElementById('matchView');
            this.scheduleView = document.getElementById('scheduleView');
            this.homeView = document.getElementById('homeView');

            this.matchViewButton.addEventListener('click', () => this.view(this.matchView));
            this.scheduleViewButton.addEventListener('click', () => this.view(this.scheduleView));

            // whenever a button has data-button = viewHome, go back to the home page
            var returnHomeButtons = document.querySelectorAll('[data-button="viewHome"]');
            returnHomeButtons.forEach((button) => { button.addEventListener('click', () => this.view(this.homeView)) })
        }

        // hide all views
        hideViews() {
            allViews.forEach((section) => {
                if (!section.classList.contains('hidden')) {
                    section.classList.add('hidden');
                }
            });
        }

        // view the passed in section
        view(section) {
            this.hideViews();
            section.classList.remove('hidden');
        }
    };

    var homePages = new home();


    class match {
        constructor() {
            this.doublesViewButton = document.querySelector('[data-button="viewDoubles"]');
            this.singlesViewButton = document.querySelector('[data-button="viewSingles"]');
            this.doublesView = document.getElementById('doubles');
            this.singlesView = document.getElementById('singles');
            this.matchInspector = document.getElementById('matchInspector');

            //add click listeners for 3 views of matches
            this.doublesViewButton.addEventListener('click', () => this.view(this.doublesView));
            this.singlesViewButton.addEventListener('click', () => this.view(this.singlesView));
            document.querySelector('#returnFromInspector').addEventListener('click', ()=>this.returnToMatches());
            this.startNewMatch();

            this.scores = document.querySelectorAll('.scoreContainer');
           	this.scores.forEach(match=>{
           		match.addEventListener('click', (e)=>{this.viewIndividualMatch(e)});
           	});
        }
        //hide all views before revealing the passed in section
        view(section) {
        	this.doublesView.classList.add('hidden');
            this.singlesView.classList.add('hidden');
            this.matchInspector.classList.add('hidden');

            //in the case the user clicks from singles to doubles without returning from the match inspector
            var container = document.querySelector('#individualMatchContainer');
        	if(container){container.remove()}
            section.classList.remove('hidden');
        }

        returnToMatches(){
        	//first remove the current match that was in the container
        	var container = document.querySelector('#individualMatchContainer');
        	container.remove();
        	this.matchInspector.classList.add('hidden');
        }

        // calls initNewMatch for a brand new data set
        startNewMatch() {
            this.initBlankMatch();

            //render doubles
            let doublesData = this.matchData.doubles;
            let t = document.getElementById('doubles-view');
            let doublesMarkup = doublesData.map(match => 
                `<div class="scoreContainer" onclick="" id="${match.position}_doubles" data-match-type="doubles" data-position="${match.position}">
	                <h3> #${match.position} Doubles</h3>
	                <table class="scoreboard margin_centered">
	                    <tr>
	                        <th>${match.homeName}</th>
	                        <th>${match.awayName}</th>
	                    </tr>
	                    <tr>
	                        <td> ${match.currSetHomeScore} </td>
	                        <td> ${match.currSetAwayScore} </td>
	                    </tr>
	                </table>
	            </div>`).join('');
            t.content.querySelector('#doublesData').innerHTML = doublesMarkup;
            let clonedTemplate = document.importNode(t.content, true);
			this.doublesView.appendChild(clonedTemplate);

			//render singles
			let singlesData = this.matchData.singles;
            t = document.getElementById('singles-view');
            let singlesMarkup = singlesData.map(match => 
                `<div class="scoreContainer" onclick="" id="${match.position}_singles" data-match-type="singles" data-position="${match.position}">
	                <h3> #${match.position} Singles</h3>
	                <table class="scoreboard margin_centered">
	                    <tr>
	                        <th>${match.homeName}</th>
	                        <th>${match.awayName}</th>
	                    </tr>
	                    <tr>
	                        <td> ${match.currSetHomeScore} </td>
	                        <td> ${match.currSetAwayScore} </td>
	                    </tr>
	                </table>
	            </div>`).join('');
            t.content.querySelector('#singlesData').innerHTML = singlesMarkup;
            clonedTemplate = document.importNode(t.content, true);
			this.singlesView.appendChild(clonedTemplate);
        }

        initBlankMatch() {
        	if(localStorage.getItem('matchData')){
        		localStorage.removeItem('matchData');
        	}
            var gameObject = {
                "doubles": [{
                        "position": 1,
                        "homeName": "Tritons",
                        "awayName": "Eagles",
                        "currSetHomeScore": 0,
                        "currSetAwayScore": 0,
                        "set": 1,
                        "homeSet": 0,
                        "awaySet": 0,
                        "serving": 1
                    },
                    {
                        "position": 2,
                        "homeName": "Tritons",
                        "awayName": "Eagles",
                        "currSetHomeScore": 0,
                        "currSetAwayScore": 0,
                        "set": 1,
                        "homeSet": 0,
                        "awaySet": 0,
                        "serving": 1
                    },
                    {
                        "position": 3,
                        "homeName": "Tritons",
                        "awayName": "Eagles",
                        "currSetHomeScore": 0,
                        "currSetAwayScore": 0,
                        "set": 1,
                        "homeSet": 0,
                        "awaySet": 0,
                        "serving": 1
                    }
                ],
                "singles": [{
                        "position": 1,
                        "homeName": "Tritons",
                        "awayName": "Eagles",
                        "currSetHomeScore": 0,
                        "currSetAwayScore": 0,
                        "set": 1,
                        "homeSet": 0,
                        "awaySet": 0,
                        "serving": 1
                    },
                    {
                        "position": 2,
                        "homeName": "Tritons",
                        "awayName": "Eagles",
                        "currSetHomeScore": 0,
                        "currSetAwayScore": 0,
                        "set": 1,
                        "homeSet": 0,
                        "awaySet": 0,
                        "serving": 1
                    },
                    {
                        "position": 3,
                        "homeName": "Tritons",
                        "awayName": "Eagles",
                       "currSetHomeScore": 0,
                        "currSetAwayScore": 0,
                        "set": 1,
                        "homeSet": 0,
                        "awaySet": 0,
                        "serving": 1
                    }, {
                        "position": 4,
                        "homeName": "Tritons",
                        "awayName": "Eagles",
                        "currSetHomeScore": 0,
                        "currSetAwayScore": 0,
                        "set": 1,
                        "homeSet": 0,
                        "awaySet": 0,
                        "serving": 1
                    },
                    {
                        "position": 5,
                        "homeName": "Tritons",
                        "awayName": "Eagles",
                        "currSetHomeScore": 0,
                        "currSetAwayScore": 0,
                        "set": 1,
                        "homeSet": 0,
                        "awaySet": 0,
                        "serving": 1
                    },
                    {
                        "position": 6,
                        "homeName": "Tritons",
                        "awayName": "Eagles",
                        "currSetHomeScore": 0,
                        "currSetAwayScore": 0,
                        "set": 1,
                        "homeSet": 0,
                        "awaySet": 0,
                        "serving": 1
                    }
                ]
            }
            this.matchData = gameObject;
            localStorage.setItem('matchData', JSON.stringify(gameObject));
        }

        //view an individual match when a scoreboard is clicked
        viewIndividualMatch(e){
        	this.matchInspector.classList.remove('hidden');
        	var currScoreBoard = e.target;

        	//make sure to use the parent div element in order to get access to data attributes
        	while(!currScoreBoard.classList.contains('scoreContainer')){
        		currScoreBoard = currScoreBoard.parentElement;
        	}
        	var selectedGameIndex = this.findMatchIndex(currScoreBoard.dataset.matchType, currScoreBoard.dataset.position);
        	var selectedGame = this.matchData[currScoreBoard.dataset.matchType][selectedGameIndex];
        	let markup =  `<div class="scoreContainer" id="${selectedGame.position}_doubles" data-match-type="doubles" data-position="${selectedGame.position}">
	                <h3> #${selectedGame.position} ${currScoreBoard.dataset.matchType}</h3>
	                <table class="scoreboard margin_centered">
	                    <tr>
	                        <th>${selectedGame.homeName}</th>
	                        <th>${selectedGame.awayName}</th>
	                    </tr>
	                    <tr>
	                        <td> ${selectedGame.currSetHomeScore} </td>
	                        <td> ${selectedGame.currSetAwayScore} </td>
	                    </tr>
	                </table>
	            </div>`;
	        var el = document.createElement('div');
	        el.id = "individualMatchContainer";
	        el.innerHTML = markup;
	        this.matchInspector.append(el);
        }

        findMatchIndex(type, position){
        	var index = 0;
        	this.matchData[type].forEach(function(scoreboard, i){
        		if(scoreboard.position == position){
        			index = i;
        		}	
        	});
        	return index;
        }
    };

    var matchPage = new match();
});