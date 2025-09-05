import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __basename = path.basename(__filename, path.extname(__filename));

/* ---------- 公共格式 ---------- */
const time = winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' });
const labelFmt = (lbl: string) => winston.format.label({ label: lbl });

/* ---------- 控制台：彩色 + 对齐 ---------- */
const consoleFmt = winston.format.combine(
  time,
  winston.format.colorize({ all: true }),
  winston.format.printf(
    ({ timestamp, level, label, message }) => {
      // 级别固定 5 字符宽度，方便对齐
      const lvl = level.padEnd(5);
      return `${timestamp} ${lvl} [${label}] ${message}`;
    }
  )
);

/* ---------- 文件 1：JSON（机器） ---------- */
const jsonTransport = new DailyRotateFile({
  filename: 'logs/app-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  level: 'info',
  format: winston.format.combine(time, winston.format.json()),
});

/* ---------- 文件 2：Pretty（人工） ---------- */
const prettyTransport = new DailyRotateFile({
  filename: 'logs/app-pretty-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '7d',
  level: 'info',
  format: winston.format.combine(
    time,
    winston.format.printf(
      ({ timestamp, level, label, message }) =>
        `${timestamp} ${level.padEnd(5)} [${label}] ${message}`
    ),
  ),
});

/* ---------- 工厂函数 ---------- */
export function createLogger(label?: string) {
  return winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    transports: [
      new winston.transports.Console({ format: consoleFmt }),
      jsonTransport,
      prettyTransport,
    ],
    format: labelFmt(label ?? __basename),
  });
}

/* ---------- 默认 logger ---------- */
export default createLogger();
