import { Test, TestingModule } from '@nestjs/testing';
import { PaymentCardsResolver } from './paymentcards.resolver';

describe('PaymentcardsResolver', () => {
  let resolver: PaymentCardsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentCardsResolver],
    }).compile();

    resolver = module.get<PaymentCardsResolver>(PaymentCardsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
