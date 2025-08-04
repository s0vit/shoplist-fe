#!/usr/bin/env node

/**
 * Скрипт для запуска BrowserTools MCP сервера и browser-tools-server
 * Основан на официальной документации: https://browsertools.agentdesk.ai/installation
 * Использование: node scripts/start-mcp-browser.cjs [port]
 */

const { spawn, execSync } = require('child_process');
const { join } = require('path');
const fs = require('fs');

const projectRoot = join(__dirname, '..');

// Цвета для вывода (работают в большинстве терминалов)
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
};

// Функции для вывода
const log = (message) => console.log(`${colors.green}[BrowserTools]${colors.reset} ${message}`);
const error = (message) => console.log(`${colors.red}[ERROR]${colors.reset} ${message}`);
const warn = (message) => console.log(`${colors.yellow}[WARNING]${colors.reset} ${message}`);
const info = (message) => console.log(`${colors.blue}[INFO]${colors.reset} ${message}`);
const success = (message) => console.log(`${colors.magenta}[SUCCESS]${colors.reset} ${message}`);
const mcp = (message) => console.log(`${colors.cyan}[MCP Server]${colors.reset} ${message}`);
const server = (message) => console.log(`${colors.cyan}[Browser Server]${colors.reset} ${message}`);

// Получаем порт из аргументов (по умолчанию 3025 согласно документации)
const port = process.argv[2] || '3025';

// Проверяем, что порт является числом
if (!/^\d+$/.test(port)) {
  error(`Порт должен быть числом. Получено: ${port}`);
  process.exit(1);
}

const portNum = parseInt(port, 10);

// Проверяем, что порт в допустимом диапазоне
if (portNum < 1024 || portNum > 65535) {
  error(`Порт должен быть в диапазоне 1024-65535. Получено: ${portNum}`);
  process.exit(1);
}

// Проверяем наличие Node.js
try {
  execSync('node --version', { stdio: 'pipe' });
} catch (err) {
  error('Node.js не найден. Установите Node.js для запуска BrowserTools MCP сервера.');
  process.exit(1);
}

log(`Запуск BrowserTools на порту ${portNum}`);

// Проверяем, что порт свободен (кроссплатформенный способ)
const isPortInUse = () => {
  try {
    // Для Windows используем netstat, для Unix - lsof
    const isWindows = process.platform === 'win32';
    const command = isWindows ? `netstat -an | findstr :${portNum}` : `lsof -Pi :${portNum} -sTCP:LISTEN -t`;

    const result = execSync(command, { stdio: 'pipe' }).toString().trim();
    return isWindows ? result.includes(`:${portNum}`) : result.length > 0;
  } catch (err) {
    return false; // Порт свободен
  }
};

// Проверяем и освобождаем порт если нужно
if (isPortInUse()) {
  warn(`Порт ${portNum} уже занят. Попытка освободить...`);
  try {
    const isWindows = process.platform === 'win32';
    if (isWindows) {
      // Для Windows используем netstat для поиска PID
      const netstatOutput = execSync(`netstat -ano | findstr :${portNum}`, { stdio: 'pipe' }).toString();
      const lines = netstatOutput.split('\n');
      for (const line of lines) {
        if (line.includes(`:${portNum}`)) {
          const parts = line.trim().split(/\s+/);
          const pid = parts[parts.length - 1];
          if (pid && /^\d+$/.test(pid)) {
            execSync(`taskkill /PID ${pid} /F`, { stdio: 'pipe' });
          }
        }
      }
    } else {
      // Для Unix систем
      execSync(`lsof -ti:${portNum} | xargs kill -9`, { stdio: 'pipe' });
    }
    // Ждем немного для освобождения порта
    setTimeout(() => {}, 2000);
  } catch (err) {
    warn('Не удалось освободить порт автоматически. Попробуйте остановить процесс вручную.');
  }
}

// Проверяем зависимости
const nodeModulesPath = join(projectRoot, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  log('Установка зависимостей...');
  try {
    execSync('pnpm install', { cwd: projectRoot, stdio: 'inherit' });
  } catch (err) {
    error('Ошибка при установке зависимостей.');
    process.exit(1);
  }
}

// Функция очистки
const cleanup = () => {
  log('Остановка BrowserTools серверов...');
  if (global.browserToolsServer) {
    global.browserToolsServer.kill('SIGTERM');
  }
  if (global.mcpServer) {
    global.mcpServer.kill('SIGTERM');
  }
  process.exit(0);
};

// Обработка сигналов для корректного завершения
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

log('Запуск BrowserTools серверов...');
log(`Для подключения используйте порт: ${portNum}`);
log('Для остановки нажмите Ctrl+C');
log('');
info('Убедитесь, что:');
info('1. Установлено расширение BrowserTools в Chrome');
info('2. Открыты Chrome DevTools в нужной вкладке');
info('3. Настроен MCP клиент (Cursor, Windsurf и т.д.)');
log('');

// Запускаем browser-tools-server (должен быть запущен первым)
log('Запуск browser-tools-server...');
const browserServer = spawn('npx', ['@agentdeskai/browser-tools-server@1.2.0'], {
  cwd: projectRoot,
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: true,
  env: {
    ...process.env,
    PORT: portNum.toString(),
  },
});

global.browserToolsServer = browserServer;

// Обрабатываем вывод browser-tools-server
browserServer.stdout.on('data', (data) => {
  const lines = data.toString().split('\n');
  lines.forEach((line) => {
    if (line.trim()) {
      server(line.trim());
    }
  });
});

browserServer.stderr.on('data', (data) => {
  const lines = data.toString().split('\n');
  lines.forEach((line) => {
    if (line.trim()) {
      warn(`Browser Server: ${line.trim()}`);
    }
  });
});

// Запускаем MCP сервер после небольшой задержки
setTimeout(() => {
  log('Запуск BrowserTools MCP сервера...');
  const mcpProcess = spawn('npx', ['@agentdeskai/browser-tools-mcp@1.2.0'], {
    cwd: projectRoot,
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: true,
    env: {
      ...process.env,
      PORT: portNum.toString(),
    },
  });

  global.mcpServer = mcpProcess;

  // Обрабатываем вывод MCP сервера
  mcpProcess.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach((line) => {
      if (line.trim()) {
        mcp(line.trim());
      }
    });
  });

  mcpProcess.stderr.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach((line) => {
      if (line.trim()) {
        warn(`MCP Server: ${line.trim()}`);
      }
    });
  });

  // Обрабатываем завершение MCP процесса
  mcpProcess.on('close', (code) => {
    if (code !== 0) {
      error(`BrowserTools MCP сервер завершился с кодом ${code}`);
    } else {
      success('BrowserTools MCP сервер завершен успешно');
    }
  });

  mcpProcess.on('error', (err) => {
    error(`Ошибка запуска BrowserTools MCP сервера: ${err.message}`);
  });
}, 3000);

// Обрабатываем завершение browser-tools-server
browserServer.on('close', (code) => {
  if (code !== 0) {
    error(`Browser-tools-server завершился с кодом ${code}`);
  } else {
    success('Browser-tools-server завершен успешно');
  }
});

browserServer.on('error', (err) => {
  error(`Ошибка запуска browser-tools-server: ${err.message}`);
  error('Попробуйте:');
  error('1. Установить пакет: npm install -g @agentdeskai/browser-tools-server@1.2.0');
  error('2. Проверить подключение к интернету');
  error('3. Проверить права доступа');
  process.exit(1);
});

// Выводим информацию о настройке
setTimeout(() => {
  log('');
  success('BrowserTools серверы запущены!');
  log('');
  info('Следующие шаги:');
  info('1. Установите расширение Chrome из: https://github.com/AgentDeskAI/browser-tools-mcp');
  info('2. Откройте Chrome DevTools в нужной вкладке');
  info('3. Настройте MCP клиент с командой: npx @agentdeskai/browser-tools-mcp@1.2.0');
  info('4. Откройте BrowserTools панель в Chrome DevTools');
  log('');
  info('Серверы готовы к работе!');
  log('');
}, 5000);
