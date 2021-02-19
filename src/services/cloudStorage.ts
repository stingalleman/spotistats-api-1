import { Bucket, Storage, UploadResponse } from "@google-cloud/storage";
// import fs from "fs";
import path from "path";

class CloudStorageService {
  private _importBucket: Bucket;

  constructor() {
    const storage = new Storage({
      keyFilename: path.join(
        __dirname,
        "../../spotistats-a49da-a4f206dcbf07.json"
      ),
      projectId: "spotistats-a49da",
    });

    this._importBucket = storage.bucket("spotistats-a49da.appspot.com");
  }

  public async uploadFile(
    userId: string,
    fileName: string,
    filePath: string
  ): Promise<UploadResponse> {
    const file: UploadResponse = await this._importBucket.upload(filePath, {
      gzip: true,
      destination: `import/${userId}/${fileName}`,
      metadata: {
        cacheControl: "public, max-age=31536000",
      },
    });

    return file;
  }
}

export default CloudStorageService;
