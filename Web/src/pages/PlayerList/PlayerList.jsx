import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Checkbox, Dropdown, Search } from "semantic-ui-react";

import { Loader, QuestionModal } from "components";
import * as actions from "services/player";
import { usePlayerSelection } from "services/player/hooks";
import { useConfigContext } from "util/indexedDB";

import "./PlayerList.scss";
import config from "util/config.json";
import CompareGrid from "./CompareGrid/CompareGrid";

export default function PlayerList() {
  const [statsMode, setStatsMode] = useState("stats");
  const [seasonId, setSeasonId] = useState(config.currentSeason);
  const [value, setValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlayerIds, setSelectedPlayerIds] = useState([]);
  const { getSelectedPlayers, saveSelectedPlayers } = useConfigContext();

  const { loading, selectedPlayers, suggestions, loadingSearchResults } =
    usePlayerSelection();
  const { skaters, goalies } = selectedPlayers;

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const selectedPlayers = await getSelectedPlayers();
      if (selectedPlayers) {
        const selectedPlayerIds = selectedPlayers.map(
          (selectedPlayer) => selectedPlayer.id
        );
        setSelectedPlayerIds(selectedPlayerIds);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(actions.getSelectedPlayers(selectedPlayerIds, seasonId));
  }, [selectedPlayerIds, seasonId]);

  const onRemoveAll = () => {
    setSelectedPlayerIds([]);
  };

  const onRemoveId = (id) => {
    setSelectedPlayerIds(
      selectedPlayerIds.filter((playerId) => id != playerId)
    );
  };

  const checkedChanged = (e, { checked }) => {
    setStatsMode(checked ? "averageStats" : "stats");
  };

  const handleSearchChange = (e, { value }) => {
    setValue(value);

    if (value.length < 1 && value.length < 1) {
      setValue("");
    }

    if (value.length > 2) {
      dispatch(actions.searchBasicPlayer(value));
    }
  };

  const handleResultSelect = (e, { result }) => {
    setValue("");
    setSelectedPlayerIds([...selectedPlayerIds, result.id]);
  };

  const savePlayers = async () => {
    await saveSelectedPlayers(selectedPlayerIds);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="head-options-container">
        <Search
          className="search-box"
          loading={loadingSearchResults}
          onResultSelect={handleResultSelect}
          onSearchChange={handleSearchChange}
          results={suggestions}
          size="large"
          value={value}
        />
        <Button onClick={async () => await savePlayers()}>
          Save selected players
        </Button>
        <QuestionModal
          onOpen={() => {
            setModalOpen(true);
          }}
          onClose={(e, status) => {
            if (status) {
              onRemoveAll();
            }
            setModalOpen(false);
          }}
          open={modalOpen}
          trigger={<Button>Clear players</Button>}
        />
        <Dropdown
          header="Season"
          selection
          onChange={(_event, data) => setSeasonId(data.value)}
          defaultValue={config.currentSeason}
          options={config.seasons}
        />
        <Checkbox
          className="player-list-checkbox"
          toggle
          label="Average stats"
          onChange={checkedChanged}
        />
      </div>
      {skaters?.length > 0 && (
        <CompareGrid
          players={skaters}
          skater={true}
          statsSelector={statsMode}
          onDelete={(id) => onRemoveId(id, seasonId)}
        />
      )}
      {goalies?.length > 0 && (
        <CompareGrid
          players={goalies}
          skater={false}
          statsSelector="stats"
          onDelete={(id) => onRemoveId(id, seasonId)}
        />
      )}
    </>
  );
}
