import { Test, TestingModule } from '@nestjs/testing';
import { TickettypeService } from './tickettype.service';

describe('TickettypeService', () => {
  let service: TickettypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TickettypeService],
    }).compile();

    service = module.get<TickettypeService>(TickettypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
