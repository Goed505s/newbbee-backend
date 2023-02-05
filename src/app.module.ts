import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';
import { PaymentCardsModule } from './paymentcards/paymentcards.module';
import { StatusesModule } from './statuses/statuses.module';
import { TheaterModule } from './theater/theater.module';
import { MovieModule } from './movie/movie.module';
import { TickettypeModule } from './tickettype/tickettype.module';
import { FeeModule } from './fees/fee.module';
import { ReviewModule } from './review/review.module';
import { ShowingModule } from './showing/showing.module';
import { SeatModule } from './seat/seat.module';
import { PromotionModule } from './promotion/promotion.module';
import { BookingModule } from './booking/booking.module';
import { TicketModule } from './ticket/ticket.module';

require ('dotenv').config();

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // define where to write schema
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    UsersModule,
    AddressesModule,
    PaymentCardsModule,
    StatusesModule,
    TheaterModule,
    MovieModule,
    TickettypeModule,
    FeeModule,
    TicketModule,
    ReviewModule,
    BookingModule,
    ShowingModule,
    PromotionModule,
    BookingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
