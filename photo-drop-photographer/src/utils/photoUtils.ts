import sharp from "sharp";

export class PhotoUtils {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  addWatermark = (imgBuffer: Buffer, watermark: Buffer): Promise<Buffer> => {
    return sharp(imgBuffer)
      .composite([{ input: watermark }])
      .png()
      .toBuffer();
  };

  resize = async (imgBuffer: Buffer): Promise<Buffer> => {
    return sharp(imgBuffer).resize(this.width, this.height).png().toBuffer();
  };

  resizeAndAddWatermark = (
    imgBuffer: Buffer,
    watermark: Buffer
  ): Promise<Buffer> => {
    return sharp(imgBuffer)
      .resize(this.width, this.height)
      .composite([{ input: watermark }])
      .png()
      .toBuffer();
  };
}
