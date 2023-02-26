import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const port = process.env.PORT;
	await app.listen(port);
	console.log(`Server started on ${port} port`);
}
bootstrap();
