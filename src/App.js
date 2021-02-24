import React, { useCallback, useEffect, useState } from 'react';
import RocketView from './components/RocketView';
import RocketItem from './components/RocketItem';
import Logo from './components/Logo';
import SearchRocket from './components/SearchRocket';
import debounce from 'lodash.debounce';

function App() {
  const [rockets, setRockets] = useState([]);
  const [rocketsData, setRocketsData] = useState([]);
  const [rocketsForList, setRocketsForList] = useState([]);
  const [listView, setListView] = useState(true);
  const [currentRocketId, setCurrentRocketId] = useState(null);
  const [filterTerm, setFilterTerm] = useState('');

  useEffect(() => {
    fetchRockets()
      .then((rocketsFromAPI) => {
        setRockets(rocketsFromAPI);
        setRocketsForList(rocketsFromAPI);
      })
      .catch(console.error);
  }, []);

  const getRocketsForList = useCallback(
    (filterTerm) => {
      if (filterTerm.length > 2) {
        return rockets.filter(({ rocket_name }) =>
          rocket_name.toLowerCase().includes(filterTerm.toLowerCase())
        );
      }
      return rockets;
    },
    [rockets]
  );

  const fetchRockets = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_ROCKETS_ENDPOINT);
      if (!res.ok) throw new Error(process.env.REACT_APP_FETCH_ERR_MSG);
      return await res.json();
    } catch (err) {
      console.error(`Caught error: ${err.message}`);
      return [];
    }
  };

  const getRocketData = async (id) => {
    setCurrentRocketId(id);
    if (!rocketsData.find((rocket) => rocket.rocket_id === id)) {
      setRocketsData([...rocketsData, await fetchRocket(id)]);
    }
    setListView(!listView);
  };

  const fetchRocket = async (id) => {
    const res = await fetch(`${process.env.REACT_APP_ROCKETS_ENDPOINT}${id}`);
    return await res.json();
  };

  const searchRocket = (filterTerm) => {
    setFilterTerm(filterTerm);
    debounce(() => {
      setRocketsForList(getRocketsForList(filterTerm));
    }, 300).call();
  };

  return (
    <div className="flex-wrapper">
      <header />
      <div className="container">
        {listView ? (
          <>
            <Logo />
            <SearchRocket onSearch={searchRocket} searchTerm={filterTerm} />
            {rocketsForList.length
              ? rocketsForList.map((rocket, i) => (
                  <RocketItem
                    key={i}
                    id={rocket.rocket_id}
                    name={rocket.rocket_name}
                    desc={rocket.description}
                    img={[rocket.flickr_images]}
                    status={rocket.active}
                    getRocket={getRocketData}
                  />
                ))
              : 'No rockets to show'}
          </>
        ) : (
          <RocketView
            viewList={() => {
              setListView(!listView);
            }}
            rocketData={rocketsData.find(
              ({ rocket_id }) => rocket_id === currentRocketId
            )}
          />
        )}
      </div>
      <footer />
    </div>
  );
}

export default App;
