import njdLogo from '../assets/logos/njd.webp';
import nyiLogo from '../assets/logos/nyi.webp';
import nyrLogo from '../assets/logos/nyr.webp';
import phiLogo from '../assets/logos/phi.webp';
import pitLogo from '../assets/logos/pit.webp';
import bosLogo from '../assets/logos/bos.webp';
import bufLogo from '../assets/logos/buf.webp';
import mtlLogo from '../assets/logos/mtl.webp';
import ottLogo from '../assets/logos/ott.webp';
import torLogo from '../assets/logos/tor.webp';
import carLogo from '../assets/logos/car.webp';
import flaLogo from '../assets/logos/fla.webp';
import tblLogo from '../assets/logos/tbl.webp';
import wshLogo from '../assets/logos/wsh.webp';
import chiLogo from '../assets/logos/chi.webp';
import detLogo from '../assets/logos/det.webp';
import nshLogo from '../assets/logos/nsh.webp';
import stlLogo from '../assets/logos/stl.webp';
import cgyLogo from '../assets/logos/cgy.webp';
import colLogo from '../assets/logos/col.webp';
import edmLogo from '../assets/logos/edm.webp';
import vanLogo from '../assets/logos/van.webp';
import anaLogo from '../assets/logos/ana.webp';
import dalLogo from '../assets/logos/dal.webp';
import lakLogo from '../assets/logos/lak.webp';
import sjsLogo from '../assets/logos/sjs.webp';
import cbjLogo from '../assets/logos/cbj.webp';
import minLogo from '../assets/logos/min.webp';
import wpgLogo from '../assets/logos/wpg.webp';
import ariLogo from '../assets/logos/ari.webp';
import vgkLogo from '../assets/logos/vgk.webp';
import seaLogo from '../assets/logos/sea.webp';

function getLogo(teamId) {
  switch (teamId) {
    case 1:
      return njdLogo;
    case 2:
      return nyiLogo;
    case 3:
      return nyrLogo;
    case 4:
      return phiLogo;
    case 5:
      return pitLogo;
    case 6:
      return bosLogo;
    case 7:
      return bufLogo;
    case 8:
      return mtlLogo;
    case 9:
      return ottLogo;
    case 10:
      return torLogo;
    case 12:
      return carLogo;
    case 13:
      return flaLogo;
    case 14:
      return tblLogo;
    case 15:
      return wshLogo;
    case 16:
      return chiLogo;
    case 17:
      return detLogo;
    case 18:
      return nshLogo;
    case 19:
      return stlLogo;
    case 20:
      return cgyLogo;
    case 21:
      return colLogo;
    case 22:
      return edmLogo;
    case 23:
      return vanLogo;
    case 24:
      return anaLogo;
    case 25:
      return dalLogo;
    case 26:
      return lakLogo;
    case 28:
      return sjsLogo;
    case 29:
      return cbjLogo;
    case 30:
      return minLogo;
    case 52:
      return wpgLogo;
    case 53:
      return ariLogo;
    case 54:
      return vgkLogo;
    case 55:
      return seaLogo;
    default:
      return null;
  }
}

export { getLogo };