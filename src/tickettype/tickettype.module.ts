import { forwardRef, Module } from '@nestjs/common';
import { TickettypeService } from './tickettype.service';
import { TickettypeResolver } from './tickettype.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketType } from './tickettype.entity';
import { TicketModule } from 'src/ticket/ticket.module';

@Module({
  imports: [TypeOrmModule.forFeature([TicketType]), forwardRef(() => TicketModule)],
  providers: [TickettypeService, TickettypeResolver],
  exports: [TickettypeService]
})
export class TickettypeModule {}
