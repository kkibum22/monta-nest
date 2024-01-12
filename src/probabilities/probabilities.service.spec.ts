import { Test, TestingModule } from '@nestjs/testing';
import { ProbabilitiesService } from './probabilities.service';

describe('ProbabilitiesService', () => {
  let service: ProbabilitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProbabilitiesService],
    }).compile();

    service = module.get<ProbabilitiesService>(ProbabilitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
