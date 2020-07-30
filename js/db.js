class DatabaseService {
	async init() {
		this.instance = await idb.open('duniaBola', 2, (upgradeDb) => {
			upgradeDb.createObjectStore('team', {
				keyPath: 'id'
			});
		});
	}

	async insertTeam(team) {
		const trx = this.instance.transaction('team', 'readwrite');
		const store = trx.objectStore('team');
		await store.put(team);
		return trx.complete;
	}

	deleteTeam(teamId) {
		const trx = this.instance.transaction('team', 'readwrite');
		const store = trx.objectStore('team');
		return store.delete(teamId);
	}

	getTeam(teamId) {
		const trx = this.instance.transaction('team', 'readonly');
		const store = trx.objectStore('team');
		return store.get(teamId);
	}

	getAllTeams() {
		const trx = this.instance.transaction('team', 'readonly');
		const store = trx.objectStore('team');
		return store.getAll();
	}
}