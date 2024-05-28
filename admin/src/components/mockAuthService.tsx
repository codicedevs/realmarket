export type User = {
    id: string;
    name: string;
    email: string;
};

const mockUser: User = {
    id: '1',
    name: 'lionel andres messi',
    email: 'futbolmessi@example.com',
};

export const mockAuthService = {
    login: (): Promise<User> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockUser);
            }, 500);
        });
    },
    logout: (): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 500);
        });
    },
};
