window.addEventListener('load', function () {
	if (window.localStorage) {
		//$('#modalLogin').modal({backdrop: 'static', keyboard: false});
		/*
		var user = {
			'nombre': 'pollo',
			'contra': '123456'
		};
		localStorage.setItem('user', JSON.stringify(user))
		*/

		var getUser = JSON.parse(localStorage.getItem('user'));
		var loginForm = document.getElementById('login-form');

		var email = '';
		var password = '';

		var inputEmail = document.getElementById('email');
		var inputPassword = document.getElementById('password');

		var test = document.getElementById('test');
		test.addEventListener('click', sendLogin);

		function sendLogin() {

			email = inputEmail.value;
			password = inputPassword.value;

			//verificando con las autorizaciones
			//var email = "juan.palomino@redscoperu.com";
			//var password = "123456";
			firebase.auth().signInWithEmailAndPassword(email, password)
				.then(function (firebaseUser) {
					console.log(firebaseUser);
					var user = {
						'email': email,
						'password': password
					};
					localStorage.setItem('user', JSON.stringify(user));
					$("#modalLogin").modal("hide");
				})
				.catch(function (error) {
					alert('contraseña/correo incorrecto')
				});
		}



		/*
		$("#modalLogin").modal("show");
		loginForm.addEventListener('submit', sendLogin);
		function sendLogin() {
			var email = document.getElementById('email');
			var password = document.getElementById('password');
			var user = {
				'correo': email.value,
				'contra': password.value
			};
			console.log(user)
			localStorage.setItem('user', JSON.stringify(user))
			$("#modalLogin").modal("hide");
		}
		*/


		/*
				var email = "juan.palomino@redscoperu.com";
				var password = "123456";
				firebase.auth().signInWithEmailAndPassword(email, password)
				try {
					console.log(email);
					console.log(password);
				} catch (error) {
					console.log(error.code);
					console.log(error.message);
				};
				*/

		/*
		var miObjeto = {
			'marcado': 'html5',
			'estilo': 'css3',
			'comportamiento': 'js'
		};

		// Guardo el objeto como un string
		localStorage.setItem('datos', JSON.stringify(miObjeto));

		// Obtengo el string previamente salvado y luego 
		var guardado = localStorage.getItem('datos');

		console.log('objetoObtenido: ', JSON.parse(guardado));

*/

	} else {
		alert('Por favor, acualiza tu navegador para poder entrar al intranet')
	}
});