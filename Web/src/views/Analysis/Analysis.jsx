import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Header, Image, Menu, Segment, Statistic, Tab, Table } from 'semantic-ui-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import './Analysis.scss';
import { getLogo } from '../../util/assets';
import { getColorScheme } from '../../util/shared';
import { GetNumberWithOrdinal, IsNullOrUndefined } from '../../util/common';
import { Lineup, Loader, StatsPieChart, StatsScatterChart } from '../../components';
import * as actions from '../../services/analysis';

const dropdownOptions = [{ key: 'points', text: 'Points', value: 'points' }, { key: 'goals', text: 'Goals', value: 'goals' }, { key: 'assists', text: 'Assists', value: 'assists' }];

class Analysis extends Component {

  constructor(props) {
    super(props);
    this.state = {
      'category': 'points'
    };
    this.onCategoryChange = this.onCategoryChange.bind(this);
  }

  componentDidMount() {
    this.props.getAnalysis();
  }

  onCategoryChange(_, data) {
    this.setState({
      category: data.value
    });
  }

  createSortedList(players, category) {
    var result = [];
    var sortedPlayers = players
      .sort((a, b) => { return b.stats[category] - a.stats[category]; })
      .map((ps) => {
        return {
          'label': ps.fullName,
          'subLabel': ps.stats[category],
          'angle': ps.stats[category]
        };
      });

      sortedPlayers.reduce(function (res, value, index) {
      var id = index > 7 ? '' : value.label;
      if (!res[id]) {
        res[id] = { label: id, subLabel: 0, angle: 0 };
        result.push(res[id]);
      }
      res[id].angle += value.angle;
      res[id].subLabel += value.subLabel;
      return res;
    }, {});
    return result;
  }

  createStatistic(text, value) {
    return (
      <Statistic>
        <Statistic.Value>{value}</Statistic.Value>
        <Statistic.Label>{text}</Statistic.Label>
      </Statistic>);
  }

  render() {
    const { analysis } = this.props;
    const { category } = this.state;
    if (IsNullOrUndefined(analysis)) {
      return (<Loader />);
    }

    const panes = analysis.map((team, index) => {
      const colors = getColorScheme(team.team.colorScheme);
      var skaterPie = this.createSortedList(team.rosterStats.filter((p) => { return p.stats.points > 0; }), category);
      var goalieGraph = this.createSortedList(team.rosterStats.filter((p) => { return p.stats.points == null; }), 'wins');

      var skaters = team.rosterStats.filter((p) => { return p.stats.points !== null; });
      return {
        menuItem: (
          <Menu.Item key={team.id}>
            {index + 1}. <Image avatar src={getLogo(team.id)} /> {team.team.name}
          </Menu.Item>
        ), render: () =>
          <Tab.Pane>
            <Header as='h1' className="team-header">
              <img className="mid-logo" src={getLogo(team.id)} alt={`img${team.id}${team.team.name}`} />{team.team.name}
            </Header>
            <Statistic.Group widths='5'>
              {this.createStatistic('League', GetNumberWithOrdinal(team.leagueRank))}
              {this.createStatistic('League Home', GetNumberWithOrdinal(team.leagueHomeRank))}
              {this.createStatistic('League Road', GetNumberWithOrdinal(team.leagueRoadRank))}
              {this.createStatistic('League Last 10', GetNumberWithOrdinal(team.leagueL10Rank))}
              {this.createStatistic('League Powerplay', GetNumberWithOrdinal(team.ppLeagueRank))}
            </Statistic.Group>
            <Statistic.Group widths='5'>
              {this.createStatistic('Division', GetNumberWithOrdinal(team.divisionRank))}
              {this.createStatistic('Division Home', GetNumberWithOrdinal(team.divisionHomeRank))}
              {this.createStatistic('Division Road', GetNumberWithOrdinal(team.divisionRoadRank))}
              {this.createStatistic('Division Last 10', GetNumberWithOrdinal(team.divisionL10Rank))}
              {this.createStatistic('Division Powerplay', GetNumberWithOrdinal(team.ppDivisionRank))}
            </Statistic.Group>
            <div className='team-stats-table'>
              <Table>
                <Table.Header>
                  <Table.Row>
                    {team.stats.map((stat) => {
                      return (<Table.HeaderCell key={stat.title + team.id}>{stat.title}</Table.HeaderCell>);
                    })}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    {team.stats.map((stat) => {
                      return (<Table.Cell key={stat.title + team.id}>{stat.value}</Table.Cell>);
                    })}
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
            <div style={{ width: '70vw', height: '20vh' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={team.rankingsGraph}
                  margin={{
                    top: 15,
                    right: 10,
                    left: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="4 4" />
                  <XAxis dataKey="x" />
                  <YAxis name="Rank" reversed />
                  <Tooltip />
                  <Legend />
                  <Line dataKey="y" name="Rank" fill={colors[0]} stroke={colors[0]} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className='graph-container'>
              <div className='filter-container'>
                <Header as='h4'>
                  <Header.Content>
                    Player{' '}
                    <Dropdown
                      header='Category'
                      inline
                      onChange={this.onCategoryChange}
                      defaultValue={dropdownOptions[0].value}
                      options={dropdownOptions}
                    />{' '}
                  </Header.Content>
                </Header>
              </div>
              <div style={{ width: '45vw', height: '40vh', overflow: 'visible' }}>
                <h4>{/*empty space*/}</h4>
                <StatsPieChart values={skaterPie} colorScheme={colors} />
              </div>
              <div style={{ width: '40vw', height: '40vh' }}>
                <h4 className='pie-chart-header'>Goalie wins:</h4>
                <StatsPieChart values={goalieGraph} colorScheme={colors} />
              </div>
            </div>
            <div className='graph-container'>
              <div style={{ width: '70vw', height: '40vh' }}>
                <StatsScatterChart
                  values={skaters}
                  xAxisName="Games"
                  xKey="stats.games"
                  yAxisName={category}
                  yKey={`stats.${category}`}
                  color={colors[0]}
                />
              </div>
            </div>
            <div className='graph-container'>
              <div style={{ width: '70vw', height: '40vh' }}>
                <StatsScatterChart values={skaters}
                  xAxisName="Games" xKey="stats.games" yAxisName="+/-" yKey="stats.plusMinus" height={400} width={400} color={colors[0]} />
              </div>
            </div>
            <div className='lineup-container'>
              <Lineup lines={team.lines}></Lineup>
            </div>
          </Tab.Pane>
      };
    });
    return (
      <Segment>
        <Tab
          grid={{ paneWidth: 13, tabWidth: 3 }}
          menu={{ fluid: true, vertical: true }}
          menuPosition='left'
          panes={panes}
        />
      </Segment>);
  }
}

const mapStateToProps = state => ({
  analysis: state.analysis.analysis,
});

const mapDispatchToProps = dispatch => ({
  getAnalysis: () => dispatch(actions.getAnalysis()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Analysis);