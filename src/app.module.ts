import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HealthCheckModule } from './helpers/health.provider'
import { MessagesModule } from './messages/messages.module'
import { RoomsModule } from './rooms/rooms.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_SCHEMA'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
      }),
      inject: [ConfigService]
    }),
    MessagesModule,
    RoomsModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV !== 'production' ? '.development.env' : '.env'
    }),
    HealthCheckModule
  ]
})
export class AppModule {}
