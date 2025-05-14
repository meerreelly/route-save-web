export interface RouteUser {
    email: string;
    userName: string;
    permissionId: string;
}

export interface RouteData {
    name: string;
    description: string;
    users: RouteUser[];
    group: string;
}
