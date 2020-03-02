export class Users{
    id:string;
    userName:string;
    normalizedUserName:string;
    email:string;
    normalizedEmail:string;
    emailConfirmed:boolean;
    passwordHash:string;
    securityStamp:string;
    concurrecyStamp:string;
    phonrNumber:string;
    phoneNumberConfirmed:boolean;
    twoFactorEnabled:boolean;
    LockoutEnd:Date;
    LockoutEnabled:boolean;
    accessFailedCount:number;
    country:string;
}