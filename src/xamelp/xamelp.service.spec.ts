import { Test, TestingModule } from '@nestjs/testing';
import { XamelpService } from './xamelp.service';

describe('XamelpService', () => {
  let service: XamelpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XamelpService],
    }).compile();

    service = module.get<XamelpService>(XamelpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
