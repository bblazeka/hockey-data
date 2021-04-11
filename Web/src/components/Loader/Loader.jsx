import React from 'react';
import { Dimmer, Loader as SemanticLoader } from 'semantic-ui-react';

import './Loader.scss';

function Loader(props) {
    return (
      <Dimmer active inverted>
        <SemanticLoader>{props.text ? props.text : 'Loading...'}</SemanticLoader>
      </Dimmer>
    );
}

export default Loader;