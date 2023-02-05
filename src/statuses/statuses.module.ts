import { Module } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusesResolver } from './statuses.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStatus } from './userstatus.entity';

@Module({
  providers: [StatusesService],
  imports: [TypeOrmModule.forFeature([UserStatus])],
  exports: [StatusesService]
})
export class StatusesModule {}
