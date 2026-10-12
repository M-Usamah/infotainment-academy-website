// The Shogun demo footage has black letterbox bars baked into the frame (the picture
// spans as little as rows 79–398 of 478), so it is scaled past them wherever it fills a box.
export const SHOGUN_CROP_SCALE = 1.55;

// Title cards appear at ~6s and ~20s; this stretch is pure gameplay, so small previews
// loop it instead of the full trailer.
export const SHOGUN_GAMEPLAY_LOOP = { start: 8, end: 18 } as const;
