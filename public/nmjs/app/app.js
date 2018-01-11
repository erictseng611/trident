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
            returnHomeButtons.forEach((button)=>{button.addEventListener('click', () => this.view(this.homeView))})
        }

        // hide all views
        hideViews(){
        	allViews.forEach((section)=>{
        		if(!section.classList.contains('hidden')){
        			section.classList.add('hidden');
        		}
        	});
        }

        // view the passed in section
        view(section){
        	this.hideViews();
        	section.classList.remove('hidden');
        }
    };

    var homePages = new home();


    class match {
    	constructor(){
    		this.doublesViewButton = document.querySelector('[data-button="viewDoubles"]');
    		this.singlesViewButton = document.querySelector('[data-button="viewSingles"]');
    		this.doublesView = document.getElementById('doubles');
    		this.singlesView = document.getElementById('singles');

    		this.doublesViewButton.addEventListener('click', () => this.view(this.doublesView));
            this.singlesViewButton.addEventListener('click', () => this.view(this.singlesView));
    	}

    	// hide all views
        hideMatchViews(){
        	this.doublesView.classList.add('hidden');
        	this.singlesView.classList.add('hidden');
        }

    	view(section){
    		this.hideMatchViews();
        	section.classList.remove('hidden');
        }
    };

    var matchPage = new match();
});












