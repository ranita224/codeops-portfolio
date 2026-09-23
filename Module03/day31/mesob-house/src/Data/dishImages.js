const COMMONS = "https://commons.wikimedia.org/wiki/Special:FilePath/";

const dishImages = {
  "doro-wat": `${COMMONS}Injera and doro wat.jpg`,  
  "siga-wat": `${COMMONS}Ethiopian wat.jpg`,
  "beg-alicha-wat": `${COMMONS}KIK ALICHA, MISIR, GOMEN and TIKIL GOMEN.jpg`,

  "shiro-tegamino": `${COMMONS}Ethiopian Shiro (11354785095).jpg`,
  "shiro-bozena": `${COMMONS}Shiro wet.jpg`,

  "siga-derek-tibs": `${COMMONS}Siga Tibs.jpg`,
  "awaze-lamb-tibs": `${COMMONS}Shekla tibs.jpg`,
  "quanta-firfir": `${COMMONS}Ethiopia- Tibs Fitfit.jpg`,
  "chornake-fish-tibs": `${COMMONS}Raw fish with spicy sauce and bread.jpg`,

  "prime-beef-kitfo": `${COMMONS}Kitfo Ethiopian Food.JPG`,
  "gored-gored": `${COMMONS}Gored gored plate, July 2019.jpg`,
 "kitfo-dulet": `${COMMONS}Kitfo, Ayib and Injera.jpg`,

  "full-vegan-beyaynetu": `${COMMONS}Beyaynetu ethiopian food.jpg`,
  "misir-wat": `${COMMONS}KIK ALICHA, MISIR, GOMEN and TIKIL GOMEN.jpg`,
  "kik-alicha-wat": `${COMMONS}KIK ALICHA, MISIR, GOMEN and TIKIL GOMEN.jpg`,
  "gomen-collards": `${COMMONS}Ayib and gomen.jpg`,
  "fresh-timatim-fitfit": `${COMMONS}Ethiopia- Tibs Fitfit.jpg`,

  "house-tej-carafe": `${COMMONS}Tej (Ethiopian honey wine) (27241999346).jpg`,
"jebena-spiced-coffee": `${COMMONS}Coffee ceremony of Ethiopia and Eritrea 1.jpg`,
  "spiced-habesha-chai": `${COMMONS}Tosigntea.jpg`,
};

const FALLBACK = `${COMMONS}Ethiopian wat.jpg`;

export function getDishImage(slug) {
  return dishImages[slug] || FALLBACK;
}

export default dishImages;