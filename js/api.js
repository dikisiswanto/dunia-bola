class ApiService {
	async fetchApi(url) {
		const options = {
			headers: {
				'X-Auth-Token': '4192311e26664e49887022fbe8d3f93e',
			}
		};
		try {
			const response = await fetch(API_BASE_URL + url, options);
			if (response.ok) {
				return await response.json();
			} else {
				const error = await response.json();
				return {
					error
				};
			}
		} catch (error) {
			return {
				error
			};
		}
	}

	async getStanding(leagueId) {
		const endpoint = `competitions/${leagueId}/standings`;
		return await this.fetchApi(endpoint);
	}

	async getTeam(teamId) {
		const endpoint = `teams/${teamId}`;
		return await this.fetchApi(endpoint);
	}
}