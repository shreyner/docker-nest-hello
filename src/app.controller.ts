import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

const delay = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/delay')
  async delay() {
    await delay(10 * 1000);

    return { status: true };
  }
}
