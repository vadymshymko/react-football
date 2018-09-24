import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { stringify } from 'query-string';

import { getFormattedDate } from 'utils';

import AppPage from 'components/AppPage';
import AppPageHeader from 'components/AppPageHeader';
import AppPageTitle from 'components/AppPageTitle';
import AppPageContent from 'components/AppPageContent';
import MatchCenterCompetition from 'components/MatchCenterCompetition';
import Alert from 'components/Alert';
import Dropdown from 'components/Dropdown';
import DateInput from 'components/DateInput';

import './MatchCenterPage.scss';

export default class MatchCenterPage extends Component {
  static propTypes = {
    competitionId: PropTypes.number,
    date: PropTypes.string,
    fixtures: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFixturesFetching: PropTypes.bool.isRequired,
    isFixturesInitialized: PropTypes.bool.isRequired,
    competitions: PropTypes.arrayOf(PropTypes.object).isRequired,
    historyPush: PropTypes.func.isRequired,
  }

  static defaultProps = {
    competitionId: null,
    date: null,
  }

  getFixturesGroupedByCompetitionId = (fixtures = []) => (
    fixtures.reduce((result, {
      competition: {
        id: competitionId,
        name: competitionName,
      },
      ...item
    }) => ({
      ...result,
      [competitionId]: {
        id: competitionId,
        name: competitionName,
        fixtures: [
          ...((result[competitionId] || {}).fixtures || []),
          {
            competition: {
              id: competitionId,
              name: competitionName,
            },
            ...item,
          },
        ],
      },
    }), {})
  )

  getCompetitionFixtures = competitionId => (
    this.props.fixtures.filter(fixture => (
      fixture.competition.id === competitionId
    ))
  )

  handleCompetitionFilterChange = (event) => {
    const {
      value,
    } = event.target;

    const { date } = this.props;

    this.props.historyPush({
      search: stringify({
        date: !date || date === getFormattedDate()
          ? undefined
          : date,
        competitionId: value || undefined,
      }),
    });
  }

  handleDateFilterChange = (event) => {
    const {
      value,
    } = event.target;

    const { competitionId } = this.props;

    this.props.historyPush({
      search: stringify({
        competitionId: competitionId || undefined,
        date: value === getFormattedDate()
          ? undefined
          : value,
      }),
    });
  }

  render() {
    const {
      competitions,
      competitionId,
      date,
      fixtures,
      isFixturesFetching,
      isFixturesInitialized,
    } = this.props;

    const fixturesGroupedByCompetitionId = this.getFixturesGroupedByCompetitionId(fixtures);

    const showEmptyMessage = (
      isFixturesInitialized
      && !isFixturesFetching
      && fixtures.length === 0
    );

    return (
      <AppPage
        title="Match Center"
        description="Live fixtures across all competitions && dates - Goal Magazine"
        className="MatchCenterPage"
      >
        <AppPageHeader className="MatchCenterPage__header">
          <AppPageTitle className="MatchCenterPage__title">
            Match Center
          </AppPageTitle>

          <div className="MatchCenterPage__fixturesFilters">
            <Dropdown
              fieldId="MatchCenterPageCompetitionFilter"
              label="Competition:"
              className="MatchCenterPage__fixturesFilter"
              value={competitionId || ''}
              options={[
                {
                  label: 'All',
                  value: '',
                },
                ...competitions.map(competition => ({
                  value: competition.id,
                  label: competition.name,
                })),
              ]}
              onChange={this.handleCompetitionFilterChange}
            />

            <DateInput
              fieldId="MatchCenterPageFixturesDateFilter"
              label="Date:"
              className="MatchCenterPage__fixturesFilter"
              value={getFormattedDate(date)}
              onChange={this.handleDateFilterChange}
            />
          </div>
        </AppPageHeader>

        <AppPageContent>
          <ul className="MatchCenterPage__competitionsList">
            {Object.keys(fixturesGroupedByCompetitionId).map(id => (
              <li
                className="MatchCenterPage__competitionsItem"
                key={id}
              >
                <MatchCenterCompetition
                  id={id}
                  name={fixturesGroupedByCompetitionId[id].name}
                  fixtures={fixturesGroupedByCompetitionId[id].fixtures}
                />
              </li>
            ))}
          </ul>

          {showEmptyMessage && (
            <Alert>:( There are no games by selected date</Alert>
          )}
        </AppPageContent>
      </AppPage>
    );
  }
}
