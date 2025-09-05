// src/service/user.ts
import { createLogger } from './src/logger.js';
const logger = createLogger('user');

logger.debug('调试信息：%o', { foo: 'bar' }); // 不会写文件，只控制台
logger.info('用户 %d 登录', 12345);
logger.error('写入失败：%s', 'ECONNREFUSED');
