/**
 * FLL 2015 Scoreboard
 * @author Clark Winkelmann <clark.winkelmann@gmail.com>
 * @license MIT
 */

/* global React */
/* global FllScorer */

var ScoreBoardReact = React.createClass({
	mixins: [React.addons.LinkedStateMixin],
	getInitialState: function() {
		return FllScorer.initialMissionsState;
	},
	resetMissions: function() {
		this.setState(FllScorer.initialMissionsState);
	},
	demolishBuilding: function() {
		this.setState(FllScorer.macroDemolishBuilding(this.state));
	},
	render: function() {
		try {
			var score = FllScorer.computeScore(this.state);
		} catch(e) {
			alert('An error occurred =( Please report it on the GitHub Issues tracker\n' +
					'Details:\n' +
					e.name + '\n' +
					e.description);
		}

		return React.createElement('div', {}, [
			React.createElement('header', {}, [
				React.createElement('h1', {}, [
					React.createElement('em', {}, 'Unofficial'),
					' FLL 2015 Scoreboard'
				]),
				React.createElement('div', {className: 'score'}, 'Score ' + score)
			]),
			React.createElement('div', {className: 'missions'}, [
				React.createElement('button', {className: 'reset', onClick: this.resetMissions}, 'Reset'),
				React.createElement('div', {className: 'mission mission01'}, [
					React.createElement('h2', {}, 'M01 - Using Recycled Material'),
					['yellow', 'blue'].map(function(color) {
						return React.createElement('label', {}, [
							color == 'yellow' ? 'Own yellow bin' : 'Own blue bin',
							React.createElement('select', {
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
								React.createElement('option', {value: 'never'}, 'never transferred'),
								React.createElement('option', {value: 'transfer'}, 'in transfer area'),
								React.createElement('option', {value: 'safety'}, 'in other safety (+60)')
							])
						]);
					}.bind(this)),
					React.createElement('label', {className: (this.state.m01_other_yellow_bin_in_own_safety ? ' active' : '')}, [
						React.createElement('input', {type: 'checkbox', checkedLink: this.linkState('m01_other_yellow_bin_in_own_safety')}),
						'Other yellow bin in own safety ',
						React.createElement('em', {}, '+60')
					]),
					React.createElement('label', {className: (this.state.m01_other_blue_bin_in_own_safety ? ' active' : '')}, [
						React.createElement('input', {type: 'checkbox', checkedLink: this.linkState('m01_other_blue_bin_in_own_safety')}),
						'Other blue bin in own safety ',
						React.createElement('em', {}, '+60')
					])
				]),
				React.createElement('div', {className: 'mission mission02'}, [
					React.createElement('h2', {}, 'M02 - Methane'),
					React.createElement('label', {}, [
						'Methanes collected ',
						React.createElement('em', {}, '+40'),
						React.createElement('input', {type: 'number', min: 0, max: 2, valueLink: this.linkState('m02_methanes_collected')})
					])
				]),
				React.createElement('div', {className: 'mission mission03'}, [
					React.createElement('h2', {}, 'M03 - Transport'),
					React.createElement('label', {className: (this.state.m03_truck_supports_bin ? ' active' : '')}, [
						React.createElement('input', {type: 'checkbox', checkedLink: this.linkState('m03_truck_supports_bin')}),
						'Truck supports bin ',
						React.createElement('em', {}, '+50')
					]),
					React.createElement('label', {className: (this.state.m03_bin_east_of_guide ? ' active' : '')}, [
						React.createElement('input', {type: 'checkbox', checkedLink: this.linkState('m03_bin_east_of_guide')}),
						'Bin east of truck guide ',
						React.createElement('em', {}, '+60')
					])
				]),
				React.createElement('div', {className: 'mission mission04-color'}, [
					React.createElement('h2', {}, 'M04 - Sorting - Colors'),
					React.createElement('label', {}, [
						'Yellow bars in correct bin ',
							React.createElement('em', {}, '+6/+7'),
						React.createElement('input', {type: 'number', min: 0, max: 9, valueLink: this.linkState('m04_yellow_bars_in_correct_bin')})
					]),
					React.createElement('label', {}, [
						'Blue bars in correct bin ',
							React.createElement('em', {}, '+6/+7'),
						React.createElement('input', {type: 'number', min: 0, max:6, valueLink: this.linkState('m04_blue_bars_in_correct_bin')})
					])
				]),
				React.createElement('div', {className: 'mission mission04-black'}, [
					React.createElement('h2', {}, 'M04 - Sorting - Black'),
					React.createElement('label', {}, [
						'Black bars in flower box or setup position ',
							React.createElement('em', {}, '+8'),
						React.createElement('input', {type: 'number', min: 0, max: 8, valueLink: this.linkState('m04_black_bars_in_flower_box_or_setup_position')})
					]),
					React.createElement('label', {}, [
						'Black bars in matching bin ',
							React.createElement('em', {}, '+3'),
						React.createElement('input', {type: 'number', min: 0, max: 8, valueLink: this.linkState('m04_black_bars_in_matching_bin')})
					]),
					React.createElement('label', {}, [
						'Black bars anywhere else ',
							React.createElement('em', {}, '-8'),
						React.createElement('input', {type: 'number', min: 0, max: 8, valueLink: this.linkState('m04_black_bars_anywhere_else')})
					])
				]),
				React.createElement('div', {className: 'mission mission05'}, [
					React.createElement('h2', {}, 'M05 - Careers'),
					React.createElement('label', {className: (this.state.m05_one_person_in_sorter_area ? ' active' : '')}, [
						React.createElement('input', {type: 'checkbox', checkedLink: this.linkState('m05_one_person_in_sorter_area')}),
						'One person in sorter area ',
						React.createElement('em', {}, '+60')
					])
				]),
				React.createElement('div', {className: 'mission mission06'}, [
					React.createElement('h2', {}, 'M06 - Scrap Cars'),
					React.createElement('label', {}, [
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
						'Engine unit installed ',
						React.createElement('em', {}, '+65')
					]),
					React.createElement('label', {}, [
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
						'Car folded ',
						React.createElement('em', {}, '+50')
					])
				]),
				React.createElement('div', {className: 'mission mission07'}, [
					React.createElement('h2', {}, 'M07 - Cleanup'),
					React.createElement('label', {}, [
						'Bags in safety ',
						React.createElement('em', {}, '+30'),
						React.createElement('input', {type: 'number', min: 0, max: 2, valueLink: this.linkState('m07_bags_in_safety')})
					]),
					React.createElement('label', {}, [
						'Animals in circle ',
						React.createElement('em', {}, '+20'),
						React.createElement('input', {type: 'number', min: 0, max: 3, valueLink: this.linkState('m07_animals_in_circle')})
					]),
					React.createElement('label', {className: (this.state.m07_chicken_in_circle ? ' active' : '')}, [
						React.createElement('input', {type: 'checkbox', checkedLink: this.linkState('m07_chicken_in_circle')}),
						'Chicken in circle ',
						React.createElement('em', {}, '+20 +35')
					])
				]),
				React.createElement('div', {className: 'mission mission08'}, [
					React.createElement('h2', {}, 'M08 - Composting'),
					React.createElement('label', {}, [
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
						'Compost partly in safety ',
						React.createElement('em', {}, '+60')
					]),
					React.createElement('label', {}, [
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
						'Compost completely in safety ',
						React.createElement('em', {}, '+80')
					])
				]),
				React.createElement('div', {className: 'mission mission09'}, [
					React.createElement('h2', {}, 'M09 - Salvage'),
					React.createElement('label', {className: (this.state.m09_valuables_in_safety ? ' active' : '')}, [
						React.createElement('input', {type: 'checkbox', checkedLink: this.linkState('m09_valuables_in_safety')}),
						'Valuables in safety ',
						React.createElement('em', {}, '+60')
					])
				]),
				React.createElement('div', {className: 'mission mission10'}, [
					React.createElement('h2', {}, 'M10 - Demolition'),
					React.createElement('label', {className: (this.state.m10_building_demolished ? ' active' : '')}, [
						React.createElement('input', {type: 'checkbox', checkedLink: this.linkState('m10_building_demolished')}),
						'Building demolished ',
						React.createElement('em', {}, '+85')
					]),
					React.createElement('button', {onClick: this.demolishBuilding}, 'Demolish building')
				]),
				React.createElement('div', {className: 'mission mission11'}, [
					React.createElement('h2', {}, 'M11 - Purchasing Decisions'),
					React.createElement('label', {}, [
						'Planes in safety ',
						React.createElement('em', {}, '+40'),
						React.createElement('input', {type: 'number', min: 0, max: 2, valueLink: this.linkState('m11_planes_in_safety')})
					])
				]),
				React.createElement('div', {className: 'mission mission12'}, [
					React.createElement('h2', {}, 'M12 - Repurposing'),
					React.createElement('label', {className: (this.state.m12_compost_in_package ? ' active' : '')}, [
						React.createElement('input', {type: 'checkbox', checkedLink: this.linkState('m12_compost_in_package')}),
						'Compost in package ',
						React.createElement('em', {}, '+40')
					])
				]),
				React.createElement('div', {className: 'mission mission-penalties'}, [
					React.createElement('h2', {}, 'Penalties'),
					React.createElement('label', {}, [
						'Penalties ',
						React.createElement('em', {}, '-16'),
						React.createElement('input', {type: 'number', min: 0, max: 4, valueLink: this.linkState('penalties')})
					])
				])
			])
		]);
	}
});
