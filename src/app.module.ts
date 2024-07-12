import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './authentication/auth.module';
import { WalletModule } from './wallet/wallet.module';


@Module({
  imports: [AuthModule, UserModule, WalletModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
