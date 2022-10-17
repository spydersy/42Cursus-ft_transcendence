import { extname } from "path";
import { NotAcceptableException } from "@nestjs/common";

export interface Utilities  {
    'CORS_HOST': { 'Access-Control-Allow-Origin': '/front-end' }
}

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new NotAcceptableException(), false);
    }
    callback(null, true);
};
