export function generateToken() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < 6; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }

  return token;
}
