import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/ticket/ticket.entity';
import { TicketService } from 'src/ticket/ticket.service';
import { Repository } from 'typeorm';
import { CreateTicketTypeInput } from './dto/create-tickettype.input';
import { UpdateTicketTypeInput } from './dto/update-tickettype.input';
import { TicketType } from './tickettype.entity';

@Injectable()
export class TickettypeService {
    constructor(@InjectRepository(TicketType) private ticketTypeRepository: Repository<TicketType>,
    @Inject(forwardRef(() => TicketService))private ticketService: TicketService) {}

    async createTicketType(createTicketTypeInput: CreateTicketTypeInput): Promise<TicketType> {
        const newTicketType = this.ticketTypeRepository.create(createTicketTypeInput);

        return this.ticketTypeRepository.save(newTicketType);
    }

    async updateTicketType(updateTicketTypeInput: UpdateTicketTypeInput): Promise<TicketType> {
        const update = await this.ticketTypeRepository.preload(updateTicketTypeInput);
        return this.ticketTypeRepository.save(update);
    }

    async findAll(): Promise<TicketType[]> {
        return this.ticketTypeRepository.find(); // find() does select * from tickettype
    }

    async deepDeleteTicketTypeById(id: number)
    {
        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }
        const ticketTypeToDelete = await this.ticketTypeRepository.findOneOrFail({
            where: [ {typeID: id}]
        });

        const ticketsToBeDeleted = await this.ticketService.getTicketsByTicketTypeId(id);
        if (ticketsToBeDeleted)
        {
            await asyncForEach(ticketsToBeDeleted, async ticket => {
                await this.ticketService.deleteTicketById(ticket.ticketID);
            })
        }
        await this.ticketTypeRepository.delete(ticketTypeToDelete.typeID);
        ticketTypeToDelete.typeID = id;
        return ticketTypeToDelete;
    }

    async getTicketTypeById(id: number): Promise<TicketType> {
        return this.ticketTypeRepository.findOneOrFail({
            where: [ {typeID: id }]
        });
    }

    async getTicketsByTicketTypeId(id: number): Promise<Ticket[]> {
        return this.ticketService.getTicketsByTicketTypeId(id);   
    }
}
