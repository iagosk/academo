import { Module } from '@nestjs/common';
import { AtividadesService } from './atividades.service';

@Module({
  providers: [AtividadesService]
})
export class AtividadesModule {}
