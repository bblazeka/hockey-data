import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CompareGrid, Loader } from '../../components';

import * as actions from '../../services/player';
import './PlayerList.css';

import { Search } from 'semantic-ui-react';
import { isNullOrUndefined } from '../../util/common';

const initialState = { isLoading: false, results: [], value: '' }

class PlayerList extends Component {
  constructor(props) {
    super(props)
    this.state = initialState;
    this.onRemove = this.onRemove.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);

    this.props.getSelectedPlayers()
  }

  onRemove(e) {
    e.preventDefault();
    this.props.removePlayer(e.target.value);
  }

  handleSearchChange (e, { value }) {
    this.setState({ isLoading: true, value });

    if (this.state.value.length < 1 && value.length < 1) {
      return this.setState(initialState);
    }

    if (value.length > 2) {
      this.props.searchBasicPlayer(value);
    }
    else
    {
      this.setState({ isLoading: false });
    }
  }

  handleResultSelect(e, { result }) {
    this.setState({ value: '', isLoading: false });
    this.props.addPlayer(result.id);
  }

  render() {
    const { selectedPlayers, suggestions } = this.props;
    const { isLoading, value } = this.state;
    if (isNullOrUndefined(selectedPlayers) || selectedPlayers.length === 0)
    {
      return (<Loader />)
    }
    return (
      <div>
        <Search
          className="search"
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          results={suggestions}
          size="large"
          value={value}
        />
        <CompareGrid
          players={selectedPlayers.skaters} 
          skater={true} 
          detailed={true} 
          onDelete={(id) => this.props.deletePlayer(id)}
        />
        <CompareGrid 
          players={selectedPlayers.goalies} 
          skater={false} 
          detailed={true} 
          onDelete={(id) => this.props.deletePlayer(id)}
        />
      </div>);
  }
}

const mapStateToProps = state => ({
  selectedPlayers: state.player.selectedPlayers,
  suggestions: state.player.suggestions,
})

const mapDispatchToProps = dispatch => ({
  getSelectedPlayers: () => dispatch(actions.getSelectedPlayers()),
  removePlayer: (id) => dispatch(actions.removePlayer(id)),
  searchBasicPlayer: (name) => dispatch(actions.searchBasicPlayer(name)),
  addPlayer: (id) => dispatch(actions.addPlayer(id)),
  deletePlayer: (id) => dispatch(actions.deletePlayer(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerList);