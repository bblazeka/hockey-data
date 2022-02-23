import { openDB } from "idb/with-async-ittr";
import { useEffect, useState, createContext, useContext } from "react";

export function useInitIDB() {
  const [database, setDatabase] = useState(null);
  const openDBAsync = async () => {
    const dbOpened = await openDB("DB", 1, {
      upgrade: (database) => {
        const { objectStoreNames } = database;
        if (objectStoreNames.contains("selectedPlayers")) {
          database.deleteObjectStore("selectedPlayers");
        }
        database.createObjectStore("selectedPlayers", {
          keyPath: "id",
          autoIncrement: true,
        });
        //store.createIndex()
      },
    });
    setDatabase(dbOpened);
  };
  // currently ignoring updates
  useEffect(() => {
    openDBAsync();
  }, []);

  const getSelectedPlayers = async () => {
    const selectedPlayers = await database.getAll("selectedPlayers");
    return selectedPlayers;
  };

  const saveSelectedPlayers = async (playerIds) => {
    await database.clear("selectedPlayers");
    await playerIds.forEach(
      async (playerId) =>
        await database.add("selectedPlayers", { id: playerId })
    );
  };

  const removePlayer = async (playerId) => {
    return database.delete("selectedPlayers", { id: playerId });
  };
  return { database, getSelectedPlayers, saveSelectedPlayers, removePlayer };
}

// useless
export function useIDB() {
  return useInitIDB();
}

export const ConfigurationContext = createContext({
  database: undefined,
});

export function useConfigContext() {
  const context = useContext(ConfigurationContext);
  return context;
}
