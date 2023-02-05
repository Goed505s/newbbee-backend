import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserStatus } from './userstatus.entity';
@Injectable()
export class StatusesService {
    constructor(@InjectRepository(UserStatus) private statusesRepository: Repository<UserStatus>) {}

    async getStatusById(id: number): Promise<UserStatus> {
        return this.statusesRepository.findOneOrFail({
            where: [ {statusID: id }]
        });
    }

}
