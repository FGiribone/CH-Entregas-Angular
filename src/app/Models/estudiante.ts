import { Iusuario } from "./usuario.models";

export class Estudiante implements Iusuario {
    id: number;
    userName: string;
    userLastName: string;
    userEmail: string;
    userCity: string;
    userProvince: string;
    userAddress: string;
    userCurso: string;
    inputZip: string;
    userPassword: string;
    role: string;
    createdAt: Date;
    actions: any[] = [];

    constructor(
        id: number,
        userName: string,
        userLastName: string,
        userEmail: string,
        userCity: string,
        userProvince: string,
        userAddress: string,
        userCurso: string,
        inputZip: string,
        userPassword: string,
        role: string,
        createdAt: Date = new Date()
    ) {
        this.id = id;
        this.userName = userName;
        this.userLastName = userLastName;
        this.userEmail = userEmail;
        this.userCity = userCity;
        this.userProvince = userProvince;
        this.userAddress = userAddress;
        this.userCurso = userCurso;
        this.inputZip = inputZip;
        this.userPassword = userPassword;
        this.role = role;
        this.createdAt = createdAt;
    }
}