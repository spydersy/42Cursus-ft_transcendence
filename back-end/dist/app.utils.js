"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageFileFilter = exports.editFileName = void 0;
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = (0, path_1.extname)(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
exports.editFileName = editFileName;
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return callback(new common_1.NotAcceptableException(), false);
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
//# sourceMappingURL=app.utils.js.map