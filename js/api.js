class ApiService {
	async fetchApi(url) {
		const options = {
			headers: {
				'X-Auth-Token': '4192311e26664e49887022fbe8d3f93e',
			}
		};
		try {
			const response = await fetch(url, options);
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
		const endpoint = API_BASE_URL + `competitions/${leagueId}/standings`;
		if (await this.isCached(endpoint)) {
			return await this.getCache(endpoint)
		}
		return await this.fetchApi(endpoint);
	}

	async getTeam(teamId) {
		const endpoint = API_BASE_URL + `teams/${teamId}`;
		if (await this.isCached(endpoint)) {
			return await this.getCache(endpoint)
		}
		return await this.fetchApi(endpoint);
	}

	async isCached(endpoint) {
		if ('caches' in window) {
			try {
				const response = await caches.match(endpoint);
				if (response) {
					return true;
				}
			} catch (error) {
				throw error;
			}
		}
		return false;
	}

	async getCache(endpoint) {
		if ('caches' in window) {
			try {
				const response = await caches.match(endpoint);
				if (response) {
					const responseJson = await response.json();
					return responseJson;
				}
			} catch (error) {
				throw error;
			}
		}
		return [];
	}
}