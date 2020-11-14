/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  features: {
    id: `${scope}.features`,
    defaultMessage: 'Features',
  },
  fifo: {
    id: `${scope}.fifo`,
    defaultMessage: 'FIFO',
  },
  optimal: {
    id: `${scope}.optimal`,
    defaultMessage: 'Optimal',
  },
  lru: {
    id: `${scope}.lru`,
    defaultMessage: 'LRU',
  },
});
