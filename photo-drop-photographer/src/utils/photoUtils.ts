import sharp from "sharp";
import * as dotenv from "dotenv";

dotenv.config();

export const addWatermark = (
  imgBuffer: Buffer,
  watermark: Buffer
): Promise<Buffer> => {
  return sharp(imgBuffer)
    .composite([{ input: watermark }])
    .png()
    .toBuffer();
};

export const resize = async (imgBuffer: Buffer): Promise<Buffer> => {
  return sharp(imgBuffer).resize(400, 400).png().toBuffer();
};

export const resizeAndAddWatermark = (
  imgBuffer: Buffer,
  watermark: Buffer
): Promise<Buffer> => {
  return sharp(imgBuffer)
    .resize(400, 400)
    .composite([{ input: watermark }])
    .png()
    .toBuffer();
};
