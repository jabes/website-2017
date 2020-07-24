interface InstagramPost {
  id: string
  username: string
  caption: string
  media_type: string
  media_url: string
  permalink: string
  thumbnail_url: string
  timestamp: string
  children: Array<InstagramPost>
}

interface InstagramCursors {
  before: string
  after: string
}

interface InstagramPaging {
  cursors: InstagramCursors
  next: string
  previous: string
}

interface InstagramResponse {
  data: Array<InstagramPost>
  paging: Array<InstagramPaging>
}
