import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Dropdown, Menu } from "semantic-ui-react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";

import { getDivisionsWithTeams } from "services/querySchemas/league";
import { SmallLogo } from "components/collection";
import { Loader } from "components";

import routes from "./routes";
import { getLogo } from "./util/assets";

const AppLink = styled(NavLink)`
color: #61dafb;
display: inline-block;
margin: 1px;
`;

function AppHeader({ setActiveRoute }) {
  const [activeItem, setActiveItem] = useState("home");
  const { loading, data } = useQuery(getDivisionsWithTeams);

  function handleItemClick(e, { name }) {
    setActiveItem(name);
    setActiveRoute(name);
  }

  const headerButtons = [
    "home",
    "analysis",
    "games",
    "schedule",
    "players",
  ];

  if (loading) {
    return <Loader />;
  }
  const { divisionsWithTeams } = data;

  return (
    <header>
          <Menu inverted stackable>
            {headerButtons.map((button) => {
              return (
                <Menu.Item
                  key={button}
                  name={button}
                  active={activeItem === button}
                  onClick={handleItemClick}
                />
              );
            })}
            ;
            <Dropdown pointing text="Teams" className="link item">
              <Dropdown.Menu>
                {divisionsWithTeams &&
                  divisionsWithTeams.map((division) => {
                    return [
                      <Dropdown.Header
                        key={`divheader${division.id}`}
                      >
                        {division.name}
                      </Dropdown.Header>,
                      <Dropdown.Item key={`divitems${division.id}`}>
                        {division.teams.map((team) => {
                          return (
                            <AppLink
                              to={`${routes.teams}/${team.id}`}
                              key={`link${team.id}`}
                            >
                              <SmallLogo
                                src={getLogo(team.id)}
                                alt={`img${team.id}`}
                              />
                            </AppLink>
                          );
                        })}
                      </Dropdown.Item>,
                    ];
                  })}
              </Dropdown.Menu>
            </Dropdown>
          </Menu>
        </header>
  );
}

export default AppHeader;
