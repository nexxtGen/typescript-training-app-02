import React from 'react';
import { Store } from './Store';
import './index.css';
import { IAction, IEpisode } from './interfaces';

const App = (): JSX.Element => {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  });

  const fetchDataAction = async () => {
    const URL =
      'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes';
    const data = await fetch(URL);
    const dataJSON = await data.json();
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    });
  };

  const toggleFavAction = (episode: IEpisode): IAction => {
    const episodeInFav = state.favourites.includes(episode);

    let dispatchObj = {
      type: 'ADD_FAV',
      payload: episode
    };

    if (episodeInFav) {
      const favWithoutEpisode = state.favourites.filter(
        (fav: IEpisode) => fav.id !== episode.id
      );
      dispatchObj = {
        type: 'REMOVE_FAV',
        payload: favWithoutEpisode
      };
    }

    return dispatch(dispatchObj);
  };

  console.log(state);
  return (
    <React.Fragment>
      <header className='header'>
        <div>
          <h1>Rick and Morty</h1>
          <p>Pick your favourite episode!</p>
        </div>
        <div>
          Favourites:{' '}
          {state.favourites.length > 0
            ? state.favourites.map((fav: IEpisode) => {
                return (
                  <div>
                    Season: {fav.season} Number: {fav.number}
                  </div>
                );
              })
            : '0'}
        </div>
      </header>
      <section className='episode-layout'>
        {state.episodes.map((item: IEpisode) => {
          return (
            <section key={item.id} className='episode-box'>
              {item.image && (
                <img
                  src={item.image.medium}
                  alt={`Rick and Mort ${item.name}`}
                />
              )}

              <div>{item.name}</div>
              <section>
                <div>
                  Season: {item.season} Number: {item.number}
                </div>
                <button type='button' onClick={() => toggleFavAction(item)}>
                  {state.favourites.find((fav: IEpisode) => fav.id === item.id)
                    ? 'Unfav'
                    : 'Fav'}
                </button>
              </section>
            </section>
          );
        })}
      </section>
    </React.Fragment>
  );
};

export default App;
