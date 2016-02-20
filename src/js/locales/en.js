/**
 * FLL 2015 Scoreboard
 * @author Clark Winkelmann <clark.winkelmann@gmail.com>
 * @license MIT
 */

/* global ScoreBoardReact */

/**
 * English
 */
ScoreBoardReact.locales['en'] = {

	/**
	 * Global
	 */

	score: 'Score',
	unofficial: 'Unofficial Scoreboard for the FLL Robot Game',
	reset: 'Reset',
	error_occurred: 'An error occurred =( Please report it on the GitHub Issues tracker',

	/**
	 * Missions
	 */

	m01: {
		title: 'Using Recycled Material',
		own_bin: {
			yellow: 'Own yellow bin',
			blue: 'Own blue bin'
		},
		never_transferred: 'never transferred',
		transfer_area: 'in transfer area',
		other_safety: 'in other safety',
		other_bin_in_own_safety: {
			yellow: 'Other yellow bin in own safety',
			blue: 'Other blue bin in own safety'
		}
	},

	m02: {
		title: 'Methane',
		methanes_collected: 'Methanes collected'
	},

	m03: {
		title: 'Transport',
		supports_bin: 'Truck supports bin',
		east_of_guide: 'Bin east of truck guide'
	},

	m04: {
		title_colors: 'Sorting - Colors',
		title_black: 'Sorting - Black',
		in_correct_bin: {
			yellow: 'Yellow bars in correct bin',
			blue: 'Blue bars in correct bin'
		},
		black_bars: {
			setup_position: 'Black bars in flower box or setup position',
			matching_bin: 'Black bars in matching bin',
			anywhere_else: 'Black bars anywhere else'
		}
	},

	m05: {
		title: 'Careers',
		person_in_area: 'One person in sorter area'
	},

	m06: {
		title: 'Scrap Cars',
		engine_installed: 'Engine unit installed',
		car_folded: 'Car folded'
	},

	m07: {
		title: 'Cleanup',
		bags_in_safety: 'Bags in safety',
		animals_in_circle: 'Animals in circle',
		chicken_in_circle: 'Chicken in circle'
	},

	m08: {
		title: 'Composting',
		partly_in_safety: 'Compost partly in safety',
		completely_in_safety: 'Compost completely in safety'
	},

	m09: {
		title: 'Salvage',
		valuables_in_safety: 'Valuables in safety'
	},

	m10: {
		title: 'Demolition',
		building_demolished: 'Building demolished',
		demolish_building: 'Demolish building',
		demolish_building_helptext: 'Shortcut for: demolish building, remove 4 black bars from setup position, add 4 black bars anywhere else'
	},

	m11: {
		title: 'Purchasing Decisions',
		planes_in_safety: 'Planes in safety'
	},

	m12: {
		title: 'Repurposing',
		compost_in_package: 'Compost in package'
	},

	penalties: {
		title: 'Penalties',
		number_penalties: 'Penalties'
	}

};
