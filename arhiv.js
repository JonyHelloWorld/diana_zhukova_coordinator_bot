// подключаем библиотеку dotenv и вызываем метод config
require("dotenv").config();

// импортируем класс Bot из grammy
// классы GrammyError, HttpError - для работы с ошибками
// класс Keyboard - клавиатура
// класс InlineKeyboard - Inline клавиатура
const {
    Bot,
    GrammyError,
    HttpError,
    Keyboard,
    InlineKeyboard,
} = require("grammy");

// npm i @grammyjs/hydrate устанавливаем плагин
//const { hydrate } = require("@grammyjs/hydrate"); // и импортируем его в проект

// создадим инстанс класса Bot и в качестве аргумента передаем ему ключ
const bot = new Bot(process.env.BOT_API_KEY);
//bot.use(hydrate()); // добавляем плагин в бота

// Удаляем команды для всех пользователей, чтобы убрать меню
bot.api.deleteMyCommands();

// показываем меню команд кот есть у бота
// передаем массив объектов
// bot.api.setMyCommands([
//     {
//         // нельзя использовать в имени команды заглавные буквы
//         //это ошибка на стороне телеги и пока она не исправлена
//         //но надо проверить!
//         command: "start",
//         description: "запустить бота",
//     },
//     {
//         command: "inline",
//         description: "тест инлайн клавы",
//     },
//     {
//         command: "share",
//         description: "поделиться данными",
//     },
// ]);

// добавляем слушателей на команды
// обязательно делаем это перед bot.start
// вторым аргументом передаем callback функцию кот выполниться при получ команды
// Ф асинхронная, аргумент "контекст (ctx)"

// bot.command("start", async (ctx) => {
//     await ctx.reply("Здравствуйте ✌️. Что вас интересует? Нажмите на кнопку ниже", {
//         reply_parameters: { message_id: ctx.msg.message_id },
//     }); // бот напишет свой ответ, "ответом" на сообщение
// });
// reply(msg, {object]) - асинх метод окружения (ctx) поэтому используем async/await
// второй аргумент {object} это объект

// Меню Start -------------------------------------------------------------------
bot.command("start", async (ctx) => {
    const inlineKeybord = new InlineKeyboard()
        .text("📚 Обучающие программы", "button_1")
        .row() //перенос с новой строки
        .text("🙋‍♂️ Настройка рекламы", "button_2")
        .row()
        .text("Иной формат сотрудничества", "button_3");
    await ctx.reply(
        "Здравствуйте 🤚. Что вас интересует? Нажмите на кнопку ниже",
        { reply_markup: inlineKeybord }
    );
});

bot.callbackQuery("button_3", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply(
        "По любым другим форматам сотрудничества вы всегда можете написать мне в личку @zharkovalilya"
    );
});
// Меню Курсы -------------------------------------------------------------------
bot.callbackQuery("button_1", async (ctx) => {
    const inlineKeybord = new InlineKeyboard()
        .text("Настройка внутренней рекламы на WB", "button_4")
        .row()
        .text("Настройка внутренней рекламы на Ozon", "button_5")
        .row()
        .text("Курс 'Погружение в таргет ВКонтакте'", "button_6")
        .row()
        .text("Курс про рекламу в телеграм", "button_7")
        .row()
        .text("❓ Задать вопрос по обучению", "button_8")
        .row()
        .text("↩️ назад", "button_9");

    await ctx.answerCallbackQuery();
    await ctx.reply("Выберите название курса, чтобы узнать подробности", {
        reply_markup: inlineKeybord,
    });
});

bot.callbackQuery("button_9", async (ctx) => {
    const inlineKeybord = new InlineKeyboard()
        .text("📚 Обучающие программы", "button_1")
        .row() //перенос с новой строки
        .text("🙋‍♂️ Настройка рекламы", "button_2")
        .row()
        .text("Иной формат сотрудничества", "button_3");
    await ctx.reply("Что вас интересует? Нажмите на кнопку ниже", {
        reply_markup: inlineKeybord,
    });
});

bot.callbackQuery("button_8", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply(
        "Любые вопросы по обучению, тарифам, рассрочкам, продлению доступа вы можете задать руководителю онлайн-школы Ольге @olgamenshinina"
    );
});

// Меню Настройка рекламы-------------------------------------------------------------------
bot.callbackQuery("button_2", async (ctx) => {
    const inlineKeybord = new InlineKeyboard()
        .text("Внутренняя реклама на Wildberryes", "button_20")
        .row()
        .text("Внутренняя реклама на Ozon", "button_10")
        .row()
        .text("Таргетированная реклама ВКонтакте", "button_11")
        .row()
        .text("Контекстная реклама в Яндекс", "button_12")
        .row()
        .text("Продвижение в Telegram", "button_13")
        .row()
        .text("Персональная консультация таргетолога", "button_14")
        .row()
        .text("❓ Задать вопрос по услугам агентства", "button_15")
        .row()
        .text("↩️ назад", "button_9");
    await ctx.answerCallbackQuery();
    await ctx.reply(
        "Выберите интересующее вас направление, чтобы узнать стоимость услуг и оставить заявку. Руководитель агентства свяжется с вами, уточнит все вводные данные и подскажет, как мы можем помочь в продвижении вашего проекта",
        {
            reply_markup: inlineKeybord,
        }
    );
});

bot.callbackQuery("button_15", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply(
        "Любой вопрос по сотрудничеству с нами вы можете задать руководителю агентства Екатерине @EKonoplyannikova"
    );
});

// Курс Wildberries -------------------------------------------------------------------
bot.callbackQuery("button_4", async (ctx) => {
    const message = `
«Настройка внутренней рекламы на Wildberries» - это авторский курс с поддержкой кураторов - опытных таргетологов моей команды

После обучения вы сможете запускать рекламу на маркетплейсе для своего бизнеса или работать с карточками клиентов.

Цель курса - дать максимум инструментов, чтобы вы выстроили систему управления рекламой с учетом всех обновлений на площадке.

Для кого курс?

- для селлеров WB, которые хотят понять все закономерности, чтобы эффективнее управлять рекламой и масштабировать имеющиеся результаты

- для менеджеров маркетплейса, которые хотят систематизировать знания и заполнить пробелы, чтобы напрямую влиять на продажи в проектах клиентов

- для таргетологов/ контекстологов, которые планируют предоставлять комплексную услугу клиентам, вести внешний трафик из ВК/Яндекса и настраивать внутреннюю рекламу.

- для новичков, которые с нуля хотят освоить перспективную онлайн-профессию.

Изучить программу курса и наполнение тарифов можно на сайте`;
    const inlineKeybord = new InlineKeyboard()
        .url("📖 Смотреть программу", "https://s.bothelp.io/r/6y2lyu.jvt")
        .row()
        .text("❓ У меня остался вопрос", "button_18")
        .row()
        .text("↩️ назад", "button_1");

    await ctx.answerCallbackQuery();
    await ctx.reply(message, {
        reply_markup: inlineKeybord,
    });
});

bot.callbackQuery("button_18", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply(
        "Задайте, пожалуйста, свой вопрос и оставьте контакты для связи. В ближайшее время мы вернемся с ответом 🙌"
    );
});

// Курс Ozon -------------------------------------------------------------------
bot.callbackQuery("button_5", async (ctx) => {
    const message = `
«Настройка внутренней рекламы на Ozon» - это обучение с поддержкой кураторов - практикующих таргетологов моей команды.

Старт 6 потока - 11 ноября.

За 4 недели вы научитесь запускать рекламу на Ozon для своего бизнеса или продвигать карточки клиентов. Детально изучите все типы рекламных кампаний. Поймете, как выбирать рекламные стратегии под задачи и проекта и анализировать их эффективность.

Курс для:

⁃ селлеров, которые уже продают на Ozon и хотят улучшить свои показатели за счет внутренней рекламы

⁃ менеджеров маркетплейса, которые хотят полностью понимать систему работы с рекламой и упорядочить разрозненные знания

⁃ таргетологов, специалистов по контекстной рекламе, которые планируют вести не только внешний, но и внутренний трафик на карточки клиентов.

Переходите по ссылке, чтобы изучить программу и занять место на курсе 👇
`;
    const inlineKeybord = new InlineKeyboard()
        .url("📖 Смотреть программу", "https://s.bothelp.io/r/6r4pgz.jvt")
        .row()
        .text("❓ У меня остался вопрос", "button_18")
        .row()
        .text("↩️ назад", "button_1");

    await ctx.answerCallbackQuery();
    await ctx.reply(message, {
        reply_markup: inlineKeybord,
    });
});

// Погружение в таргет -------------------------------------------------------------------
bot.callbackQuery("button_6", async (ctx) => {
    const message = `
«Погружение в таргет ВКонтакте»

Курс рассчитан на тех, кто хочет освоить профессию таргетолог с нуля. А также на действующих таргетологов, smm-специалистов и предпринимателей, которые хотят по максимуму использовать возможности ВК для продвижения своего бизнеса.

После обучения вы сможете:
✅ привлекать подписчиков в сообщество
✅ работать с рассылками внутри сообщества
✅ при помощи парсеров собирать самых «горячих» людей, чтобы получать больше заявок на услуги
✅ продвигать сайты и карточки товаров на маркетплейсах

Для опытных специалистов, помимо базы, будет много технических фишек: пиксель и настройка событий, Google Tag Manager и Яндекс.Метрика, рассылки в Senler и чат-боты.

Новички научатся искать клиентов и грамотно с ними взаимодействовать, чтобы работать с проектом системно и вдолгую.

Начать обучение можно в любой момент.
Старт — сразу после оплаты.

На курсе есть два тарифа «Стандарт» и «Наставник» с индивидуальной поддержкой опытного куратора — таргетолога моей команды.

Жмите на ссылку ниже, чтобы изучить программу курса и тарифы 👇
`;
    const inlineKeybord = new InlineKeyboard()
        .url("📖 Смотреть программу", "https://s.bothelp.io/r/6r4ph2.jvt")
        .row()
        .text("❓ У меня остался вопрос", "button_18")
        .row()
        .text("↩️ назад", "button_1");

    await ctx.answerCallbackQuery();
    await ctx.reply(message, {
        reply_markup: inlineKeybord,
    });
});

// Погружение в Телеграм -------------------------------------------------------------------
bot.callbackQuery("button_7", async (ctx) => {
    const message = `«Погружение в Телеграм» - практический онлайн-курс о рекламе и продвижении на одной из самых популярных площадок

На обучении вы получите необходимые знания, чтобы работать таргетологом на этой площадке. Или привлекать аудиторию в Телеграм для своего бизнеса.

Курс - это 3 объемных блока:

- Начинаем с подготовки к продвижению и основ маркетинга, детально изучаем ЦА и конкурентов.

- Далее пошагово разбираем сразу 2 канала привлечения трафика - Telegram Ads и Яндекс. От разработки стратегии, создания посадочных страниц до аналитики и оптимизации запущенных рекламных кампаний.

- У вас перед глазами будут наши рабочие связки, лайфхаки, разборы кейсов в разных нишах.

+ Будет и бонусный блок о том, как искать клиентов и грамотно с ними взаимодействовать, чтобы работать с проектом системно и в долгую.

Курс для:

- действующих таргетологов, smm-специалистов
- тех, кто хочет освоить профессию таргетолога в Телеграм с нуля
- предпринимателей и экспертов, которые планируют по максимуму использовать возможности Телеграм для собственного бизнеса.

Начать обучение можно в любой момент.
Старт — сразу после оплаты.

На курсе есть 2 тарифа - «Стандарт» и «Наставник» с индивидуальной обратной связью от опытных специалистов моей команды и практикой в рекламных кабинетах Tg Ads и Яндекс.

Мы предоставляем не демо-кабинеты для знакомства с функционалом, а действующие рекламные кабинеты.

Переходите по ссылке, чтобы изучить программу и выбрать свой тариф 👇`;
    const inlineKeybord = new InlineKeyboard()
        .url("📖 Смотреть программу", "https://s.bothelp.io/r/6r4pj7.jvt")
        .row()
        .text("❓ У меня остался вопрос", "button_18")
        .row()
        .text("↩️ назад", "button_1");

    await ctx.answerCallbackQuery();
    await ctx.reply(message, {
        reply_markup: inlineKeybord,
    });
});

// Настройка рекламы на Wildberries -------------------------------------------------------------------
bot.callbackQuery("button_20", async (ctx) => {
    const message = `Настройка внутренней рекламы на Wildberries

Внутренняя реклама на Wildberries позволяет показывать ваш товар на выгодных позициях при поисковых запросах, в каталоге, карточках, рекомендациях. Реклама работает по принципу аукциона, мы анализируем и определяем необходимые ставки для выкупа рекламных мест.

Как оказывается услуга и что в неё входит?

✅ Рекомендации по подготовке карточки товара к запуску рекламной кампании  
✅ Анализ и рекомендации по использованию рекламных инструментов и вариантов размещения для конкретного товара  
✅ Настройка и запуск рекламной кампании  
✅ Отслеживание статистики рекламной кампании и ее ключевых показателей и предложение конкретных действий по их улучшению  
✅ Работа с аналитикой (анализ продаж до запуска рекламной кампании и во время рекламной кампании)  
✅ Оценка эффективности рекламной кампании на предмет соотношения потраченного бюджета и количества совершенных заказов и продаж  
✅ Предоставление еженедельной отчетности

Стоимость от 30 000 руб/месяц*  
*При количестве карточек до 3 штук. Далее каждая карточка +5000 руб.

Сомневаетесь в эффективности внутренней рекламы?  
Предлагаем тестовый период 14 дней за 15 000 руб, чтобы вы смогли оценить результат.`;
    const inlineKeybord = new InlineKeyboard()
        .text("✅ Оставить заявку", "button_19")
        .row()
        .text("❓ Задать вопрос об услуге", "button_18")
        .row()
        .text("↩️ назад", "button_2");

    await ctx.answerCallbackQuery();
    await ctx.reply(message, {
        reply_markup: inlineKeybord,
    });
});

bot.callbackQuery("button_19", async (ctx) => {
    const message = `Пришлите свои контактные данные в ответ на это сообщение.

        Руководитель агентства свяжется с вами, уточнит все вводные и подскажет, чем мы можем быть полезны для вашего проекта"`;
    await ctx.answerCallbackQuery();
    await ctx.reply(message);
});

// Настройка рекламы на Ozon -------------------------------------------------------------------
bot.callbackQuery("button_10", async (ctx) => {
    const message = `Настройка внутренней рекламы на Ozon

Используйте внутренние инструменты OZON, чтобы масштабировать продажи своих товаров.

Как оказывается услуга и что в неё входит?

✅ Рекомендации по подготовке карточки товара к запуску рекламной кампании  
✅ Анализ и рекомендации по использованию рекламных инструментов и вариантов размещения для конкретного товара  
✅ Настройка и запуск рекламной кампании  
✅ Отслеживание статистики рекламной кампании и ее ключевых показателей и предложение конкретных действий по их улучшению  
✅ Предоставление еженедельной отчетности

Стоимость от 30 000 руб/месяц 
При количестве карточек до 3 штук. Далее каждая карточка +5000 руб.`;

    const inlineKeybord = new InlineKeyboard()
        .text("✅ Оставить заявку", "button_19")
        .row()
        .text("❓ Задать вопрос об услуге", "button_18")
        .row()
        .text("↩️ назад", "button_2");

    await ctx.answerCallbackQuery();
    await ctx.reply(message, {
        reply_markup: inlineKeybord,
    });
});

// Настройка рекламы ВКонтакте -------------------------------------------------------------------
bot.callbackQuery("button_11", async (ctx) => {
    const message = `Таргетированная реклама ВКонтакте  
  
Покажите вашу рекламу, пока пользователи листают ленту социальной сети ВКонтакте, посещают любимые сайты, проверяют почту в Mail или используют мобильные сайты и приложения.  
  
Таргетированную рекламу во ВКонтакте можно настроить на нужную для вас целевую аудиторию: на подписчиков конкурентов, по интересам, полу, возрасту и месту нахождения.  
  
Как оказывается услуга и что в неё входит?  
  
✅ Мы отправляем вам бриф для заполнения  
✅ Проверяем посадочные площадки на готовность к приему людей и на соответствие целям рекламы (сообщество , карточки маркетплейсов, сайт). Выдаем рекомендации по тому, что нужно изменить или дополнить. Отправляем файл с идеями для контента  
✅ Пишем стратегию запуска кампаний. Указываем, на какой цели будем работать, с каких аудиторий начинаем, бюджеты, куда ведём людей с рекламы  
✅ Ставим пиксель ВК при наличии сайта  
✅Пишем для вас рекламные тексты и создаем креативы. В стоимость входят не более 10 креативов, далее 500 руб. за 1 шт. Сложные анимированные ролики идут за дополнительную цену — от 1500 руб. за 1 шт.  
✅ Собираем аудитории. Используем ваши источники для создания look-a-like (номера телефонов ваших клиентов, аудитории сайта, работа с Парсерами)  
✅Запускаем тестовые рекламные кампании для выявления лучших и рабочих креативов, аудиторий, если ведём людей на сайт — размечаем UTM метками  
✅Анализируем запущенные рекламные кампании и оптимизируем их  
✅ Масштабируем лучшие кампании. Иными словами, увеличиваем числоцелевых действий (заявки, клики, конверсии и т.д.) при сохранении их стоимости  
✅Запускаем кампании ретаргета  
  
Стоимость 45 000 руб/мес  
+ 5% от рекламного бюджета, если он превышает 100 000 руб.  
Минимальный бюджет 40 000 руб.`;

    const inlineKeybord = new InlineKeyboard()
        .text("✅ Оставить заявку", "button_19")
        .row()
        .text("❓ Задать вопрос об услуге", "button_18")
        .row()
        .text("↩️ назад", "button_2");

    await ctx.answerCallbackQuery();
    await ctx.reply(message, {
        reply_markup: inlineKeybord,
    });
});

// Настройка рекламы Яндекс -------------------------------------------------------------------
bot.callbackQuery("button_12", async (ctx) => {
    const message = `Настройка контекстной рекламы в Яндекс.Директ

Запуск рекламы через Яндекс.Директ позволяет:
- показать рекламу тем, кто уже искал похожие товары или услуги через поисковую строку Яндекс
- познакомить аудиторию с брендом, повысить его узнаваемость и создать интерес к продукту
- возвращать пользователей на сайт и стимулировать повторные покупки с помощью ретаргета
  
Ваша реклама будет показываться на сотнях тысяч других сайтов, таких как: ВКонтакте, все сервисы Яндекса, Mail, Рамблер, Одноклассники, Кинопоиск и другие.
  
Как оказывается услуга и что в неё входит?
  
✅ Анализ сайта, на который будет идти рекламный трафик. Анализ конкурентов, потребностей целевой аудитории
✅ Аудит рекламного кабинета и ранее запущенных рекламных кампаний
✅ Подключение и настройка яндекс метрики и целей
✅ Создание рекламной стратегии. Подбор семантического ядра на основе главных ключевых запросов. Подбор ключей по тематике с помощью специальных сервисов, фильтрация;
✅ Создание текстов и креативов для рекламных кампаний (РК) под запросы с учетом региона продвижения. Тестирование кампаний с оплатой за конверсии
✅Определение ставок по РК, формирование рекламного бюджета. Управление рекламными кампаниями
✅ Еженедельная отчетность и анализ полученных результатов
  
Стоимость 45 000 руб/мес
+ 5% от рекламного бюджета, если он превышает 100 000 руб.
Минимальный бюджет 40 000 руб.`;

    const inlineKeybord = new InlineKeyboard()
        .text("✅ Оставить заявку", "button_19")
        .row()
        .text("❓ Задать вопрос об услуге", "button_18")
        .row()
        .text("↩️ назад", "button_2");

    await ctx.answerCallbackQuery();
    await ctx.reply(message, {
        reply_markup: inlineKeybord,
    });
});

// Настройка рекламы Телеграм -------------------------------------------------------------------
bot.callbackQuery("button_13", async (ctx) => {
    const message = `Продвижение в Telegram  
Telegram очень быстро растет, и возможности этой площадки колоссальные: можно развивать свой канал или заводить аудиторию из других каналов на любой внешний ресурс.  
  
Как привлечь подписчиков в ваш Telegram канал? Мы предлагаем три способа:  
1️⃣официальная реклама в Telegram Ads  
2️⃣реклама на канал через Яндекс.Директ или Вконтакте  
3️⃣закупка рекламы в других Telegram каналах  
  
Из Telegram можно вести трафик на сайт, бота или карточки маркетплейсов.  
  
Стоимость зависит от канала трафика:  
  
1️⃣ Официальная реклама в Telegram Ads  
  
Стоимость услуги агентства - 45 000 руб/месяц +5% от рекламного бюджета, если он превышает 100 000 руб.  
Минимальный рекламный бюджет при создании кабинета 500 евро (дополнительно НДС 20% и комиссия сервиса 15%, итого 690 евро).  
  
2️⃣ Привлечение подписчиков в Telegram канал из Яндекс.Директ или ВКонтакте -  
40 000 руб/месяц +5% от рекламного бюджета, если он превышает 100 000 руб. Минимальный рекламный бюджет 30 000 руб  
  
3️⃣ Закупка рекламы в каналах -  
35 000 руб/месяц + 20% от рекламного бюджета. Минимальный рекламный бюджет от 100 000 руб.  
  
Рекламная подача (ТЗ для блогеров) оплачивается отдельно и пишется 1 раз на срок 4-6-12 месяцев, стоимость от 10 000 до 20 000 руб.`;

    const inlineKeybord = new InlineKeyboard()
        .text("✅ Оставить заявку", "button_19")
        .row()
        .text("❓ Задать вопрос об услуге", "button_18")
        .row()
        .text("↩️ назад", "button_2");

    await ctx.answerCallbackQuery();
    await ctx.reply(message, {
        reply_markup: inlineKeybord,
    });
});

// Персональная консультация -------------------------------------------------------------------
bot.callbackQuery("button_14", async (ctx) => {
    const message = `Персональная консультация таргетолога моей команды  
  
Какую цель выбрать в рекламном кабинете?  
На какую аудиторию эффективнее запускать рекламу? Какая стратегия подходит моему бизнесу?  
  
На консультации вы получите ответы на все ваши вопросы.  
  
Кому подойдет формат индивидуальной консультации?  
  
Всем, кто уже владеет азами настройки рекламы в кабинете Ads Manager, ВКонтакте, Яндекс Директ, Wildberries, Ozon или Telegram Ads, но хотел бы получить рекомендации по продвижению именно своего товара/услуги с помощью рекламы.  
  
*Услуга не подходит, если вам нужно обучиться с нуля.  
  
Как оказывается услуга и что в нее входит?  
  
✅ Вы заполняете бриф, указываете опыт запуска предыдущих кампаний, прописываете ваши вопросы и какой результат хотели бы получить  
✅ Разберем ранее запущенные рекламные кампании  
✅ Проанализируем посадочную страницу  
✅ Определим эффективные стратегии запуска под вашу цель  
✅ Ответим на все заданные вопросы  
✅ После консультации у вас будет понимание, какую стратегию выбрать, как анализировать и влиять на результат рекламной кампании  
  
Стоимость от 8000 руб/час  
* стоимость зависит от площадки, которую вы хотите обсудить.`;

    const inlineKeybord = new InlineKeyboard()
        .text("✅ Оставить заявку", "button_19")
        .row()
        .text("❓ Задать вопрос об услуге", "button_18")
        .row()
        .text("↩️ назад", "button_2");

    await ctx.answerCallbackQuery();
    await ctx.reply(message, {
        reply_markup: inlineKeybord,
    });
});
//либо можно это сделать так
// bot.callbackQuery(/button_[1-3]/, async (ctx) => {
//     await ctx.answerCallbackQuery();
//     await ctx.reply(`ты нажал ${ctx.callbackQuery.data}`);
// });

//либо можно это сделать так
//реагируем на callback_query
//и определяем какая callback была нажата
// bot.on("callback_query:data", async (ctx) => {
//     await ctx.answerCallbackQuery();
//     await ctx.reply(`ты нажал ${ctx.callbackQuery.data}`);
// });

// bot.command("start", async (ctx) => {
//     const moodKeybord = new Keyboard()
//         .text("📚 Обучающие программы")
//         .row() //перенос с новой строки
//         .text("🙋‍♂️ Настройка рекламы")
//         .row()
//         .text("Иной формат сотрудничества")
//         .resized(); //подгоняет кнопки под содержимое
//     await ctx.reply("Как настроение?", { reply_markup: moodKeybord });
// });

// делаем кастомную клаву
// bot.command("share", async (ctx) => {
//     const shareKeybord = new Keyboard()
//         .requestLocation("Поделиться локацией")
//         .requestContact("Поделиться контактами")
//         .requestPoll("Опрос")
//         .placeholder("напиши тут текст для объяснения") //наш текст в поле ввода
//         .resized(); //подгоняет кнопки под содержимое
//     await ctx.reply("Чем хочешь поделиться?", { reply_markup: shareKeybord });
// });

// bot.on(":contact", async (ctx) => {
//     await ctx.reply("спасибо за телефон, вы добавлены в спам рассылку");
//     //пишем логику обработки получения контакта
// });

// bot.hears("Плохо", async (ctx) => {
//     await ctx.reply("не грусти, поди чайку попей)");
// });

// bot.command("start", async (ctx) => {
//     await ctx.react("🍌"); //реакция на сообщение пользователя
//     await ctx.reply(
//         "приветик, вот <a href='https://t.me/BotFather'>ссылка </a> на ТГ-канал. <span class='tg-spoiler'> Это спойлер </span>",
//         {
//             parse_mode: "HTML", //вставляем html теги в ответ бота
//         } //напр: ссылку, теги курсив, жирный, спойлер (скрытый текст) и тд
//     ); //https://core.telegram.org/bots/api#html-style справка по вставкам
// }); //MarkdownV2 - форматирование маркдаун (** ## и тп)
// [это ссылка маркдаун](https://t.me/BotFather)

// disable_web_page_preview: true - отключает предпросмотр ссылок в сообщении
// тут неск команд в один массив свернули и на все их одна реакция будет - "hi-hi"
// bot.command(["command_1", "command_2"], async (ctx) => {
//     await ctx.reply("тут реакция на команду");
// });

// // слушатель на фото ИЛИ голосовое
// bot.on(["message:photo", "message:voice"], async (ctx) => {
//     await ctx.reply("реагирую на фото");
// });

// // слушатель на фото И url
// bot.on("message:photo").on("::url"),
//     async (ctx) => {
//         await ctx.reply("среагирую на фото + url");
//     };
// слушатель на фото И url
// bot.on("message:entities:url", async (ctx) => {
//     await ctx.reply("среагирую на url");
// });

// bot.on("message", async (ctx) => {
//     console.log(ctx.me); //me - инфа о боте
//     //from - инфа об отправителе
//     //msg - инфа о сообщении
// });

// bot.on("message", async (ctx) => {
//     await ctx.reply("реагирую на любое сообщение");
// });

//тема "регулярные выражения"
// если увидит в сообщении "жопа" то сработает
// bot.hears(/жопа/, async (ctx) => {
//     await ctx.reply("харе ругаться, скотина");
// });

// // сработает при точном совпадении фразы
// bot.hears("ping", async (ctx) => {
//     await ctx.reply("pong");
// });

// // можно настраивать свои фильтры
// bot.on("message").filter(
//     (ctx) => {
//         // логика фильтра
//         return ctx.from.id === 786114834; // бот ответит только если ID пользователя совпадет
//     },
//     async (ctx) => {
//         // Ф ответа пользователю
//         await ctx.reply("ваш ID совпал");
//     }
// );

// "message:photo" - среагирует на фото // ":photo" - краткая запись
// "message:video" - среагирует на видео
// "message:voice" - среагирует на голосовое
// "message:media" - среагирует на фото/видео
// "message:entities:url" - среагирует на сообщ в кот есть ссылки //::url -краткая запись
// фильтры bot.on - https://grammy.dev/guide/filter-queries

// смотри документацию, там много вариантов реагирования

// код обработчика ошибок, взят из документации
// https://grammy.dev/guide/errors
bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e);
    } else {
        console.error("Unknown error:", e);
    }
});

// запускаем бота используя метод start
bot.start();
