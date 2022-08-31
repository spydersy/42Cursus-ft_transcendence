import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {

    private readonly users = [
        {
            userId: 0,
            username: 'user0',
            password: 'user0',
        },
        {
            userId: 1,
            username: 'user1',
            password: 'user1',
        },
        {
            userId: 2,
            username: 'user2',
            password: 'user2',
        },
        {
            userId: 3,
            username: 'user3',
            password: 'user3',
        },
    ]

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username)
    }
}
