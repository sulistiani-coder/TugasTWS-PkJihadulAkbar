import { Resolver, Query, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { Destinasi } from './entities/destinasi.entity';
import { DestinasiService } from './destinasi.service';
import { PrismaService } from '../prisma/prisma.service';

@Resolver(() => Destinasi)
export class DestinasiResolver {
  constructor(
    private readonly destinasiService: DestinasiService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => Destinasi, { name: 'destinasi' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.destinasiService.findOne(id);
  }

  @Query(() => [Destinasi], { name: 'cariDestinasi' })
  findAll(@Args('kategori', { nullable: true }) kategori?: string) {
    return this.destinasiService.findAll(kategori);
  }

  @ResolveField('ulasan', () => [Object])
  async getUlasan(@Parent() destinasi: Destinasi) {
    return this.prisma.ulasan.findMany({
      where: { destinasiId: destinasi.id },
      orderBy: { createdAt: 'desc' },
      take: 3,
    });
  }

  @ResolveField('fasilitas', () => [Object])
  async getFasilitas(@Parent() destinasi: Destinasi) {
    return this.prisma.fasilitas.findMany({ where: { destinasiId: destinasi.id } });
  }
}