export class UsuarioDTO {
    constructor(
        public idUsuario: number,
        public nome: string,
        public email: string,
        public senha: string,
        public instituicao: string,
        public tipoUsuario: "Admin" | "Estudante" | "Professor"
    ) {}
}