import { HttpModule } from '@nestjs/axios'
import { Controller, Get, Module } from '@nestjs/common'
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TerminusModule,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator
} from '@nestjs/terminus'

@Controller('')
class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
      () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024)
    ])
  }
}

@Module({
  controllers: [HealthController],
  imports: [TerminusModule, HttpModule]
})
export class HealthCheckModule {}
