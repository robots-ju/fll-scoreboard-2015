/**
 * FLL 2015 Scoreboard
 * @author Clark Winkelmann <clark.winkelmann@gmail.com>
 * @license MIT
 */

/* global React */
/* global FllScorer */

var ScoreBoardReact = React.createClass({
	mixins: [React.addons.LinkedStateMixin],
	getDefaultProps: function() {
		return {
			/**
			 * This a pseudo-event, allowing a script outside the Scoreboard
			 * to keep an eye on it and read the new values as they change
			 *
			 * Default is a no-op
			 */
			onStateChange: function() {},
			/**
			 * Initial state to load when the Scoreboard is created
			 * Can be used to restore data from the outside at initialization
			 */
			initialState: {}
		};
	},
	componentDidUpdate: function() {
		// Call the pseudo-event function
		this.props.onStateChange(this.state);
	},
	getInitialState: function() {
		var state = FllScorer.initialMissionsState;

		// Merge initial state with default state
		// thanks http://stackoverflow.com/a/171256/3133038
		for(var attrname in this.props.initialState) {
			state[attrname] = this.props.initialState[attrname];
		}

		// Choose the locale according to the browser. Default to English
		if(window.navigator.language.indexOf('fr') !== -1) {
			state.locale = 'fr';
		} else {
			state.locale = 'en';
		}

		return state;
	},
	resetMissions: function() {
		this.setState(FllScorer.initialMissionsState);
	},
	demolishBuilding: function() {
		this.setState(FllScorer.macroDemolishBuilding(this.state));
	},
	/**
	 * Finds a localised string from a dot-delimited path
	 */
	lang: function(str) {
		var items = str.split('.');

		var ref = ScoreBoardReact.locales[this.state.locale];

		for(var i=0; i < items.length; i++) {
			ref = ref[items[i]];
		}

		return ref;
	},
	render: function() {
		try {
			var score = FllScorer.computeScore(this.state);
		} catch(e) {
			alert(this.lang('error_occurred') + '\n' +
					'Details:\n' +
					e.name + '\n' +
					e.description);
		}

		return React.createElement('div', {}, [
			React.createElement('ul', {key: 'locales', className: 'locales'}, Object.keys(ScoreBoardReact.locales).map(function(locale) {
				return React.createElement('li', {key: locale, onClick: function() { this.setState({locale: locale}); }.bind(this)}, locale);
			}.bind(this))),
			React.createElement('header', {key: 'header'}, [
				React.createElement('h1', {key: 'title'}, [
					React.createElement('em', {}, 'Robots-JU'),
					' FLL 2015 Scoreboard',
					React.createElement('small', {}, this.lang('unofficial')),
				]),
				React.createElement('div', {key: 'score', className: 'score'}, this.lang('score') + ' ' + score)
			]),
			React.createElement('div', {key: 'missions', className: 'missions'}, [
				React.createElement('button', {key: 'reset', className: 'reset', onClick: this.resetMissions}, this.lang('reset')),
				React.createElement('div', {key: 'm01', className: 'mission mission01'}, [
					React.createElement('h2', {key: 1}, 'M01 - ' + this.lang('m01.title')),
					['yellow', 'blue'].map(function(color) {
						return React.createElement('label', {key: color}, [
							this.lang('m01.own_bin.' + color),
							React.createElement('select', {
									key: 'select',
									value: (function() {
										switch(true) {
											case this.state['m01_own_' + color + '_bin_in_other_safety']: return 'safety';
											case this.state['m04_own_' + color + '_bin_in_tranfer_area']: return 'transfer';
											default: return 'never';
										}
									}.bind(this))(),
									onChange: function(e) {
										var obj = {};
										obj['m01_own_' + color + '_bin_in_other_safety'] = e.target.value == 'safety';
										obj['m04_own_' + color + '_bin_in_tranfer_area'] = e.target.value == 'transfer';

										this.setState(obj);
									}.bind(this)
								}, [
								React.createElement('option', {key: 10, value: 'never'   }, this.lang('m01.never_transferred')),
								React.createElement('option', {key: 11, value: 'transfer'}, this.lang('m01.transfer_area')),
								React.createElement('option', {key: 12, value: 'safety'  }, this.lang('m01.other_safety') + ' (+60)')
							])
						]);
					}.bind(this)),
					React.createElement('label', {key: 2, className: (this.state.m01_other_yellow_bin_in_own_safety ? ' active' : '')}, [
						React.createElement('input', {type: 'checkbox', checkedLink: this.linkState('m01_other_yellow_bin_in_own_safety')}),
						this.lang('m01.other_bin_in_own_safety.yellow') + ' ',
						React.createElement('em', {}, '+60')
					]),
					React.createElement('label', {key: 3, className: (this.state.m01_other_blue_bin_in_own_safety ? ' active' : '')}, [
						React.createElement('input', {type: 'checkbox', checkedLink: this.linkState('m01_other_blue_bin_in_own_safety')}),
						this.lang('m01.other_bin_in_own_safety.blue') + ' ',
						React.createElement('em', {}, '+60')
					])
				]),
				React.createElement('div', {key: 'm02', className: 'mission mission02'}, [
					React.createElement('h2', {key: 1}, 'M02 - ' + this.lang('m02.title')),
					React.createElement('label', {key: 2}, [
						this.lang('m02.methanes_collected') + ' ',
						React.createElement('em', {}, '+40'),
						React.createElement('input', {type: 'number', min: 0, max: 2, valueLink: this.linkState('m02_methanes_collected')})
					])
				]),
				React.createElement('div', {key: 'm03', className: 'mission mission03'}, [
					React.createElement('h2', {key: 1}, 'M03 - ' + this.lang('m03.title')),
					React.createElement('label', {key: 2, className: (this.state.m03_truck_supports_bin ? ' active' : '')}, [
						React.createElement('input', {type: 'checkbox', checkedLink: this.linkState('m03_truck_supports_bin')}),
						this.lang('m03.supports_bin') + ' ',
						React.createElement('em', {}, '+50')
					]),
					React.createElement('label', {key: 3, className: (this.state.m03_bin_east_of_guide ? ' active' : '')}, [
						React.createElement('input', {type: 'checkbox', checkedLink: this.linkState('m03_bin_east_of_guide')}),
						this.lang('m03.east_of_guide') + ' ',
						React.createElement('em', {}, '+60')
					])
				]),
				React.createElement('div', {key: 'm04-color', className: 'mission mission04-color'}, [
					React.createElement('h2', {key: 1}, 'M04 - ' + this.lang('m04.title_colors')),
					React.createElement('label', {key: 2}, [
						this.lang('m04.in_correct_bin.yellow') + ' ',
							React.createElement('em', {}, '+6/+7'),
						React.createElement('input', {type: 'number', min: 0, max: 9, valueLink: this.linkState('m04_yellow_bars_in_correct_bin')})
					]),
					React.createElement('label', {key: 3}, [
						this.lang('m04.in_correct_bin.blue') + ' ',
							React.createElement('em', {}, '+6/+7'),
						React.createElement('input', {type: 'number', min: 0, max:6, valueLink: this.linkState('m04_blue_bars_in_correct_bin')})
					])
				]),
				React.createElement('div', {key: 'm04-black', className: 'mission mission04-black'}, [
					React.createElement('h2', {key: 1}, 'M04 - ' + this.lang('m04.title_black')),
					React.createElement('label', {key: 2}, [
						this.lang('m04.black_bars.setup_position') + ' ',
							React.createElement('em', {}, '+8'),
						React.createElement('input', {type: 'number', min: 0, max: 8, valueLink: this.linkState('m04_black_bars_in_flower_box_or_setup_position')})
					]),
					React.createElement('label', {key: 3}, [
						this.lang('m04.black_bars.matching_bin') + ' ',
							React.createElement('em', {}, '+3'),
						React.createElement('input', {type: 'number', min: 0, max: 8, valueLink: this.linkState('m04_black_bars_in_matching_bin')})
					]),
					React.createElement('label', {key: 4}, [
						this.lang('m04.black_bars.anywhere_else') + ' ',
							React.createElement('em', {}, '-8'),
						React.createElement('input', {type: 'number', min: 0, max: 8, valueLink: this.linkState('m04_black_bars_anywhere_else')})
					])
				]),
				React.createElement('div', {key: 'm05', className: 'mission mission05'}, [
					React.createElement('h2', {key: 1}, 'M05 - ' + this.lang('m05.title')),
					React.createElement('label', {key: 2, className: (this.state.m05_one_person_in_sorter_area ? ' active' : '')}, [
						React.createElement('input', {type: 'checkbox', checkedLink: this.linkState('m05_one_person_in_sorter_area')}),
						this.lang('m05.person_in_area') + ' ',
						React.createElement('em', {}, '+60')
					])
				]),
				React.createElement('div', {key: 'm06', className: 'mission mission06'}, [
					React.createElement('h2', {key: 1}, 'M06 - ' + this.lang('m06.title')),
					React.createElement('label', {key: 2}, [
						React.createElement('input', {
							type: 'checkbox',
							checked: !!this.state.m06_engine_unit_installed,
							onChange: function() {
								this.setState({
									m06_engine_unit_installed: !this.state.m06_engine_unit_installed,
									m06_car_folded: false
								});
							}.bind(this)
						}),
						this.lang('m06.engine_installed') + ' ',
						React.createElement('em', {}, '+65')
					]),
					React.createElement('label', {key: 3}, [
						React.createElement('input', {
							type: 'checkbox',
							checked: !!this.state.m06_car_folded,
							onChange: function() {
								this.setState({
									m06_car_folded: !this.state.m06_car_folded,
									m06_engine_unit_installed: false
								});
							}.bind(this)
						}),
						this.lang('m06.car_folded') + ' ',
						React.createElement('em', {}, '+50')
					])
				]),
				React.createElement('div', {key: 'm07', className: 'mission mission07'}, [
					React.createElement('h2', {key: 1}, 'M07 - ' + this.lang('m07.title')),
					React.createElement('label', {key: 2}, [
						this.lang('m07.bags_in_safety') + ' ',
						React.createElement('em', {}, '+30'),
						React.createElement('input', {type: 'number', min: 0, max: 2, valueLink: this.linkState('m07_bags_in_safety')})
					]),
					React.createElement('label', {key: 3}, [
						this.lang('m07.animals_in_circle') + ' ',
						React.createElement('em', {}, '+20'),
						React.createElement('input', {type: 'number', min: 0, max: 3, valueLink: this.linkState('m07_animals_in_circle')})
					]),
					React.createElement('label', {key: 4, className: (this.state.m07_chicken_in_circle ? ' active' : '')}, [
						React.createElement('input', {type: 'checkbox', checkedLink: this.linkState('m07_chicken_in_circle')}),
						this.lang('m07.chicken_in_circle') + ' ',
						React.createElement('em', {}, '+20 +35')
					])
				]),
				React.createElement('div', {key: 'm08', className: 'mission mission08'}, [
					React.createElement('h2', {key: 1}, 'M08 - ' + this.lang('m08.title')),
					React.createElement('label', {key: 2}, [
						React.createElement('input', {
							type: 'checkbox',
							checked: !!this.state.m08_compost_partly_in_safety,
							onChange: function() {
								this.setState({
									m08_compost_partly_in_safety: !this.state.m08_compost_partly_in_safety,
									m08_compost_completely_in_safety: false
								});
							}.bind(this)
						}),
						this.lang('m08.partly_in_safety') + ' ',
						React.createElement('em', {}, '+60')
					]),
					React.createElement('label', {key: 3}, [
						React.createElement('input', {
							type: 'checkbox',
							checked: !!this.state.m08_compost_completely_in_safety,
							onChange: function() {
								this.setState({
									m08_compost_completely_in_safety: !this.state.m08_compost_completely_in_safety,
									m08_compost_partly_in_safety: false
								});
							}.bind(this)
						}),
						this.lang('m08.completely_in_safety') + ' ',
						React.createElement('em', {}, '+80')
					])
				]),
				React.createElement('div', {key: 'm09', className: 'mission mission09'}, [
					React.createElement('h2', {key: 1}, 'M09 - ' + this.lang('m09.title')),
					React.createElement('label', {key: 2, className: (this.state.m09_valuables_in_safety ? ' active' : '')}, [
						React.createElement('input', {type: 'checkbox', checkedLink: this.linkState('m09_valuables_in_safety')}),
						this.lang('m09.valuables_in_safety') + ' ',
						React.createElement('em', {}, '+60')
					])
				]),
				React.createElement('div', {key: 'm10', className: 'mission mission10'}, [
					React.createElement('h2', {key: 1}, 'M10 - ' + this.lang('m10.title')),
					React.createElement('label', {key: 2, className: (this.state.m10_building_demolished ? ' active' : '')}, [
						React.createElement('input', {type: 'checkbox', checkedLink: this.linkState('m10_building_demolished')}),
						this.lang('m10.building_demolished') + ' ',
						React.createElement('em', {}, '+85')
					]),
					React.createElement('button', {key: 3, onClick: this.demolishBuilding, title: this.lang('m10.demolish_building_helptext')}, this.lang('m10.demolish_building'))
				]),
				React.createElement('div', {key: 'm11', className: 'mission mission11'}, [
					React.createElement('h2', {key: 1}, 'M11 - ' + this.lang('m11.title')),
					React.createElement('label', {key: 2}, [
						this.lang('m11.planes_in_safety') + ' ',
						React.createElement('em', {}, '+40'),
						React.createElement('input', {type: 'number', min: 0, max: 2, valueLink: this.linkState('m11_planes_in_safety')})
					])
				]),
				React.createElement('div', {key: 'm12', className: 'mission mission12'}, [
					React.createElement('h2', {key: 1}, 'M12 - ' + this.lang('m12.title')),
					React.createElement('label', {key: 2, className: (this.state.m12_compost_in_package ? ' active' : '')}, [
						React.createElement('input', {type: 'checkbox', checkedLink: this.linkState('m12_compost_in_package')}),
						this.lang('m12.compost_in_package') + ' ',
						React.createElement('em', {}, '+40')
					])
				]),
				React.createElement('div', {key: 'penalties', className: 'mission mission-penalties'}, [
					React.createElement('h2', {key: 1}, this.lang('penalties.title')),
					React.createElement('label', {key: 2}, [
						this.lang('penalties.number_penalties') + ' ',
						React.createElement('em', {}, '-16'),
						React.createElement('input', {type: 'number', min: 0, max: 4, valueLink: this.linkState('penalties')})
					])
				])
			])
		]);
	}
});

// Static object that will hold the locales
ScoreBoardReact.locales = {};
