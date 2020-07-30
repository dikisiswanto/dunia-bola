function renderView(page, result, title = null) {
	const pageContainer = document.querySelector(`.${page}`);
	pageContainer.innerHTML = '';
	let view = '';
	if (title) {
		pageContainer.previousElementSibling.innerHTML = title;
	}

	switch (page) {
		case 'league':
			view = getLeagueView(result);
			break;
		case 'team':
			view = getTeamView(result);
			break;
		case 'favorites':
			view = getFavoritesView(result);
		default:
			break;
	}
	pageContainer.appendChild(view);
}

const getLeagueView = (result) => {
	const view = document.createElement('table');
	view.className = 'responsive-table highlight centered z-depth-1';
	const tableHeading = `<thead>
			<tr class="primary-bg white-text lighten-2">
					<th class="no-rounded">Position</th>
					<th class="no-rounded hide-on-med-and-down">Logo</th>
					<th class="no-rounded">Club</th>
					<th class="no-rounded">MP</th>
					<th class="no-rounded">W</th>
					<th class="no-rounded">D</th>
					<th class="no-rounded">L</th>
					<th class="no-rounded">GF</th>
					<th class="no-rounded">GA</th>
					<th class="no-rounded">GD</th>
					<th class="no-rounded">Point</th>
			</tr>
		</thead>`;
	view.innerHTML = tableHeading;
	const tableBody = document.createElement('tbody');
	result.forEach(data => {
		data = JSON.parse(JSON.stringify(data).replace(/http:/g, 'https:'));
		const row = `<tr>
		<td>${data.position}</td>
		<td>
			<a href="#team-${data.team.id}"><img src=${data.team.crestUrl}  alt="logo" class="img-thumbnail"></a>
		</td>
		<td class="hide-on-med-and-down"><a href="#team-${data.team.id}">${data.team.name}</a></td>
		<td>${data.playedGames}</td>
		<td>${data.won}</td>
		<td>${data.draw}</td>
		<td>${data.lost}</td>
		<td>${data.goalsFor}</td>
		<td>${data.goalsAgainst}</td>
		<td>${data.goalDifference}</td>
		<td>${data.points}</td>
		</tr>`;
		tableBody.innerHTML += row;
	});
	view.appendChild(tableBody);
	return view;
}

const getTeamView = (team) => {
	team = JSON.parse(JSON.stringify(team).replace(/http:/g, 'https:'));
	const wrapper = document.createElement('div')
	wrapper.className = 'h-padding v-padding z-depth-1'
	const detail = `<div class="heading-group">
		<h3 class="text-bold text-large left-align"><button class="btn-floating back-button white"><i class="material-icons text-primary">arrow_back</i></button> <span class="text-secondary hide-on-med-and-down h-padding">${team.name}</span></h3>
		<button class="btn-floating btn-large primary-bg orange ${!team.isFavorite ? 'pulse' : ''} star-btn"><i class="material-icons">${team.isFavorite ? 'star' : 'star_outline'}</i></button>
	</div>
	<div class="row">
		<div class="col s12 l3 center-align h-padding">
			<img src="${team.crestUrl}" alt="Logo klub" class="responsive-img">
		</div>
		<div class="col s12 l9 v-space">
			<div class="row">
				<div class="col s12 l6 text-secondary text-bold">
					<span>Name</span>
				</div>
				<div class="col s12 l6">
					<span>${team.name}</span>
				</div>
			</div>

			<div class="row">
				<div class="col s12 l6 text-secondary text-bold">
					<span>Founded</span>
				</div>
				<div class="col s12 l6">
					<span>${team.founded}</span>
				</div>
			</div>
			<div class="row">
				<div class="col s12 l6 text-secondary text-bold">
					<span>Short Name</span>
				</div>
				<div class="col s12 l6">
					<span>${team.shortName}</span>
				</div>
			</div>
			<div class="row">
				<div class="col s12 l6 text-secondary text-bold">
					<span>Address</span>
				</div>
				<div class="col s12 l6">
					<span>${team.address}</span>
				</div>
			</div>
			<div class="row">
				<div class="col s12 l6 text-secondary text-bold">
					<span>Venue</span>
				</div>
				<div class="col s12 l6">
					<span>${team.venue}</span>
				</div>
			</div>
			<div class="row">
				<div class="col s12 l6 text-secondary text-bold">
					<span>Club color</span>
				</div>
				<div class="col s12 l6">
					<span>${team.clubColors}</span>
				</div>
			</div>
			<div class="row">
				<div class="col s12 l6 text-secondary text-bold">
					<span>Website</span>
				</div>
				<div class="col s12 l6">
					<span>${team.website}</span>
				</div>
			</div>
		</div>
		<h3 class="text-bold text-large left-align">Squad</h3>`;
	wrapper.innerHTML = detail;

	const squad = document.createElement('table');
	squad.className = 'responsive-table';
	const tableHeading = `<thead>
			<tr>
				<th>#</th>
				<th>Name</th>
				<th>Position</th>
				<th>Nationality</th>
			</tr>
		</thead>`;
	squad.innerHTML = tableHeading;
	const tableBody = document.createElement('tbody');

	team.squad.forEach(squad => {
		const row = `<tr>
				<td>*</td>
				<td>${squad.name}</td>
				<td>${squad.position}</td>
				<td>${squad.nationality}</td>
			<tr>`;
		tableBody.innerHTML += row;
	});

	squad.appendChild(tableBody);
	wrapper.appendChild(squad);
	return wrapper;
}

const getFavoritesView = (teams) => {
	let favorites;
	if (teams.length > 0) {
		favorites = document.createElement('div');
		teams.forEach(team => {
			team = JSON.parse(JSON.stringify(team).replace(/http:/g, 'https:'));
			const item = `<div class="z-depth-1 v-padding h-padding v-space">
				<a href="#team-${team.id}" class="group-item">
					<img src="${team.crestUrl}" alt="logo team" height="50px">
					<span class="h-padding text-large orange-text darken2 text-bold">${team.name}</span>
				</a>
			</div>`;
			favorites.innerHTML += item;
		})
	} else {
		favorites = document.createElement('p');
		favorites.className = 'container not-found';
		favorites.innerHTML = 'You have no favorite teams.';
	}
	return favorites;
}