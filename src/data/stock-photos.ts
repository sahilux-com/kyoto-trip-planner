/**
 * Stock photos from Unsplash (free to use under the Unsplash License).
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

export const stockPhotos = {
  stay: {
    src: "/images/stay-townhouse.jpg",
    alt: "Stock photo of a traditional Japanese townhouse front with a wooden lattice door and a bicycle outside.",
    position: "50% 68%",
    credit: "Jazmin Wong on Unsplash",
    sourceUrl: "https://unsplash.com/photos/a-japanese-style-house-with-a-bicycle-KZTXVSZtUeA",
  },
  experience: {
    src: "/images/experience-tea.jpg",
    alt: "Stock photo of hands whisking matcha in a ceramic bowl.",
    position: "62% 55%",
    credit: "Huy Phan on Unsplash",
    sourceUrl: "https://unsplash.com/photos/person-whisking-matcha-tea-in-a-ceramic-bowl-Ku-huM0VCak",
  },
  food: {
    src: "/images/food-ramen.jpg",
    alt: "Stock photo of a bowl of ramen with pork, egg and spring onions.",
    position: "62% 62%",
    credit: "Stanley Kustamin on Unsplash",
    sourceUrl: "https://unsplash.com/photos/a-bowl-of-ramen-with-pork-egg-and-green-onions-uCAJBSZqPG4",
  },
} satisfies Record<"stay" | "experience" | "food", StockPhoto>;
