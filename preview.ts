import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from '@storybook/react';

// import docsPage from './customComponents/docsPage';

const preview: Preview = {
  argTypes: {
    dataCy: { table: { disable: true } },
  },
  parameters: {
    layout: 'padded',
    interactions: { panel: true },
    actions: {
      argTypesRegex: '^on.*',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // docs: {
    //   page: docsPage,
    //   source: {
    //     type: 'code',
    //   },
    // },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
    status: {
      statuses: {
        broken: {
          background: '#ff0000',
          color: 'white',
          description: 'This component is broken',
        },
        construction: {
          background: '#ffff00',
          color: 'black',
          description: 'This component is under development',
        },
        review: {
          background: '#ffa500',
          color: 'black',
          description: 'This component is ready for review',
        },
        stable: {
          background: '#28A745',
          color: 'white',
          description: 'This component is stable but it hasn\'t been released yet',
        },
        released: {
          background: '#0000ff',
          color: 'white',
          description: 'This component is stable and released',
        },
      },
    },
  },
};

export default preview;
