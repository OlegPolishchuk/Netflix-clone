import videoData from '../data/videos.json';
import * as process from "process";
import {VideosData} from "@/types/video";
import {getWatchedVideos} from "@/lib/db/hasura";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const baseUrl = 'https://youtube.googleapis.com/youtube/v3';

const fetchVideos = async (url: string) => {
  const response = await fetch(`${baseUrl}/${url}&maxResults=25&&key=${YOUTUBE_API_KEY}`);
  const data: VideosData = await response.json();

  return data;
}

export const getCommonVideos = async (searchQuery: string) => {
  try {
    const isDev = process.env.DEVELOPMENT;
    const data =  !!isDev ? videoData : await fetchVideos(searchQuery);

    if (!data) {
      return []
    }

    return data?.items.map((item) => {
      return {
        title: item.snippet.title,
        imgUrl: !!isDev ? item.snippet.thumbnails.high.url : `https://i.ytimg.com/vi/${item.id}/maxresdefault.jpg` ,
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

export const getYouTubeVideoById = async (videoId: string) => {
  const url = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;

  const response = await fetch(`${baseUrl}/${url}&maxResults=25&&key=${YOUTUBE_API_KEY}`);
  const data = await response.json();

  return data.items[0];
}


export const getWatchedAgainVideos = async (userId: string, token: string) => {
  const videos = await getWatchedVideos(userId, token);

  return videos.map((video: {videoId: string}) => (
    {
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`
    }))
}
