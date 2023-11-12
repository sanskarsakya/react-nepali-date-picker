// import { ChakraProvider } from '@chakra-ui/react';
// import type { Meta } from '@storybook/react';
// import { BadgeCount } from '.';

// const meta: Meta<typeof BadgeCount> = {
//   component: BadgeCount,
//   title: 'V2/Forms/Badge Count',
// };

// export default meta;

// export const Default = {
//   args: {
//     badgeCount: 10,
//     isActive: false,
//   },

//   render: (args: any) => {
//     return (
//       <ChakraProvider>
//         <BadgeCount {...args} />
//       </ChakraProvider>
//     );
//   },
// };

import type { Meta, StoryObj } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';

import { BadgeCount } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Badge Count',
  component: BadgeCount,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
} satisfies Meta<typeof BadgeCount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    badgeCount: 10,
    isActive: false,
  },
  render: (args) => {
    return <ChakraProvider><BadgeCount {...args} /></ChakraProvider>
  }
}