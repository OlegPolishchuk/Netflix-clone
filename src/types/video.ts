

interface Default {
  url: string;
  width: number;
  height: number;
}

interface Medium {
  url: string;
  width: number;
  height: number;
}

interface High {
  url: string;
  width: number;
  height: number;
}

interface Thumbnails {
  default: Default;
  medium: Medium;
  high: High;
}

interface Localized {
  title: string;
  description: string;
}

interface Snippet {
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnails: Thumbnails;
  localized: Localized;
  country: string;
}

interface RelatedPlaylists {
  likes: string;
  uploads: string;
}

interface ContentDetails {
  relatedPlaylists: RelatedPlaylists;
}

interface Statistics {
  viewCount: string;
  subscriberCount: string;
  hiddenSubscriberCount: boolean;
  videoCount: string;
}

interface Items {
  kind: string;
  etag: string;
  id: ItemId | string;
  snippet: Snippet;
  contentDetails: ContentDetails;
  statistics: Statistics;
}

export type ItemId = {
  kind: string,
  videoId: string
}

export interface VideosData {
  items: Items[];
  error?: object;
}

export interface Video {
  id: ItemId | string;
  imgUrl: string;
  title: string;
}
