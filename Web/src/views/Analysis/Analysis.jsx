import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetNumberWithOrdinal, IsNullOrUndefined } from 'common';
import { Header, Image, Menu, Popup, Segment, Statistic, Tab, Table } from 'semantic-ui-react';
import { VerticalBarSeries, VerticalGridLines, HorizontalGridLines, RadialChart, XYPlot, XAxis, YAxis } from 'react-vis';
import { getLogo } from '../../util/assets';

import './Analysis.scss';

import { Loader } from '../../components';
import * as actions from '../../services/analysis';

class Analysis extends Component {

  componentDidMount() {
    this.props.getAnalysis();
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
    if (IsNullOrUndefined(analysis)) {
      return (<Loader />);
    }
    const panes = analysis.map((team, index) => {
      return {
        menuItem: (
          <Menu.Item key={team.id}>
            {index + 1}. <Image avatar src={getLogo(team.id)} /> {team.team.name}
          </Menu.Item>
        ), render: () =>
          <Tab.Pane>
            <Header as='h1' className="team-header"><img className="mid-logo" src={getLogo(team.id)} alt={`img${team.id}${team.team.name}`} />{team.team.name}</Header>
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
            <Table>
              <Table.Header>
                <Table.Row>
                  {team.stats.map((stat) => {
                    return (<Popup content={stat.description} key={stat.title} trigger={<Table.HeaderCell key={stat.title + team.id}>{stat.title}</Table.HeaderCell>}></Popup>);
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
            <XYPlot height={300} width={1300} xType="ordinal" yDomain={[0, 100]}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis />
              <YAxis />
              <VerticalBarSeries data={team.rankingsGraph}></VerticalBarSeries>
            </XYPlot>

            <RadialChart
              showLabels={true}
              data={team.rosterStats}
              margin={{left: 40, right: 40, top: 50, bottom: 50}}
              width={500}
              height={500} />

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