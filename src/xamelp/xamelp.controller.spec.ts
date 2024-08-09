import { Test, TestingModule } from '@nestjs/testing';
import { XamelpController } from './xamelp.controller';
import { XamelpService } from './xamelp.service';

describe('XamelpController', () => {
  let controller: XamelpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XamelpController],
      providers: [XamelpService],
    }).compile();

    controller = module.get<XamelpController>(XamelpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
