import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Address } from './address.entity';
import { AddressesService } from './addresses.service';
import { CreateAddressInput } from './dto/create-address.input.dto';
import { UpdateAddressInput } from './dto/update-address.input.dto';

@Resolver()
export class AddressesResolver {
    constructor(private addressesService: AddressesService) {}

    @Query(returns => Address) 
    getAddressByID(@Args('id', {type: () => Int}) id: number): Promise<Address> {
        return this.addressesService.getAddressById(id);
    }

    @Mutation(returns => Address)
    createAddress(@Args('createAddressInput') createAddressInput: CreateAddressInput): Promise<Address> {
        return this.addressesService.createAddress(createAddressInput);
    }

    @Mutation(returns => Address)
    updateAddress(@Args('updateAddressInput') updateAddressInput: UpdateAddressInput): Promise<Address> {
        return this.addressesService.updateAddress(updateAddressInput);
    }
}
