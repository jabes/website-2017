/* SystemJS module definition */

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

interface InstagramVideo {
  width: number
  height: number
  url: string
}

interface InstagramPost {

  type: string
  link: string
  created_time: string
  user_has_liked: boolean
  user: InstagramUser

  images: {
    thumbnail: InstagramImage
    low_resolution: InstagramImage
    standard_resolution: InstagramImage
  }

  videos: {
    standard_resolution: InstagramVideo
    low_bandwidth: InstagramVideo
    low_resolution: InstagramVideo
  }

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
