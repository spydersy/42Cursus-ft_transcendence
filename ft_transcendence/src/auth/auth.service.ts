import { HttpService } from '@nestjs/axios';
import { Injectable, Query } from '@nestjs/common';
import { lastValueFrom, map, Observable } from 'rxjs';

@Injectable()
export class AuthService {

    constructor(private httpService: HttpService) { }
    default_auth_get(@Query() query): string {

        if (query['error']) {
            // Do something . . .
        }
        else if (query['code']) {
            this.generate_user_token(query['code']);
        }
        return "Default Auth Called";
    }

    async get_token(headersRequest) {
            console.log("TET");
            return lastValueFrom(this.httpService
                .post('https://api.intra.42.fr/oauth/token', headersRequest)
                .pipe(map(res_ => {
                    console.log(res_.headers);
                    return (res_.data)
                }
                )));

    }

    async generate_user_token(code: string) {
        console.log(code, "test")
        const headersRequest = {
            'grant_type': 'authorization_code',
            'client_id': 'b645a2e7e9c3b0cc8345619af067b26396718e9a1d172c3f36fc602f6ce3cb20',
            'client_secret': '886ccd72a131ea74ab5cce6622c1502742181d0382ab4136633d7fc56fa46b95',
            'redirect_uri': 'http://localhost:3000/auth',
            code,
        };
        let ret = await this.get_token(headersRequest);
        console.log(ret, headersRequest);
    }
}
