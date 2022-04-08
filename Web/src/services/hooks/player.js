import { useSelector } from "react-redux";
import { selectSelectedPlayers } from "reducers/selectors";

export function usePlayerSelection() {
  const {
    loading,
    selectedPlayers,
    suggestions,
    loadingSearchResults,
    selectedPlayersOption,
  } = useSelector(selectSelectedPlayers);

  return {
    loading,
    selectedPlayers,
    suggestions,
    loadingSearchResults,
    selectedPlayersOption,
  };
}
