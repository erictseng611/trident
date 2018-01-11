document.addEventListener("DOMContentLoaded", function(event) {

var inputs = document.getElementsByTagName('input');

document.addEventListener('click', function(e){
	if(e.target.id == 'submit'){ authenticateUser(e);}
	else if(e.target.id == 'create'){ createUser(e); }
});

	function authenticateUser(e){
		e.preventDefault();

		//disable user from clicking the button till authentication process returns
		e.target.disabled = true;

		//make sure there is no existing user
		firebase.auth().signOut();

		//grab the data from the inputs
		var email = inputs['email'].value;
		var pw = inputs['pw'].value;

		//sign in
		firebase.auth().signInWithEmailAndPassword(email, pw).catch(function(err){
			console.log(err.code, err.message);
			//renable the login button
			e.target.disabled = false;
		});

		firebase.auth().onAuthStateChanged(function(user){
			//if the user exists
			if(user){
				console.log('logged in');
				//set the team and permissiosn of the user

				//redirect the window the app's home page
				window.location.href = "./html/app.html";
			}
		});
	}

	function createUser(e){
		e.preventDefault();

		//grab the data from the inputs
		var email = inputs['email'].value;
		var pw = inputs['pw'].value;

		//create user account
		firebase.auth().createUserWithEmailAndPassword(email, pw).catch(function(error){
			console.log(error.code, error.message);
		});

		firebase.auth().onAuthStateChanged(function(user){
			//if the user exists
			if(user){
				//set the team of the user

				//set permissions of the user

				//redirect the window the app's home page
				window.location.heref = "/html/app.html"

			}
		});

	}
});






