import { SearchService } from './search.service';
export declare class SearchController {
    private searchService;
    constructor(searchService: SearchService);
    FriendsSearch(req: any, query: any, res: any): Promise<any>;
}
