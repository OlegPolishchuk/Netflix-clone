import * as process from "process";
import {MagicUserMetadata} from "magic-sdk";

const HASURA_ADMIN_URL = process.env.NEXT_PUBLIC_HASURA_ADMIN_URL as string;
const HASURA_ADMIN_SECRET = process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET as string;


export async function isNewUser(token: string, issuer: string | null) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      email
      id
      issuer
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    'isNewUser',
    {
      issuer,
    },
    token);

  return response.data.users.length === 0;
}

export const queryHasuraGQL = async (
  operationsDoc: string,
  operationName: string,
  variables: Record<string, any>,
  token: string
) => {
  const result = await fetch(HASURA_ADMIN_URL, {
    method: 'POST',
    headers: {
      // 'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables,
      operationName,
    }),
  });

  return await result.json();
}


export async function createNewUser(token: string, metadata: MagicUserMetadata) {
  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`;

  const {issuer, email, publicAddress} = metadata;

  const response = await queryHasuraGQL(
    operationsDoc,
    'createNewUser',
    {
      issuer,
      email,
      publicAddress
    },
    token);

  return response;
}

export async function findVideoByUser(userId: string, videoId: string, token: string) {
  const operationsDoc = `
  query findVideoIdByUser($userId: String!, $videoId: String!) {
    stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      id
      favourited
      userId
      videoId
      watched
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    'findVideoIdByUser',
    {
      videoId,
      userId
    },
    token);

  return response.data.stats;
}

interface UpdateStats {
  token: string;
  params: {
    favourited: number,
    userId: string,
    watched: boolean,
    videoId: string
  }
}

export async function updateStats({token, params}: UpdateStats) {
  const {videoId, userId, watched, favourited} = params;

  console.log(`params === `, params)

  const operationsDoc = `
    mutation updateStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
      update_stats(
        _set: {watched: $watched, favourited: $favourited}, 
        where: {
          userId: {_eq: $userId}, 
          videoId: {_eq: $videoId}
        }) {
        returning {
          favourited,
          userId,
          watched,
          videoId
        }
      }
    }
`;

  return await queryHasuraGQL(
    operationsDoc,
    'updateStats',
    {
      favourited,
      userId,
      watched,
      videoId
    },
    token);
}


export async function insertStats({token, params}: UpdateStats) {
  const {videoId, userId, watched, favourited} = params;

  const operationsDoc = `
  mutation insertStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
    insert_stats_one(object: {
        favourited: $favourited,
        userId: $userId,
        videoId: $videoId, 
        watched: $watched}) {
           userId
            videoId
            watched
        }
  }
`;

  return await queryHasuraGQL(
    operationsDoc,
    'insertStats',
    {
      favourited,
      userId,
      watched,
      videoId
    },
    token);
}


export async function getWatchedVideos(userId: string, token: string) {
  const operationsDoc = `
  query watchedVideos($userId: String!) {
    stats(where: {watched: {_eq: true}, userId: {_eq: $userId}}) {
      videoId
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    'watchedVideos',
    {
      userId,
    },
    token);

  return response.data.stats;
}


export async function getFavouritedVideos(userId: string, token: string) {
  const operationsDoc = `
  query favouritedVideos($userId: String!) {
    stats(where: {userId: {_eq: $userId}, favourited: {_eq: 1}}) {
      videoId
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    'favouritedVideos',
    {
      userId
    },
    token
  )

  return response.data.stats;
}

