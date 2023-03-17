import { Magic } from '@magic-sdk/admin';

const API_KEY = `${process.env.MAGIC_SECRET_API_KEY}`;

console.log(`API_KEY`, API_KEY)
export const magicAdmin = new Magic(API_KEY);