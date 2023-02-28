import videoData from '../data/videos.json';
import {Video} from "@/types";
import * as process from "process";
import {VideosData} from "@/types/video";

export const getVideos = async () => {
  try {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=disney%20trailer&key=${YOUTUBE_API_KEY}`);
    const data: VideosData = await response.json();

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

