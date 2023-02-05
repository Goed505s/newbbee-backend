import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeeInput } from './dto/create-fee.input';
import { UpdateFeeInput } from './dto/update-fee.input';
import { Fee } from './fee.entity';

@Injectable()
export class FeeService {
    constructor(@InjectRepository(Fee) private feesRepository: Repository<Fee>) {}

    createFees(createFeesInput: CreateFeeInput): Promise<Fee> {
        const newFees = this.feesRepository.create(createFeesInput);

        return this.feesRepository.save(newFees);
    }

    async updateFee(updateFeeInput: UpdateFeeInput): Promise<Fee> {
        const update = await this.feesRepository.preload(updateFeeInput);
        return this.feesRepository.save(update);
    }

    async deleteFee(id: number): Promise<Fee> {
        const toBeDeleted = await this.feesRepository.findOneOrFail({
            where: [ {feeID: id }]
        });

        // for some reason, removing the entity removes it's id? so I'm resetting
        // it manually before returning it.
        await this.feesRepository.remove(toBeDeleted);
        toBeDeleted.feeID = id;  
        return toBeDeleted;
    }

    async findAll(): Promise<Fee[]> {
        return this.feesRepository.find(); // find() does select * from fees
    }

    async getFeesById(id: number): Promise<Fee> {
        return this.feesRepository.findOneOrFail({
            where: [ {feeID: id }]
        });
    }
}
