import { Flex, FlexProps } from "@chakra-ui/react";

type BadgeCountProps = {
  badgeCount: number;
  isActive: boolean;
} & FlexProps;

export const BadgeCount = (props: BadgeCountProps) => {
  const {
    badgeCount,
    isActive,
    ...propsRest
  } = props;

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      background={isActive ? "#0875e1" : "#e4e4e4"}
      color={isActive ? "#fff" : "#6c6969"}
      borderRadius='50%'
      flexShrink={0}
      width='24px'
      height='24px'
      // marginLeft='8px'
      {...propsRest}
    >
      {badgeCount}
    </Flex>
  );
};

export default BadgeCount;


