# График с выделением z-score
[ссылка на страницу](https://denispan.github.io/makves/)

## Задание выполнил
<b>Денис Панкрашин</b>
- [телеграм](https://t.me/d6231990)
- 6231990@gmail.com
- +79036231990
- [резюме](https://hh.ru/resume/094c7c8bff0e5260590039ed1f487938326273) 


## Описание
Проект представляет собой модифицированную версию графика из [примера Recharts](http://recharts.org/en-US/examples/SimpleLineChart).<br/> 
График отображает данные с выделением участков, где модуль z-score превышает 1. <br/>
Такие участки и точки на них окрашиваются в красный цвет.

## Установка и запуск

1. Клонируйте репозиторий:
```bash
git clone git@github.com:denispan/makves.git
```

2. Установите зависимости:
```bash
yarn install

или

npm install
```

3. Запустите проект в режиме разработки:
```bash
yarn dev

или

npm run dev
```

Проект будет запущен по адресу http://localhost:5173

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
