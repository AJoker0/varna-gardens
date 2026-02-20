const path = require('path');

module.exports = ({ env }) => {
  // Пытаемся получить ссылку на базу данных (Railway сам её сюда подставит при деплое)
  const dbUrl = env('DATABASE_URL');

  // ЕСЛИ МЫ НА СЕРВЕРЕ (Есть DATABASE_URL) -> Используем PostgreSQL
  if (dbUrl) {
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: dbUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        },
        useNullAsDefault: true,
      },
    };
  }

  // ЕСЛИ МЫ ЛОКАЛЬНО (Нет DATABASE_URL) -> Продолжаем использовать SQLite
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };
};