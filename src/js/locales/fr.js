/**
 * FLL 2015 Scoreboard
 * @author Clark Winkelmann <clark.winkelmann@gmail.com>
 * @license MIT
 */

/* global ScoreBoardReact */

/**
 * French
 */
ScoreBoardReact.locales['fr'] = {

	/**
	 * Global
	 */

	score: 'Score',
	unofficial: 'Scoreboard non officiel pour le FLL Robot Game',
	reset: 'Reset',
	error_occurred: 'Une erreur est survenue =( Merci de la reporter dans le bugtracker sur GitHub',

	/**
	 * Missions
	 */

	m01: {
		title: 'Recyclage',
		own_bin: {
			yellow: 'Benne jaune',
			blue: 'Benne bleue'
		},
		never_transferred: 'jamais transféré',
		transfer_area: 'dans la zone de transfert',
		other_safety: 'dans la sécurité adverse',
		other_bin_in_own_safety: {
			yellow: 'Benne jaune adverse en sécurité',
			blue: 'Benne bleue adverse en sécurité'
		}
	},

	m02: {
		title: 'Méthane',
		methanes_collected: 'Méthane collecté'
	},

	m03: {
		title: 'Transport',
		supports_bin: 'Le camion supporte la benne',
		east_of_guide: 'La benne est à l\'est du guide'
	},

	m04: {
		title_colors: 'Tri - Couleurs',
		title_black: 'Tri - Noir',
		in_correct_bin: {
			yellow: 'Barres jaunes dans la benne',
			blue: 'Barres bleues dans la benne'
		},
		black_bars: {
			setup_position: 'Barres noires dans un bac à fleurs ou en position de départ',
			matching_bin: 'Barres noires dans une benne',
			anywhere_else: 'Barres noires n\'importe où ailleurs'
		}
	},

	m05: {
		title: 'Carrières',
		person_in_area: 'Technicien dans la zone de tri'
	},

	m06: {
		title: 'Voiture à la casse',
		engine_installed: 'Moteur installé',
		car_folded: 'Voiture pliée'
	},

	m07: {
		title: 'Nettoyage',
		bags_in_safety: 'Sacs en plastique en sécurité',
		animals_in_circle: 'Animaux dans un cercle',
		chicken_in_circle: 'Poule dans le petit cercle'
	},

	m08: {
		title: 'Compost',
		partly_in_safety: 'Compost partiellement en sécurité',
		completely_in_safety: 'Compost complètement en sécurité'
	},

	m09: {
		title: 'Sauvetage',
		valuables_in_safety: 'Objets de valeur en sécurité'
	},

	m10: {
		title: 'Démolition',
		building_demolished: 'Bâtiment détruit'
	},

	m11: {
		title: 'Décision d\'achat',
		planes_in_safety: 'Les avions sont en sécurité'
	},

	m12: {
		title: 'Réaffectation',
		compost_in_package: 'Compost inséré dans un emballage'
	},

	penalties: {
		title: 'Pénalités',
		number_penalties: 'Pénalités'
	}

};
