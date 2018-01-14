'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

document.addEventListener("DOMContentLoaded", function (event) {

    var allViews = document.querySelectorAll('.view');

    var home = function () {
        function home() {
            var _this = this;

            _classCallCheck(this, home);

            this.matchViewButton = document.getElementById('matchViewButton');
            this.scheduleViewButton = document.getElementById('scheduleViewButton');
            this.matchView = document.getElementById('matchView');
            this.scheduleView = document.getElementById('scheduleView');
            this.homeView = document.getElementById('homeView');

            this.matchViewButton.addEventListener('click', function () {
                return _this.view(_this.matchView);
            });
            this.scheduleViewButton.addEventListener('click', function () {
                return _this.view(_this.scheduleView);
            });

            // whenever a button has data-button = viewHome, go back to the home page
            var returnHomeButtons = document.querySelectorAll('[data-button="viewHome"]');
            returnHomeButtons.forEach(function (button) {
                button.addEventListener('click', function () {
                    return _this.view(_this.homeView);
                });
            });
        }

        // hide all views


        _createClass(home, [{
            key: 'hideViews',
            value: function hideViews() {
                allViews.forEach(function (section) {
                    if (!section.classList.contains('hidden')) {
                        section.classList.add('hidden');
                    }
                });
            }

            // view the passed in section

        }, {
            key: 'view',
            value: function view(section) {
                this.hideViews();
                section.classList.remove('hidden');
            }
        }]);

        return home;
    }();

    ;

    var homePages = new home();

    var match = function () {
        function match() {
            var _this2 = this;

            _classCallCheck(this, match);

            this.doublesViewButton = document.querySelector('[data-button="viewDoubles"]');
            this.singlesViewButton = document.querySelector('[data-button="viewSingles"]');
            this.doublesView = document.getElementById('doubles');
            this.singlesView = document.getElementById('singles');
            this.matchInspector = document.getElementById('matchInspector');

            this.getMatchData();

            //add click listeners for 3 views of matches
            this.doublesViewButton.addEventListener('click', function () {
                return _this2.view(_this2.doublesView);
            });
            this.singlesViewButton.addEventListener('click', function () {
                return _this2.view(_this2.singlesView);
            });
            document.querySelector('#returnFromInspector').addEventListener('click', function () {
                return _this2.returnToMatches();
            });
        }

        _createClass(match, [{
            key: 'getMatchData',
            value: function getMatchData() {
                var _this3 = this;

                var fbdata = firebase.database().ref('currMatch');
                fbdata.on('value', function (snapshot) {
                    localStorage.setItem('matchData', JSON.stringify(snapshot.val()));
                    _this3.matchData = snapshot.val();
                    _this3.renderMatch();
                });
            }

            //hide all views before revealing the passed in section

        }, {
            key: 'view',
            value: function view(section) {
                this.doublesView.classList.add('hidden');
                this.singlesView.classList.add('hidden');
                this.matchInspector.classList.add('hidden');

                //in the case the user clicks from singles to doubles without returning from the match inspector
                var container = document.querySelector('#individualMatchContainer');
                if (container) {
                    container.remove();
                }
                section.classList.remove('hidden');
            }
        }, {
            key: 'returnToMatches',
            value: function returnToMatches() {
                //first remove the current match that was in the container
                var container = document.querySelector('#individualMatchContainer');
                container.remove();
                this.matchInspector.classList.add('hidden');
            }
        }, {
            key: 'isEmpty',
            value: function isEmpty(obj) {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) return false;
                }
                return true;
            }

            // calls initNewMatch for a brand new data set

        }, {
            key: 'renderMatch',
            value: function renderMatch() {
                var _this4 = this;

                if (document.querySelector('#doublesData')) {
                    document.querySelector('#doublesData').remove();
                    document.querySelector('#singlesData').remove();
                }

                //else use the returned data from firebase to render the match
                //render doubles
                var doublesData = this.matchData.doubles;
                var t = document.getElementById('doubles-view');
                var doublesMarkup = doublesData.map(function (match) {
                    return '<div class="scoreContainer" onclick="" id="' + match.position + '_doubles" data-match-type="doubles" data-position="' + match.position + '">\n\t                <h3> #' + match.position + ' Doubles</h3>\n\t                <div id="setTracker">\n\t                \t<span class="setTicker">&#x2713;</span><span>set</span><span class="setTicker">&#x2713;</span>\n\t                </div>\n\t                <table class="scoreboard margin_centered">\n\t                    <tr>\n\t                        <th>' + match.homeName + '</th>\n\t                        <th>' + match.awayName + '</th>\n\t                    </tr>\n\t                    <tr>\n\t                        <td> ' + match.currSetHomeScore + ' </td>\n\t                        <td> ' + match.currSetAwayScore + ' </td>\n\t                    </tr>\n\t                </table>\n\t            </div>';
                }).join('');
                t.content.querySelector('#doublesData').innerHTML = doublesMarkup;
                var clonedTemplate = document.importNode(t.content, true);
                this.doublesView.appendChild(clonedTemplate);

                //render singles
                var singlesData = this.matchData.singles;
                t = document.getElementById('singles-view');
                var singlesMarkup = singlesData.map(function (match) {
                    return '<div class="scoreContainer" onclick="" id="' + match.position + '_singles" data-match-type="singles" data-position="' + match.position + '">\n\t                <h3> #' + match.position + ' Singles</h3>\n\t                <div id="setTracker">\n\t                \t<span class="setTicker" data-team="home">&#x2713;</span><span>Set</span><span class="setTicker" data-team="away">&#x2713;</span>\n\t                </div>\n\t                <table class="scoreboard margin_centered">\n\t                    <tr>\n\t                        <th>' + match.homeName + '</th>\n\t                        <th>' + match.awayName + '</th>\n\t                    </tr>\n\t                    <tr>\n\t                        <td> ' + match.currSetHomeScore + ' </td>\n\t                        <td> ' + match.currSetAwayScore + ' </td>\n\t                    </tr>\n\t                </table>\n\t            </div>';
                }).join('');
                t.content.querySelector('#singlesData').innerHTML = singlesMarkup;
                clonedTemplate = document.importNode(t.content, true);
                this.singlesView.appendChild(clonedTemplate);

                // add click listeners on all the new scoreboards
                this.scores = document.querySelectorAll('.scoreContainer');
                this.scores.forEach(function (match) {
                    match.addEventListener('click', function (e) {
                        _this4.viewIndividualMatch(e);
                    });
                });
            }
        }, {
            key: 'initBlankMatch',
            value: function initBlankMatch() {
                if (localStorage.getItem('matchData')) {
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
                    }, {
                        "position": 2,
                        "homeName": "Tritons",
                        "awayName": "Eagles",
                        "currSetHomeScore": 0,
                        "currSetAwayScore": 0,
                        "set": 1,
                        "homeSet": 0,
                        "awaySet": 0,
                        "serving": 1
                    }, {
                        "position": 3,
                        "homeName": "Tritons",
                        "awayName": "Eagles",
                        "currSetHomeScore": 0,
                        "currSetAwayScore": 0,
                        "set": 1,
                        "homeSet": 0,
                        "awaySet": 0,
                        "serving": 1
                    }],
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
                    }, {
                        "position": 2,
                        "homeName": "Tritons",
                        "awayName": "Eagles",
                        "currSetHomeScore": 0,
                        "currSetAwayScore": 0,
                        "set": 1,
                        "homeSet": 0,
                        "awaySet": 0,
                        "serving": 1
                    }, {
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
                    }, {
                        "position": 5,
                        "homeName": "Tritons",
                        "awayName": "Eagles",
                        "currSetHomeScore": 0,
                        "currSetAwayScore": 0,
                        "set": 1,
                        "homeSet": 0,
                        "awaySet": 0,
                        "serving": 1
                    }, {
                        "position": 6,
                        "homeName": "Tritons",
                        "awayName": "Eagles",
                        "currSetHomeScore": 0,
                        "currSetAwayScore": 0,
                        "set": 1,
                        "homeSet": 0,
                        "awaySet": 0,
                        "serving": 1
                    }]
                };
                this.matchData = gameObject;
                localStorage.setItem('matchData', JSON.stringify(gameObject));
                firebase.database().ref('currMatch/').set(this.matchData);
            }

            //view an individual match when a scoreboard is clicked

        }, {
            key: 'viewIndividualMatch',
            value: function viewIndividualMatch(e) {
                var _this5 = this;

                var container = document.querySelector('#individualMatchContainer');
                if (container) {
                    container.remove();
                }
                this.matchInspector.classList.remove('hidden');

                //make sure to use the parent div element in order to get access to data attributes
                var currScoreBoard = this.findParentScoreboard(e);
                var selectedGameIndex = this.findMatchIndex(currScoreBoard.dataset.matchType, currScoreBoard.dataset.position);
                var game = this.matchData[currScoreBoard.dataset.matchType][selectedGameIndex];
                var markup = '<div class="scoreContainer" id="' + game.position + '_' + currScoreBoard.dataset.matchType + '" data-match-type="' + currScoreBoard.dataset.matchType + '" data-position="' + game.position + '">\n\t                <h3> #' + game.position + ' ' + currScoreBoard.dataset.matchType + '</h3>\n\t                <div id="setTracker">\n\t                \t<span class="setTicker" data-team="home">&#x2713;</span><span>set</span><span class="setTicker" data-team="away">&#x2713;</span>\n\t                </div>\n\t                <div class="editScoreRow">\n\t                \t<div class="leftEditButtons"> \n\t                \t\t<button data-score="increase" data-team="currSetHomeScore"> Plus </button>\n\t                \t\t<button data-score="decrease" data-team="currSetHomeScore"> Minus </button>\n\t                \t</div>\n\t                \t<div>\n\t\t                <table class="scoreboard margin_centered">\n\t\t                    <tr>\n\t\t                        <th>' + game.homeName + '</th>\n\t\t                        <th>' + game.awayName + '</th>\n\t\t                    </tr>\n\t\t                    <tr>\n\t\t                        <td>' + game.currSetHomeScore + ' <img src="/images/serving.svg" alt="serving icon" class="hidden"> </td>\n\t\t                        <td> ' + game.currSetAwayScore + ' <img src="/images/serving.svg" alt="serving icon" class="hidden"></td>\n\t\t                    </tr>\n\t\t                </table>\n\t\t                </div>\n\t\t                <div class="rightEditButtons"> \n\t                \t\t<button data-score="increase" data-team="currSetAwayScore"> Plus </button>\n\t                \t\t<button data-score="decrease" data-team="currSetAwayScore"> Minus </button>\n\t                \t</div>\n\t                </div>\n\t            </div>\n\t            <div id="changeLog">\n\t            \t<h1> Change Log </h1>\n\t            </div>';
                var el = document.createElement('div');
                el.id = "individualMatchContainer";
                el.innerHTML = markup;
                this.matchInspector.append(el);

                //once the buttons are added to the doc, attach click listeners
                var increaseButtons = document.querySelectorAll('[data-score="increase"]');
                var decreaseButtons = document.querySelectorAll('[data-score="decrease"]');
                increaseButtons.forEach(function (button) {
                    button.addEventListener('click', function (e) {
                        return _this5.incrementScore(e, 1);
                    });
                });
                decreaseButtons.forEach(function (button) {
                    button.addEventListener('click', function (e) {
                        return _this5.incrementScore(e, -1);
                    });
                });
            }

            //finds the match index for easy navigation of the match data

        }, {
            key: 'findMatchIndex',
            value: function findMatchIndex(type, position) {
                var index = 0;
                this.matchData[type].forEach(function (scoreboard, i) {
                    if (scoreboard.position == position) {
                        index = i;
                    }
                });

                return index;
            }
        }, {
            key: 'incrementScore',
            value: function incrementScore(e, i) {
                //get which team to increase score
                var team = e.target.dataset.team;

                //find the scoreboard where the info about doubles and position is stored
                var currScoreBoard = this.findParentScoreboard(e);

                //-1 to fix the data set inconsistency with index
                this.matchData[currScoreBoard.dataset.matchType][currScoreBoard.dataset.position - 1][team] = this.matchData[currScoreBoard.dataset.matchType][currScoreBoard.dataset.position - 1][team] + i;
                firebase.database().ref('currMatch').set(this.matchData);
            }
        }, {
            key: 'toggleServe',
            value: function toggleServe(scoreboard) {
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

        }, {
            key: 'findParentScoreboard',
            value: function findParentScoreboard(e) {
                var currScoreBoard = e.target;

                //make sure to use the parent div element in order to get access to data attributes
                while (!currScoreBoard.classList.contains('scoreContainer')) {
                    currScoreBoard = currScoreBoard.parentElement;
                }
                return currScoreBoard;
            }
        }]);

        return match;
    }();

    ;

    document.getElementById('matchViewButton').addEventListener('click', function () {
        var newMatch = new match();
    });
});
// Initialize Firebase
var config = {
    apiKey: "AIzaSyC_W88QbGvBc8yiNcuystqDEXgEXbg_wXE",
    authDomain: "trident-f72d0.firebaseapp.com",
    databaseURL: "https://trident-f72d0.firebaseio.com",
    projectId: "trident-f72d0",
    storageBucket: "",
    messagingSenderId: "269299895518"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();