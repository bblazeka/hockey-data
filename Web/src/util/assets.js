const njdLogo = "/assets/logos/njd.webp";
const nyiLogo = "/assets/logos/nyi.webp";
const nyrLogo = "/assets/logos/nyr.webp";
const phiLogo = "/assets/logos/phi.webp";
const pitLogo = "/assets/logos/pit.webp";
const bosLogo = "/assets/logos/bos.webp";
const bufLogo = "/assets/logos/buf.webp";
const mtlLogo = "/assets/logos/mtl.webp";
const ottLogo = "/assets/logos/ott.webp";
const torLogo = "/assets/logos/tor.webp";
const carLogo = "/assets/logos/car.webp";
const flaLogo = "/assets/logos/fla.webp";
const tblLogo = "/assets/logos/tbl.webp";
const wshLogo = "/assets/logos/wsh.webp";
const chiLogo = "/assets/logos/chi.webp";
const detLogo = "/assets/logos/det.webp";
const nshLogo = "/assets/logos/nsh.webp";
const stlLogo = "/assets/logos/stl.webp";
const cgyLogo = "/assets/logos/cgy.webp";
const colLogo = "/assets/logos/col.webp";
const edmLogo = "/assets/logos/edm.webp";
const vanLogo = "/assets/logos/van.webp";
const anaLogo = "/assets/logos/ana.webp";
const dalLogo = "/assets/logos/dal.webp";
const lakLogo = "/assets/logos/lak.webp";
const sjsLogo = "/assets/logos/sjs.webp";
const cbjLogo = "/assets/logos/cbj.webp";
const minLogo = "/assets/logos/min.webp";
const wpgLogo = "/assets/logos/wpg.webp";
const ariLogo = "/assets/logos/ari.webp";
const vgkLogo = "/assets/logos/vgk.webp";
const seaLogo = "/assets/logos/sea.webp";
const defLogo = "/assets/logos/def.webp";

export function getLogo(teamId) {
  switch (teamId) {
    case 0:
      return defLogo;
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
