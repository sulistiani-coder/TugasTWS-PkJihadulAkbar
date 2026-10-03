import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DestinasiModule } from './destinasi/destinasi.module';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UlasanModule } from './ulasan/ulasan.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DestinasiModule,
    PrismaModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    UlasanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}