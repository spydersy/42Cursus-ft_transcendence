import { Injectable, Res, Param } from '@nestjs/common';

@Injectable()
export class AppService {
  async getUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './upload' });
  }
}
