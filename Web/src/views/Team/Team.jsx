import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../services/team';
import './Team.css';
import Loader from '../../components/Loader/Loader';
import routes from '../../routes';
import { RosterGrid } from '../../components';
import { getLogo } from '../../util/assets';

import { Table, Header } from 'semantic-ui-react';

class Team extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "0",
      filterActive: true,
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { id } = props.match.params;
    if (state.id !== id) {
      props.getTeam(id);
      return {
        id,
      }
    }
    return null
  }

  render() {
    const { team } = this.props;
    const { filterActive } = this.props;
    if (!team) {
      return (<div><Loader></Loader></div>)
    }
    return (
      <div>
        <img className="mid-logo" src={getLogo(team.id)} alt={`img${team.id}${team.name}`}></img>
        <Header as='h1'>{team.name}</Header>
        <RosterGrid team={team} />
      </div>);
  }
}

const mapStateToProps = state => ({
  team: state.team.team,
  teams: state.team.teams,
})

const mapDispatchToProps = dispatch => ({
  getTeam: (id) => dispatch(actions.getTeam(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Team);