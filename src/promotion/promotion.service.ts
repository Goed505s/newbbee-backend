import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/booking/booking.entity';
import { BookingService } from 'src/booking/booking.service';
import { Repository } from 'typeorm';
import { CreatePromotionInput } from './dto/create-promotion.input'
import { UpdatePromotionInput } from './dto/update-promotion.input';
import { Promotion } from './promotion.entity';


@Injectable()
export class PromotionService {
    constructor(@InjectRepository(Promotion) private promotionRepository: Repository<Promotion>,
    @Inject(forwardRef(() => BookingService))private bookingService: BookingService) {}

    createPromotion(createPromotionInput: CreatePromotionInput): Promise<Promotion> {
        const newPromotion = this.promotionRepository.create(createPromotionInput);
        return this.promotionRepository.save(newPromotion);
    }

    async updatePromotion(updatePromotionInput: UpdatePromotionInput): Promise<Promotion> {
        const update = await this.promotionRepository.preload(updatePromotionInput);
        return this.promotionRepository.save(update);
    }

    async findAll(): Promise<Promotion[]> {
        return this.promotionRepository.find(); // find() does select * from promotion
    }

    async getPromotionById(id: number): Promise<Promotion> {
        return this.promotionRepository.findOneOrFail({
            where: [ {promotionID: id }]
        });
    }

    async deletePromotion(id: number): Promise<Promotion> {
        const toBeDeleted = await this.promotionRepository.findOneOrFail({
            where: [ {promotionID: id }]
        });

        // for some reason, removing the entity removes it's id? so I'm resetting
        // it manually before returning it.
        await this.promotionRepository.remove(toBeDeleted);
        toBeDeleted.promotionID = id;  
        return toBeDeleted;
    }

    async formatDate(date: string): Promise<String>
    {
        const newDate = new Date(date);
        return newDate.toISOString().substring(0,10);
    }

    async getBookingsByPromotionId(id: number): Promise<Booking[]> {
        return this.bookingService.getBookingsByPromotionId(id);   
    }
}
