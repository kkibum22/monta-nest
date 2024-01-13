import { Test, TestingModule } from '@nestjs/testing';
import { EggsService } from './eggs.service';

describe('EggsService', () => {
  let service: EggsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EggsService],
    }).compile();

    service = module.get<EggsService>(EggsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
