import { Search } from "semantic-ui-react";
import styled from "styled-components";

export const LogoStyled = styled.img`
  max-height: 50px;
  max-width: 50px;
`;

export const PlayerSearchBox = styled(Search)`
  .input {
    width: 203px;
    height: 40px;
    border-color: transparent;
  }

  & > .ui.icon.input > i.icon {
    right: 15px;
  }

  .search-icon {
    position: absolute;
  }

  .loading::after {
    display: none;
  }
`;
