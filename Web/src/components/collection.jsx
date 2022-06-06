import { Image, Search } from "semantic-ui-react";
import styled from "styled-components";

export const TinyLogo = styled.img`
  max-height: 20px;
  max-width: 20px;
`;

export const SmallLogo = styled.img`
  max-height: 30px;
  max-width: 30px;
`;

export const MidLogo = styled.img`
max-height: 60px;
max-width: 60px;
`;

export const MidLogoImage = styled(Image)`
max-height: 60px;
max-width: 60px;
`;

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
