import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Destinasi } from './entities/destinasi.entity';
import { DestinasiService } from './destinasi.service';

@Resolver(() => Destinasi)
export class DestinasiResolver {
  constructor(private readonly destinasiService: DestinasiService) {}

  @Query(() => Destinasi, { name: 'destinasi' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.destinasiService.findOne(id);
  }

  @Query(() => [Destinasi], { name: 'cariDestinasi' })
  findAll(@Args('kategori', { nullable: true }) kategori?: string) {
    return this.destinasiService.findAll(kategori);
  }
}