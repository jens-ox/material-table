import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';

import MaterialTable from '../index'

export default {
  title: 'Example/Page',
  component: MaterialTable,
} as Meta;

const Template: Story<any> = (args) => <MaterialTable {...args} />;

export const Example = Template.bind({});
Example.args = {
  title: 'One Detail Panel Preview',
  columns: [
    { title: 'Name', field: 'name' },
    { title: 'Surname', field: 'surname' },
    { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    {
      title: 'Birth Place',
      field: 'birthCity',
      lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
    },
  ],
  data: [
    { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
  ],
  detailPanel: (rowData) => (
      <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/C0DPdy98e4c"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      />
    )
};