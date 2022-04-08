import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Checkbox, Dropdown } from "semantic-ui-react";
import { PlayerSearchBox } from "components/collection";
import styled from "styled-components";

import { Loader, NotFound, QuestionModal } from "components";
import {searchBasicPlayer, getSelectedPlayers as getSelectedPlayersAction} from "reducers/playerActions";
import { usePlayerSelection } from "services/hooks/player";
import { useConfigContext } from "util/indexedDB";

import config from "util/config.json";
import CompareGrid from "./CompareGrid/CompareGrid";

const HeadOptionsContainer = styled.div`
  display: flex;
`;

const PlayerListCheckbox = styled(Checkbox)`
  width: 3.5rem !important;
  top: 0.6em;
  border-width: 0;
  padding: 0;
  margin-left: 1vw;

  label {
    white-space: nowrap;
  }
`;

export default function PlayerList() {
  const [statsMode, setStatsMode] = useState("stats");
  const [value, setValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlayerIds, setSelectedPlayerIds] = useState([]);
  const { getSelectedPlayers, saveSelectedPlayers } = useConfigContext();

  const {
    loading,
    selectedPlayers,
    suggestions,
    loadingSearchResults,
    selectedPlayersOption,
  } = usePlayerSelection();
  const [seasonId, setSeasonId] = useState(selectedPlayersOption);
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
    if (selectedPlayerIds && selectedPlayerIds.length > 0) {
      dispatch(getSelectedPlayersAction(selectedPlayerIds, seasonId));
    }
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
      dispatch(searchBasicPlayer(value));
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
      <HeadOptionsContainer>
        <PlayerSearchBox
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
          defaultValue={seasonId}
          options={config.seasons}
        />
        <PlayerListCheckbox
          toggle
          label="Average stats"
          onChange={checkedChanged}
        />
      </HeadOptionsContainer>
      {skaters?.length === 0 && goalies?.length === 0 && (
        <NotFound text="Search for players to add them to the comparison" />
      )}
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
