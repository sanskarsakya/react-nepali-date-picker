import { ChakraProvider } from "@chakra-ui/react";
import type { Meta } from "@storybook/react";
import { FormErrorLable } from ".";

const Story: Meta<typeof FormErrorLable> = {
  title: "V2/Forms/Form Error Lable",
  component: args => (
    <ChakraProvider>
      <FormErrorLable {...args} />
    </ChakraProvider>
  ),
};
export default Story;

export const Default = {
  args: {
    message: "",
  },
};
