// atividades.module.ts
import { Module } from '@nestjs/common';
import { AtividadesService } from './atividades.service';
import { AtividadesCotroller } from './atividades.controller';

@Module({
  controllers: [AtividadesCotroller],
  providers: [AtividadesService],
  exports: [AtividadesService],
})
export class AtividadesModule { }