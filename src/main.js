import React from "react";
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
import { hpe } from './theme';

const DGNav = ({ structure }) => (
  <Grommet theme={hpe}>
    <Nav>
      <Accordion>
        {structure.map(({ name, links }) => (
          <AccordionPanel
            key={name}
            label={(
              <Box pad="medium">
                <Text weight="bold" size="large">{name}</Text>
              </Box>
            )}
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

export const populate = (id, structure) => {
  ReactDOM.render(<DGNav structure={structure} />, document.getElementById(id));
};
