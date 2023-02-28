import videoData from '../data/videos.json';
import {Video} from "@/types";

export const getVideos = (): Video[] => {
  return videoData.items.map((item) => {
    return {
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
      id: item.id.videoId,
    }
  })
}

