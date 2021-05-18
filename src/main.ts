import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigVars } from './config/config.schema';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService<ConfigVars> = app.get(ConfigService);
  const serverPort = configService.get<number>('SERVER_PORT');
  if (!serverPort) {
    console.error(`Server port undefined!`);
    process.exit(1);
  }
  console.log(`Listening on port ${serverPort}`);
  await app.listen(serverPort);
}
bootstrap();

process.on('SIGINT', () => {
  console.info('Interrupted');
  process.exit(0);
});
