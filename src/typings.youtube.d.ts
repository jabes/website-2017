interface YoutubeThumbnail {
  url: string
  width: number
  height: number
}

interface YoutubeThumbnails {
  default: YoutubeThumbnail
  medium: YoutubeThumbnail
  high: YoutubeThumbnail
  standard: YoutubeThumbnail
  maxres: YoutubeThumbnail
}

interface YoutubeSnippet {
  publishedAt: string
  channelId: string
  channelTitle: string
  title: string
  description: string
  thumbnails: YoutubeThumbnails
  tags: Array<string>
}

interface YoutubePlayer {
  embedHtml: string
}

interface YoutubeStatistics {
  viewCount: number
  likeCount: number
  dislikeCount: number
  favoriteCount: number
  commentCount: number
}

interface YoutubeVideo {
  id: string
  snippet: YoutubeSnippet
  player: YoutubePlayer
  statistics: YoutubeStatistics
}

interface YoutubeResponse {
  items: Array<YoutubeVideo>
}
