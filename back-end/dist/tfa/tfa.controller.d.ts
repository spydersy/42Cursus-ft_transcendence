import { Response } from 'express';
import { TfaService } from './tfa.service';
export declare class TfaController {
    private tfaService;
    constructor(tfaService: TfaService);
    register(response: Response, req: any): Promise<void>;
}
