export const users = [
    { id: 1, username: 'admin', name: 'Javier Cardona', password: 'admin123', role: 'admin' },
    { id: 2, username: 'client', name: 'Javier Cliente', password: 'client123', role: 'client' },
];

export const mockLogin = (username: string, password: string) => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) throw new Error('Credenciales inválidas');
    return { id: user.id, username: user.username, name: user.name, role: user.role, success: true };
};