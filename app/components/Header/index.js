import React from 'react';
import { FormattedMessage } from 'react-intl';

import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import messages from './messages';

function Header() {
  return (
    <div>
      <NavBar>
        <HeaderLink to="/">
          <FormattedMessage {...messages.home} />
        </HeaderLink>
        <HeaderLink to="/fifo">
          <FormattedMessage {...messages.fifo} />
        </HeaderLink>
        <HeaderLink to="/optimal">
          <FormattedMessage {...messages.optimal} />
        </HeaderLink>
        <HeaderLink to="/lru">
          <FormattedMessage {...messages.lru} />
        </HeaderLink>
      </NavBar>
    </div>
  );
}

export default Header;
