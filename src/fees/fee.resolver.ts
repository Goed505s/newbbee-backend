import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateFeeInput } from './dto/create-fee.input';
import { UpdateFeeInput } from './dto/update-fee.input';
import { Fee } from './fee.entity';
import { FeeService } from './fee.service';

@Resolver(of => Fee)
export class FeeResolver {
    constructor(private feesService: FeeService) {}

    @Query(returns => Fee)
    getFeeById(@Args('id', {type: () => Int}) id: number): Promise<Fee> {
        return this.feesService.getFeesById(id)
    }

    @Query(returns => [Fee])
    fee(): Promise<Fee[]> {
        return this.feesService.findAll();
    }

    @Mutation(returns => Fee)
    createFee(@Args('createFeeInput')createFeesInput: CreateFeeInput): Promise<Fee> {
        return this.feesService.createFees(createFeesInput);
    }

    @Mutation(returns => Fee)
    updateFee(@Args('updateFeeInput')updateFeesInput: UpdateFeeInput): Promise<Fee> {
        return this.feesService.updateFee(updateFeesInput);
    }

    @Mutation(returns => Fee)
    deleteFeeById(@Args('id', {type: () => Int}) id: number): Promise<Fee> {
        return this.feesService.deleteFee(id);
    }
}
