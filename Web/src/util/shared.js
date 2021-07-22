import { scaleOrdinal } from 'd3-scale';
import { schemeBlues, schemeGreens, schemeGreys, schemeOranges, schemeReds } from 'd3-scale-chromatic';

const blueScheme = scaleOrdinal(schemeBlues[9]).range().reverse();
const greenScheme = scaleOrdinal(schemeGreens[9]).range().reverse();
const redScheme = scaleOrdinal(schemeReds[9]).range().reverse();
const orangeScheme = scaleOrdinal(schemeOranges[9]).range().reverse();
const greyScheme = scaleOrdinal(schemeGreys[9]).range().reverse();

export function getColorScheme(activeScheme) {
  switch (activeScheme)
  {
    case 'blue': return blueScheme;
    case 'green': return greenScheme;
    case 'red': return redScheme;
    case 'orange': return orangeScheme;
    default: return greyScheme;
  }
}