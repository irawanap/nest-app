import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ⬅️ Import ConfigModule
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ⬅️ Agar bisa diakses di semua modul
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
