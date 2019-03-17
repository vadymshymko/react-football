import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import AppTitle from 'components/AppTitle';
import AppMenu from 'components/AppMenu';

import styles from './AppHeader.scss';

class AppHeader extends Component {
  state = {
    showMenu: false,
  }

  openMenu = () => {
    this.setState(() => ({
      showMenu: true,
    }));
  }

  closeMenu = () => {
    this.setState(() => ({
      showMenu: false,
    }));
  }

  render() {
    const { showMenu } = this.state;

    return (
      <header className={styles.AppHeader}>
        <div className={styles.AppHeader__inner}>
          <AppTitle />

          <button
            className={styles.AppHeader__showNavBtn}
            type="button"
            title="Show Navigation"
            onClick={this.openMenu}
            aria-label="Show Navigation"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              className={styles.AppHeader__showNavIcon}
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <AppMenu isVisible={showMenu} onRequestHide={this.closeMenu} />
        </div>
      </header>
    );
  }
}

export default withStyles(styles)(AppHeader);
