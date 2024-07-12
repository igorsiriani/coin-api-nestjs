import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './authentication/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { MongooseModule } from '@nestjs/mongoose'; 
import { env } from 'process';
import { FavoriteModule } from './favorite/favorite.module';


@Module({
  imports: [
    AuthModule,
    UserModule,
    WalletModule,
    FavoriteModule,
    MongooseModule.forRoot(env.MONGO_DATABASE_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
