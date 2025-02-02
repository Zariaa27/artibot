const AutoGitUpdate = require('auto-git-update');
const { params } = require("../config.json");
const { log } = require("./logger");

// if ran with npm run updater
if (require.main === module) {

	if (params.checkForUpdates != "stable" && params.checkForUpdates != "unstable") {
		log("Updater", "Erreur de configuration!", "err", true);
		process.exit(1);
	};

	const config = {
		repository: 'https://github.com/Artivain/artibot',
		tempLocation: '../updaterFiles',
		exitOnComplete: true,
		branch: (params.checkForUpdates == "stable" ? "main" : "unstable")
	};

	const updater = new AutoGitUpdate(config);

	updater.setLogConfig({
		logDebug: true,
		logDetail: true,
		logGeneral: true,
		logWarning: true,
		logError: true
	});
	updater.autoUpdate();

} else {

	module.exports = {
		async checkUpdates() {
			if (params.checkForUpdates != "stable" && params.checkForUpdates != "unstable") {
				return log("Updater", "Vérification des mises à jours désactivée dans la configuration", "err", true)
			};

			const config = {
				repository: 'https://github.com/Artivain/artibot',
				tempLocation: '../../updaterFiles',
				exitOnComplete: false,
				branch: (params.checkForUpdates == "stable" ? "main" : "unstable")
			};

			const updater = new AutoGitUpdate(config);

			updater.setLogConfig({
				logDebug: false,
				logDetail: false,
				logGeneral: false,
				logWarning: true,
				logError: true
			});

			return updater.compareVersions();
		},

		async doUpdates(options) {
			if (params.checkForUpdates != "stable" && params.checkForUpdates != "unstable") {
				throw "Erreur de configuration"
			};
		
			const autoUpdater = new AutoGitUpdate(options);
		
			autoUpdater.setLogConfig({
				logDebug: true,
				logDetail: true,
				logGeneral: true,
				logWarning: true,
				logError: true
			});
			return autoUpdater.autoUpdate();
		}
	};

};