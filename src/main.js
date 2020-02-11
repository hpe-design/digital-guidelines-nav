import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  Accordion,
  AccordionPanel,
  Box,
  Button,
  Grommet,
  Nav,
  Text
} from "grommet";
import { hpe } from "./theme";

const activeKey = "active";

const DGNav = ({ structure }) => {
  const [active, setActive] = useState();
  useEffect(() => {
    if (localStorage) {
      const json = localStorage.getItem(activeKey);
      if (json) {
        setActive(JSON.parse(json));
      }
    }
  }, []);
  useEffect(() => {
    if (localStorage) {
      if (active !== undefined) {
        localStorage.setItem(activeKey, JSON.stringify(active));
      } else {
        localStorage.removeItem(activeKey);
      }
    }
  }, [active]);

  return (
    <Grommet theme={hpe}>
      <Nav>
        <Accordion
          activeIndex={active}
          onActive={([nextActive]) => setActive(nextActive)}
        >
          {structure.map(({ name, links }) => (
            <AccordionPanel
              key={name}
              label={
                <Box pad="medium">
                  <Text weight="bold" size="large">
                    {name}
                  </Text>
                </Box>
              }
            >
              {links.map(({ label, href }) => (
                <Button key={label} href={href} hoverIndicator>
                  <Box pad={{ horizontal: "medium", vertical: "small" }}>
                    <Text>{label}</Text>
                  </Box>
                </Button>
              ))}
            </AccordionPanel>
          ))}
        </Accordion>
      </Nav>
    </Grommet>
  );
};

export const populate = (id, structure) => {
  ReactDOM.render(<DGNav structure={structure} />, document.getElementById(id));
};
