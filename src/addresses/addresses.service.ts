import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { CreateAddressInput } from './dto/create-address.input.dto';
import { UpdateAddressInput } from './dto/update-address.input.dto';

@Injectable()
export class AddressesService {
    constructor(@InjectRepository(Address) private addressesRepository: Repository<Address>) {}
    
    async getAddressById(id: number): Promise<Address> {
        return this.addressesRepository.findOneOrFail({
            where: [ {addressID: id }]
        });
    }

    async createAddress(createAddressInput: CreateAddressInput): Promise<Address> {
        const newAddress = this.addressesRepository.create(createAddressInput);

        return this.addressesRepository.save(newAddress);
    }

    async updateAddress(
        updateAddressInput: UpdateAddressInput
    ): Promise<Address> {
        const update = await this.addressesRepository.preload(updateAddressInput);
        return this.addressesRepository.save(update);
    }
}
