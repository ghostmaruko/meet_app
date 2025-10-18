// src/api.js
import mockData from "./mock-data";
import NProgress from "nprogress";

/**
 * Estrae tutte le location dagli eventi e rimuove duplicati
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

/**
 * Recupera tutti gli eventi con gestione offline/online e cache
 */
export const getEvents = async () => {
  NProgress.start();

  // Se offline, carica i dati dalla cache
  if (!navigator.onLine) {
    const cachedEvents = localStorage.getItem("lastEvents");
    NProgress.done();
    return cachedEvents ? JSON.parse(cachedEvents) : [];
  }

  // Se online, recupera i dati dall'API o dal mock
  try {
    const result = mockData; // Sostituire con fetch(url) per API reale
    if (result) {
      // Salva sempre in localStorage
      localStorage.setItem("lastEvents", JSON.stringify(result));
      NProgress.done();
      return result;
    } else {
      NProgress.done();
      return [];
    }
  } catch (error) {
    console.error("Errore recupero eventi:", error);

    // In caso di errore fetch, prova a leggere dalla cache
    const cachedEvents = localStorage.getItem("lastEvents");
    NProgress.done();
    return cachedEvents ? JSON.parse(cachedEvents) : [];
  }
};
