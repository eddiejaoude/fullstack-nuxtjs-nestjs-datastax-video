import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('members')
  getMembers() {
    return this.appService.getMembers();
  }

  @Post('members')
  postMember(@Body() member: any) {
    return this.appService.postMember(member);
  }
}
