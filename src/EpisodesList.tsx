import React from 'react';
import { IEpisode, IAction } from './interfaces';

const EpisodesList = (props: any): Array<JSX.Element> => {
  const { episodes, toggleFavAction, favourites, store } = props;
  const { state, dispatch } = store;

  return episodes.map((item: IEpisode) => {
    return (
      <section key={item.id} className='episode-box'>
        {item.image && (
          <img src={item.image.medium} alt={`Rick and Mort ${item.name}`} />
        )}

        <div>{item.name}</div>
        <section style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            Season: {item.season} Number: {item.number}
          </div>
          <button
            type='button'
            onClick={() => toggleFavAction(state, dispatch, item)}
          >
            {favourites.find((fav: IEpisode) => fav.id === item.id)
              ? 'Unfav'
              : 'Fav'}
          </button>
        </section>
      </section>
    );
  });
};

export default EpisodesList;
