import { Test, TestingModule } from '@nestjs/testing';
import { FeeResolver } from './fee.resolver';

describe('FeeResolver', () => {
  let resolver: FeeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeeResolver],
    }).compile();

    resolver = module.get<FeeResolver>(FeeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
