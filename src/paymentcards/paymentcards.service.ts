import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/addresses/address.entity';
import { AddressesService } from 'src/addresses/addresses.service';
import { Booking } from 'src/booking/booking.entity';
import { BookingService } from 'src/booking/booking.service';
import { Repository } from 'typeorm';
import { CreatePaymentCardInput } from './dto/create-paymentcard.input';
import { UpdatePaymentCardInput } from './dto/update-paymentcard.input';
import { PaymentCard } from './paymentcard.entity';

@Injectable()
export class PaymentCardsService {
    constructor(@InjectRepository(PaymentCard) private paymentCardsRepository: Repository<PaymentCard>,
                @Inject(AddressesService) private addressesService: AddressesService,
                @Inject(forwardRef(() => BookingService))private bookingService: BookingService) {}
    
    async createPaymentCard(createPaymentCardInput: CreatePaymentCardInput): Promise<PaymentCard> {
        const newPaymentcard = this.paymentCardsRepository.create(createPaymentCardInput);
        return this.paymentCardsRepository.save(newPaymentcard); // insert newPaymentcard into repo
    }

    async getAddress(addressID: number): Promise<Address>
    {
        return this.addressesService.getAddressById(addressID);this
    }

    async findAll(): Promise<PaymentCard[]> {
        return this.paymentCardsRepository.find(); // find() does select * from paymentcards
    }

    async getPaymentCardByUserID(userID: number): Promise<PaymentCard[]> {
        const paymentCard = await this.paymentCardsRepository.find({ // need find function that returns array
            where: { userID : userID }
         });
        return paymentCard;
    }

    async updatePaymentCard(
        updatePaymentCardInput: UpdatePaymentCardInput
    ): Promise<PaymentCard> {
        const update = await this.paymentCardsRepository.preload(updatePaymentCardInput);
        return this.paymentCardsRepository.save(update);
    }

    async getPaymentCardByID(paymentCardID: number): Promise<PaymentCard> {
        const paymentCard = await this.paymentCardsRepository.findOneOrFail({
            where: { paymentCardID }
         });
        return paymentCard;
    }

    async deletePaymentCard(paymentCardID: number): Promise<PaymentCard> {
        const paymentcard = await this.getPaymentCardByID(paymentCardID);
        return this.paymentCardsRepository.remove(paymentcard);
    }

    async getBookingsByPaymentCardId(id: number): Promise<Booking[]> {
        return this.bookingService.getBookingsByPaymentcardId(id);   
    }

}
