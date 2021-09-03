import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoomsModule } from './useCases/Room/rooms.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'root',
      password: 'ms_chat',
      database: 'ms_chat',
      autoLoadEntities: true,
      synchronize: true
    }),
    RoomsModule
  ]
})
export class AppModule {}
