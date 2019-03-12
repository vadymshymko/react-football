import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import TeamLink from 'components/TeamLink';

import styles from './FixtureTeam.scss';

const FixtureTeam = ({
  id,
  name,
  type,
  score,
  scoreStyle,
  logoUrl,
}) => (
  <span className={`${styles.FixtureTeam} ${styles[`FixtureTeam--type--${type}`]}`}>
    {type === 'away' && (
      <span
        className={styles.FixtureTeam__score}
        style={scoreStyle}
      >
        {score}
      </span>
    )}

    <TeamLink
      className={styles.FixtureTeam__link}
      id={id}
      name={name}
      logoUrl={logoUrl}
    >
      {name}
    </TeamLink>

    {type === 'home' && (
      <span
        className={styles.FixtureTeam__score}
        style={scoreStyle}
      >
        {score}
      </span>
    )}
  </span>
);

FixtureTeam.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'home',
    'away',
  ]).isRequired,
  score: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  scoreStyle: PropTypes.shape({
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
  }),
  logoUrl: PropTypes.string,
};

FixtureTeam.defaultProps = {
  score: null,
  scoreStyle: null,
  logoUrl: '',
};

export default withStyles(styles)(FixtureTeam);