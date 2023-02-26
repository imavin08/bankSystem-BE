import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('BankSystem example')
		.setDescription('The bankSystem API description')
		.setVersion('1.0')
		.addTag('bankSystem')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	const port = process.env.PORT;
	await app.listen(port);
	console.log(`Server started on ${port} port`);
}
bootstrap();
