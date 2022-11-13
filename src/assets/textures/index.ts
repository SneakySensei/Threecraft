import { NearestFilter, Texture, TextureLoader } from "three";

import { default as dirtImg } from "./dirt.jpg";
import { default as glassImg } from "./glass.png";
import { default as grassImg } from "./grass.jpg";
import { default as logImg } from "./log.jpg";
import { default as woodImg } from "./wood.png";

const dirtTexture = new TextureLoader().load(dirtImg);
const glassTexture = new TextureLoader().load(glassImg);
const grassTexture = new TextureLoader().load(grassImg);
const groundTexture = new TextureLoader().load(grassImg);
const logTexture = new TextureLoader().load(logImg);
const woodTexture = new TextureLoader().load(woodImg);

dirtTexture.magFilter = NearestFilter;
glassTexture.magFilter = NearestFilter;
grassTexture.magFilter = NearestFilter;
groundTexture.magFilter = NearestFilter;
logTexture.magFilter = NearestFilter;
woodTexture.magFilter = NearestFilter;

export {
  dirtTexture,
  glassTexture,
  grassTexture,
  groundTexture,
  logTexture,
  woodTexture,
};

export const textures: { [key: string]: Texture } = {
  dirtTexture,
  glassTexture,
  grassTexture,
  groundTexture,
  logTexture,
  woodTexture,
};
