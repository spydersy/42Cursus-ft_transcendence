import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    console.log("__VALUE__DBG__FROM__PIPE__ : ", value);
    console.log("__METADATA__DBG__FROM__PIPE__ : ", metadata);
    const oneKb = 1000;
    return value.size < oneKb;
  }
}