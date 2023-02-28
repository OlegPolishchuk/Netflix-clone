import videoData from '../data/videos.json';
import {Video} from "@/types";
import * as process from "process";
import {VideosData} from "@/types/video";

export const getCommonVideos = async (searchQuery: string) => {
  try {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    const baseUrl = 'https://youtube.googleapis.com/youtube/v3'

    const response = await fetch(`${baseUrl}/${searchQuery}&maxResults=25&&key=${YOUTUBE_API_KEY}`);
    const data: VideosData = await response.json();

    if (data?.error) {
      console.log('Youtube API error: ', data.error)
      return []
    }

    return data?.items.map((item) => {
      return {
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id: item.id,
      }
    })
  } catch (e) {
    return videoData.items.map((item) => {
      return {
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id: item.id.videoId,
      }
    })
  }
}

export const getVideos = (searchQuery: string) => {
  const url = `search?part=snippet&q=${searchQuery}`;

  return getCommonVideos(url);
}

export const getPopularVideos = () => {
  const url = 'videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US';

  return getCommonVideos(url);
}
