import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    EventosModule,
    UsuariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}