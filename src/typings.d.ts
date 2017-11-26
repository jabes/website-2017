/* SystemJS module definition */

interface InstagramImage {
  width: number;
  height: number;
  url: string;
}

interface InstagramPost {
  images: {
    low_resolution: InstagramImage,
    standard_resolution: InstagramImage,
    thumbnail: InstagramImage,
  };
}

interface InstagramResponse {
  data: Array<InstagramPost>;
}
