import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ⬅️ Import ConfigModule
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'default',
          ttl: 60000,
          limit: 20,
        },
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true, // ⬅️ Agar bisa diakses di semua modul
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
     provide: APP_GUARD,
     useClass: ThrottlerGuard,
    }
    ],
})
export class AppModule {}
