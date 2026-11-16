/**
 * Stock photos from Unsplash (free to use under the Unsplash License), keyed
 * by the content pack row they illustrate.
 *
 * The content pack has no photo URLs because image rights for the real
 * listings are not cleared, so these are illustrations only: none of them
 * shows the actual stay, experience or restaurant on the card.
 */
export type StockPhoto = {
  src: string;
  alt: string;
  /** CSS object-position that keeps the subject in frame when cropped. */
  position: string;
  credit: string;
  sourceUrl: string;
};

export const stockPhotos: Record<string, StockPhoto> = {
  S1: {
    src: "/images/stay-townhouse.jpg",
    alt: "Stock photo of a traditional Japanese townhouse front with a wooden lattice door and a bicycle outside.",
    position: "50% 68%",
    credit: "Jazmin Wong on Unsplash",
    sourceUrl: "https://unsplash.com/photos/a-japanese-style-house-with-a-bicycle-KZTXVSZtUeA",
  },
  S2: {
    src: "/images/stay-tatami-room.jpg",
    alt: "Stock photo of a traditional Japanese room with tatami mats, shoji screens and a garden view.",
    position: "50% 62%",
    credit: "Yosuke Ota on Unsplash",
    sourceUrl:
      "https://unsplash.com/photos/traditional-japanese-room-with-shoji-screens-and-tatami-mats-TeNtfZuCWe8",
  },
  S3: {
    src: "/images/stay-flat.jpg",
    alt: "Stock photo of a bright, minimal flat with a round dining table and wooden stools.",
    position: "35% 62%",
    credit: "rawkkim on Unsplash",
    sourceUrl: "https://unsplash.com/photos/modern-minimalist-living-room-with-white-furniture-4r9OKorlcTk",
  },
  E1: {
    src: "/images/experience-tea.jpg",
    alt: "Stock photo of hands whisking matcha in a ceramic bowl.",
    position: "62% 55%",
    credit: "Huy Phan on Unsplash",
    sourceUrl: "https://unsplash.com/photos/person-whisking-matcha-tea-in-a-ceramic-bowl-Ku-huM0VCak",
  },
  E2: {
    src: "/images/experience-market.jpg",
    alt: "Stock photo of a covered market arcade in Kyoto with a coloured glass roof and hanging shop signs.",
    position: "50% 35%",
    credit: "Kate Wells on Unsplash",
    sourceUrl: "https://unsplash.com/photos/colorful-arched-ceiling-over-a-busy-street-market-XbANuhsisuk",
  },
  E4: {
    src: "/images/experience-pottery.jpg",
    alt: "Stock photo of hands shaping a clay bowl on a pottery wheel.",
    position: "50% 60%",
    credit: "Sebastian Monroy on Unsplash",
    sourceUrl: "https://unsplash.com/photos/hands-shaping-clay-bowl-on-wheel-KyECjOpLEZ4",
  },
  F1: {
    src: "/images/food-ramen.jpg",
    alt: "Stock photo of a bowl of ramen with pork, egg and spring onions.",
    position: "62% 62%",
    credit: "Stanley Kustamin on Unsplash",
    sourceUrl: "https://unsplash.com/photos/a-bowl-of-ramen-with-pork-egg-and-green-onions-uCAJBSZqPG4",
  },
  F2: {
    src: "/images/food-tofu.jpg",
    alt: "Stock photo of a block of tofu topped with sliced spring onions in a bowl.",
    position: "62% 50%",
    credit: "leongsan on Unsplash",
    sourceUrl: "https://unsplash.com/photos/a-block-of-tofu-topped-with-sliced-green-onions-nYfkdPFWxtg",
  },
  F3: {
    src: "/images/food-skewers.jpg",
    alt: "Stock photo of meat skewers grilling over charcoal at a food stall.",
    position: "55% 84%",
    credit: "Pratiksha Singh on Unsplash",
    sourceUrl: "https://unsplash.com/photos/meat-skewers-grilling-with-steam-rising-0Vcxz3-Ncl8",
  },
};
