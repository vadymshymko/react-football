import { normalize } from 'normalizr';
import { teams as types } from 'types';
import { callApi } from 'utils';
import { team as schema } from 'schemas';
import { getTeam } from 'selectors';

export const fetchTeam = id => (dispatch, getState) => {
  if (!id) {
    return Promise.reject(new Error('Invalid team id'));
  }

  const state = getState();
  const team = getTeam(state, id);

  if (team.isFetching || team.isInitialized) {
    return Promise.resolve();
  }

  dispatch({
    type: types.FETCH_TEAM_REQUEST,
    payload: {
      id,
    },
  });

  return callApi(`teams/${id}`).then((json) => {
    const { entities: { teams = [] } = {}, result: teamId = id } = normalize(json, schema);

    return dispatch({
      type: types.FETCH_TEAM_SUCCESS,
      payload: teams[teamId],
    });
  }).catch(() => dispatch({
    type: types.FETCH_TEAM_FAILURE,
    payload: {
      id,
    },
  }));
};

export default fetchTeam;