/* eslint-disable */

export interface ChangePasswordRequestDTO {
    oldPassword: string;
    newPassword: string;
}

export interface LoginRequestDTO {
    email: string;
    password: string;
}

export interface LoginResponseDTO {
    id: number;
    name: string;
    jwt: string;
}
