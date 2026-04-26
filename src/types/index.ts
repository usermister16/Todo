import { UserInfo } from "@angular/fire/auth";

interface Task {
    id?: string | null;
    title?: string | null;
    description?: string | null;
    completed?: boolean | null;
    owner?:string | null
    createdAt?: Date | null;
    updatedAt?: Date | null;
}

export type { Task };

interface User {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export type { User };