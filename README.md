# График с выделением z-score

## Описание
Проект представляет собой модифицированную версию графика из примера Recharts. График отображает данные с выделением участков, где модуль z-score превышает 1. Такие участки и точки на них окрашиваются в красный цвет.

## Установка и запуск

1. Клонируйте репозиторий:
```bash
git clone [URL репозитория]
cd [название директории]
```

2. Установите зависимости:
```bash
npm install
```

3. Запустите проект в режиме разработки:
```bash
npm run dev
```

Проект будет доступен по адресу http://localhost:5173

## Технологии
- React
- TypeScript
- Vite
- Recharts
- SCSS Modules

## Структура проекта
- `src/components/App` - основной компонент приложения
- `src/components/CustomLegend` - компонент кастомной легенды
- `src/utils` - вспомогательные функции, включая расчет z-score

## Ссылки
- [Recharts Simple Line Chart](http://recharts.org/en-US/examples/SimpleLineChart)
- [Z-score (Wikipedia)](https://en.wikipedia.org/wiki/Standard_score)
