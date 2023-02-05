import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Ticket } from 'src/ticket/ticket.entity';
import { CreateTicketTypeInput } from './dto/create-tickettype.input';
import { UpdateTicketTypeInput } from './dto/update-tickettype.input';
import { TicketType } from './tickettype.entity';
import { TickettypeService } from './tickettype.service';


@Resolver(of => TicketType)
export class TickettypeResolver {
    constructor(private tickettypeService: TickettypeService) {}

    @Query(returns => TicketType)
    getTicketTypeById(@Args('id', {type: () => Int}) id: number): Promise<TicketType> {
        return this.tickettypeService.getTicketTypeById(id)
    }

    @Query(returns => [TicketType])
    getAllTicketTypes(): Promise<TicketType[]> {
        return this.tickettypeService.findAll();
    }

    @Mutation(returns => TicketType)
    createTicketType(@Args('createTicketTypeInput')createTicketTypeInput: CreateTicketTypeInput): Promise<TicketType> {
        return this.tickettypeService.createTicketType(createTicketTypeInput);
    }

    @Mutation(returns => TicketType)
    updateTicketType(@Args('updateTicketTypeInput')updateTicketTypeInput: UpdateTicketTypeInput): Promise<TicketType> {
        return this.tickettypeService.updateTicketType(updateTicketTypeInput);
    }

    @Mutation(returns => TicketType)
    deepDeleteTicketTypeById(@Args('id', {type: () => Int}) id: number): Promise<TicketType>
    {
        return this.tickettypeService.deepDeleteTicketTypeById(id);
    }

    @ResolveField(returns => [Ticket])
    tickets(@Parent() ticketType: TicketType) {
        return this.tickettypeService.getTicketsByTicketTypeId(ticketType.typeID); // typeId = ticketTypeID
    }
}
