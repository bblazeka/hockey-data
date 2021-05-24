var njdLogo = '/assets/logos/njd.webp';
var nyiLogo = '/assets/logos/nyi.webp';
var nyrLogo = '/assets/logos/nyr.webp';
var phiLogo = '/assets/logos/phi.webp';
var pitLogo = '/assets/logos/pit.webp';
var bosLogo = '/assets/logos/bos.webp';
var bufLogo = '/assets/logos/buf.webp';
var mtlLogo = '/assets/logos/mtl.webp';
var ottLogo = '/assets/logos/ott.webp';
var torLogo = '/assets/logos/tor.webp';
var carLogo = '/assets/logos/car.webp';
var flaLogo = '/assets/logos/fla.webp';
var tblLogo = '/assets/logos/tbl.webp';
var wshLogo = '/assets/logos/wsh.webp';
var chiLogo = '/assets/logos/chi.webp';
var detLogo = '/assets/logos/det.webp';
var nshLogo = '/assets/logos/nsh.webp';
var stlLogo = '/assets/logos/stl.webp';
var cgyLogo = '/assets/logos/cgy.webp';
var colLogo = '/assets/logos/col.webp';
var edmLogo = '/assets/logos/edm.webp';
var vanLogo = '/assets/logos/van.webp';
var anaLogo = '/assets/logos/ana.webp';
var dalLogo = '/assets/logos/dal.webp';
var lakLogo = '/assets/logos/lak.webp';
var sjsLogo = '/assets/logos/sjs.webp';
var cbjLogo = '/assets/logos/cbj.webp';
var minLogo = '/assets/logos/min.webp';
var wpgLogo = '/assets/logos/wpg.webp';
var ariLogo = '/assets/logos/ari.webp';
var vgkLogo = '/assets/logos/vgk.webp';
var seaLogo = '/assets/logos/sea.webp';

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