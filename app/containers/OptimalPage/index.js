/*
 * OptimalPage
 *
 * List all the Optimals
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import messages from './messages';

export default function OptimalPage() {
  return (
    <div>
      <Helmet>
        <title>Optimal Page</title>
        <meta
          name="description"
          content="Optimal page of React.js Boilerplate application"
        />
      </Helmet>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
    </div>
  );
}
