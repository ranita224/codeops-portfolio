import begAlichaImg from "../assets/dishes/beg-alicha-wat.png";
import chornakeFishTibsImg from "../assets/dishes/chornake-fish-tibs.png";
import doroWatImg from "../assets/dishes/doro-wat.png";
import freshTimatimFitfitImg from "../assets/dishes/fresh-timatim-fitfit.png";
import kitfoDuletImg from "../assets/dishes/kitfo-dulet.png";
import misirWatImg from "../assets/dishes/misir-wat.png";
import quantaFirfirImg from "../assets/dishes/quanta-firfir.png";
import shiroTegaminoImg from "../assets/dishes/shiro-tegamino.png";

const COMMONS = "https://commons.wikimedia.org/wiki/Special:FilePath/";

const dishImages = {
  "doro-wat": doroWatImg,
  "siga-wat": `${COMMONS}Ethiopian wat.jpg`,
  "beg-alicha-wat": begAlichaImg,

  "shiro-tegamino": shiroTegaminoImg,
  "shiro-bozena": `${COMMONS}Shiro wet.jpg`,

  "siga-derek-tibs": `${COMMONS}Siga Tibs.jpg`,
  "awaze-lamb-tibs": `${COMMONS}Shekla tibs.jpg`,
  "quanta-firfir": quantaFirfirImg,
  "chornake-fish-tibs": chornakeFishTibsImg,

  "prime-beef-kitfo": `${COMMONS}Kitfo Ethiopian Food.JPG`,
  "gored-gored": `${COMMONS}Gored gored plate, July 2019.jpg`,
  "kitfo-dulet": kitfoDuletImg,

  "full-vegan-beyaynetu": `${COMMONS}Beyaynetu ethiopian food.jpg`,
  "misir-wat": misirWatImg,
  "kik-alicha-wat": `${COMMONS}KIK ALICHA, MISIR, GOMEN and TIKIL GOMEN.jpg`,
  "gomen-collards": `${COMMONS}Ayib and gomen.jpg`,
  "fresh-timatim-fitfit": freshTimatimFitfitImg,

  "house-tej-carafe": `${COMMONS}Tej (Ethiopian honey wine) (27241999346).jpg`,
  "jebena-spiced-coffee": `${COMMONS}Coffee ceremony of Ethiopia and Eritrea 1.jpg`,
  "spiced-habesha-chai": `${COMMONS}Tosigntea.jpg`,
};

const FALLBACK = `${COMMONS}Ethiopian wat.jpg`;

export function getDishImage(slug) {
  return dishImages[slug] || FALLBACK;
}

export default dishImages;