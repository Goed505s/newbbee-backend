import { Resolver } from '@nestjs/graphql';
import { UserStatus } from './userstatus.entity';
import { StatusesService } from './statuses.service';

@Resolver(of => UserStatus)
export class StatusesResolver {
  constructor(private readonly statusesService: StatusesService) {}
}
