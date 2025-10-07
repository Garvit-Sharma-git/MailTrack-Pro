import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import { connectDatabase } from './config/database';


const PORT = process.env.PORT || 4000;


(async () => {
try {
await connectDatabase();
const server = app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
// attach socket server
const { initSocket } = await import('./config/socket');
initSocket(server);
} catch (err) {
console.error('Failed to start server', err);
process.exit(1);
}
})();