import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
    interface User extends DefaultUser {
        id: string;
        role?: string;
    }

    interface Session {
        user: {
            id: string;
            role?: string;
        } & DefaultSession['user'];
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
        role?: string;
    }
}

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role: string;
        };
    }

    interface User {
        id: string;
        name: string;
        email: string;
        role: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        role: string;
    }
}
