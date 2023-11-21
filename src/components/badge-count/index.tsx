import { Flex, FlexProps } from "@chakra-ui/react";

type BadgeCountProps = {
  badgeCount: number;
  isActive: boolean;
} & FlexProps;

export const BadgeCount = ({
  badgeCount,
  isActive,
  ...rest
}: BadgeCountProps) => {
  return (
    <Flex
      alignItems={"center"}
      background={isActive ? "#0875e1" : "#e4e4e4"}
      borderRadius='50%'
      color={isActive ? "#fff" : "#6c6969"}
      justifyContent={"center"}
      marginLeft='8px'
      {...rest}
    >
      {badgeCount}
    </Flex>
  );
};

export default BadgeCount;
