import { type ReactNode } from "react";
import { AppShell, getBreakpointValue, useMantineTheme } from "@mantine/core";
import Header from "./Header";
import NavBar from "./NavBar";

import { useState, useEffect } from "react";
import { useViewportSize } from "@mantine/hooks";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [isNavBarOpened, setIsNavBarOpened] = useState<boolean>(false);
  const [isNavBarMinimized, setIsNavBarMinimized] = useState<boolean>(false);

  const { breakpoints } = useMantineTheme();
  const { width } = useViewportSize();
  useEffect(() => {
    if (isNavBarOpened && width > getBreakpointValue(breakpoints.sm)) {
      setIsNavBarOpened(false);
    }
  }, [isNavBarOpened, width, breakpoints]);

  return (
    <AppShell
      padding="xs"
      layout="alt"
      fixed
      navbarOffsetBreakpoint="sm" // requires fixed?? // https://mantine.dev/core/app-shell/?t=props
      header={
        <Header
          isNavBarOpened={isNavBarOpened}
          setIsNavBarOpened={setIsNavBarOpened}
          setIsNavBarMinimized={setIsNavBarMinimized}
        />
      }
      navbar={
        <NavBar
          isNavBarMinimized={isNavBarMinimized}
          isNavBarOpened={isNavBarOpened}
          setIsNavBarOpened={setIsNavBarOpened}
        />
      }

      //   styles={(theme) => ({
      //     main: {
      //       backgroundColor:
      //         theme.colorScheme === DARK
      //           ? theme.colors.dark[8]
      //           : theme.colors.gray[0],
      //     },
      //   })}
    >
      {children}
    </AppShell>
  );
};

export default MainLayout;
