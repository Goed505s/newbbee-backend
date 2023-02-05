import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Booking } from 'src/booking/booking.entity';
import { CreatePromotionInput } from './dto/create-promotion.input';
import { UpdatePromotionInput } from './dto/update-promotion.input';
import { Promotion } from './promotion.entity';
import { PromotionService } from './promotion.service';


@Resolver(of => Promotion)
export class PromotionResolver {
    constructor(private promotionService: PromotionService) {}

    @Query(returns => Promotion)
    getPromotionById(@Args('id', {type: () => Int}) id: number): Promise<Promotion> {
        return this.promotionService.getPromotionById(id)
    }

    @Query(returns => [Promotion])
    promotion(): Promise<Promotion[]> {
        return this.promotionService.findAll();
    }

    @Mutation(returns => Promotion)
    createPromotion(@Args('createPromotionInput')createPromotionInput: CreatePromotionInput): Promise<Promotion> {
        return this.promotionService.createPromotion(createPromotionInput);
    }

    @Mutation(returns => Promotion)
    updatePromotion(@Args('updatePromotionInput')updatePromotionInput: UpdatePromotionInput): Promise<Promotion> {
        return this.promotionService.updatePromotion(updatePromotionInput);
    }

    @Mutation(returns => Promotion)
    deletePromotionById(@Args('id', {type: () => Int}) id: number): Promise<Promotion> {
        return this.promotionService.deletePromotion(id);
    }

    @ResolveField(returns => String)
    startDate(@Parent() promotion: Promotion): Promise<String> {
        return this.promotionService.formatDate(promotion.startDate);
    }

    @ResolveField(returns => String)
    endDate(@Parent() promotion: Promotion): Promise<String> {
        return this.promotionService.formatDate(promotion.endDate);
    }

    @ResolveField(returns => [Booking])
    bookings(@Parent() promotion: Promotion)
    {
        return this.promotionService.getBookingsByPromotionId(promotion.promotionID);
    }
}
