import { ChakraProvider } from "@chakra-ui/react";
import type { Meta } from "@storybook/react";
import { FormLabel } from ".";

const Story: Meta<typeof FormLabel> = {
  component: args => {
    return (
      <ChakraProvider>
        <FormLabel {...args} />
      </ChakraProvider>
    );
  },
  title: "V2/Forms/Form Label",
};
export default Story;

export const Default = {
  args: {
    label: "Asdf",
  },
};
