document.addEventListener("DOMContentLoaded", function(event) {

    var allViews = document.querySelectorAll('.view');

    class home {
        constructor() {

            //register service worker
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js').then(registration => {
                        console.log('SW registered: ', registration.scope);
                    }).catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
                });
            }

            this.matchViewButton = document.getElementById('matchViewButton');
            this.viewExistingMatch = document.getElementById('viewExistingMatch');
            this.scheduleViewButton = document.getElementById('scheduleViewButton');
            this.matchView = document.getElementById('matchView');
            this.scheduleView = document.getElementById('scheduleView');
            this.homeView = document.getElementById('homeView');

            // lazy load buttons determine whether to show view existing match or start new match in home
            var fbdata = firebase.database().ref('currMatch');
            fbdata.on('value', (snapshot) => {
                if (snapshot.val() == null) {
                    this.matchViewButton.classList.remove('display_none');
                    this.viewExistingMatch.classList.add('display_none');
                } else {
                    this.matchViewButton.classList.add('display_none');
                    this.viewExistingMatch.classList.remove('display_none');
                }

                this.scheduleViewButton.classList.remove('hidden');
            });



            this.matchViewButton.addEventListener('click', () => this.view(this.matchView));
            this.viewExistingMatch.addEventListener('click', () => this.view(this.matchView));

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

            this.getMatchData();

            //add click listeners for 3 views of matches
            this.doublesViewButton.addEventListener('click', () => this.view(this.doublesView));
            this.singlesViewButton.addEventListener('click', () => this.view(this.singlesView));
            document.querySelector('#returnFromInspector').addEventListener('click', () => this.returnToMatches());
            document.querySelector('#resetMatch').addEventListener('click', () => { this.resetMatch(); });
        }

        getMatchData() {
            var fbdata = firebase.database().ref('currMatch');
            fbdata.on('value', (snapshot) => {
                this.matchData = snapshot.val();
                if (snapshot.val() == null) {
                    this.initBlankMatch();
                }
                localStorage.setItem('matchData', JSON.stringify(snapshot.val()));
                this.renderMatch();
                this.renderOverallScore();
            });
        }

        //hide all views before revealing the passed in section
        view(section) {
            this.doublesView.classList.add('hidden');
            this.singlesView.classList.add('hidden');
            this.matchInspector.classList.add('hidden');

            //in the case the user clicks from singles to doubles without returning from the match inspector
            var container = document.querySelector('#individualMatchContainer');
            if (container) { container.remove() }
            section.classList.remove('hidden');
        }

        returnToMatches() {
            //first remove the current match that was in the container
            var container = document.querySelector('#individualMatchContainer');
            container.remove();
            this.matchInspector.classList.add('hidden');
        }

        isEmpty(obj) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        }

        renderOverallScore() {

            if (document.querySelector('#overallScoreboard')) {
                document.querySelector('#overallScoreboard').remove();
            }

            let overallScore = this.matchData.overallScore;
            let t = document.getElementById('overallScoreboard-temp');
            let markup = `<table id="overallScore" class="scoreboard margin_centered">
                <tr>
                    <th>Tritons</th>
                    <th>Eagles</th>
                </tr>
                <tr>
                    <td> ${overallScore.home} </td>
                    <td> ${overallScore.away} </td>
                </tr>
            </table>`;
            t.content.querySelector('#overallScoreboard').innerHTML = markup;
            let clonedTemplate = document.importNode(t.content, true);
            document.querySelector('#matchView header').appendChild(clonedTemplate);
        }

        // calls initNewMatch for a brand new data set
        renderMatch() {

            //if there is old data, remove it first
            if (document.querySelector('#doublesData')) {
                document.querySelector('#doublesData').remove();
                document.querySelector('#singlesData').remove();
            }

            //else use the returned data from firebase to render the match
            //render doubles
            let doublesData = this.matchData.doubles;
            let t = document.getElementById('doubles-view');
            let doublesMarkup = doublesData.map(match =>
                `<div class="scoreContainer" onclick="" id="${match.position}_doubles" data-match-type="doubles" data-position="${match.position}">
                    <h3> #${match.position} Doubles</h3>
                    <div id="setTracker">
                        <span class="setTicker">&#x2713;</span><span>Set</span><span class="setTicker">&#x2713;</span>
                    </div>
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

            //remove all the set tickers that are unneeded
            var doublesContainer = document.querySelector('#doublesData');
            var setTickers = doublesContainer.querySelectorAll('.setTicker');

            // if the set is 0, then add a hidden class onto the set tickers
            // necessary to use tickerIndex because it needs to increment twice when i does
            var tickerIndex = 0;
            for (var i = 0; i < 3; i++) {
                if (this.matchData.doubles[i].homeSet == 0) {
                    setTickers[tickerIndex].classList.add('hidden');
                }
                tickerIndex++;
                if (this.matchData.doubles[i].awaySet == 0) {
                    setTickers[tickerIndex].classList.add('hidden');
                }
                tickerIndex++;
            }

            //render singles
            let singlesData = this.matchData.singles;
            t = document.getElementById('singles-view');
            let singlesMarkup = singlesData.map(match =>
                `<div class="scoreContainer" onclick="" id="${match.position}_singles" data-match-type="singles" data-position="${match.position}">
                    <h3> #${match.position} Singles</h3>
                    <div id="setTracker">
                        <span class="setTicker" data-team="home">&#x2713;</span><span>Set</span><span class="setTicker" data-team="away">&#x2713;</span>
                    </div>
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

            //remove all the set tickers that are unneeded
            var singlesContainer = document.querySelector('#singlesData');
            var setTickers = singlesContainer.querySelectorAll('.setTicker');

            // if the set is 0, then add a hidden class onto the set tickers
            // necessary to use tickerIndex because it needs to increment twice when i does
            var tickerIndex = 0;
            for (var i = 0; i < 6; i++) {
                if (this.matchData.singles[i].homeSet == 0) {
                    setTickers[tickerIndex].classList.add('hidden');
                }
                tickerIndex++;
                if (this.matchData.singles[i].awaySet == 0) {
                    setTickers[tickerIndex].classList.add('hidden');
                }
                tickerIndex++;
            }


            // add click listeners on all the new scoreboards
            this.scores = document.querySelectorAll('.scoreContainer');
            this.scores.forEach(match => {
                match.addEventListener('click', (e) => { this.viewIndividualMatch(e) });
            });
        }

        initBlankMatch() {
            if (localStorage.getItem('matchData')) {
                localStorage.removeItem('matchData');
            }
            var gameObject = {
                "overallScore": {
                    "home": 0,
                    "away": 0
                },
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
            firebase.database().ref('currMatch/').set(this.matchData);
        }

        //view an individual match when a scoreboard is clicked
        viewIndividualMatch(e) {
            var container = document.querySelector('#individualMatchContainer');
            if (container) {
                container.remove();
            }
            this.matchInspector.classList.remove('hidden');

            //make sure to use the parent div element in order to get access to data attributes
            var currScoreBoard = this.findParentScoreboard(e);
            var selectedGameIndex = this.findMatchIndex(currScoreBoard.dataset.matchType, currScoreBoard.dataset.position);
            var game = this.matchData[currScoreBoard.dataset.matchType][selectedGameIndex];
            let markup = `<div class="scoreContainer" id="${game.position}_${currScoreBoard.dataset.matchType}" data-match-type="${currScoreBoard.dataset.matchType}" data-position="${game.position}">
                    <h3> #${game.position} ${currScoreBoard.dataset.matchType}</h3>
                    <div id="setTracker">
                        <span class="setTicker" data-set="home">&#x2713;</span><span>Set</span><span class="setTicker" data-set="away">&#x2713;</span>
                    </div>
                    <div class="editScoreRow">
                        <div class="leftEditButtons"> 
                            <button data-score="increase" data-team="currSetHomeScore"> Plus </button>
                            <button data-score="decrease" data-team="currSetHomeScore"> Minus </button>
                        </div>
                        <div>
                        <table class="scoreboard margin_centered">
                            <tr>
                                <th>${game.homeName}</th>
                                <th>${game.awayName}</th>
                            </tr>
                            <tr>
                                <td>${game.currSetHomeScore} <img src="/images/serving.svg" alt="serving icon" class="hidden"> </td>
                                <td> ${game.currSetAwayScore} <img src="/images/serving.svg" alt="serving icon" class="hidden"></td>
                            </tr>
                        </table>
                        </div>
                        <div class="rightEditButtons"> 
                            <button data-score="increase" data-team="currSetAwayScore"> Plus </button>
                            <button data-score="decrease" data-team="currSetAwayScore"> Minus </button>
                        </div>
                    </div>
                </div>
                <div id="changeLog">
                    <h1> Change Log </h1>
                </div>`;
            var el = document.createElement('div');
            el.id = "individualMatchContainer";
            el.innerHTML = markup;
            this.matchInspector.append(el);

            var setTickers = el.querySelectorAll('.setTicker');

            //needs to remove one from position to align with indexing
            if (this.matchData[currScoreBoard.dataset.matchType][currScoreBoard.dataset.position - 1].homeSet == 0) {
                setTickers[0].classList.add('hidden');
            }
            if (this.matchData[currScoreBoard.dataset.matchType][currScoreBoard.dataset.position - 1].awaySet == 0) {
                setTickers[1].classList.add('hidden');
            }

            //once the buttons are added to the doc, attach click listeners
            var increaseButtons = document.querySelectorAll('[data-score="increase"]');
            var decreaseButtons = document.querySelectorAll('[data-score="decrease"]');
            increaseButtons.forEach((button) => {
                button.addEventListener('click', (e) => this.incrementScore(e, 1));
            });
            decreaseButtons.forEach((button) => {
                button.addEventListener('click', (e) => this.incrementScore(e, -1));
            });
        }

        //finds the match index for easy navigation of the match data
        findMatchIndex(type, position) {
            var index = 0;
            this.matchData[type].forEach(function(scoreboard, i) {
                if (scoreboard.position == position) {
                    index = i;
                }
            });

            return index;
        }

        incrementScore(e, i) {
            //get which team to increase score
            var team = e.target.dataset.team;

            var opponent = this.getOpposingPlayerScore(team);

            //find the scoreboard where the info about doubles and position is stored
            var currScoreBoard = this.findParentScoreboard(e);

            // get the data in short form
            var matchScore = this.matchData[currScoreBoard.dataset.matchType][currScoreBoard.dataset.position - 1];

            //-1 to fix the data set inconsistency with index
            this.matchData[currScoreBoard.dataset.matchType][currScoreBoard.dataset.position - 1][team] = this.matchData[currScoreBoard.dataset.matchType][currScoreBoard.dataset.position - 1][team] + i;

            // if a team wins a set by 2 or its 7-6
            if (matchScore[team] >= 6 && (matchScore[team] - matchScore[opponent] >= 2) || (matchScore[team] == 7 && matchScore[opponent] == 6)) {
                //set the winning team's set score
                if (team.includes('Home')) {
                    this.incrementSet(currScoreBoard.dataset.matchType, currScoreBoard.dataset.position - 1, 'home');
                } else {
                    this.incrementSet(currScoreBoard.dataset.matchType, currScoreBoard.dataset.position - 1, 'away');
                }

            } else if (matchScore[team] == 6 && matchScore[opponent] == 6) {
                console.log('tiebreaker mode');
            }

            firebase.database().ref('currMatch').set(this.matchData);
        }

        incrementSet(matchType, position, team) {
            var opponent = this.getOpposingPlayerScore(team);
            //if the team has already won a set, then they win the match. Update the overall score
            if (this.matchData[matchType][position][`${team}Set`] == 1) {
                this.matchData.overallScore[team]++;
                firebase.database().ref('currMatch').set(this.matchData);

            } else {
                this.matchData[matchType][position][`${team}Set`] = 1;
                //reset the scorecoards
                this.matchData[matchType][position].currSetAwayScore = 0;
                this.matchData[matchType][position].currSetHomeScore = 0;

                firebase.database().ref('currMatch').set(this.matchData);

            }

        }

        getOpposingPlayerScore(team) {
            if (team == 'currSetHomeScore') {
                return 'currSetAwayScore'
            } else { return 'currSetHomeScore' }
        }

        toggleServe(scoreboard) {
            var service = this.matchInspector.getElementsByTagName('img');
            console.log(service);
            if (service[0].classList.contains('hidden')) {
                service[0].classList.remove('hidden');
                service[1].classList.add('hidden');
            } else {
                service[0].classList.add('hidden');
                service[1].classList.remove('hidden');
            }
        }

        //finds the parent score board to make use of its data attributes
        findParentScoreboard(e) {
            var currScoreBoard = e.target;

            //make sure to use the parent div element in order to get access to data attributes
            while (!currScoreBoard.classList.contains('scoreContainer')) {
                currScoreBoard = currScoreBoard.parentElement;
            }
            return currScoreBoard;
        }

        resetMatch() {
            firebase.database().ref('currMatch/').remove();
        }
    };

    document.getElementById('matchViewButton').addEventListener('click', () => {
        var newMatch = new match();
    });
    document.getElementById('viewExistingMatch').addEventListener('click', () => {
        var newMatch = new match();
    });
});