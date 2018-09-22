import moment from 'moment';
import { normalize } from 'normalizr';
import { fixtures as schema } from 'schemas';
import { fixtures as types } from 'types';
import {
  getIsFixturesFetching,
  getIsFixturesInitialized,
} from 'selectors';
import { callApi } from 'utils';

export const fetchFixturesRequest = payload => ({
  type: types.FETCH_FIXTURES_REQUEST,
  payload,
});

export const fetchFixturesSuccess = payload => ({
  type: types.FETCH_FIXTURES_SUCCESS,
  payload,
});

export const fetchFixturesFailure = payload => ({
  type: types.FETCH_FIXTURES_FAILURE,
  payload,
});

export const fetchFixtures = ({
  competitionId,
  date,
} = {}) => (dispatch, getState) => {
  if (!date) {
    return Promise.reject(new Error('invalid date or competitionId'));
  }

  const state = getState();

  const id = `${competitionId || 'all'}-${date}`;

  const isFetching = getIsFixturesFetching(state, id);
  const isInitialized = getIsFixturesInitialized(state, id);

  if (isFetching || isInitialized) {
    return Promise.resolve();
  }

  const requestDate = moment(date).format('YYYY-MM-DD');
  const requestCompetitionFilter = competitionId ? `competitions/${competitionId}` : '';
  const requestPath = `${requestCompetitionFilter}/matches?dateFrom=${requestDate}&dateTo=${requestDate}`;

  dispatch(fetchFixturesRequest({
    id,
  }));

  return callApi(requestPath).then((json) => {
    const response = json.matches.map(item => ({
      ...item,
      competition: {
        ...(item.competition || {}),
        id: competitionId,
      },
    }));

    const isAllItemsFinished = response.filter(match => (
      match.status.toLowerCase() === 'finished'
    )).length === json.matches.length;

    const {
      entities: {
        fixtures: entities = {},
      },
      result: ids = [],
    } = normalize(response, schema);

    return dispatch(fetchFixturesSuccess({
      entities,
      ids,
      id,
      isInitialized: isAllItemsFinished,
    }));
  }).catch((error) => {
    dispatch(fetchFixturesFailure({
      requestPath,
    }));

    throw error;
  });
};

export default fetchFixtures;
