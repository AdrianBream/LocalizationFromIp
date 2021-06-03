import { FC, useState, useEffect } from 'react';
import { LocationInfo } from './components/LocationInfo';
import { HistoryItem } from './components/HistoryItem';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTextInput } from './hooks/useTextInput';
import { fetchLocalization, LocalizationResponse } from './services/ipStack';
import { fetchMyIp } from './services/ipify';

const SEARCH_HISTORY_STORAGE_KEY = 'app-searchHistory';

const App: FC = () => {
  const [searchHistory, setSearchHistory] = useLocalStorage<LocalizationResponse[]>(SEARCH_HISTORY_STORAGE_KEY, []);
  const [ip, setIp] = useTextInput<string>('');
  const [currentSearch, setCurrentSearch] = useState<LocalizationResponse>();
  const [previousSearch, setPreviousSearch] = useState<LocalizationResponse>();

  useEffect(() => {
    fetchMyIp()
      .then(fetchLocalization)
      .then((response: LocalizationResponse) => {
        setCurrentSearch(response);
      })
  }, [])

  const onSearchHandler = () => {
    if (ip.trim() !== '') {
        fetchLocalization(ip)
          .then((response: LocalizationResponse) => {
            if (response.type === null) {
              alert('Wrong IP');
            } else {
              const updatedHistory = [...searchHistory];
              updatedHistory.push(response);
    
              setSearchHistory(updatedHistory);
              setCurrentSearch(response);
              setPreviousSearch(updatedHistory[updatedHistory.length - 2]);
            }
          })
    }
  }

  const onHistoryHandler = (historyIp: string) => fetchLocalization(historyIp)
    .then((response: LocalizationResponse) => {
        setPreviousSearch(response);
  })

  return (
    <div className="app flex">
      <div className="search-history container">
        {searchHistory.map((sh: LocalizationResponse, idx: number) => <HistoryItem
          key={idx}
          historyItem={sh}
          onHistoryHandler={onHistoryHandler}
        />)}
      </div>
      <div className="current-location container">
        {currentSearch && <iframe
          className="map"
          scrolling="no"
          src={`https://maps.google.com/maps?q=${currentSearch.latitude},${currentSearch.longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          ></iframe>
        }
      </div>
      <div className="current-location-info container">
        {currentSearch && <LocationInfo location={currentSearch} />}
      </div>
      <div className="search-bar">
        <input
          type="text"
          value={ip}
          onChange={setIp}
        />
        <button onClick={onSearchHandler}>
          Search
        </button>
      </div>
      <div className="prev-location container">
        {previousSearch && <iframe
          className="map"
          scrolling="no"
          src={`https://maps.google.com/maps?q=${previousSearch.latitude},${previousSearch.longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          ></iframe>}
      </div>
      <div className="prev-location-info container">
        {previousSearch && <LocationInfo location={previousSearch} />}
      </div>
    </div>
  );
}

export default App;
