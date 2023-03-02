import {Magic} from "magic-sdk";
import * as process from "process";

const API_KEY = `${process.env.NEXT_PUBLIC_MAGIC_PUBLISH_API_KEY}`;

const createMagic = () => {
  return (
    typeof window !== 'undefined' && new Magic(API_KEY)
  )
};

export const magic = createMagic()