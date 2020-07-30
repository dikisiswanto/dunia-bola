const api = new ApiService();
const db = new DatabaseService();
const lib = new Lib();

(async () => {
	await db.init()
})();

document.addEventListener('DOMContentLoaded', function () {
	const sidenav = document.querySelector('.sidenav');
	const sidenavInstance = M.Sidenav.init(sidenav);
	loadNav(sidenavInstance);

	const windowUrl = window.location.hash.substr(1).split('-');
	const page = windowUrl[0] || 'home';
	const id = windowUrl[1];
	updateColorScheme(id);
	loadPage(page, id);

	window.addEventListener('hashchange', updatePage);
	document.addEventListener('click', listenAction)

	requestNotificationPermission();
});


const loadNav = async (sidenavInstance) => {
	try {
		const response = await fetch('nav.html');
		const responseText = await response.text();

		if (response.ok) {
			const navs = document.querySelectorAll('.topnav, .sidenav');

			navs.forEach(nav => {
				nav.innerHTML = responseText;
			});

			const navLinks = document.querySelectorAll('.topnav a, .sidenav a');
			navLinks.forEach(link => {
				link.addEventListener('click', ({
					target
				}) => {
					sidenavInstance.close();
					const hashLink = target.getAttribute('href').substr(1).split('-');
					const goTo = hashLink[0];
					const id = hashLink[1];
					updateColorScheme(id);
					loadPage(goTo, id);
				})
			})
		} else {
			handleError(responseText);
		}
	} catch (error) {
		handleError(error);
	}
}

const loadPage = async (pageName, id = null) => {
	const content = document.querySelector(".body-content");
	try {
		const page = `pages/${pageName}.html`;
		const response = await fetch(page);
		const responseText = await response.text();
		if (response.ok) {
			switch (pageName) {
				case 'league':
					getStanding(id);
					break;
				case 'team':
					getTeam(id);
					break;
				case 'favorites':
					getFavorites();
					break;
				default:
					break;
			}
			content.innerHTML = responseText;
		} else {
			show404(response.statusText);
		}
	} catch (error) {
		show404(error);
	}
}

const getStanding = async (leagueId) => {
	const response = await api.getStanding(leagueId);

	if (response.error) {
		show404(response.error.message);
		return;
	}

	const result = response.standings[0].table;
	const {
		code,
		name
	} = LEAGUES.filter(item => item.id == leagueId).map(item => item)[0];
	const title = `<img src="./images/${code}-logo.png" class="img-thumbnail h-padding hide-on-med-and-down"/> <span>${name} standings</span>`;
	renderView('league', result, title);
}

const getTeam = async (teamId) => {
	const response = await api.getTeam(teamId);

	if (response.error) {
		show404(response.error.message);
		return;
	}

	let isFavorite = await db.getTeam(parseInt(teamId));

	response.isFavorite = isFavorite ? true : false;
	renderView('team', response);

	document.querySelector('.star-btn').addEventListener('click', function () {
		this.classList.toggle('pulse');
		this.querySelector('.material-icons').innerHTML = response.isFavorite ? 'star_outline' : 'star';
		toggleFavorite(response.isFavorite, response);
		response.isFavorite = !response.isFavorite;
	})
}

const getFavorites = async () => {
	try {
		const favoriteTeams = await db.getAllTeams();
		renderView('favorites', favoriteTeams);
	} catch (error) {
		handleError(error.message);
	}
}

const listenAction = (event) => {
	if (event.target && event.target.innerHTML == 'arrow_back') {
		window.history.back(-1);
	}
}

const toggleFavorite = async (state, team) => {
	let isSuccess;
	if (state) {
		isSuccess = await db.deleteTeam(parseInt(team.id));
		M.toast({
			html: `${team.shortName} removed from favorite`
		});
	} else {
		isSuccess = await db.insertTeam(team);
		M.toast({
			html: `${team.shortName} added to favorite`
		});
	}
	return isSuccess;
}

const updateColorScheme = (id) => {
	const body = document.querySelector('body');
	body.id = LEAGUES.filter(item => item.id == id).map(item => item.code);
}

const updatePage = () => {
	const hrefHash = window.location.href.split('#')[1].split('-');
	updateColorScheme(hrefHash[1]);
	loadPage(hrefHash[0], hrefHash[1]);
}

const handleError = (error) => {
	console.log(error)
	M.toast({
		html: error
	});
}

const show404 = (error) => {
	const content = document.querySelector(".body-content");
	content.innerHTML = `<p class='container not-found'>Oops! ${error}</p>`;
}

const requestNotificationPermission = async () => {
	if ('Notification' in window) {
		const result = await Notification.requestPermission();

		if (result === 'denied') {
			console.log('Fitur notifikasi tidak diijinkan.');
			return;
		} else if (result === 'default') {
			console.error('Pengguna menutup kotak dialog permintaan ijin.');
			return;
		}

		if (('PushManager' in window)) {
			const registration = await navigator.serviceWorker.getRegistration();

			try {
				const subscription = await registration.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: lib.urlBase64ToUint8Array('BLUHZeOAUDWIEe6mYPUJVozftbvThcUcarIZB5n0L7QbSwFGNFjQbQ9irMCnWq9sr-N_iw5vp1ZJnBsy51sESks')
				});

				console.log('Endpoint: ', subscription.endpoint);
				console.log('p256dh key: ', btoa(String.fromCharCode.apply(
					null, new Uint8Array(subscription.getKey('p256dh')))));
				console.log('auth key: ', btoa(String.fromCharCode.apply(
					null, new Uint8Array(subscription.getKey('auth')))));
			} catch (error) {
				console.log('Tidak dapat melakukan subscribe ', error.message);
			}
		}
	}
}