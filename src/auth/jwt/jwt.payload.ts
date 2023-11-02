import { Role } from "../role/role.enum";

export interface JwtPayload {
    id: string,
    role: Role
}