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

            this.doublesViewButton.addEventListener('click', function () {
                return _this2.view(_this2.doublesView);
            });
            this.singlesViewButton.addEventListener('click', function () {
                return _this2.view(_this2.singlesView);
            });
        }

        // hide all views


        _createClass(match, [{
            key: 'hideMatchViews',
            value: function hideMatchViews() {
                this.doublesView.classList.add('hidden');
                this.singlesView.classList.add('hidden');
            }
        }, {
            key: 'view',
            value: function view(section) {
                this.hideMatchViews();
                section.classList.remove('hidden');
            }
        }]);

        return match;
    }();

    ;

    var matchPage = new match();
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