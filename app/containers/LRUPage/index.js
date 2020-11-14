/*
 * LRUPage
 *
 * List all the LRUs
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import messages from './messages';

export default function LRUPage() {
  return (
    <div>
      <Helmet>
        <title>LRU</title>
        <meta
          name="description"
          content="LRU page of React.js Boilerplate application"
        />
      </Helmet>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
    </div>
  );
}
