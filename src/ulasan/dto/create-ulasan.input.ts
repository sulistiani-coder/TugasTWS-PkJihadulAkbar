import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

@InputType()
export class CreateUlasanInput {
  @Field(() => Int)
  @IsInt()
  destinasiId: number;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  rating: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  komentar: string;
}