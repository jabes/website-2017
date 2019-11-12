interface InstagramUser {
  full_name: string
  profile_picture: string
  username: string
}

interface InstagramImage {
  width: number
  height: number
  url: string
}

interface InstagramImages {
  thumbnail: InstagramImage
  low_resolution: InstagramImage
  standard_resolution: InstagramImage
}

interface InstagramVideo {
  width: number
  height: number
  url: string
}

interface InstagramVideos {
    standard_resolution: InstagramVideo
    low_bandwidth: InstagramVideo
    low_resolution: InstagramVideo
}

interface InstagramCarouselMedia {
  images: InstagramImages
  type: string
}

interface InstagramPost {
  type: string
  link: string
  created_time: string
  user_has_liked: boolean
  user: InstagramUser

  images: InstagramImages
  videos: InstagramVideos
  carousel_media: Array<InstagramCarouselMedia>

  caption: {
    text: string
    created_time: string
    from: InstagramUser
  }

  location: {
    name: string
    latitude: number
    longitude: number
  }

  likes: {
    count: number
  }

  comments: {
    count: number
  }

}

interface InstagramResponse {
  data: Array<InstagramPost>
}
