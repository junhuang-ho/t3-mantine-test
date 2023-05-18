import type { Dispatch, SetStateAction } from "react";

import {
  Header as HeaderLayout,
  Button,
  Burger,
  MediaQuery,
  Flex,
} from "@mantine/core";
export const HEIGHT_HEADER = 60;

const Header = ({
  isNavBarOpened,
  setIsNavBarOpened,
  setIsNavBarMinimized,
}: {
  isNavBarOpened: boolean;
  setIsNavBarOpened: Dispatch<SetStateAction<boolean>>;
  setIsNavBarMinimized: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <HeaderLayout withBorder={false} height={{ base: HEIGHT_HEADER }} p="xs">
      {/* withBorder={false}TODO: set back for Header */}
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        sx={{ height: "100%" }}
      >
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={false}
            onClick={() => {
              setIsNavBarMinimized((prev) => !prev);
            }}
            size="sm"
          />
        </MediaQuery>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={isNavBarOpened}
            onClick={() => {
              setIsNavBarOpened((prev) => !prev);
            }}
            size="sm"
          />
        </MediaQuery>
        <Button>Connect</Button>
      </Flex>
    </HeaderLayout>
  );
};

export default Header;
