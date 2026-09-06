const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
if (header && menuButton) {
  menuButton.addEventListener('click', () => {
    const open = header.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}

const projectContent = document.querySelector('#project-content');
const serviceCatalog = document.querySelector('#service-catalog');
const serviceContent = document.querySelector('#service-content');
const serviceGroups = [
  ['Ремонт и планировка', ['Ремонт квартиры под ключ','Ремонт частного дома','Перепланировка квартиры','Демонтаж перегородок','Монтаж новых перегородок','Черновая отделка','Ремонт после затопления','Косметический ремонт'], 3185],
  ['Стены, потолки и полы', ['Отделка стен, потолков и пола под ключ','Укладка инженерной доски','Укладка паркета','Укладка керамогранита','Монтаж тёплого пола','Монтаж плинтуса'], 620],
  ['Санузлы и кухня', ['Ремонт санузла','Сборка кухни','Слаботочная сеть','Умный дом'], 980],
  ['Электрика и свет', ['Электромонтаж под ключ','Световые сценарии'], 760],
  ['Фасад и кровля', ['Фасадные работы под ключ','Облицовка фасада','Кровля под ключ','Монтаж водостоков'], 1885],
  ['Участок и дерево', ['Монтаж террасы','Деревянная лестница','Навес для автомобиля','Забор из дерева','Благоустройство участка','Монтаж уличного освещения','Озеленение участка'], 1150]
];
const servicePlans = {
  'Ремонт квартиры под ключ': ['замер квартиры и разработка плана работ', 'демонтаж, черновая подготовка и выравнивание оснований', 'монтаж инженерии, отделка стен, пола и потолка', 'установка дверей, света, сантехники и финальная уборка'],
  'Ремонт частного дома': ['обследование дома, участка и инженерных вводов', 'утепление, черновые работы и разводка коммуникаций', 'отделка помещений, фасада и кровельных узлов', 'пусконаладка систем, проверка и передача дома'],
  'Перепланировка квартиры': ['обмер помещения и проверка возможности перепланировки', 'подготовка схемы, согласование и разметка новых зон', 'демонтаж и монтаж перегородок с усилением проёмов', 'восстановление отделки и оформление исполнительной схемы'],
  'Демонтаж перегородок': ['осмотр конструкций и отключение коммуникаций', 'защита пола, дверей и мебели от пыли', 'аккуратный демонтаж с сортировкой и выносом мусора', 'заделка мест примыканий и подготовка стен'],
  'Монтаж новых перегородок': ['разметка планировки и проверка диагоналей', 'монтаж каркаса или кладка блоков', 'звукоизоляция, прокладка кабелей и заполнение швов', 'выравнивание поверхности под чистовую отделку'],
  'Черновая отделка': ['замер перепадов стен, пола и потолка', 'грунтование и подготовка всех оснований', 'штукатурка, стяжка, шпаклёвка и черновая разводка', 'контроль плоскостей и подготовка объекта к финишу'],
  'Ремонт после затопления': ['обследование повреждений и фиксация влажности', 'демонтаж испорченных покрытий и просушка помещений', 'восстановление оснований, электрики и сантехнических узлов', 'новая отделка и проверка отсутствия скрытых повреждений'],
  'Косметический ремонт': ['замер помещений и подбор обоев, красок и напольных покрытий', 'защита мебели, локальный демонтаж и подготовка стен', 'поклейка обоев или покраска, укладка пола и плинтуса', 'установка розеток, светильников и финальная уборка'],
  'Отделка стен, потолков и пола под ключ': ['обмер стен, потолков и пола, проверка перепадов и подбор технологии', 'монтаж каркаса, звукоизоляции и гипсокартона; установка маяков и подготовка оснований', 'механизированная или ручная штукатурка, шпаклёвка и окраска стен и потолка валиком', 'стяжка или наливной пол, укладка ламината, установка плинтуса и контроль результата'],
  'Укладка инженерной доски': ['подбор рисунка и проверка влажности основания', 'подготовка основания и раскладка доски', 'приклейка или монтаж замкового покрытия', 'шлифовка стыков, установка порогов и уходовая обработка'],
  'Укладка паркета': ['разработка схемы рисунка и сортировка планок', 'подготовка основания и нанесение клея', 'укладка паркета с точными зазорами', 'шлифовка, тонировка и нанесение защитного масла'],
  'Укладка керамогранита': ['раскладка плитки с учётом швов и подрезок', 'грунтование, гидроизоляция и подготовка основания', 'укладка на клей с выравниванием плоскости', 'затирка швов, силиконовые примыкания и уборка'],
  'Монтаж тёплого пола': ['расчёт зон нагрева и размещения терморегуляторов', 'подготовка основания и укладка теплоизоляции', 'монтаж кабеля или матов с замером сопротивления', 'установка датчиков, стяжка и проверка включения'],
  'Монтаж плинтуса': ['замер периметра и подбор профиля', 'подготовка углов и мест примыкания', 'раскрой, крепление и стыковка плинтуса', 'установка заглушек и герметизация видимых швов'],
  'Ремонт санузла': ['обмер санузла и схема размещения сантехники', 'демонтаж, гидроизоляция, разводка труб и монтаж инсталляции', 'укладка плитки в душевой, монтаж потолка и освещения', 'установка сантехники, мебели и проверка протечек'],
  'Гидроизоляция санузла': ['осмотр основания и подготовка мокрых зон', 'обработка углов гидроизоляционной лентой', 'нанесение обмазочного состава в два слоя', 'проверка покрытия перед укладкой плитки'],
  'Укладка плитки в душевой': ['разметка уклонов к трапу и раскладка плитки', 'гидроизоляция пола, стен и примыканий', 'укладка плитки с формированием ровных швов', 'затирка, герметизация углов и проверка слива'],
  'Монтаж инсталляции': ['разметка высоты чаши и положения кнопки', 'крепление рамы к полу и стене', 'подключение воды и канализации с опрессовкой', 'обшивка, установка клавиши и проверка смыва'],
  'Монтаж сантехники': ['проверка выводов воды и канализации', 'сборка и установка сантехнических приборов', 'подключение гибких подводок и сифонов', 'проверка герметичности и регулировка арматуры'],
  'Сборка кухни': ['проверка размеров помещения и комплектации', 'сборка корпусов и установка по уровню', 'монтаж столешницы, фартука, врезок и подключение техники', 'подсветка рабочей зоны, регулировка фасадов и финальная проверка'],
  'Фартук из плитки': ['замер рабочей зоны и раскладка плитки', 'защита столешницы и подготовка стены', 'укладка плитки с ровными горизонтальными швами', 'затирка, силиконовые примыкания и уборка'],
  'Столешница из камня': ['замер кухни и проверка положения коммуникаций', 'подготовка шаблона и согласование вырезов', 'установка столешницы, мойки и пристеночного борта', 'герметизация стыков и полировка торцов'],
  'Электромонтаж под ключ': ['составление схемы групп, розеток и выключателей', 'разметка трасс и прокладка кабелей в штробах или гофре', 'сборка электрощита с автоматами, УЗО и маркировкой линий', 'установка розеток, проверка сопротивления и передача схемы'],
  'Монтаж электрощита': ['расчёт нагрузки и подбор модульного оборудования', 'установка корпуса и вводного автомата', 'сборка групп с УЗО и маркировкой кабелей', 'тестирование защиты и передача схемы щита'],
  'Установка розеток': ['разметка высоты и осей по мебели', 'установка подрозетников и подготовка кабелей', 'монтаж механизмов и декоративных рамок', 'проверка полярности и фиксации контактов'],
  'Световые сценарии': ['разработка сценариев общего, рабочего и акцентного света', 'разметка трасс, выводов и групп включения', 'монтаж трековых и встроенных светильников с подсветкой кухни', 'настройка яркости, направления и равномерности света'],
  'Монтаж встроенных светильников': ['разметка центров и проверка потолочного пространства', 'подготовка отверстий и кабельных выводов', 'установка светильников и блоков питания', 'проверка нагрева, включения и ровности рядов'],
  'Подсветка кухни': ['проектирование зон рабочей и декоративной подсветки', 'монтаж профилей, ленты и кабельных выводов', 'установка блоков питания и выключателей', 'настройка яркости и проверка равномерности свечения'],
  'Слаботочная сеть': ['определение точек Wi-Fi, ТВ и видеонаблюдения', 'прокладка витой пары и коаксиального кабеля', 'установка розеток, шкафов и патч-панели', 'тестирование линий и маркировка портов'],
  'Умный дом': ['сбор требований и сценариев освещения и климата', 'проектирование состава контроллеров и датчиков', 'монтаж устройств и настройка автоматизаций', 'тестирование сценариев и обучение пользователя'],
  'Фасадные работы под ключ': ['теплотехническая оценка, мойка и подготовка фасада', 'монтаж утеплителя, дюбелей, сетки и усиление углов', 'базовый слой, штукатурка и грунтование поверхности', 'нанесение фасадной краски, оформление примыканий и контроль фактуры'],
  'Штукатурный фасад': ['осмотр основания и подбор фасадной системы', 'армирование, установка профилей и грунтование', 'нанесение декоративной штукатурки', 'защита примыканий и контроль фактуры по всей плоскости'],
  'Облицовка фасада': ['замер фасада и раскладка облицовочного материала', 'подготовка подсистемы и вентиляционных зазоров', 'монтаж панелей, плитки или клинкера', 'оформление углов, откосов и проверка креплений'],
  'Фасадная покраска': ['подбор фасадной краски и пробный выкрас', 'мойка, ремонт трещин и грунтование поверхности', 'нанесение двух равномерных слоёв краски', 'проверка укрывистости и аккуратности примыканий'],
  'Кровля под ключ': ['осмотр покрытия, стропил и мест протечек', 'ремонт основания и монтаж подкровельной гидроизоляции', 'укладка мягкой кровли с оформлением конька и ендов', 'герметизация проходок, контрольный пролив и уборка'],
  'Монтаж мягкой кровли': ['подготовка сплошного основания и раскладка материала', 'монтаж подкладочного ковра и карнизных планок', 'укладка гонтов с фиксацией и проклейкой', 'оформление конька, ендов и вентиляционных выходов'],
  'Монтаж водостоков': ['расчёт количества воронок и направления стока', 'разметка уклонов и установка крюков', 'монтаж желобов, воронок и труб', 'проверка пропускной способности проливом'],
  'Гидроизоляция кровли': ['поиск слабых мест и подготовка поверхности', 'обработка примыканий, проходок и ендов', 'нанесение или монтаж гидроизоляционного слоя', 'проверка герметичности и восстановление покрытия'],
  'Монтаж террасы': ['замер участка и выбор направления настила', 'устройство опор, основания и водоотвода', 'монтаж каркаса, настила и ограждений', 'защитная обработка дерева и проверка уклонов'],
  'Деревянная лестница': ['обмер проёма и расчёт шага ступеней', 'подбор породы и изготовление деталей', 'монтаж косоуров, ступеней и ограждения', 'шлифовка, тонировка и защитное покрытие'],
  'Навес для автомобиля': ['замер участка и расчёт снеговой нагрузки', 'разметка опор и подготовка фундаментов', 'монтаж каркаса и кровельного покрытия', 'обработка металла или дерева и проверка креплений'],
  'Забор из дерева': ['разметка границ и расположения ворот', 'установка опор и подготовка основания', 'монтаж каркаса, доски и калитки', 'обработка древесины и регулировка фурнитуры'],
  'Благоустройство участка': ['планировка участка и согласование функциональных зон', 'подготовка грунта, дренажа и оснований', 'устройство дорожек, площадок и посадочных мест', 'вывоз лишнего грунта и финальная планировка'],
  'Благоустройство участка': ['планировка участка, дорожек и функциональных зон', 'подготовка грунта, дренажа, геотекстиля и оснований', 'устройство дорожек, площадок и посадочных мест', 'заполнение швов, финальная планировка и проверка водоотведения'],
  'Монтаж уличного освещения': ['разработка схемы светильников и кабельных трасс', 'подготовка траншей и защитной гофры', 'установка опор, светильников и автоматики', 'проверка заземления и сценариев включения'],
  'Озеленение участка': ['анализ почвы, освещённости и состава растений', 'подготовка грунта, дренажа и посадочных ям', 'посадка растений, устройство мульчи и полива', 'настройка ухода и передача календаря обслуживания']
};
const serviceImages = [
  'photo-1600607687920-4e2a09cf159d', 'photo-1600566753086-00f18fb6b3ea',
  'photo-1600210492486-724fe5c67fb0', 'photo-1600585154340-be6161a56a0c',
  'photo-1600607688969-a5bfcd646154', 'photo-1600566753190-17f0baa2a6c3',
  'photo-1600585154526-990dced4db0d', 'photo-1600047509807-ba8f99d2cdde',
  'photo-1621905252507-b35492cc74b4', 'photo-1558008258-3256797b43f3',
  'photo-1581092160607-ee22621dd758', 'photo-1558618666-fcd25c85cd64',
  'photo-1600607687939-ce8a6c25118c', 'photo-1494526585095-c41746248156',
  'photo-1505693416388-ac5ce068fe85', 'photo-1513694203232-719a280e022f',
  'photo-1600210491892-03d54c0aaf87', 'photo-1600607688969-a5bfcd646154',
  'photo-1600585154340-be6161a56a0c', 'photo-1600585154526-990dced4db0d'
];
const serviceThemeImages = {
  apartment: 'photo-1600607687920-4e2a09cf159d',
  house: 'photo-1600585154340-be6161a56a0c',
  planning: 'photo-1600210492486-724fe5c67fb0',
  demolition: 'photo-1503387762-592deb58ef4e',
  partitions: 'photo-1600566753190-17f0baa2a6c3',
  finish: 'photo-1562259949-e8e7689d7828',
  bathroom: 'photo-1584622650111-993a426fbf0a',
  kitchen: 'photo-1556912173-3bb406ef7e77',
  electrical: 'photo-1621905252507-b35492cc74b4',
  facade: 'photo-1600585154526-990dced4db0d',
  roof: 'photo-1600047509807-ba8f99d2cdde',
  floor: 'photo-1586023492125-27b2c045efd7',
  wood: 'photo-1510798831971-661eb04b3739',
  garden: 'photo-1558904541-efa843a96f01'
};
function serviceThemeImage(title, group) {
  const normalized = title.toLowerCase();
  if (title === 'Ремонт квартиры под ключ') return serviceThemeImages.apartment;
  if (title === 'Ремонт частного дома') return serviceThemeImages.house;
  if (title === 'Перепланировка квартиры') return serviceThemeImages.planning;
  if (title === 'Демонтаж перегородок') return serviceThemeImages.demolition;
  if (title === 'Монтаж новых перегородок') return serviceThemeImages.partitions;
  if (title === 'Ремонт санузла') return serviceThemeImages.bathroom;
  if (title === 'Сборка кухни') return serviceThemeImages.kitchen;
  if (title === 'Электромонтаж под ключ' || title === 'Световые сценарии' || normalized.includes('слаботоч') || normalized.includes('умный дом')) return serviceThemeImages.electrical;
  if (normalized.includes('фасад')) return serviceThemeImages.facade;
  if (normalized.includes('кровл') || normalized.includes('водосток')) return serviceThemeImages.roof;
  if (normalized.includes('освещ')) return serviceThemeImages.electrical;
  if (normalized.includes('озеленен') || normalized.includes('благоустрой')) return serviceThemeImages.garden;
  if (normalized.includes('деревян') || normalized.includes('террас') || normalized.includes('забор') || normalized.includes('навес')) return serviceThemeImages.wood;
  if (normalized.includes('плинтус')) return serviceThemeImages.floor;
  if (normalized.includes('участ')) return serviceThemeImages.garden;
  if (group === 'Стены, потолки и полы') return normalized.includes('укладка') || normalized.includes('пол') ? serviceThemeImages.floor : serviceThemeImages.finish;
  if (group === 'Санузлы и кухня') return normalized.includes('кух') ? serviceThemeImages.kitchen : serviceThemeImages.bathroom;
  if (group === 'Электрика и свет') return serviceThemeImages.electrical;
  return serviceThemeImages.finish;
}
const serviceData = serviceGroups.flatMap(([group, names, base]) => names.map((title, index) => {
  const copy = {
    'Ремонт и планировка': {
      description: `Организуем ${title.toLowerCase()} как единый управляемый процесс: от обследования объекта и подготовки основания до чистовой сдачи без разрозненных подрядчиков.`,
      steps: ['выезд, замер и фиксация текущего состояния объекта', 'подготовка сметы, графика и технологической карты', 'последовательное выполнение работ с контролем прораба', 'приёмка результата, уборка и передача рекомендаций']
    },
    'Стены и потолки': {
      description: `Выполняем ${title.toLowerCase()} с точной геометрией и подготовкой поверхности под выбранный финиш. Особое внимание уделяем углам, примыканиям и равномерности покрытия.`,
      steps: ['защита помещения и проверка основания', 'подготовка, грунтование и устранение перепадов', `выполнение операции «${title.toLowerCase()}» по технологии`, 'контроль плоскости при боковом освещении и финальная уборка']
    },
    'Полы и покрытия': {
      description: `Готовим основание и выполняем ${title.toLowerCase()} так, чтобы покрытие служило долго, не скрипело и аккуратно стыковалось с дверями, стенами и инженерными выводами.`,
      steps: ['проверка влажности, перепадов и прочности основания', 'разметка уровней и подготовка примыканий', `монтаж покрытия или системы: ${title.toLowerCase()}`, 'проверка геометрии, швов и установка финишных элементов']
    },
    'Санузлы и кухня': {
      description: `Проектируем и выполняем ${title.toLowerCase()} с учётом влажной среды, доступа к скрытым узлам и ежедневного сценария использования помещения.`,
      steps: ['разметка выводов, уклонов и зон обслуживания', 'гидроизоляция и подготовка поверхностей', `монтаж и настройка: ${title.toLowerCase()}`, 'проверка герметичности, работоспособности и аккуратности стыков']
    },
    'Электрика и свет': {
      description: `Прорабатываем ${title.toLowerCase()} под реальную расстановку мебели и сценарии жизни. Кабели, соединения и щит собираем аккуратно и с понятной маркировкой.`,
      steps: ['составление схемы групп и расчёт нагрузки', 'разметка трасс, установка подрозетников и подготовка кабелей', `монтаж системы «${title.toLowerCase()}»`, 'тестирование линий, маркировка и передача схемы заказчику']
    },
    'Фасад и кровля': {
      description: `Выполняем ${title.toLowerCase()} с учётом климата Тульской области, конструктивных узлов и требований к защите дома от влаги и перепадов температуры.`,
      steps: ['осмотр основания и выявление слабых мест', 'подготовка, усиление и устройство защитных слоёв', `монтаж решения: ${title.toLowerCase()}`, 'проверка примыканий, отливов и уборка территории']
    },
    'Участок и дерево': {
      description: `Создаём ${title.toLowerCase()} с точной подготовкой основания, продуманным водоотведением и материалами, рассчитанными на эксплуатацию на открытом воздухе.`,
      steps: ['замер участка и согласование эскиза', 'подготовка основания, опор и коммуникаций', `выполнение работ: ${title.toLowerCase()}`, 'защитная обработка, проверка конструкции и сдача объекта']
    }
  }[group];
  const image = serviceImages[(serviceGroups.flatMap(([, groupNames]) => groupNames).indexOf(title)) % serviceImages.length];
  return { title, group, base: base + index * 85, steps: servicePlans[title] || copy.steps, image: serviceThemeImage(title, group), hue: (serviceGroups.flatMap(([, groupNames]) => groupNames).indexOf(title) * 31) % 360, description: `Выполняем ${title.toLowerCase()} поэтапно, с подготовкой основания, подбором решений под объект и контролем качества на каждом этапе.` };
}));
function serviceSlug(title) { return title.toLowerCase().replace(/ё/g, 'е').replace(/[^а-яa-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function initServices() {
  if (!serviceCatalog) return;
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
  serviceCatalog.innerHTML = serviceData.map((service, index) => `<a class="service-catalog-card" style="--card-image:url('https://images.unsplash.com/${service.image}?auto=format&fit=crop&w=1200&q=88')" href="service.html?service=${serviceSlug(service.title)}"><span>${String(index + 1).padStart(2, '0')} · ${service.group}</span><h2>${service.title}</h2><strong>от ${service.base.toLocaleString('ru-RU')} ₽/м² ↗</strong></a>`).join('');
}
function initServicePage() {
  if (!serviceContent) return;
  const key = new URLSearchParams(window.location.search).get('service');
  const service = serviceData.find((item) => serviceSlug(item.title) === key) || serviceData[0];
  document.title = `${service.title} — ДанилаСтрой`;
  const background = `https://images.unsplash.com/${service.image}?auto=format&fit=crop&w=2200&q=88`;
  serviceContent.innerHTML = `<section class="service-detail-hero" style="--service-image:url('${background}');--service-hue:${service.hue}"><a class="back-link" href="services.html">← Все услуги</a><p class="kicker">${service.group}</p><h1>${service.title}</h1><p class="service-detail-lead">${service.description}</p><strong class="service-detail-price">от ${service.base.toLocaleString('ru-RU')} ₽/м²</strong></section><section class="service-detail-body" style="--service-image:url('${background}');--service-hue:${service.hue}"><div><p class="kicker">Подробное описание</p><h2>Работаем точно<br><em>до последней детали.</em></h2><p class="service-detail-note">Стоимость указана только за работу. Материалы и дополнительные операции рассчитываются после замера.</p></div><div><p>${service.description}</p><p class="service-detail-subtitle">Что входит в услугу</p><ul>${service.steps.map((step) => `<li>${step};</li>`).join('')}</ul><a class="button button-bronze" href="contacts.html">Обсудить эту работу <span>→</span></a></div></section>`;
}
const projectData = {
  apartment: { title: 'Ремонт квартиры', lead: 'Тёплый современный интерьер с точной геометрией, встроенным светом и натуральными фактурами.', meta: 'Москва · 128 м² · 2025', images: ['photo-1600210492486-724fe5c67fb0', 'photo-1600607687920-4e2a09cf159d', 'photo-1600566753086-00f18fb6b3ea', 'photo-1600607688969-a5bfcd646154', 'photo-1600566753190-17f0baa2a6c3', 'photo-1600585154340-be6161a56a0c', 'photo-1600210491892-03d54c0aaf87', 'photo-1505693416388-ac5ce068fe85', 'photo-1494526585095-c41746248156', 'photo-1513694203232-719a280e022f'] },
  finish: { title: 'Чистовая отделка', lead: 'Спокойная палитра, аккуратные примыкания и материалы, которые хорошо выглядят в естественном свете.', meta: 'Тула · 94 м² · 2025', images: ['photo-1600566753086-00f18fb6b3ea', 'photo-1600210491892-03d54c0aaf87', 'photo-1600607687920-4e2a09cf159d', 'photo-1600566753190-17f0baa2a6c3', 'photo-1600607688969-a5bfcd646154', 'photo-1600585154526-990dced4db0d', 'photo-1600210492486-724fe5c67fb0', 'photo-1600566753086-00f18fb6b3ea', 'photo-1600585154340-be6161a56a0c', 'photo-1600607688969-a5bfcd646154'] },
  facade: { title: 'Фасадные работы', lead: 'Обновили внешний контур дома: утепление, облицовка, отливы и выразительная подсветка фасада.', meta: 'Тульская область · 210 м² · 2024', images: ['photo-1600585154340-be6161a56a0c', 'photo-1600585154526-990dced4db0d', 'photo-1600047509807-ba8f99d2cdde', 'photo-1600566753086-00f18fb6b3ea', 'photo-1600607688969-a5bfcd646154', 'photo-1600607687920-4e2a09cf159d', 'photo-1600607687939-ce8a6c25118c', 'photo-1600585154340-be6161a56a0c', 'photo-1600585154526-990dced4db0d', 'photo-1600047509807-ba8f99d2cdde'] },
  engineering: { title: 'Инженерные решения', lead: 'Скрытые системы, продуманное освещение и технические узлы, которые не спорят с интерьером.', meta: 'Тула · 156 м² · 2025', images: ['photo-1621905252507-b35492cc74b4', 'photo-1558008258-3256797b43f3', 'photo-1581092160607-ee22621dd758', 'photo-1558618666-fcd25c85cd64', 'photo-1600566753190-17f0baa2a6c3', 'photo-1600607688969-a5bfcd646154', 'photo-1581091226825-a6a2a5aee158', 'photo-1621905251918-48416bd8575a', 'photo-1558618666-fcd25c85cd64', 'photo-1581092160607-ee22621dd758'] },
  plaster: { title: 'Штукатурка стен', lead: 'Вывели поверхности под чистовую отделку: ровные плоскости, правильные углы и готовность к покраске.', meta: 'Тула · 480 м² · 2024', images: ['photo-1562259949-e8e7689d7828', 'photo-1589939705384-5185137a7f0f', 'photo-1503387762-592deb58ef4e', 'photo-1598928506311-c55ded91a20c', 'photo-1600607688969-a5bfcd646154', 'photo-1600566753086-00f18fb6b3ea', 'photo-1562259949-e8e7689d7828', 'photo-1589939705384-5185137a7f0f', 'photo-1503387762-592deb58ef4e', 'photo-1598928506311-c55ded91a20c'] },
  decor: { title: 'Декоративная отделка', lead: 'Фактурные покрытия, дерево и камень собраны в интерьер с характером и мягким вечерним светом.', meta: 'Тула · 76 м² · 2025', images: ['photo-1556912173-3bb406ef7e77', 'photo-1600566753086-00f18fb6b3ea', 'photo-1600210492486-724fe5c67fb0', 'photo-1600607687920-4e2a09cf159d', 'photo-1600566753190-17f0baa2a6c3', 'photo-1600585154526-990dced4db0d', 'photo-1556912173-3bb406ef7e77', 'photo-1600210491892-03d54c0aaf87', 'photo-1600607688969-a5bfcd646154', 'photo-1600585154340-be6161a56a0c'] },
  electric: { title: 'Монтаж электрики', lead: 'Собрали безопасную электрическую систему с удобными сценариями света для каждого помещения.', meta: 'Тула · 112 м² · 2025', images: ['photo-1621905252507-b35492cc74b4', 'photo-1558008258-3256797b43f3', 'photo-1581092160607-ee22621dd758', 'photo-1558618666-fcd25c85cd64', 'photo-1600566753190-17f0baa2a6c3', 'photo-1600607688969-a5bfcd646154', 'photo-1581091226825-a6a2a5aee158', 'photo-1621905251918-48416bd8575a', 'photo-1558008258-3256797b43f3', 'photo-1621905252507-b35492cc74b4'] },
  terrace: { title: 'Терраса и благоустройство', lead: 'Сделали продолжение дома снаружи: терраса, дорожки, озеленение и зоны для отдыха.', meta: 'Тульская область · 68 м² · 2024', images: ['photo-1600566753086-00f18fb6b3ea', 'photo-1600585154340-be6161a56a0c', 'photo-1600047509807-ba8f99d2cdde', 'photo-1600585154526-990dced4db0d', 'photo-1600607688969-a5bfcd646154', 'photo-1600607687920-4e2a09cf159d', 'photo-1600607687939-ce8a6c25118c', 'photo-1600585154340-be6161a56a0c', 'photo-1600047509807-ba8f99d2cdde', 'photo-1600585154526-990dced4db0d'] },
  bathroom: { title: 'Санузел под ключ', lead: 'Собрали спокойный санузел с крупноформатной плиткой, тёплым светом и продуманными скрытыми узлами.', meta: 'Тула · 12 м² · 2025', images: ['photo-1584622650111-993a426fbf0a', 'photo-1600566753086-00f18fb6b3ea', 'photo-1551776235-dde6d482980b'] },
  kitchen: { title: 'Кухня и столовая', lead: 'Светлая кухня с каменной столешницей, деревянными фасадами и встроенной техникой.', meta: 'Тула · 28 м² · 2025', images: ['photo-1600210492486-724fe5c67fb0', 'photo-1600566753086-00f18fb6b3ea', 'photo-1600210491892-03d54c0aaf87'] },
  bedroom: { title: 'Спальня и гардеробная', lead: 'Тихий интерьер для отдыха: мягкая палитра, натуральное дерево и встроенная система хранения.', meta: 'Донской · 32 м² · 2024', images: ['photo-1618221195710-dd6b41faaea6', 'photo-1600607688969-a5bfcd646154', 'photo-1505693416388-ac5ce068fe85'] },
  roof: { title: 'Кровля частного дома', lead: 'Обновили кровельный контур, утепление и водосточную систему загородного дома.', meta: 'Тульская область · 240 м² · 2024', images: ['photo-1487958449943-2429e8be8625', 'photo-1518005020951-eccb494ad742', 'photo-1600585154340-be6161a56a0c'] },
  stairs: { title: 'Лестница из дерева', lead: 'Изготовили и установили лестницу из натурального дуба с точными соединениями и мягкой подсветкой.', meta: 'Тула · 18 ступеней · 2025', images: ['photo-1600566753190-17f0baa2a6c3', 'photo-1600585154526-990dced4db0d', 'photo-1600607687939-ce8a6c25118c'] },
  lighting: { title: 'Световые сценарии', lead: 'Настроили многоуровневое освещение: треки, скрытая подсветка и акцентные светильники.', meta: 'Тула · 156 м² · 2025', images: ['photo-1558008258-3256797b43f3', 'photo-1621905252507-b35492cc74b4', 'photo-1581094794329-c8112a89af12'] },
  office: { title: 'Офисное пространство', lead: 'Организовали современный офис с переговорной, акустическими панелями и гибкими рабочими местами.', meta: 'Тула · 180 м² · 2024', images: ['photo-1497366754035-f200968a6e72', 'photo-1497366811353-6870744d04b2', 'photo-1542621334-a254cf47733d'] },
  garden: { title: 'Сад и дорожки', lead: 'Собрали ухоженный участок с мощением, подсветкой, посадками и местом для вечернего отдыха.', meta: 'Донской · 640 м² · 2024', images: ['photo-1558904541-efa843a96f01', 'photo-1487958449943-2429e8be8625', 'photo-1600047509807-ba8f99d2cdde'] }
};

function initProjectPage() {
  if (!projectContent) return;
  const key = new URLSearchParams(window.location.search).get('project') || 'apartment';
  const project = projectData[key] || projectData.apartment;
  const projectPools = {
    apartment: ['photo-1600210492486-724fe5c67fb0', 'photo-1600607687920-4e2a09cf159d', 'photo-1600566753086-00f18fb6b3ea', 'photo-1600210491892-03d54c0aaf87'],
    finish: ['photo-1600607688969-a5bfcd646154', 'photo-1600566753190-17f0baa2a6c3', 'photo-1600585154340-be6161a56a0c', 'photo-1600585154526-990dced4db0d'],
    facade: ['photo-1487958449943-2429e8be8625', 'photo-1518005020951-eccb494ad742', 'photo-1600047509807-ba8f99d2cdde', 'photo-1503387762-592deb58ef4e'],
    engineering: ['photo-1621905252507-b35492cc74b4', 'photo-1558008258-3256797b43f3', 'photo-1581094794329-c8112a89af12', 'photo-1558618666-fcd25c85cd64'],
    plaster: ['photo-1562259949-e8e7689d7828', 'photo-1589939705384-5185137a7f0f', 'photo-1503387762-592deb58ef4e', 'photo-1598928506311-c55ded91a20c'],
    decor: ['photo-1556912173-3bb406ef7e77', 'photo-1600566753086-00f18fb6b3ea', 'photo-1600210492486-724fe5c67fb0', 'photo-1600607688969-a5bfcd646154'],
    electric: ['photo-1621905252507-b35492cc74b4', 'photo-1558008258-3256797b43f3', 'photo-1581092160607-ee22621dd758', 'photo-1558618666-fcd25c85cd64'],
    terrace: ['photo-1600047509807-ba8f99d2cdde', 'photo-1600585154340-be6161a56a0c', 'photo-1600585154526-990dced4db0d', 'photo-1487958449943-2429e8be8625'],
    bathroom: ['photo-1584622650111-993a426fbf0a', 'photo-1551776235-dde6d482980b', 'photo-1620626011761-996317b8d101'],
    kitchen: ['photo-1556912173-3bb406ef7e77', 'photo-1556911220-e15b29be8c8f', 'photo-1556910103-1c02745aae4d'],
    bedroom: ['photo-1616486338812-3dadae4b4ace', 'photo-1616594039964-ae9021a400a0', 'photo-1618220179428-22790b461013'],
    roof: ['photo-1487958449943-2429e8be8625', 'photo-1518005020951-eccb494ad742', 'photo-1503387762-592deb58ef4e'],
    stairs: ['photo-1600566753190-17f0baa2a6c3', 'photo-1600585154526-990dced4db0d', 'photo-1600607687939-ce8a6c25118c'],
    lighting: ['photo-1558008258-3256797b43f3', 'photo-1621905252507-b35492cc74b4', 'photo-1558618666-fcd25c85cd64'],
    office: ['photo-1497366754035-f200968a6e72', 'photo-1497366811353-6870744d04b2', 'photo-1542621334-a254cf47733d'],
    garden: ['photo-1558904541-efa843a96f01', 'photo-1558521958-0a228e77e984', 'photo-1585320806297-9794b3e4eeae']
  };
  const galleryImages = [...new Set(projectPools[key] || project.images)].slice(0, 10);
  document.title = `${project.title} — ДанилаСтрой`;
  projectContent.innerHTML = `<section class="project-intro"><a class="back-link" href="portfolio.html">← Все проекты</a><p class="kicker">Проект ДанилаСтрой</p><h1>${project.title}</h1><p class="project-lead">${project.lead}</p><span class="project-meta">${project.meta}</span></section><section class="project-gallery">${galleryImages.map((image, index) => `<a class="project-photo" href="https://images.unsplash.com/${image}?auto=format&fit=crop&w=2200&q=90" target="_blank" rel="noreferrer"><img src="https://images.unsplash.com/${image}?auto=format&fit=crop&w=1400&q=88" alt="${project.title}, фото работы ${index + 1}" loading="${index > 1 ? 'lazy' : 'eager'}"><span>Фото ${String(index + 1).padStart(2, '0')} ↗</span></a>`).join('')}</section><section class="cta-section project-cta"><p class="kicker">Понравился результат?</p><h2>Обсудим<br><em>ваш проект.</em></h2><a class="button button-dark" href="contacts.html">Получить консультацию <span>→</span></a></section>`;
}

function initHouseInteraction() {
  const hero = document.querySelector('#house-hero');
  if (!hero) return;
  const update = () => {
    const rect = hero.getBoundingClientRect();
    const progress = Math.max(-1, Math.min(1, (window.innerHeight * 0.5 - (rect.top + rect.height * 0.5)) / (window.innerHeight + rect.height)));
    hero.style.setProperty('--house-shift', `${progress * 16}%`);
    hero.style.setProperty('--house-scale', `${1.04 + Math.abs(progress) * 0.08}`);
    hero.style.setProperty('--house-position', `${50 + progress * 7}%`);
    hero.dataset.view = progress > 0.22 ? 'rear' : progress < -0.22 ? 'detail' : 'front';
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

function initScene() {
  const mount = document.getElementById('webgl-scene');
  if (!mount || !window.THREE) return;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xd4c9ba);
  const camera = new THREE.PerspectiveCamera(38, mount.clientWidth / mount.clientHeight, 0.1, 100);
  camera.position.set(5.5, 4.1, 7.4);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(mount.clientWidth, mount.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  mount.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xfff2df, 0x504740, 2.2));
  const key = new THREE.DirectionalLight(0xffe0b4, 4);
  key.position.set(3, 7, 4);
  key.castShadow = true;
  scene.add(key);

  const room = new THREE.Group();
  const floor = new THREE.Mesh(new THREE.BoxGeometry(9, .18, 8), new THREE.MeshStandardMaterial({ color: 0x9b8e7c, roughness: .8 }));
  floor.position.y = -1.35;
  floor.receiveShadow = true;
  room.add(floor);
  const wall = new THREE.Mesh(new THREE.BoxGeometry(9, 6.2, .16), new THREE.MeshStandardMaterial({ color: 0xddd4c8, roughness: .9 }));
  wall.position.set(0, 1.65, -2.8);
  room.add(wall);
  const wood = new THREE.MeshStandardMaterial({ color: 0x593f2d, roughness: .45, metalness: .1 });
  const bronze = new THREE.MeshStandardMaterial({ color: 0xa2764c, roughness: .28, metalness: .7 });
  const stone = new THREE.MeshStandardMaterial({ color: 0x3b3a36, roughness: .75 });
  const cabinet = new THREE.Mesh(new THREE.BoxGeometry(2.9, 1.7, .5), wood);
  cabinet.position.set(-1, -.45, -2.42);
  cabinet.castShadow = true;
  room.add(cabinet);
  const shelf = new THREE.Mesh(new THREE.BoxGeometry(3.2, .1, .8), bronze);
  shelf.position.set(-1, .5, -2.15);
  room.add(shelf);
  const table = new THREE.Mesh(new THREE.BoxGeometry(2.4, .18, 1.2), stone);
  table.position.set(1.5, -.45, -.4);
  table.castShadow = true;
  room.add(table);
  const legGeo = new THREE.CylinderGeometry(.06, .06, .9, 12);
  [[.6,-.9], [2.4,-.9], [.6,.1], [2.4,.1]].forEach(([x,z]) => {
    const leg = new THREE.Mesh(legGeo, bronze);
    leg.position.set(x, -.9, z);
    room.add(leg);
  });
  const chair = new THREE.Mesh(new THREE.BoxGeometry(.9, 1.25, .85), wood);
  chair.position.set(2.8, -.75, 1);
  chair.castShadow = true;
  room.add(chair);
  const art = new THREE.Mesh(new THREE.BoxGeometry(1.65, 2.15, .06), new THREE.MeshStandardMaterial({ color: 0x8f6341, roughness: .65 }));
  art.position.set(1.8, 1.5, -2.65);
  room.add(art);
  scene.add(room);
  let target = 0;
  let current = 0;
  mount.addEventListener('pointermove', (event) => {
    const rect = mount.getBoundingClientRect();
    target = ((event.clientX - rect.left) / rect.width - .5) * .35;
  });
  mount.addEventListener('pointerleave', () => { target = 0; });
  const resize = () => {
    camera.aspect = mount.clientWidth / mount.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(mount.clientWidth, mount.clientHeight);
  };
  window.addEventListener('resize', resize);
  const animate = () => {
    current += (target - current) * .04;
    room.rotation.y = current;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();
}

initScene();
initHouseInteraction();
initProjectPage();
initServices();
initServicePage();
