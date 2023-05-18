import type { Dispatch, SetStateAction } from "react";

import {
  Navbar as NavbarLayout,
  Burger,
  MediaQuery,
  UnstyledButton,
  Text,
  Group,
  Space,
  Stack,
  Center,
  Container,
  ThemeIcon,
  ActionIcon,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { HEIGHT_HEADER } from "./Header";
import Wave1 from "../icons/Wave1";
import SunOutline from "../icons/SunOutline";
import MoonOutline from "../icons/MoonOutline";
import SearchOutline from "../icons/SearchOutline";
import VideocamOutline from "../icons/VideocamOutline";
import PersonOutline from "../icons/PersonOutline";

import { useRouter } from "next/router";
import { useTheme, DARK } from "~/contexts/Theme";

import {
  ROUTE_HOME,
  ROUTE_EXPLORE,
  ROUTE_STUDIO,
  ROUTE_PROFILE,
} from "~/constants/common";

export const WIDTH_NAV_BAR_FULL = 220;
export const WIDTH_NAV_BAR_MINI = 50;

const NavBar = ({
  isNavBarMinimized,
  isNavBarOpened,
  setIsNavBarOpened,
}: {
  isNavBarMinimized: boolean;
  isNavBarOpened: boolean;
  setIsNavBarOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  const { push: navigateTo } = useRouter();
  const { colors } = useMantineTheme();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { toggleColorScheme } = useMantineColorScheme();
  const { isDark } = useTheme();

  const routes = [
    // { icon: <SearchOutline />, path: ROUTE_EXPLORE, name: "Explore" },
    { icon: <VideocamOutline />, path: ROUTE_STUDIO, name: "Go Live" },
    { icon: <PersonOutline />, path: ROUTE_PROFILE, name: "Profile" },
  ];

  return (
    <NavbarLayout
      hidden={!isNavBarOpened}
      hiddenBreakpoint="sm"
      width={{
        sm: isNavBarMinimized ? WIDTH_NAV_BAR_MINI : WIDTH_NAV_BAR_FULL,
      }}
      p="xs"
      sx={(theme) => ({
        borderColor:
          theme.colorScheme === DARK
            ? theme.colors.gray[8]
            : theme.colors.gray[5], //colors.gray[0],
      })}
    >
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Burger
          opened={isNavBarOpened}
          onClick={() => setIsNavBarOpened((prev) => !prev)}
          size="sm"
        />
      </MediaQuery>
      <Stack align="center" justify="space-between" sx={{ height: "100%" }}>
        <Container p={0} sx={{ width: "100%" }}>
          <Center
            sx={(theme) => ({
              height: `calc(${HEIGHT_HEADER}px - (${theme.spacing.xs} * 2))`,
              // backgroundColor: "#fff",
            })}
          >
            <ActionIcon
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => {
                await navigateTo(ROUTE_HOME);
              }}
              sx={{ width: "100%" }}
            >
              <Wave1
                width={isNavBarMinimized ? 35 : 70}
                color={colors.cyan[5]}
              />
            </ActionIcon>
          </Center>
          <Space h="xl" />
          <Space h="xs" />
          <Stack align="stretch" justify="flex-start" spacing="xs">
            {routes.map((v) => (
              <UnstyledButton
                key={v.path}
                onClick={async () => {
                  await navigateTo(v.path);
                }}
                sx={(theme) => ({
                  display: "block",
                  width: "100%",
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.xs,
                  color:
                    theme.colorScheme === DARK
                      ? theme.colors.dark[0]
                      : theme.colors.dark[4],

                  "&:hover": {
                    backgroundColor:
                      theme.colorScheme === DARK
                        ? theme.colors.dark[4]
                        : theme.colors.gray[3],
                  },
                })}
              >
                <Group position={isNavBarMinimized ? "center" : "left"}>
                  <ThemeIcon variant="subtle">{v.icon}</ThemeIcon>
                  {!isNavBarMinimized && <Text>{v.name}</Text>}
                </Group>
              </UnstyledButton>
            ))}
          </Stack>
        </Container>
        <ActionIcon onClick={() => toggleColorScheme()}>
          {isDark ? <MoonOutline /> : <SunOutline />}
        </ActionIcon>
      </Stack>
    </NavbarLayout>
  );
};

export default NavBar;
