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

// создадим инстанс класса Bot и в качестве аргумента передаем ему ключ
const bot = new Bot(process.env.BOT_API_KEY);

const fs = require("fs");
const path = require("path"); // Подключаем path
// const fotoPath = path.join(__dirname, "foto"); // Путь к папке с фото

const USERS_FILE = path.join(__dirname, "users.json");

// Функция для загрузки пользователей из файла
function loadUsers() {
    try {
        if (fs.existsSync(USERS_FILE)) {
            const data = fs.readFileSync(USERS_FILE, "utf8");
            return JSON.parse(data);
        }
    } catch (err) {
        console.error("Ошибка загрузки users.json:", err);
    }
    return [];
}

// Функция для сохранения пользователей в файл
function saveUsers(users) {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    } catch (err) {
        console.error("Ошибка сохранения users.json:", err);
    }
}

// Удаляем команды для всех пользователей, чтобы убрать меню
bot.api.deleteMyCommands();

// Меню Start -------------------------------------------------------------------
bot.command("start", async (ctx) => {
    console.log(`Команда /start от пользователя ${ctx.from.id}`); // Логируем вызов обработчика

    const userId = ctx.from.id;
    const username = ctx.from.username ? `@${ctx.from.username}` : "Без имени";
    const firstName = ctx.from.first_name || "Не указано";
    const lastName = ctx.from.last_name || "";

    console.log("Загружаем пользователей...");
    let users = loadUsers();
    console.log("Пользователи загружены:", users.length);

    // Проверяем, есть ли пользователь в базе
    const isNewUser = !users.some((user) => user.id === userId);

    if (isNewUser) {
        users.push({ id: userId, username, firstName, lastName });
        saveUsers(users);
        // }

        // Отправляем сообщение в группу
        const groupId = -1002275331840; // Заменить на ID своей группы
        const message = `🚀 Новый пользователь активировал бота!  
👤 Имя: ${firstName} ${lastName}  
📌 Юзернейм: ${username}  
🆔 ID: ${userId}`;

        try {
            await bot.api.sendMessage(groupId, message);
        } catch (error) {
            console.error("Ошибка при отправке сообщения в группу:", error);
        }
        // await bot.api.sendMessage(groupId, message);
    }

    const inlineKeybord = new InlineKeyboard()
        .text("Квартиры ЖК«Кислород» со СКИДКОЙ 20%", "button_1")
        .row() //перенос с новой строки
        .text("Это ВАЖНО знать в 2025 году!", "button_2")
        .row()
        .text("Трасса Джубга-Сочи, ЧЕГО ЖДАТЬ?", "button_3")
        .row()
        .text("ТОП 5 районов СОЧИ для жизни", "button_44")
        .row()
        .text("Узнать больше об эксперте", "button_5")
        // .row()
        // .text("Наши направления работ", "button_6")
        .row()
        .text("Задать вопрос", "button_7");

    console.log(`Отправляем приветствие пользователю ${userId}`);
    await ctx.reply(
        "Здравствуйте 🤚. Выберите интересующий вас раздел и нажмите на кнопку ниже",
        { reply_markup: inlineKeybord }
    );
});

bot.callbackQuery("button_7", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply(
        "Вы всегда можете написать мне в личку и задать любой вопрос касательно недвижимости в Сочи и я постараюсь максимально подробно вам ответить @Diana_Zhukova_Sochi"
    );
});

bot.callbackQuery("button_1", async (ctx) => {
    const inlineKeybord = new InlineKeyboard()
        // .text("Получить подборку квартир", "button_4")
        // .row()
        .text("❓ У меня есть вопрос", "button_18")
        .row()
        .text("↩️ назад", "button_9");

    await ctx.answerCallbackQuery();

    // Отправляем картинку
    // await ctx.replyWithPhoto(
    //     { source: path.join(fotoPath, "o2.jpg") },
    //     {
    //         caption:
    //             "*🏠 Подборка квартир ЖК «Кислород» со скидкой 20%* \n\n" +
    //             "✅ Современные планировки\n" +
    //             "✅ Развитая инфраструктура\n" +
    //             "✅ Охраняемая территория\n" +
    //             "✅ Скидка 20% при бронировании\n\n" +
    //             "Нажмите кнопку ниже, чтобы получить подборку 👇",
    //         parse_mode: "Markdown",
    //         reply_markup: inlineKeybord,
    //     }
    // );
    // Отправляем только текст
    await ctx.reply(
        "🏠 Специальное предложение на ограниченное число лотов в ЖК «Кислород» – минус 20%! \n\n" +
            "Условия действуют ограниченное время – не упустите момент!\n\n" +
            "Напишите, пожалуйста мне в личку 'Кислород' @Diana_Zhukova_Sochi и я вышлю вам подборку квартир с ценами, планировками плюс подробное описание 🙌",
        {
            // parse_mode: "Markdown",
            reply_markup: inlineKeybord,
        }
    );
});

bot.callbackQuery("button_18", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply(
        "Напишите, пожалуйста мне свой вопрос в личку @Diana_Zhukova_Sochi и я постараюсь максимально подробно вам ответить 🙌"
    );
});

bot.callbackQuery("button_9", async (ctx) => {
    const inlineKeybord = new InlineKeyboard()
        .text("Квартиры ЖК«Кислород» со СКИДКОЙ 20%", "button_1")
        .row()
        .text("Это ВАЖНО знать в 2025 году!", "button_2")
        .row()
        .text("Трасса Джубга-Сочи, ЧЕГО ЖДАТЬ?", "button_3")
        .row()
        .text("ТОП 5 районов СОЧИ для жизни", "button_44")
        .row()
        .text("Узнать больше об эксперте", "button_5")
        // .row()
        // .text("Наши направления работ", "button_6")
        .row()
        .text("Задать вопрос", "button_7");
    await ctx.reply(
        "Выберите интересующий вас раздел и нажмите на кнопку ниже",
        {
            reply_markup: inlineKeybord,
        }
    );
});

// -------------------------------------------------------------------
bot.callbackQuery("button_2", async (ctx) => {
    const message = `
Друзья, постаралась собрать для вас важную информацию, с которой вы обязаны ознакомиться перед покупкой недвижимости в 2025 году

‼️ Важно:
・ [Налоги в 2025](https://t.me/dianazhukovainvest/3387)
・ [Штрафы за неуплату налога с продажи имущества](https://t.me/dianazhukovainvest/3498)
・ [Новые законы 2025 года, касающиеся всех сфер жизни](https://t.me/dianazhukovainvest/3342)

🏠 Лучшие предложения
・ [Февральские скидки на недвижимость](https://t.me/dianazhukovainvest/3481)
・ [Самые выгодные предложения за наличный расчет](https://t.me/dianazhukovainvest/3470)

☝️ Полезно:
・ [Чек-лист апартаменты Сочи](https://t.me/dianazhukovainvest/3435)
・ [Как пополнится гостиничный рынок Сочи в 2025 году](https://t.me/dianazhukovainvest/3397)
・ [Минимальные требования к отделке квартир в новостройках](https://t.me/dianazhukovainvest/3439)

🫰 Расчеты
・ [ТХ ЛеСочи инвестиционный расчет](https://t.me/dianazhukovainvest/3406)

[Записаться на бесплатную консультацию](https://t.me/Diana_Zhukova_Sochi)
`;
    const inlineKeybord = new InlineKeyboard()
        // .text("Получить подборку квартир", "button_20")
        // .row()
        .text("❓ У меня есть вопрос", "button_18")
        .row()
        .text("↩️ назад", "button_9");
    await ctx.answerCallbackQuery();
    await ctx.reply(message, {
        parse_mode: "Markdown",
        reply_markup: inlineKeybord,
    });
});

// Первая полезняшка -------------------------------------------------------------------
bot.callbackQuery("button_3", async (ctx) => {
    const message = `
Трасса Джубга-Сочи УСКОРИТ путь в 5 раз!? Чего ждать НА САМОМ ДЕЛЕ?!

В видео мы подробно рассмотрим все аспекты, поэтому обязательно досмотрите его до конца, чтобы узнать, как изменится инвестиционная привлекательность курортных городов. 

Хотите узнать важную информацию по этой теме? Жмите по ссылке ниже 👇

https://www.youtube.com/watch?v=4fNyS8QARHE
`;
    const inlineKeybord = new InlineKeyboard()
        // .url("📖 Смотреть программу", "https://s.bothelp.io/r/6y2lyu.jvt")
        // .row()
        .text("❓ У меня есть вопрос", "button_18")
        .row()
        .text("↩️ назад", "button_9");

    await ctx.answerCallbackQuery();
    await ctx.reply(message, {
        reply_markup: inlineKeybord,
    });
});

// Вторая полезняшка -------------------------------------------------------------------
bot.callbackQuery("button_44", async (ctx) => {
    const message = `
ТОП 5 районов в СОЧИ для жизни

В видео мы обсудим ТОП 5 лучших районов города для комфортной жизни. 
Я расскажу о плюсах и минусах каждого из них, затронем важные моменты: доступность, инфраструктуру, экологию и условия для семей с детьми. 

Это видео поможет вам определиться с выбором района, который идеально подойдет именно вам — будь то для постоянного проживания или временного отдыха.

Обязательно смотрите до конца, чтобы не пропустить важные детали и полезные советы!

Для просмотра видео жмите по ссылке ниже 👇

https://vkvideo.ru/video-210973722_456244703

`;
    const inlineKeybord = new InlineKeyboard()
        // .url("Смотреть видео", "https://vkvideo.ru/video-210973722_456244703")
        // .row()
        .text("❓ У меня есть вопрос", "button_18")
        .row()
        .text("↩️ назад", "button_9");

    await ctx.answerCallbackQuery();
    await ctx.reply(message, {
        reply_markup: inlineKeybord,
    });
});

// Про эксперта -------------------------------------------------------------------
bot.callbackQuery("button_5", async (ctx) => {
    const message = `
*Хочу поприветствовать, тех кто присоединился к моему боту помощнику. Я очень рада видеть вас тут* 😊

👩🏻‍💻 Меня зовут Жукова Диана - я эксперт по недвижимости Сочи и практикующий инвестор! Большая часть активов моего портфеля - это Сочи. В этом рынке я разбираюсь, и в этом рынке я уверена исходя из опыта! 

Немного обо мне тут👇🏻
[Моя история, часть 1](https://t.me/dianazhukovainvest/1249)
[Моя история, часть 2](https://t.me/dianazhukovainvest/1409)

В боте вы сможете ознакомиться с наиболее важной информацией по недвижимости Сочи.

📢 *Мои соцсети:*  

▶️ [Телеграм-канал](https://t.me/dianazhukovainvest)  
▶️ [ВКонтакте](https://vk.com/dianazhukovaa)  
▶️ [YouTube](https://www.youtube.com/@dianazhukovasochi)  


✅ В моих соцсетях вы найдите все о Сочи, о недвижимости города-курорта, о районах, о доходе от недвижимости! 
✅ Новостройки и вторичный рынок, старты продаж, присейлы и объекты ниже рынка! 
✅ Обсуждаем все - комплексы, риски, инвестиции и переезд! 
✅ Стараемся, чтобы не один вопрос не остался без ответа! Отвечают на все вопросы эксперты, большая часть которых, практикующие инвесторы, с огромным опытом в сфере недвижимости! 

📌 Если будут вопросы, пишите в [личные сообщения](https://t.me/Diana_Zhukova_Sochi)

✅ Работаем индивидуально с каждым! Выстраиваем полный, длинный цикл с клиентом. От выбора стратегии, одобрения ипотеки, до получения ключей - мы с вами!

✅ Дальше, по желанию - реализация объекта, ремонт, надзор, клининг, забираем в управление ваш объект. 

Я надеюсь быть для вас полезной! 😉

-----------

📎 Полезные ссылки:
✔️ [Здесь](https://drive.google.com/file/d/1wgagkQkcCDDvfZIExHs3Him7OJzTpYb5/view?usp=drivesdk) вы можете скачать гайд о районах Сочи, жилых комплексах с ориентирам на социальную инфраструктуру! 

✔️ Ниже вы можете посмотреть последние старты продаж, описание, цены, локация: 

[WYNDHAM SOCHI HOTEL](https://t.me/dianazhukovainvest/1298)
[MARINA GARDEN SOCHI HOTEL RESORT](https://t.me/dianazhukovainvest/1419) 

✔️ [Здесь](https://t.me/dianazhukovainvest/1180) все о апарт-отелях, разница, налоги.

✔️ [Здесь](https://dianazhukova.ru/) вы можете оставить заявку на консультацию или подбор недвижимости!

`;
    const inlineKeybord = new InlineKeyboard()
        .text("❓ У меня есть вопрос", "button_18")
        .row()
        .text("↩️ назад", "button_9");

    await ctx.answerCallbackQuery();
    await ctx.reply(message, {
        parse_mode: "Markdown",
        reply_markup: inlineKeybord,
    });
});

// bot.callbackQuery("button_18", async (ctx) => {
//     await ctx.answerCallbackQuery();
//     await ctx.reply(
//         "Задайте, пожалуйста, свой вопрос и оставьте контакты для связи. В ближайшее время мы вернемся с ответом 🙌"
//     );
// });

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
