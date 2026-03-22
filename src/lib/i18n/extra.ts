import type { Lang } from '@/lib/i18n'

interface ExtraTranslations {
  nav: {
    menuOpen: string
    menuClose: string
    language: string
  }
  footer: {
    categoryProtocol: string
    categoryMeal: string
    categoryPortal: string
    categoryMore: string
    overview: string
    useCases: string
    proofOfMeal: string
    futureModules: string
    regions: string
    donate: string
    explorer: string
    enterPortal: string
    transparency: string
    validatorAccess: string
    organizations: string
    developers: string
    about: string
    tagline: string
    copyright: string
    brandLine: string
  }
  portalLayout: {
    title: string
    subtitle: string
    dashboard: string
    validator: string
    organization: string
    mealDashboard: string
    backToSite: string
  }
  portal: {
    mealSectionTag: string
    mealSectionTitle: string
    mealSectionSub: string
    mealRegionsLabel: string
    mealRegionsNote: string
    mealDonateLabel: string
    mealDonateNote: string
    mealExplorerLabel: string
    mealExplorerNote: string
    mealRegisterLabel: string
    mealRegisterNote: string
    mealDashboardLabel: string
    mealDashboardNote: string
    walletMetamask: string
    walletWalletConnect: string
    walletCoinbase: string
  }
  portalDashboard: {
    title: string
    submitAction: string
    actionsSubmitted: string
    verified: string
    totalMeals: string
    promptTitle: string
    promptBody: string
    recentSubmissions: string
    colId: string
    colType: string
    colDate: string
    colMeals: string
    colStatus: string
    statusVerified: string
    statusPending: string
  }
  portalOrg: {
    title: string
    verifiedOrganization: string
    editProfile: string
    totalActions: string
    mealsVerified: string
    teamMembers: string
    countries: string
    monthlyActivity: string
    activityChart: string
    team: string
    add: string
  }
  about: {
    tag: string
    title: string
    subtitle: string
    p1: string
    p2: string
    p3: string
    p4: string
    principlesTitle: string
    principle1Title: string
    principle1Desc: string
    principle2Title: string
    principle2Desc: string
    principle3Title: string
    principle3Desc: string
    principle4Title: string
    principle4Desc: string
    founderTitle: string
    founderName: string
    founderOrg: string
    founderDesc: string
  }
  network: {
    tag: string
    title: string
    subtitle: string
    role01: string
    role02: string
    role03: string
    validators: string
    participants: string
    organizations: string
    validatorsDesc: string
    participantsDesc: string
    organizationsDesc: string
    scaleTitle: string
    scaleDesc: string
    observerTitle: string
    observerDesc: string
  }
  useCases: {
    tag: string
    title: string
    subtitle: string
    liveFirst: string
    planned: string
    mealTitle: string
    mealDesc: string
    mealDetail: string
    mealCta: string
    shelterTitle: string
    shelterDesc: string
    shelterDetail: string
    medicineTitle: string
    medicineDesc: string
    medicineDetail: string
    educationTitle: string
    educationDesc: string
    educationDetail: string
    buildTitle: string
    buildDesc: string
    docsCta: string
    viewImpl: string
  }
  sections: {
    howTag: string
    howTitle: string
    howSubtitle: string
    step1Num: string
    step1Title: string
    step1Body: string
    step2Num: string
    step2Title: string
    step2Body: string
    step3Num: string
    step3Title: string
    step3Body: string
    statsVerified: string
    statsMeals: string
    statsCountries: string
    statsOrganizations: string
    useCasesTag: string
    useCasesTitle: string
    useCasesSubtitle: string
    learnMore: string
  }
  donateUi: {
    addressLabel: string
    explorerShort: string
    txSingular: string
    txPlural: string
    tronExplorer: string
    ethExplorer: string
  }
  meal: {
    firstProductLive: string
    statsRaised: string
    statsMeals: string
    statsRegions: string
    statsEvents: string
    howTag: string
    howFullExplanation: string
    howOverviewTag: string
    howLead: string
    step1Title: string
    step1Desc: string
    step2Title: string
    step2Desc: string
    step3Title: string
    step3Desc: string
    step4Title: string
    step4Desc: string
    step5Title: string
    step5Desc: string
    regionsNeedSupport: string
    allRegions: string
    mapComingSoon: string
    mapPreviewTitle: string
    mapPreviewBody: string
    mapPreviewCta: string
    mapCoveragePreview: string
    mapFutureModelTag: string
    mapFutureModelTitle: string
    mapFutureModelBody: string
    mapNeedIntensity: string
    mapNeedCritical: string
    mapNeedHigh: string
    mapNeedCovered: string
    mapNeedShort: string
    ctaTitle: string
    ctaBody: string
    donateTag: string
    enterAmountPlaceholder: string
    methodNoteUsdt: string
    methodNoteEth: string
    methodNoteFiat: string
    networkComingSoon: string
    methodLabel: string
    statusLabel: string
    processing: string
    donatingTo: string
    confirmTitle: string
    confirmRegion: string
    confirmAmount: string
    confirmMethod: string
    confirmNetwork: string
    currencyCol: string
    openPoraExplorer: string
    openAction: string
    donateToRegion: string
    fundedLabel: string
    anonymous: string
    dashboardRegionsCard: string
    dashboardDonateCard: string
    dashboardExplorerCard: string
  }
}

const en: ExtraTranslations = {
  nav: {
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    language: 'Lang',
  },
  footer: {
    categoryProtocol: 'Protocol',
    categoryMeal: 'MEAL',
    categoryPortal: 'Portal',
    categoryMore: 'More',
    overview: 'Overview',
    useCases: 'Use Cases',
    proofOfMeal: 'Proof of Meal',
    futureModules: 'Future Modules',
    regions: 'Regions',
    donate: 'Donate',
    explorer: 'Explorer',
    enterPortal: 'Enter Portal',
    transparency: 'Transparency',
    validatorAccess: 'Validator Access',
    organizations: 'Organizations',
    developers: 'Developers',
    about: 'About',
    tagline: 'Proof of Real Action - open infrastructure for verifiable real-world impact.',
    copyright: '© 2025 PORA Protocol Foundation. Open source.',
    brandLine: 'Proof of Real Action',
  },
  portalLayout: {
    title: 'PORA Portal',
    subtitle: 'Ecosystem Access',
    dashboard: 'Dashboard',
    validator: 'Validator',
    organization: 'Organization',
    mealDashboard: 'MEAL Dashboard',
    backToSite: 'Back to Site',
  },
  portal: {
    mealSectionTag: 'MEAL Section',
    mealSectionTitle: 'Frontend MVP routes inside [lang]',
    mealSectionSub: 'Core donor-facing paths available under localized routing.',
    mealRegionsLabel: 'Regions',
    mealRegionsNote: 'Browse active programs',
    mealDonateLabel: 'Donate',
    mealDonateNote: 'Start the mock donation flow',
    mealExplorerLabel: 'Explorer',
    mealExplorerNote: 'Review transparent activity',
    mealRegisterLabel: 'Register',
    mealRegisterNote: 'Create a demo donor account',
    mealDashboardLabel: 'Dashboard',
    mealDashboardNote: 'Open the donor MVP dashboard',
    walletMetamask: 'MetaMask',
    walletWalletConnect: 'WalletConnect',
    walletCoinbase: 'Coinbase Wallet',
  },
  portalDashboard: {
    title: 'Dashboard',
    submitAction: 'Submit New Action',
    actionsSubmitted: 'Actions Submitted',
    verified: 'Verified',
    totalMeals: 'Total Meals',
    promptTitle: 'Submit a new Proof of Meal event',
    promptBody: 'Upload evidence of a real feeding event to add it to the protocol.',
    recentSubmissions: 'Recent Submissions',
    colId: 'ID',
    colType: 'Type',
    colDate: 'Date',
    colMeals: 'Meals',
    colStatus: 'Status',
    statusVerified: 'verified',
    statusPending: 'pending',
  },
  portalOrg: {
    title: 'Community Aid Foundation',
    verifiedOrganization: 'Verified Organization',
    editProfile: 'Edit Profile',
    totalActions: 'Total Actions',
    mealsVerified: 'Meals Verified',
    teamMembers: 'Team Members',
    countries: 'Countries',
    monthlyActivity: 'Monthly Activity',
    activityChart: 'Activity Chart',
    team: 'Team',
    add: 'Add',
  },
  about: {
    tag: 'About',
    title: 'Why this protocol exists',
    subtitle: 'PORA is built on a simple conviction: real impact should be legible, permanent, and verifiable by anyone.',
    p1: 'Billions of humanitarian actions happen every day. Most remain invisible because they are unrecorded or locked in private silos.',
    p2: 'When impact is invisible, accountability is impossible. Donors, communities, and institutions cannot reliably verify outcomes.',
    p3: 'PORA provides open infrastructure to record real-world actions with public, auditable, and durable evidence.',
    p4: 'The protocol is minimal by design: it defines verification and record standards, while implementations define action specifics.',
    principlesTitle: 'Principles',
    principle1Title: 'Radical transparency',
    principle1Desc: 'Action records, validator decisions, and aggregate stats are public by default.',
    principle2Title: 'Action over speculation',
    principle2Desc: 'No token promises. Value comes from verified real-world impact.',
    principle3Title: 'Open infrastructure',
    principle3Desc: 'Anyone can build, validate, or participate on top of PORA.',
    principle4Title: 'Minimal by design',
    principle4Desc: 'Stable protocol core, flexible product implementations.',
    founderTitle: 'Founder',
    founderName: 'Founder Name',
    founderOrg: 'PORA Protocol Foundation',
    founderDesc: 'Building open infrastructure for a world where every humanitarian action is counted, verified, and permanently on the record.',
  },
  network: {
    tag: 'Network',
    title: 'A global verification network',
    subtitle: 'PORA operates through distributed validators, participants, and organizations worldwide.',
    role01: 'Role 01',
    role02: 'Role 02',
    role03: 'Role 03',
    validators: 'Validators',
    participants: 'Participants',
    organizations: 'Organizations',
    validatorsDesc: 'Independent reviewers that confirm submitted actions against protocol standards.',
    participantsDesc: 'Individuals and teams that submit verifiable humanitarian actions.',
    organizationsDesc: 'Formal entities that operate at scale and integrate with protocol APIs.',
    scaleTitle: 'How the network scales',
    scaleDesc: 'New validators onboard, organizations integrate, and new Proof-of-X modules extend the same core protocol.',
    observerTitle: 'Observer access',
    observerDesc: 'Anyone can inspect records, validator activity, and aggregate statistics without joining the network.',
  },
  useCases: {
    tag: 'Use Cases',
    title: 'Proof-of-X Implementations',
    subtitle: 'Any verifiable humanitarian action can become a module on the PORA protocol.',
    liveFirst: 'Live - First Implementation',
    planned: 'Planned',
    mealTitle: 'Proof of Meal',
    mealDesc: 'The first production implementation of PORA, verifying real feeding events and preserving transparent records.',
    mealDetail: 'Participants submit evidence-based feeding events. After validation, they become permanent protocol records.',
    mealCta: 'Open MEAL →',
    shelterTitle: 'Proof of Shelter',
    shelterDesc: 'Verification of shelter provision events for vulnerable and displaced groups.',
    shelterDetail: 'Planned for emergency housing teams and relief organizations.',
    medicineTitle: 'Proof of Medicine',
    medicineDesc: 'Recording medical assistance events, treatments, and medicine distribution.',
    medicineDetail: 'Designed for clinics, mobile units, and healthcare NGO workflows.',
    educationTitle: 'Proof of Education',
    educationDesc: 'Verification of educational support sessions and material distribution.',
    educationDetail: 'Applicable to community schools, tutoring programs, and training initiatives.',
    buildTitle: 'Build a Proof-of-X',
    buildDesc: 'Use PORA verification + record infrastructure and define your own action standard.',
    docsCta: 'Read the developer docs →',
    viewImpl: 'View implementation →',
  },
  sections: {
    howTag: 'How it works',
    howTitle: 'From action to permanent record',
    howSubtitle: 'Three steps convert a real event into a transparent protocol record.',
    step1Num: '01 - Real Action',
    step1Title: 'The Event Occurs',
    step1Body: 'A participant performs a verifiable humanitarian action and submits supporting evidence.',
    step2Num: '02 - Verification',
    step2Title: 'Validators Confirm',
    step2Body: 'Independent validators review evidence and confirm protocol compliance.',
    step3Num: '03 - Protocol Record',
    step3Title: 'Permanent and Public',
    step3Body: 'Validated actions become public, durable protocol records.',
    statsVerified: 'Verified Actions',
    statsMeals: 'Meals Recorded',
    statsCountries: 'Countries',
    statsOrganizations: 'Organizations',
    useCasesTag: 'Use Cases',
    useCasesTitle: 'Proof-of-X Implementations',
    useCasesSubtitle: 'The PORA protocol can power multiple verifiable humanitarian modules.',
    learnMore: 'Learn more',
  },
  donateUi: {
    addressLabel: 'address',
    explorerShort: 'Explorer',
    txSingular: 'transaction',
    txPlural: 'transactions',
    tronExplorer: 'Tronscan',
    ethExplorer: 'Etherscan',
  },
  meal: {
    firstProductLive: 'First PORA Product - Live',
    statsRaised: 'Total raised',
    statsMeals: 'Meals served',
    statsRegions: 'Regions',
    statsEvents: 'Verified events',
    howTag: 'How it works',
    howFullExplanation: 'Full explanation',
    howOverviewTag: 'Product overview',
    howLead: 'MEAL is a structured humanitarian feeding product built on top of the PORA verification protocol.',
    step1Title: 'You donate',
    step1Desc: 'Choose a region and send crypto. Your donation is directed to that feeding program.',
    step2Title: 'Region receives',
    step2Desc: 'Coordinators purchase ingredients and supplies for local kitchens.',
    step3Title: 'Event is served',
    step3Desc: 'The team logs the event with date, location, and meal count.',
    step4Title: 'Protocol records',
    step4Desc: 'Validators verify the event and write it to the public PORA record layer.',
    step5Title: 'MEAL and PORA',
    step5Desc: 'MEAL is the application layer, while PORA is the protocol layer for validators, records, and APIs.',
    regionsNeedSupport: 'Regions needing support',
    allRegions: 'all regions',
    mapComingSoon: 'Coming soon',
    mapPreviewTitle: 'Interactive World Map',
    mapPreviewBody: 'The future MEAL interface will let you zoom into any country, see food-need density by region, and direct support where it is needed.',
    mapPreviewCta: 'Preview map concept',
    mapCoveragePreview: 'MEAL Global Coverage Preview',
    mapFutureModelTag: 'Future interaction model',
    mapFutureModelTitle: 'Select a region on the map. Support it directly.',
    mapFutureModelBody: "The future MEAL interface will display food-need intensity by region. You'll zoom into an area, see deficit and active programs, and donate directly to that zone.",
    mapNeedIntensity: 'Need intensity:',
    mapNeedCritical: 'Critical',
    mapNeedHigh: 'High',
    mapNeedCovered: 'Covered',
    mapNeedShort: 'need',
    ctaTitle: 'Every meal, on the record.',
    ctaBody: 'MEAL is built on PORA. Your donation creates a permanent, auditable trail from donor to plate.',
    donateTag: 'Donation',
    enterAmountPlaceholder: 'Enter amount',
    methodNoteUsdt: 'Fastest, lowest fees',
    methodNoteEth: 'ERC20 tokens supported',
    methodNoteFiat: 'Fiat onramp coming soon',
    networkComingSoon: 'Coming soon',
    methodLabel: 'Method',
    statusLabel: 'Status',
    processing: 'Processing',
    donatingTo: 'Donating to',
    confirmTitle: 'Confirm your donation',
    confirmRegion: 'Region',
    confirmAmount: 'Amount',
    confirmMethod: 'Method',
    confirmNetwork: 'Network',
    currencyCol: 'Currency',
    openPoraExplorer: 'Open PORA Protocol Explorer',
    openAction: 'Open',
    donateToRegion: 'to this region',
    fundedLabel: 'funded',
    anonymous: 'Anonymous',
    dashboardRegionsCard: 'Browse active regions, compare urgency, and pick a verified feeding program.',
    dashboardDonateCard: 'Start a frontend-only donation flow with region targeting and mock confirmation.',
    dashboardExplorerCard: 'Review transparent donation and event activity across the current MEAL dataset.',
  },
}

const ru: ExtraTranslations = {
  nav: {
    menuOpen: 'Открыть меню',
    menuClose: 'Закрыть меню',
    language: 'Язык',
  },
  footer: {
    categoryProtocol: 'Протокол',
    categoryMeal: 'MEAL',
    categoryPortal: 'Портал',
    categoryMore: 'Ещё',
    overview: 'Обзор',
    useCases: 'Сценарии',
    proofOfMeal: 'Подтверждение питания',
    futureModules: 'Будущие модули',
    regions: 'Регионы',
    donate: 'Пожертвовать',
    explorer: 'Проводник',
    enterPortal: 'Войти в портал',
    transparency: 'Прозрачность',
    validatorAccess: 'Доступ валидатора',
    organizations: 'Организации',
    developers: 'Разработчикам',
    about: 'О проекте',
    tagline: 'Proof of Real Action - открытая инфраструктура для верифицируемого реального воздействия.',
    copyright: '© 2025 PORA Protocol Foundation. Открытый исходный код.',
    brandLine: 'Proof of Real Action',
  },
  portalLayout: {
    title: 'Портал PORA',
    subtitle: 'Доступ к экосистеме',
    dashboard: 'Дашборд',
    validator: 'Валидатор',
    organization: 'Организация',
    mealDashboard: 'MEAL Дашборд',
    backToSite: 'Назад на сайт',
  },
  portal: {
    mealSectionTag: 'Раздел MEAL',
    mealSectionTitle: 'MVP-маршруты фронтенда внутри [lang]',
    mealSectionSub: 'Ключевые пользовательские пути доноров в локализованной структуре.',
    mealRegionsLabel: 'Регионы',
    mealRegionsNote: 'Просмотр активных программ',
    mealDonateLabel: 'Пожертвовать',
    mealDonateNote: 'Запуск демо-потока пожертвования',
    mealExplorerLabel: 'Проводник',
    mealExplorerNote: 'Проверка прозрачной активности',
    mealRegisterLabel: 'Регистрация',
    mealRegisterNote: 'Создать демо-аккаунт донора',
    mealDashboardLabel: 'Дашборд',
    mealDashboardNote: 'Открыть MVP-дашборд донора',
    walletMetamask: 'MetaMask',
    walletWalletConnect: 'WalletConnect',
    walletCoinbase: 'Coinbase Wallet',
  },
  portalDashboard: {
    title: 'Дашборд',
    submitAction: 'Отправить новое действие',
    actionsSubmitted: 'Отправлено действий',
    verified: 'Верифицировано',
    totalMeals: 'Всего приёмов пищи',
    promptTitle: 'Отправить новое событие Proof of Meal',
    promptBody: 'Загрузите подтверждение реального события кормления для записи в протокол.',
    recentSubmissions: 'Недавние отправки',
    colId: 'ID',
    colType: 'Тип',
    colDate: 'Дата',
    colMeals: 'Приёмы пищи',
    colStatus: 'Статус',
    statusVerified: 'верифицировано',
    statusPending: 'ожидает',
  },
  portalOrg: {
    title: 'Фонд Community Aid',
    verifiedOrganization: 'Верифицированная организация',
    editProfile: 'Редактировать профиль',
    totalActions: 'Всего действий',
    mealsVerified: 'Верифицировано приёмов пищи',
    teamMembers: 'Участники команды',
    countries: 'Страны',
    monthlyActivity: 'Активность по месяцам',
    activityChart: 'График активности',
    team: 'Команда',
    add: 'Добавить',
  },
  about: {
    tag: 'О проекте',
    title: 'Зачем нужен этот протокол',
    subtitle: 'PORA основан на простой идее: реальный вклад должен быть видимым, постоянным и верифицируемым для всех.',
    p1: 'Ежедневно происходят миллиарды гуманитарных действий, но большая часть из них остаётся невидимой.',
    p2: 'Если вклад невидим, невозможно обеспечить подотчётность для доноров, сообществ и институтов.',
    p3: 'PORA создаёт открытую инфраструктуру для публичной, проверяемой и долговечной фиксации реальных действий.',
    p4: 'Протокол намеренно минимален: он задаёт стандарты верификации и записи, а конкретные продукты развиваются сверху.',
    principlesTitle: 'Принципы',
    principle1Title: 'Радикальная прозрачность',
    principle1Desc: 'Записи действий, решения валидаторов и агрегированные метрики публичны.',
    principle2Title: 'Действие вместо спекуляции',
    principle2Desc: 'Без токен-обещаний. Ценность формируется реальным подтверждённым воздействием.',
    principle3Title: 'Открытая инфраструктура',
    principle3Desc: 'Любой может строить, валидировать и участвовать в экосистеме PORA.',
    principle4Title: 'Минимализм в основе',
    principle4Desc: 'Стабильное ядро протокола и гибкие прикладные модули.',
    founderTitle: 'Основатель',
    founderName: 'Имя основателя',
    founderOrg: 'PORA Protocol Foundation',
    founderDesc: 'Строим открытую инфраструктуру, где каждое гуманитарное действие учитывается, проверяется и остаётся в публичном реестре.',
  },
  network: {
    tag: 'Сеть',
    title: 'Глобальная сеть верификации',
    subtitle: 'PORA работает через распределённую сеть валидаторов, участников и организаций по всему миру.',
    role01: 'Роль 01',
    role02: 'Роль 02',
    role03: 'Роль 03',
    validators: 'Валидаторы',
    participants: 'Участники',
    organizations: 'Организации',
    validatorsDesc: 'Независимо проверяют отправленные действия на соответствие стандартам протокола.',
    participantsDesc: 'Люди и команды, отправляющие верифицируемые гуманитарные действия.',
    organizationsDesc: 'Официальные структуры, работающие в масштабе и интегрирующиеся через API.',
    scaleTitle: 'Как масштабируется сеть',
    scaleDesc: 'Подключаются новые валидаторы, интегрируются организации, добавляются модули Proof-of-X.',
    observerTitle: 'Доступ наблюдателя',
    observerDesc: 'Любой может изучать записи, активность валидаторов и агрегированные данные без регистрации в сети.',
  },
  useCases: {
    tag: 'Сценарии',
    title: 'Реализации Proof-of-X',
    subtitle: 'Любое верифицируемое гуманитарное действие может стать модулем протокола PORA.',
    liveFirst: 'В работе - первая реализация',
    planned: 'Запланировано',
    mealTitle: 'Proof of Meal',
    mealDesc: 'Первая продакшен-реализация PORA: верификация реальных событий кормления и прозрачная запись.',
    mealDetail: 'События с подтверждающими материалами проходят валидацию и становятся постоянными записями протокола.',
    mealCta: 'Открыть MEAL →',
    shelterTitle: 'Proof of Shelter',
    shelterDesc: 'Верификация событий предоставления жилья для уязвимых и перемещённых групп.',
    shelterDetail: 'Планируется для команд экстренного размещения и гуманитарных организаций.',
    medicineTitle: 'Proof of Medicine',
    medicineDesc: 'Фиксация медицинской помощи, лечения и распределения медикаментов.',
    medicineDetail: 'Подходит для клиник, мобильных бригад и процессов медицинских НКО.',
    educationTitle: 'Proof of Education',
    educationDesc: 'Верификация образовательных сессий и распределения учебных материалов.',
    educationDetail: 'Применимо для общественных школ, программ наставничества и обучения.',
    buildTitle: 'Создать Proof-of-X',
    buildDesc: 'Используйте инфраструктуру верификации и записей PORA и определите свой стандарт действий.',
    docsCta: 'Документация для разработчиков →',
    viewImpl: 'Открыть реализацию →',
  },
  sections: {
    howTag: 'Как это работает',
    howTitle: 'От действия к постоянной записи',
    howSubtitle: 'Три шага превращают реальное событие в прозрачную запись протокола.',
    step1Num: '01 - Реальное действие',
    step1Title: 'Событие происходит',
    step1Body: 'Участник выполняет гуманитарное действие и отправляет подтверждающие материалы.',
    step2Num: '02 - Верификация',
    step2Title: 'Валидаторы подтверждают',
    step2Body: 'Независимые валидаторы проверяют доказательства на соответствие стандартам.',
    step3Num: '03 - Запись протокола',
    step3Title: 'Постоянно и публично',
    step3Body: 'Подтверждённые действия становятся публичными постоянными записями протокола.',
    statsVerified: 'Верифицировано действий',
    statsMeals: 'Записано приёмов пищи',
    statsCountries: 'Страны',
    statsOrganizations: 'Организации',
    useCasesTag: 'Сценарии',
    useCasesTitle: 'Реализации Proof-of-X',
    useCasesSubtitle: 'Протокол PORA поддерживает разные верифицируемые гуманитарные модули.',
    learnMore: 'Подробнее',
  },
  donateUi: {
    addressLabel: 'адрес',
    explorerShort: 'Проводник',
    txSingular: 'транзакция',
    txPlural: 'транзакций',
    tronExplorer: 'Tronscan',
    ethExplorer: 'Etherscan',
  },
  meal: {
    firstProductLive: 'Первый продукт PORA - в работе',
    statsRaised: 'Собрано',
    statsMeals: 'Выдано приёмов пищи',
    statsRegions: 'Регионы',
    statsEvents: 'Верифицировано событий',
    howTag: 'Как это работает',
    howFullExplanation: 'Подробное описание',
    howOverviewTag: 'Обзор продукта',
    howLead: 'MEAL — прикладной продукт гуманитарного питания, построенный поверх протокола верификации PORA.',
    step1Title: 'Вы жертвуете',
    step1Desc: 'Выберите регион и отправьте криптовалюту. Пожертвование направляется в конкретную программу.',
    step2Title: 'Регион получает',
    step2Desc: 'Координаторы закупают продукты и расходники для локальных кухонь.',
    step3Title: 'Событие проводится',
    step3Desc: 'Команда фиксирует событие с датой, местом и числом приёмов пищи.',
    step4Title: 'Протокол записывает',
    step4Desc: 'Валидаторы подтверждают событие и записывают его в публичный реестр PORA.',
    step5Title: 'MEAL и PORA',
    step5Desc: 'MEAL — прикладной слой, PORA — протокольный слой валидаторов, записей и API.',
    regionsNeedSupport: 'Регионы, которым нужна поддержка',
    allRegions: 'все регионы',
    mapComingSoon: 'Скоро',
    mapPreviewTitle: 'Интерактивная карта мира',
    mapPreviewBody: 'Будущий интерфейс MEAL позволит приближать страны, видеть плотность продовольственной потребности и направлять поддержку точечно.',
    mapPreviewCta: 'Предпросмотр концепта карты',
    mapCoveragePreview: 'MEAL: предварительный глобальный охват',
    mapFutureModelTag: 'Будущая модель взаимодействия',
    mapFutureModelTitle: 'Выберите регион на карте и поддержите его.',
    mapFutureModelBody: 'Будущий интерфейс MEAL будет показывать интенсивность продовольственной потребности по регионам. Можно приблизить зону, увидеть дефицит и активные программы и направить пожертвование адресно.',
    mapNeedIntensity: 'Интенсивность потребности:',
    mapNeedCritical: 'Критическая',
    mapNeedHigh: 'Высокая',
    mapNeedCovered: 'Покрытая',
    mapNeedShort: 'потребность',
    ctaTitle: 'Каждый приём пищи - в реестре.',
    ctaBody: 'MEAL построен на PORA. Ваше пожертвование создаёт постоянный и проверяемый путь от донора до тарелки.',
    donateTag: 'Пожертвование',
    enterAmountPlaceholder: 'Введите сумму',
    methodNoteUsdt: 'Быстро и с низкой комиссией',
    methodNoteEth: 'Поддерживаются токены ERC20',
    methodNoteFiat: 'Фиатный шлюз скоро',
    networkComingSoon: 'Скоро',
    methodLabel: 'Метод',
    statusLabel: 'Статус',
    processing: 'В обработке',
    donatingTo: 'Пожертвование в',
    confirmTitle: 'Подтвердите пожертвование',
    confirmRegion: 'Регион',
    confirmAmount: 'Сумма',
    confirmMethod: 'Метод',
    confirmNetwork: 'Сеть',
    currencyCol: 'Валюта',
    openPoraExplorer: 'Открыть проводник протокола PORA',
    openAction: 'Открыть',
    donateToRegion: 'в этот регион',
    fundedLabel: 'профинансировано',
    anonymous: 'Анонимно',
    dashboardRegionsCard: 'Просматривайте активные регионы, оценивайте срочность и выбирайте верифицированную программу.',
    dashboardDonateCard: 'Запускайте фронтенд-only поток пожертвования с выбором региона и демо-подтверждением.',
    dashboardExplorerCard: 'Проверяйте прозрачные данные по пожертвованиям и событиям в текущем наборе MEAL.',
  },
}

const es: ExtraTranslations = {
  nav: {
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    language: 'Idioma',
  },
  footer: {
    categoryProtocol: 'Protocolo',
    categoryMeal: 'MEAL',
    categoryPortal: 'Portal',
    categoryMore: 'Más',
    overview: 'Resumen',
    useCases: 'Casos de uso',
    proofOfMeal: 'Prueba de alimentación',
    futureModules: 'Módulos futuros',
    regions: 'Regiones',
    donate: 'Donar',
    explorer: 'Explorador',
    enterPortal: 'Entrar al portal',
    transparency: 'Transparencia',
    validatorAccess: 'Acceso de validador',
    organizations: 'Organizaciones',
    developers: 'Desarrolladores',
    about: 'Acerca de',
    tagline: 'Proof of Real Action - infraestructura abierta para impacto real verificable.',
    copyright: '© 2025 PORA Protocol Foundation. Código abierto.',
    brandLine: 'Proof of Real Action',
  },
  portalLayout: {
    title: 'Portal PORA',
    subtitle: 'Acceso al ecosistema',
    dashboard: 'Panel',
    validator: 'Validador',
    organization: 'Organización',
    mealDashboard: 'Panel MEAL',
    backToSite: 'Volver al sitio',
  },
  portal: {
    mealSectionTag: 'Sección MEAL',
    mealSectionTitle: 'Rutas MVP frontend dentro de [lang]',
    mealSectionSub: 'Rutas clave para donantes dentro del árbol de rutas localizado.',
    mealRegionsLabel: 'Regiones',
    mealRegionsNote: 'Explorar programas activos',
    mealDonateLabel: 'Donar',
    mealDonateNote: 'Iniciar flujo de donación de prueba',
    mealExplorerLabel: 'Explorador',
    mealExplorerNote: 'Revisar actividad transparente',
    mealRegisterLabel: 'Registro',
    mealRegisterNote: 'Crear cuenta de donante demo',
    mealDashboardLabel: 'Panel',
    mealDashboardNote: 'Abrir panel MVP de donante',
    walletMetamask: 'MetaMask',
    walletWalletConnect: 'WalletConnect',
    walletCoinbase: 'Coinbase Wallet',
  },
  portalDashboard: {
    title: 'Panel',
    submitAction: 'Enviar nueva acción',
    actionsSubmitted: 'Acciones enviadas',
    verified: 'Verificado',
    totalMeals: 'Comidas totales',
    promptTitle: 'Enviar un nuevo evento Proof of Meal',
    promptBody: 'Sube evidencia de un evento real de alimentación para añadirlo al protocolo.',
    recentSubmissions: 'Envíos recientes',
    colId: 'ID',
    colType: 'Tipo',
    colDate: 'Fecha',
    colMeals: 'Comidas',
    colStatus: 'Estado',
    statusVerified: 'verificado',
    statusPending: 'pendiente',
  },
  portalOrg: {
    title: 'Fundación Community Aid',
    verifiedOrganization: 'Organización verificada',
    editProfile: 'Editar perfil',
    totalActions: 'Acciones totales',
    mealsVerified: 'Comidas verificadas',
    teamMembers: 'Miembros del equipo',
    countries: 'Países',
    monthlyActivity: 'Actividad mensual',
    activityChart: 'Gráfico de actividad',
    team: 'Equipo',
    add: 'Añadir',
  },
  about: {
    tag: 'Acerca de',
    title: 'Por qué existe este protocolo',
    subtitle: 'PORA se basa en una convicción simple: el impacto real debe ser legible, permanente y verificable por cualquiera.',
    p1: 'Miles de millones de acciones humanitarias ocurren cada día, pero gran parte permanece invisible.',
    p2: 'Cuando el impacto es invisible, la rendición de cuentas se rompe para donantes, comunidades e instituciones.',
    p3: 'PORA aporta infraestructura abierta para registrar acciones reales con evidencia pública, auditable y duradera.',
    p4: 'El protocolo es mínimo por diseño: define verificación y registro; los productos definen los detalles de acción.',
    principlesTitle: 'Principios',
    principle1Title: 'Transparencia radical',
    principle1Desc: 'Los registros de acción, decisiones de validadores y métricas agregadas son públicos.',
    principle2Title: 'Acción sobre especulación',
    principle2Desc: 'Sin promesas de token. El valor proviene del impacto real verificado.',
    principle3Title: 'Infraestructura abierta',
    principle3Desc: 'Cualquiera puede construir, validar o participar sobre PORA.',
    principle4Title: 'Minimalismo por diseño',
    principle4Desc: 'Núcleo de protocolo estable e implementaciones de producto flexibles.',
    founderTitle: 'Fundador',
    founderName: 'Nombre del fundador',
    founderOrg: 'PORA Protocol Foundation',
    founderDesc: 'Construimos infraestructura abierta para un mundo donde cada acción humanitaria se cuenta, se verifica y queda en el registro.',
  },
  network: {
    tag: 'Red',
    title: 'Una red global de verificación',
    subtitle: 'PORA opera mediante validadores, participantes y organizaciones distribuidas globalmente.',
    role01: 'Rol 01',
    role02: 'Rol 02',
    role03: 'Rol 03',
    validators: 'Validadores',
    participants: 'Participantes',
    organizations: 'Organizaciones',
    validatorsDesc: 'Revisan envíos de forma independiente y confirman cumplimiento del protocolo.',
    participantsDesc: 'Personas y equipos que envían acciones humanitarias verificables.',
    organizationsDesc: 'Entidades formales que operan a escala e integran vía API del protocolo.',
    scaleTitle: 'Cómo escala la red',
    scaleDesc: 'Se incorporan validadores, se integran organizaciones y se amplían módulos Proof-of-X sobre el mismo núcleo.',
    observerTitle: 'Acceso de observador',
    observerDesc: 'Cualquiera puede inspeccionar registros, actividad de validadores y estadísticas agregadas sin registrarse.',
  },
  useCases: {
    tag: 'Casos de uso',
    title: 'Implementaciones Proof-of-X',
    subtitle: 'Cualquier acción humanitaria verificable puede convertirse en un módulo de PORA.',
    liveFirst: 'En vivo - primera implementación',
    planned: 'Planificado',
    mealTitle: 'Proof of Meal',
    mealDesc: 'Primera implementación en producción de PORA, verificando eventos reales de alimentación con registros transparentes.',
    mealDetail: 'Los eventos con evidencia se validan y se convierten en registros permanentes del protocolo.',
    mealCta: 'Abrir MEAL →',
    shelterTitle: 'Proof of Shelter',
    shelterDesc: 'Verificación de provisión de refugio para poblaciones vulnerables y desplazadas.',
    shelterDetail: 'Planificado para equipos de vivienda de emergencia y organizaciones de ayuda.',
    medicineTitle: 'Proof of Medicine',
    medicineDesc: 'Registro de asistencia médica, tratamientos y distribución de medicamentos.',
    medicineDetail: 'Diseñado para clínicas, unidades móviles y flujos de ONG de salud.',
    educationTitle: 'Proof of Education',
    educationDesc: 'Verificación de sesiones educativas y distribución de materiales de aprendizaje.',
    educationDetail: 'Aplicable a escuelas comunitarias, tutorías y programas de capacitación.',
    buildTitle: 'Construir un Proof-of-X',
    buildDesc: 'Usa la infraestructura de verificación + registro de PORA y define tu propio estándar de acción.',
    docsCta: 'Leer documentación para desarrolladores →',
    viewImpl: 'Ver implementación →',
  },
  sections: {
    howTag: 'Cómo funciona',
    howTitle: 'De la acción al registro permanente',
    howSubtitle: 'Tres pasos convierten un evento real en un registro transparente del protocolo.',
    step1Num: '01 - Acción real',
    step1Title: 'Ocurre el evento',
    step1Body: 'Un participante realiza una acción humanitaria verificable y envía evidencia.',
    step2Num: '02 - Verificación',
    step2Title: 'Los validadores confirman',
    step2Body: 'Validadores independientes revisan evidencia y confirman cumplimiento del protocolo.',
    step3Num: '03 - Registro de protocolo',
    step3Title: 'Permanente y público',
    step3Body: 'Las acciones validadas se convierten en registros públicos y duraderos.',
    statsVerified: 'Acciones verificadas',
    statsMeals: 'Comidas registradas',
    statsCountries: 'Países',
    statsOrganizations: 'Organizaciones',
    useCasesTag: 'Casos de uso',
    useCasesTitle: 'Implementaciones Proof-of-X',
    useCasesSubtitle: 'El protocolo PORA puede impulsar múltiples módulos humanitarios verificables.',
    learnMore: 'Saber más',
  },
  donateUi: {
    addressLabel: 'dirección',
    explorerShort: 'Explorador',
    txSingular: 'transacción',
    txPlural: 'transacciones',
    tronExplorer: 'Tronscan',
    ethExplorer: 'Etherscan',
  },
  meal: {
    firstProductLive: 'Primer producto de PORA - activo',
    statsRaised: 'Total recaudado',
    statsMeals: 'Comidas servidas',
    statsRegions: 'Regiones',
    statsEvents: 'Eventos verificados',
    howTag: 'Cómo funciona',
    howFullExplanation: 'Explicación completa',
    howOverviewTag: 'Resumen del producto',
    howLead: 'MEAL es un producto estructurado de alimentación humanitaria construido sobre el protocolo de verificación PORA.',
    step1Title: 'Tú donas',
    step1Desc: 'Elige una región y envía cripto. La donación se dirige a ese programa específico.',
    step2Title: 'La región recibe',
    step2Desc: 'Los coordinadores compran ingredientes y suministros para cocinas locales.',
    step3Title: 'Se sirve el evento',
    step3Desc: 'El equipo registra fecha, ubicación y número de comidas.',
    step4Title: 'El protocolo registra',
    step4Desc: 'Los validadores verifican el evento y lo escriben en el registro público PORA.',
    step5Title: 'MEAL y PORA',
    step5Desc: 'MEAL es la capa de aplicación, mientras PORA es la capa de protocolo para validadores, registros y APIs.',
    regionsNeedSupport: 'Regiones que necesitan apoyo',
    allRegions: 'todas las regiones',
    mapComingSoon: 'Próximamente',
    mapPreviewTitle: 'Mapa mundial interactivo',
    mapPreviewBody: 'La futura interfaz de MEAL permitirá hacer zoom por país, ver densidad de necesidad alimentaria y dirigir apoyo por zona.',
    mapPreviewCta: 'Vista previa del concepto de mapa',
    mapCoveragePreview: 'Vista previa de cobertura global MEAL',
    mapFutureModelTag: 'Modelo de interacción futuro',
    mapFutureModelTitle: 'Selecciona una región en el mapa y apóyala directamente.',
    mapFutureModelBody: 'La futura interfaz de MEAL mostrará intensidad de necesidad alimentaria por región. Podrás acercarte a un área, ver déficit y programas activos, y donar directamente a esa zona.',
    mapNeedIntensity: 'Intensidad de necesidad:',
    mapNeedCritical: 'Crítica',
    mapNeedHigh: 'Alta',
    mapNeedCovered: 'Cubierta',
    mapNeedShort: 'necesidad',
    ctaTitle: 'Cada comida, en el registro.',
    ctaBody: 'MEAL se construye sobre PORA. Tu donación crea una trazabilidad permanente y auditable del donante al plato.',
    donateTag: 'Donación',
    enterAmountPlaceholder: 'Ingresa monto',
    methodNoteUsdt: 'Más rápido y con menor comisión',
    methodNoteEth: 'Compatible con tokens ERC20',
    methodNoteFiat: 'Integración fiat próximamente',
    networkComingSoon: 'Próximamente',
    methodLabel: 'Método',
    statusLabel: 'Estado',
    processing: 'Procesando',
    donatingTo: 'Donando a',
    confirmTitle: 'Confirma tu donación',
    confirmRegion: 'Región',
    confirmAmount: 'Monto',
    confirmMethod: 'Método',
    confirmNetwork: 'Red',
    currencyCol: 'Moneda',
    openPoraExplorer: 'Abrir explorador del protocolo PORA',
    openAction: 'Abrir',
    donateToRegion: 'a esta región',
    fundedLabel: 'financiado',
    anonymous: 'Anónimo',
    dashboardRegionsCard: 'Explora regiones activas, compara urgencia y elige un programa de alimentación verificado.',
    dashboardDonateCard: 'Inicia un flujo de donación frontend-only con selección de región y confirmación de prueba.',
    dashboardExplorerCard: 'Revisa actividad transparente de donaciones y eventos en el dataset actual de MEAL.',
  },
}

const dict: Record<Lang, ExtraTranslations> = { en, ru, es }

export function getExtraT(lang: Lang): ExtraTranslations {
  return dict[lang] ?? dict.en
}
