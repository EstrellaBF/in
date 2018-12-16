window.addEventListener('load', function () {
	dayjs().format();
	if (window.localStorage) {

		var getUser = JSON.parse(localStorage.getItem('user'));

		var submitUser = document.getElementById('submit-user');
		var logOut = document.getElementById('log-out');
		var editQuotation = document.getElementById('edit-quotation');
		var CurrentQuotation = document.getElementById('current-quotation');
		var addQuotation = document.getElementById('add-quotation');
		var saveQuotation = document.getElementById('save-quotation');
		var quotationLastNumber = document.getElementById('quotation-last-number');
		
		var email = '';
		var password = '';

		var userAuth = JSON.parse(localStorage.getItem('user'))

		var ventas = firebase.database().ref('ventas');
		var lastQuotation = firebase.database().ref('cotizacion');

		if (userAuth === null) {
			$("#modalLogin").modal("show");
			submitUser.addEventListener('click', sendLogin);

		} else {
			$("#modalLogin").modal("hide");
		}

		function sendLogin() {
			var inputEmail = document.getElementById('email');
			var inputPassword = document.getElementById('password');
			console.log(inputEmail)
			email = inputEmail.value;
			password = inputPassword.value;

			//verificando con las autorizaciones
			//var email = "juan.palomino@redscoperu.com";
			//var password = "123456";
			firebase.auth().signInWithEmailAndPassword(email, password)
				.then(function (firebaseUser) {
					console.log(firebaseUser);
					let user = {
						'email': email,
						'password': password
					};
					inputEmail = '';
					localStorage.setItem('user', JSON.stringify(user));
					$("#modalLogin").modal("hide");
				})
				.catch(function (error) {
					alert('contraseña/correo incorrecto')
				});
		}

		logOut.addEventListener('click', function () {
			localStorage.removeItem('user');
			window.open("http://redscoperu.com", '_self');
		})

		const day = dayjs()
			.startOf('day')
			.format('DD');
		const month = dayjs()
			.startOf('month')
			.format('MM');
		const year = dayjs().year();

		//Mostar Cotización
		editQuotation.style.display = "none";
		lastQuotation.on('value', function (snapshot) {
			getLastQuotation = snapshot.val();
			CurrentQuotation.innerText = `Cotización ${snapshot.val().numero}`
			var showAtEditQuotation = snapshot.val().numero.slice(0, 13);
			editQuotation.firstElementChild.innerText = `${showAtEditQuotation}` 
		});



		//Añadir cotización 
		addQuotation.addEventListener('click', function(){
			editQuotation.style.display = "block";
		})

		//guardando cotización
		saveQuotation.addEventListener('click', function(){
			quotationLastNumber.value;
			lastQuotation.set({
				'numero': `N ${day}-${month}-${year}-${quotationLastNumber.value}`
			})
			alert('cotización guardada');
			quotationLastNumber.value='';
		})		
		
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