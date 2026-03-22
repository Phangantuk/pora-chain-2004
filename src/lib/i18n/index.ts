// ─── Supported languages ──────────────────────────────────────────────────────
export const SUPPORTED_LANGS = ['en', 'ru', 'es'] as const
export type Lang = typeof SUPPORTED_LANGS[number]

export function isValidLang(lang: string): lang is Lang {
  return SUPPORTED_LANGS.includes(lang as Lang)
}

// ─── Translation shape ────────────────────────────────────────────────────────
export interface Translations {
  lang:     Lang
  dir:      'ltr' | 'rtl'

  // ── Nav ──────────────────────────────────────────────────────────────────
  nav: {
    protocol:      string
    useCases:      string
    proofOfMeal:   string
    network:       string
    transparency:  string
    futureModules: string
    developers:    string
    about:         string
    docs:          string
    enterPortal:   string
    donate:        string
    explorer:      string
    meal:          string
  },

  // ── Common ───────────────────────────────────────────────────────────────
  common: {
    live:           string
    planned:        string
    research:       string
    learnMore:      string
    viewAll:        string
    openPortal:     string
    exploreProtocol:string
    readDocs:       string
    viewProtocol:   string
    backHome:       string
    comingSoon:     string
    verified:       string
    verifiedShort:  string
    development:    string
  },

  // ── Home page ─────────────────────────────────────────────────────────────
  home: {
    eyebrow:         string
    heroTitle:       string
    heroTitleAccent: string
    heroSub:         string
    flowStep1:       string
    flowStep2:       string
    flowStep3:       string
    ctaExplore:      string
    ctaPortal:       string
    scroll:          string
    howTag:          string
    howTitle:        string
    howSub:          string
    howCta:          string
    step1Title:      string
    step1Desc:       string
    step2Title:      string
    step2Desc:       string
    step3Title:      string
    step3Desc:       string
    statsTag:        string
    statsTitle:      string
    statsLive:       string
    statVerified:    string
    statMeals:       string
    statCountries:   string
    statValidators:  string
    statsFootnote:   string
    statsLink:       string
    globalTag:       string
    globalTitle:     string
    globalSub:       string
    mapLabel:        string
    mapSub:          string
    porTag:          string
    porTitle:        string
    porSub:          string
    porPoint1:       string
    porPoint2:       string
    porPoint3:       string
    porMealCta:      string
    liveEvents:      string
    moduleLabel:     string
    dashTag:         string
    dashTitle:       string
    dashAllActive:   string
    dashViewFull:    string
    dashFeedTitle:   string
    dashFeedSub:     string
    dashFeedLive:    string
    dashMapTitle:    string
    dashMapSub:      string
    dashHealthTitle: string
    dashHealthSub:   string
    healthNetwork:   string
    healthValidators:string
    healthQueue:     string
    healthBlock:     string
    healthApi:       string
    healthOk:        string
    healthPending:   string
    healthNominal:   string
    healthActive:    string
    healthOnline:    string
    sparkLabel:      string
    portalTag:       string
    portalTitle:     string
    portalSub:       string
    roleParticipant: string
    roleValidator:   string
    roleOrg:         string
    roleObserver:    string
  }

  // ── Future modules page ───────────────────────────────────────────────────
  future: {
    metaTitle:        string
    metaDesc:         string
    breadcrumbHome:   string
    eyebrow:          string
    pageTitle:        string
    pageSub:          string
    buildTag:         string
    buildTitle:       string
    buildSub:         string
    buildCtaDocs:     string
    buildCtaProtocol: string
    devLabel:         string
    modules: {
      meal:       { title: string; desc: string; detail: string; meta: string[] }
      shelter:    { title: string; desc: string; detail: string; meta: string[] }
      medicine:   { title: string; desc: string; detail: string; meta: string[] }
      education:  { title: string; desc: string; detail: string; meta: string[] }
      water:      { title: string; desc: string; detail: string; meta: string[] }
      protection: { title: string; desc: string; detail: string; meta: string[] }
    }
  }

  // ── Donate page ───────────────────────────────────────────────────────────
  donate: {
    metaTitle:        string
    metaDesc:         string
    eyebrow:          string
    pageTitle:        string
    pageSub:          string
    // wallets
    walletsTag:       string
    walletsTitle:     string
    walletsTron:      string
    walletsEth:       string
    networkTron:      string
    networkEth:       string
    copyAddress:      string
    copied:           string
    viewExplorer:     string
    // balances
    balancesTag:      string
    balancesTitle:    string
    balancesRefresh:  string
    balancesLastSeen: string
    balancesLoading:  string
    balancesError:    string
    // transactions
    txTag:            string
    txTitle:          string
    txSub:            string
    txLoading:        string
    txEmpty:          string
    txError:          string
    txViewAll:        string
    txFrom:           string
    txAmount:         string
    txTime:           string
    txNetwork:        string
    txHash:           string
    // transparency
    transparencyTag:  string
    transparencyText: string
    transparencyLink: string
    // nav
    donate:           string
  }

  // ── Explorer page ─────────────────────────────────────────────────────────
  explorer: {
    metaTitle:   string
    eyebrow:     string
    pageTitle:   string
    pageSub:     string
    totalEvents: string
    newSession:  string
    lastUpdated: string
    showing:     string
    refresh:     string
    refreshing:  string
    colId:       string
    colTime:     string
    colAge:      string
    loading:     string
    noEvents:    string
    noEventsHint:string
    errorPrefix: string
    demoMode:    string
    demoHint:    string
  }

  // ── MEAL product ──────────────────────────────────────────────────────────
  meal: {
    navLabel:string;tagline:string;heroTitle:string;heroSub:string
    ctaRegions:string;ctaExplorer:string;ctaDonate:string;ctaHowItWorks:string;ctaOpenApp:string
    flowDonate:string;flowRegion:string;flowEvent:string;flowTransparency:string
    howTitle:string;regionsTitle:string;regionsSub:string
    raised:string;goal:string;meals:string;events:string;lastActive:string;progress:string
    donate:string;viewRegion:string;urgent:string;active:string;funded:string
    donateTitle:string;donateSub:string;selectRegion:string;enterAmount:string
    selectMethod:string;submitDonation:string;donateSuccess:string;donateSuccessSub:string
    loginTitle:string;loginSub:string;registerTitle:string;registerSub:string
    emailLabel:string;passwordLabel:string;nameLabel:string;countryLabel:string
    loginCta:string;registerCta:string;noAccount:string;haveAccount:string
    dashTitle:string;dashTotalDonated:string;dashRegions:string;dashMeals:string
    dashDonations:string;dashRecentDonations:string;dashImpactEvents:string
    explTitle:string;explSub:string;explTotalDonations:string;explTotalRegions:string
    explTotalEvents:string;explTotalMeals:string;explRecentDonations:string;explRecentEvents:string
    colDate:string;colAmount:string;colRegion:string;colStatus:string;colMeals:string;colVerified:string
    statusConfirmed:string;statusPending:string;statusProcessing:string
    adminTitle:string;adminRegionsList:string;adminDonationSummary:string;adminRecentEvents:string
    emptyDonations:string;emptyEvents:string;backToMeal:string;openApp:string
    confirmBack:string;confirmNote:string;processingText:string
    // nav sub-labels
    navOverview:string;navRegions:string;navExplorer:string
    // map page
    mapTitle:string;mapEyebrow:string;mapFutureLabel:string
    mapFeature1:string;mapFeature2:string;mapFeature3:string;mapFeature4:string
    mapPreviewLabel:string
    // misc
    demoUser:string;demoNote:string
    verifiedLabel:string;pendingLabel:string
    protocolNote:string
    howItWorksLink:string
    allRegionsLink:string
  }
  // ── Portal page ───────────────────────────────────────────────────────────
  portal: {
    metaDesc:            string
    heroTag:             string
    heroTitle:           string
    heroSub:             string
    // Participant role
    participantEyebrow:  string
    participantDesc:     string
    participantCta:      string
    participantMeta1:    string
    participantMeta2:    string
    participantMeta3:    string
    // Validator role
    validatorEyebrow:    string
    validatorDesc:       string
    validatorCta:        string
    validatorMeta1:      string
    validatorMeta2:      string
    validatorMeta3:      string
    // Organization role
    orgEyebrow:          string
    orgDesc:             string
    orgCta:              string
    orgMeta1:            string
    orgMeta2:            string
    orgMeta3:            string
    // Observer role
    observerEyebrow:     string
    observerDesc:        string
    observerCta:         string
    observerMeta1:       string
    observerMeta2:       string
    observerMeta3:       string
    // Wallet section
    walletTitle:         string
    walletSub:           string
    // PORA/MEAL stack
    stackAppTag:         string
    stackAppLabel:       string
    stackAppSub:         string
    stackProtoTag:       string
    stackProtoLabel:     string
    stackProtoSub:       string
    stackFutureTag:      string
    stackFutureLabel:    string
    stackFutureSub:      string
    // Confirm / back
    confirmBack:         string
    confirmNote:         string
    processing:          string
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// ENGLISH
// ═════════════════════════════════════════════════════════════════════════════
const en: Translations = {
  lang: 'en',
  dir:  'ltr',

  nav: {
    protocol:      'Protocol',
    useCases:      'Use Cases',
    proofOfMeal:   'Proof of Meal',
    network:       'Network',
    transparency:  'Transparency',
    futureModules: 'Future Modules',
    developers:    'Developers',
    about:         'About',
    docs:          'Docs',
    enterPortal:   'Enter Portal →',
    donate:        'Donate',
    explorer:      'Explorer',
    meal:          'MEAL',
  },

  common: {
    live:            'Live',
    planned:         'Planned',
    research:        'Research',
    learnMore:       'Learn More',
    viewAll:         'View all events →',
    openPortal:      'Open Portal',
    exploreProtocol: 'Explore Protocol',
    readDocs:        'Read developer docs',
    viewProtocol:    'View protocol spec',
    backHome:        'Home',
    comingSoon:      'Coming soon',
    verified:        'verified',
    verifiedShort:   '✓ verified',
    development:     'Development',
  },

  home: {
    eyebrow:          'Protocol Live — First Implementation Active',
    heroTitle:        'Proof of',
    heroTitleAccent:  'Real Action',
    heroSub:          'A protocol connecting real-world humanitarian actions with verifiable, permanent digital records.',
    flowStep1:        'Real Action',
    flowStep2:        'Verification',
    flowStep3:        'Protocol Record',
    ctaExplore:       'Explore Protocol',
    ctaPortal:        'Enter Portal',
    scroll:           'Scroll',
    howTag:           'How it works',
    howTitle:         'From action to permanent record',
    howSub:           'PORA is infrastructure for turning real-world humanitarian events into verifiable, tamper-proof digital records. Any action. Any organization. Anywhere.',
    howCta:           'Read the protocol spec',
    step1Title:       'Real Action Occurs',
    step1Desc:        'A participant performs a verifiable humanitarian action — meals distributed, shelter provided, medical assistance given.',
    step2Title:       'Validators Confirm',
    step2Desc:        'Independent validators review submitted evidence against protocol standards before the record proceeds.',
    step3Title:       'Permanent Record',
    step3Desc:        'The verified event is written to the PORA record layer — public, immutable, and queryable by anyone.',
    statsTag:         'Network Stats',
    statsTitle:       'Protocol activity, live and open',
    statsLive:        'Updating live',
    statVerified:     'Verified Actions',
    statMeals:        'Meals Verified',
    statCountries:    'Countries',
    statValidators:   'Validators',
    statsFootnote:    'All data is publicly verifiable via the PORA protocol API.',
    statsLink:        'View full transparency ledger →',
    globalTag:        'Global Network',
    globalTitle:      'Global Network of Real Actions',
    globalSub:        'Verified actions are recorded with location data, building a transparent global ledger of humanitarian impact.',
    mapLabel:         'Interactive global map — coming soon',
    mapSub:           'Verified actions will appear here in real time',
    porTag:           'First Implementation',
    porTitle:         'Proof of Meal',
    porSub:           'A system that verifies real-world feeding events and records them as permanent protocol actions. From local community kitchens to large-scale aid operations — every meal counts.',
    porPoint1:        'Submit a feeding event with photographic evidence',
    porPoint2:        'Validators confirm the event meets protocol standards',
    porPoint3:        'Event becomes a permanent, public protocol record',
    porMealCta:       'Open MEAL — Explore regions',
    liveEvents:       'Live protocol events',
    moduleLabel:      'Module 01 — Live',
    dashTag:          'Protocol Activity',
    dashTitle:        'Live dashboard',
    dashAllActive:    'All systems active',
    dashViewFull:     'View full →',
    dashFeedTitle:    'Recent Actions',
    dashFeedSub:      'Last verified protocol events',
    dashFeedLive:     'Live',
    dashMapTitle:     'Global Action Map',
    dashMapSub:       'Verified action locations',
    dashHealthTitle:  'Protocol Health',
    dashHealthSub:    'Real-time system status',
    healthNetwork:    'Network Status',
    healthValidators: 'Validators Online',
    healthQueue:      'Verification Queue',
    healthBlock:      'Last Block',
    healthApi:        'API',
    healthOk:         'Active',
    healthPending:    '12 pending',
    healthNominal:    'Nominal',
    healthActive:     'Active',
    healthOnline:     '54 / 54',
    sparkLabel:       'Verifications / 12h',
    portalTag:        'Portal Access',
    portalTitle:      'Enter the PORA Portal',
    portalSub:        'Connect your wallet, submit verified actions, validate events, or simply explore the global record. Participation is open to everyone.',
    roleParticipant:  'Participant',
    roleValidator:    'Validator',
    roleOrg:          'Organization',
    roleObserver:     'Observer',
  },

  future: {
    metaTitle:        'Future Modules',
    metaDesc:         'Real-world actions that can be verified and recorded using the PORA protocol.',
    breadcrumbHome:   'Home',
    eyebrow:          'Protocol roadmap',
    pageTitle:        'Future PORA Modules',
    pageSub:          'Real-world actions that can be verified and recorded using the PORA protocol. The core infrastructure is shared — only the action type changes.',
    buildTag:         'Open protocol',
    buildTitle:       'Build a Proof-of-X module',
    buildSub:         'Any verifiable humanitarian action can become a PORA module. The protocol provides the verification and record layer — you define the action standards.',
    buildCtaDocs:     'Read developer docs',
    buildCtaProtocol: 'View protocol spec',
    devLabel:         'Development',
    modules: {
      meal:       { title: 'Proof of Meal',       desc: 'Verify meals served to people in need and record feeding events transparently.',           detail: 'The first production implementation of the PORA protocol — operational and live.',                                           meta: ['28 countries','840K+ meals','140 orgs'] },
      shelter:    { title: 'Proof of Shelter',    desc: 'Confirm temporary or long-term shelter provided to displaced individuals.',                  detail: 'Designed for emergency housing providers, displacement response teams, and long-term housing NGOs.',                        meta: ['Est. Q3 2025','Spec drafted'] },
      medicine:   { title: 'Proof of Medicine',   desc: 'Track medicine distribution and healthcare support actions on-chain.',                      detail: 'Applicable to mobile health units, field clinics, and medicine aid programmes.',                                            meta: ['Est. Q4 2025','Spec in review'] },
      education:  { title: 'Proof of Education',  desc: 'Record educational sessions, training programs, and learning events.',                      detail: 'Exploring verification frameworks for community schools and vocational training.',                                         meta: ['Early research','RFC open'] },
      water:      { title: 'Proof of Water',      desc: 'Verify clean water distribution and sanitation efforts in underserved areas.',              detail: 'Defining standards for water delivery verification in humanitarian contexts.',                                             meta: ['Early research'] },
      protection: { title: 'Proof of Protection', desc: 'Document protection services and legal aid provided to vulnerable populations.',            detail: 'Early-stage exploration for legal aid organisations and monitoring programmes.',                                           meta: ['Conceptual'] },
    },
  },

  donate: {
    metaTitle:        'Donate',
    metaDesc:         'Support the PORA protocol — open infrastructure for verifiable humanitarian action.',
    eyebrow:          'Support the project',
    pageTitle:        'Support the PORA Project',
    pageSub:          'Your donation helps develop open infrastructure, blockchain research and the PORA protocol.',
    walletsTag:       'Donation wallets',
    walletsTitle:     'Send a donation',
    walletsTron:      'USDT TRC20',
    walletsEth:       'Ethereum / ERC20',
    networkTron:      'TRON network',
    networkEth:       'Ethereum network',
    copyAddress:      'Copy address',
    copied:           'Copied!',
    viewExplorer:     'View on explorer',
    balancesTag:      'Live balances',
    balancesTitle:    'Wallet balances',
    balancesRefresh:  'Auto-refresh every 60s',
    balancesLastSeen: 'Updated',
    balancesLoading:  'Fetching balances…',
    balancesError:    'Could not load balance',
    txTag:            'On-chain history',
    txTitle:          'Recent donations',
    txSub:            'Latest transactions to the donation wallets, sourced directly from the blockchain.',
    txLoading:        'Loading transactions…',
    txEmpty:          'No transactions found',
    txError:          'Could not load transactions',
    txViewAll:        'View all on explorer →',
    txFrom:           'From',
    txAmount:         'Amount',
    txTime:           'Time',
    txNetwork:        'Network',
    txHash:           'Tx',
    transparencyTag:  'Transparency',
    transparencyText: 'All donations support development of the PORA protocol, infrastructure and open technology research. Fund usage is documented publicly.',
    transparencyLink: 'View transparency report →',
    donate:           'Donate',
  },

  explorer: {
    metaTitle:   'Explorer',
    eyebrow:     'Live network',
    pageTitle:   'PoRa Explorer',
    pageSub:     'Live Proof of Aid events',
    totalEvents: 'Total Events',
    newSession:  'New this session',
    lastUpdated: 'Last updated',
    showing:     'Showing latest',
    refresh:     'Refresh',
    refreshing:  'refreshing…',
    colId:       'QR ID',
    colTime:     'Time',
    colAge:      'Age',
    loading:     'Loading events…',
    noEvents:    'No events yet',
    noEventsHint:'Waiting for QR scans…',
    errorPrefix: 'Could not load events',
    demoMode:    'Demo mode — API unavailable',
    demoHint:    'Set NEXT_PUBLIC_EXPLORER_API to connect to a live backend.',
  },
  portal: {
    metaDesc:           'Enter the PORA ecosystem — submit actions, verify events, or explore the record.',
    heroTag:            'Portal Access',
    heroTitle:          'Enter the ecosystem',
    heroSub:            'The PORA Portal is the primary interface for interacting with the protocol — for participants, validators, organizations, and observers.',
    participantEyebrow: 'Submit actions',
    participantDesc:    'Connect a wallet, submit real-world humanitarian actions to the protocol, and track verification status and personal impact.',
    participantCta:     'Start as Participant',
    participantMeta1:   'Submit actions with evidence',
    participantMeta2:   'Track verification status',
    participantMeta3:   'Personal impact dashboard',
    validatorEyebrow:   'Verify events',
    validatorDesc:      'Join the validator network. Review submitted actions and contribute to the integrity of the global PORA ledger.',
    validatorCta:       'Enter Validator Panel',
    validatorMeta1:     'Review pending submissions',
    validatorMeta2:     'Approve or reject evidence',
    validatorMeta3:     'Monitor network activity',
    orgEyebrow:         'Scale impact',
    orgDesc:            'Onboard your organization, manage team members, and integrate at scale with the PORA protocol API.',
    orgCta:             'Onboard Organization',
    orgMeta1:           'Organization profile & team',
    orgMeta2:           'Bulk action submission',
    orgMeta3:           'API credentials & analytics',
    observerEyebrow:    'Explore the record',
    observerDesc:       'No account required. Browse the full public ledger, search protocol events, and independently verify any record.',
    observerCta:        'Browse the Ledger',
    observerMeta1:      'Browse all verified events',
    observerMeta2:      'Search by country or org',
    observerMeta3:      'Access open datasets',
    walletTitle:        'Connect your wallet to get started',
    walletSub:          'PORA uses wallet-based identity. No account or email required for observer and validator roles.',
    stackAppTag:        'APPLICATION',
    stackAppLabel:      'MEAL Product',
    stackAppSub:        'Regions · Donations · Dashboard · Explorer',
    stackProtoTag:      'PROTOCOL',
    stackProtoLabel:    'PORA Protocol',
    stackProtoSub:      'Events · Validators · Records · API',
    stackFutureTag:     'FUTURE',
    stackFutureLabel:   'Proof-of-X …',
    stackFutureSub:     'Shelter · Medicine · Education · Water',
    confirmBack:        '← Back',
    confirmNote:        'This is a frontend MVP — no real payment will be charged.',
    processing:         'Processing…',
  },

  meal: {
    navLabel:'MEAL',tagline:'Feed the world. Verify every meal.',heroTitle:'MEAL',
    heroSub:'The first applied product inside the PORA ecosystem. MEAL connects donors with on-the-ground feeding programs — every donation is directed to a specific region, every meal is verified.',
    ctaRegions:'Explore Regions',ctaExplorer:'Open Explorer',ctaDonate:'Donate Now',ctaHowItWorks:'How it works',ctaOpenApp:'Open App',
    flowDonate:'Donate',flowRegion:'Region',flowEvent:'Event',flowTransparency:'Transparency',
    howTitle:'How MEAL works',regionsTitle:'Active Regions',regionsSub:'Each region is a verified feeding program on the ground. Donations are directed by region.',
    raised:'Raised',goal:'Goal',meals:'Meals',events:'Events',lastActive:'Last active',progress:'Progress',
    donate:'Donate',viewRegion:'View region',urgent:'Urgent',active:'Active',funded:'Funded',
    donateTitle:'Make a donation',donateSub:'Choose a region and donate. Your contribution is recorded on the PORA protocol.',
    selectRegion:'Select a region',enterAmount:'Amount (USD)',selectMethod:'Payment method',submitDonation:'Confirm donation',
    donateSuccess:'Donation submitted!',donateSuccessSub:'Your donation has been recorded. It will appear in the explorer once confirmed.',
    loginTitle:'Sign in to MEAL',loginSub:'Access your donation dashboard and region feed.',
    registerTitle:'Create an account',registerSub:'Join the MEAL network. Track your impact and support regions.',
    emailLabel:'Email address',passwordLabel:'Password',nameLabel:'Full name',countryLabel:'Country',
    loginCta:'Sign in',registerCta:'Create account',noAccount:"Don't have an account?",haveAccount:'Already have an account?',
    dashTitle:'Your Dashboard',dashTotalDonated:'Total donated',dashRegions:'Regions supported',dashMeals:'Meals impacted',
    dashDonations:'Donations made',dashRecentDonations:'Recent donations',dashImpactEvents:'Impact events',
    explTitle:'MEAL Explorer',explSub:'Transparent donation and event data for the MEAL product.',
    explTotalDonations:'Total donations',explTotalRegions:'Active regions',explTotalEvents:'Verified events',explTotalMeals:'Meals served',
    explRecentDonations:'Recent donations',explRecentEvents:'Recent events',
    colDate:'Date',colAmount:'Amount',colRegion:'Region',colStatus:'Status',colMeals:'Meals',colVerified:'Verified',
    statusConfirmed:'Confirmed',statusPending:'Pending',statusProcessing:'Processing',
    adminTitle:'Admin Overview',adminRegionsList:'Regions',adminDonationSummary:'Donation summary',adminRecentEvents:'Recent events',
    emptyDonations:'No donations yet',emptyEvents:'No events yet',backToMeal:'← MEAL',openApp:'Open App',
    confirmBack:'← Back',confirmNote:'This is a frontend MVP — no real payment will be charged.',processingText:'Processing…',
    navOverview:'Overview',navRegions:'Regions',navExplorer:'Explorer',
    mapTitle:'Region Map',mapEyebrow:'Global view',mapFutureLabel:'Interactive GIS map — coming soon',
    mapFeature1:'Zoom into countries and districts',mapFeature2:'View food-need deficit by area',
    mapFeature3:'Direct donations to specific zones',mapFeature4:'Track coverage and surplus in real time',
    mapPreviewLabel:'MEAL Global Coverage Preview',
    demoUser:'demo@meal.protocol',demoNote:'Frontend demo — mock data only',
    verifiedLabel:'✓ verified',pendingLabel:'pending',
    protocolNote:'Events are verified and recorded via the PORA protocol.',
    howItWorksLink:'Full explanation →',allRegionsLink:'All regions →',
  },
}

// ═════════════════════════════════════════════════════════════════════════════
// RUSSIAN
// ═════════════════════════════════════════════════════════════════════════════
const ru: Translations = {
  lang: 'ru',
  dir:  'ltr',

  nav: {
    protocol:      'Протокол',
    useCases:      'Применения',
    proofOfMeal:   'Подтверждение питания',
    network:       'Сеть',
    transparency:  'Прозрачность',
    futureModules: 'Будущие модули',
    developers:    'Разработчикам',
    about:         'О проекте',
    docs:          'Документация',
    enterPortal:   'Войти в портал →',
    donate:        'Пожертвовать',
    explorer:      'Проводник',
    meal:          'MEAL',
  },

  common: {
    live:            'Активен',
    planned:         'Планируется',
    research:        'Исследование',
    learnMore:       'Узнать больше',
    viewAll:         'Все события →',
    openPortal:      'Открыть портал',
    exploreProtocol: 'Изучить протокол',
    readDocs:        'Документация для разработчиков',
    viewProtocol:    'Спецификация протокола',
    backHome:        'Главная',
    comingSoon:      'Скоро',
    verified:        'подтверждено',
    verifiedShort:   '✓ подтверждено',
    development:     'Разработка',
  },

  home: {
    eyebrow:          'Протокол активен — первая реализация запущена',
    heroTitle:        'Доказательство',
    heroTitleAccent:  'Реального Действия',
    heroSub:          'Протокол, связывающий реальные гуманитарные действия с верифицируемыми постоянными цифровыми записями.',
    flowStep1:        'Реальное действие',
    flowStep2:        'Верификация',
    flowStep3:        'Запись в протокол',
    ctaExplore:       'Изучить протокол',
    ctaPortal:        'Войти в портал',
    scroll:           'Прокрутить',
    howTag:           'Как это работает',
    howTitle:         'От действия к постоянной записи',
    howSub:           'PORA — инфраструктура для превращения реальных гуманитарных событий в верифицируемые цифровые записи. Любое действие. Любая организация. Где угодно.',
    howCta:           'Спецификация протокола',
    step1Title:       'Происходит реальное действие',
    step1Desc:        'Участник выполняет верифицируемое гуманитарное действие — раздача еды, предоставление жилья, медицинская помощь.',
    step2Title:       'Валидаторы подтверждают',
    step2Desc:        'Независимые валидаторы проверяют представленные доказательства в соответствии со стандартами протокола.',
    step3Title:       'Постоянная запись',
    step3Desc:        'Верифицированное событие записывается в слой записей PORA — публично, неизменно и доступно для запросов.',
    statsTag:         'Статистика сети',
    statsTitle:       'Активность протокола — открыто и в реальном времени',
    statsLive:        'Обновляется в реальном времени',
    statVerified:     'Верифицированных действий',
    statMeals:        'Подтверждённых приёмов пищи',
    statCountries:    'Стран',
    statValidators:   'Валидаторов',
    statsFootnote:    'Все данные публично верифицируемы через API протокола PORA.',
    statsLink:        'Полный журнал прозрачности →',
    globalTag:        'Глобальная сеть',
    globalTitle:      'Глобальная сеть реальных действий',
    globalSub:        'Верифицированные действия записываются с данными о местоположении, создавая прозрачный глобальный реестр гуманитарного воздействия.',
    mapLabel:         'Интерактивная карта — скоро',
    mapSub:           'Верифицированные действия появятся здесь в реальном времени',
    porTag:           'Первая реализация',
    porTitle:         'Подтверждение питания',
    porSub:           'Система верификации реальных событий кормления и их записи как постоянных действий протокола. От местных столовых до крупных гуманитарных операций.',
    porPoint1:        'Отправить событие кормления с фотодоказательствами',
    porPoint2:        'Валидаторы подтверждают соответствие стандартам протокола',
    porPoint3:        'Событие становится постоянной публичной записью протокола',
    porMealCta:       'Открыть MEAL — регионы',
    liveEvents:       'События протокола в реальном времени',
    moduleLabel:      'Модуль 01 — Активен',
    dashTag:          'Активность протокола',
    dashTitle:        'Панель в реальном времени',
    dashAllActive:    'Все системы активны',
    dashViewFull:     'Смотреть всё →',
    dashFeedTitle:    'Последние действия',
    dashFeedSub:      'Последние верифицированные события протокола',
    dashFeedLive:     'Онлайн',
    dashMapTitle:     'Карта действий',
    dashMapSub:       'Местоположения верифицированных действий',
    dashHealthTitle:  'Состояние протокола',
    dashHealthSub:    'Статус системы в реальном времени',
    healthNetwork:    'Статус сети',
    healthValidators: 'Валидаторов онлайн',
    healthQueue:      'Очередь верификации',
    healthBlock:      'Последний блок',
    healthApi:        'API',
    healthOk:         'Активен',
    healthPending:    '12 в очереди',
    healthNominal:    'В норме',
    healthActive:     'Активен',
    healthOnline:     '54 / 54',
    sparkLabel:       'Верификации / 12ч',
    portalTag:        'Доступ к порталу',
    portalTitle:      'Войти в портал PORA',
    portalSub:        'Подключите кошелёк, отправляйте верифицированные действия, проверяйте события или просто исследуйте глобальный реестр.',
    roleParticipant:  'Участник',
    roleValidator:    'Валидатор',
    roleOrg:          'Организация',
    roleObserver:     'Наблюдатель',
  },

  future: {
    metaTitle:        'Будущие модули',
    metaDesc:         'Реальные действия, которые можно верифицировать и записать с помощью протокола PORA.',
    breadcrumbHome:   'Главная',
    eyebrow:          'Дорожная карта протокола',
    pageTitle:        'Будущие модули PORA',
    pageSub:          'Реальные действия, которые можно верифицировать и записать с помощью протокола PORA. Базовая инфраструктура общая — меняется только тип действия.',
    buildTag:         'Открытый протокол',
    buildTitle:       'Создайте модуль Proof-of-X',
    buildSub:         'Любое верифицируемое гуманитарное действие может стать модулем PORA. Протокол предоставляет слой верификации и записи — вы определяете стандарты действий.',
    buildCtaDocs:     'Документация для разработчиков',
    buildCtaProtocol: 'Спецификация протокола',
    devLabel:         'Разработка',
    modules: {
      meal:       { title: 'Подтверждение питания',           desc: 'Верифицируйте приёмы пищи для нуждающихся и прозрачно записывайте события кормления.',   detail: 'Первая производственная реализация протокола PORA — работает и активна.',                                              meta: ['28 стран', '840К+ приёмов пищи', '140 организаций'] },
      shelter:    { title: 'Подтверждение жилья',             desc: 'Подтверждайте временное или долгосрочное жильё для вынужденных переселенцев.',               detail: 'Предназначен для поставщиков экстренного жилья, команд реагирования и НКО.',                                          meta: ['Ожидается Q3 2025', 'Черновик готов'] },
      medicine:   { title: 'Подтверждение медицинской помощи',desc: 'Отслеживайте распределение лекарств и медицинскую поддержку на блокчейне.',                   detail: 'Применимо для мобильных медицинских отрядов, полевых клиник и гуманитарных программ.',                                meta: ['Ожидается Q4 2025', 'Спецификация на проверке'] },
      education:  { title: 'Подтверждение образования',       desc: 'Записывайте образовательные сессии, учебные программы и обучающие события.',                  detail: 'Изучаем системы верификации для общественных школ и профессионального обучения.',                                   meta: ['Ранние исследования', 'RFC открыт'] },
      water:      { title: 'Подтверждение водоснабжения',     desc: 'Верифицируйте распределение чистой воды и санитарные мероприятия в нуждающихся районах.',      detail: 'Определяем стандарты верификации доставки воды в гуманитарных контекстах.',                                          meta: ['Ранние исследования'] },
      protection: { title: 'Подтверждение защиты',            desc: 'Документируйте услуги защиты и юридическую помощь уязвимым слоям населения.',                  detail: 'Ранний этап изучения для правозащитных организаций.',                                                               meta: ['Концептуальная стадия'] },
    },
  },

  donate: {
    metaTitle:        'Пожертвовать',
    metaDesc:         'Поддержите протокол PORA — открытую инфраструктуру для верифицируемых гуманитарных действий.',
    eyebrow:          'Поддержать проект',
    pageTitle:        'Поддержите проект PORA',
    pageSub:          'Ваше пожертвование помогает развивать открытую инфраструктуру, блокчейн-исследования и протокол PORA.',
    walletsTag:       'Кошельки для пожертвований',
    walletsTitle:     'Отправить пожертвование',
    walletsTron:      'USDT TRC20',
    walletsEth:       'Ethereum / ERC20',
    networkTron:      'Сеть TRON',
    networkEth:       'Сеть Ethereum',
    copyAddress:      'Скопировать адрес',
    copied:           'Скопировано!',
    viewExplorer:     'Посмотреть в проводнике',
    balancesTag:      'Балансы в реальном времени',
    balancesTitle:    'Балансы кошельков',
    balancesRefresh:  'Автообновление каждые 60с',
    balancesLastSeen: 'Обновлено',
    balancesLoading:  'Загрузка балансов…',
    balancesError:    'Не удалось загрузить баланс',
    txTag:            'История в блокчейне',
    txTitle:          'Последние пожертвования',
    txSub:            'Последние транзакции на кошельки, полученные напрямую из блокчейна.',
    txLoading:        'Загрузка транзакций…',
    txEmpty:          'Транзакций не найдено',
    txError:          'Не удалось загрузить транзакции',
    txViewAll:        'Все транзакции в проводнике →',
    txFrom:           'От',
    txAmount:         'Сумма',
    txTime:           'Время',
    txNetwork:        'Сеть',
    txHash:           'Тx',
    transparencyTag:  'Прозрачность',
    transparencyText: 'Все пожертвования направляются на разработку протокола PORA, инфраструктуры и открытых технологических исследований. Использование средств публично задокументировано.',
    transparencyLink: 'Просмотреть отчёт о прозрачности →',
    donate:           'Пожертвовать',
  },

  explorer: {
    metaTitle:   'Проводник',
    eyebrow:     'Живая сеть',
    pageTitle:   'PoRa Проводник',
    pageSub:     'События подтверждения помощи в реальном времени',
    totalEvents: 'Всего событий',
    newSession:  'Новых за сессию',
    lastUpdated: 'Обновлено',
    showing:     'Показаны последние',
    refresh:     'Обновить',
    refreshing:  'обновление…',
    colId:       'QR ID',
    colTime:     'Время',
    colAge:      'Давность',
    loading:     'Загрузка событий…',
    noEvents:    'Событий пока нет',
    noEventsHint:'Ожидание QR-сканирований…',
    errorPrefix: 'Не удалось загрузить события',
    demoMode:    'Демо-режим — API недоступен',
    demoHint:    'Установите NEXT_PUBLIC_EXPLORER_API для подключения к бэкенду.',
  },

  portal: {
    metaDesc:           'Войдите в экосистему PORA — отправляйте действия, верифицируйте события или исследуйте реестр.',
    heroTag:            'Доступ к порталу',
    heroTitle:          'Войти в экосистему',
    heroSub:            'Портал PORA — основной интерфейс для взаимодействия с протоколом: для участников, валидаторов, организаций и наблюдателей.',
    participantEyebrow: 'Отправлять действия',
    participantDesc:    'Подключите кошелёк, отправляйте гуманитарные действия в протокол и отслеживайте статус верификации.',
    participantCta:     'Войти как участник',
    participantMeta1:   'Отправить действия с доказательствами',
    participantMeta2:   'Отслеживать статус верификации',
    participantMeta3:   'Личный дашборд влияния',
    validatorEyebrow:   'Верифицировать события',
    validatorDesc:      'Присоединитесь к сети валидаторов. Проверяйте отправленные действия и поддерживайте целостность реестра PORA.',
    validatorCta:       'Войти в панель валидатора',
    validatorMeta1:     'Просматривать ожидающие заявки',
    validatorMeta2:     'Одобрять или отклонять доказательства',
    validatorMeta3:     'Мониторинг активности сети',
    orgEyebrow:         'Масштабировать влияние',
    orgDesc:            'Зарегистрируйте организацию, управляйте командой и интегрируйтесь с API протокола PORA в масштабе.',
    orgCta:             'Подключить организацию',
    orgMeta1:           'Профиль и команда организации',
    orgMeta2:           'Массовая отправка действий',
    orgMeta3:           'API-ключи и аналитика',
    observerEyebrow:    'Исследовать реестр',
    observerDesc:       'Аккаунт не нужен. Просматривайте полный публичный реестр, ищите события протокола и самостоятельно верифицируйте записи.',
    observerCta:        'Открыть реестр',
    observerMeta1:      'Все верифицированные события',
    observerMeta2:      'Поиск по стране или организации',
    observerMeta3:      'Доступ к открытым данным',
    walletTitle:        'Подключите кошелёк для начала работы',
    walletSub:          'PORA использует идентификацию по кошельку. Аккаунт и email не нужны для роли наблюдателя и валидатора.',
    stackAppTag:        'ПРИЛОЖЕНИЕ',
    stackAppLabel:      'Продукт MEAL',
    stackAppSub:        'Регионы · Пожертвования · Дашборд · Проводник',
    stackProtoTag:      'ПРОТОКОЛ',
    stackProtoLabel:    'Протокол PORA',
    stackProtoSub:      'События · Валидаторы · Записи · API',
    stackFutureTag:     'БУДУЩЕЕ',
    stackFutureLabel:   'Proof-of-X …',
    stackFutureSub:     'Жильё · Медицина · Образование · Вода',
    confirmBack:        '← Назад',
    confirmNote:        'Это фронтенд-MVP — реальный платёж не будет осуществлён.',
    processing:         'Обработка…',
  },

  meal: {
    navLabel:'MEAL',tagline:'Кормим мир. Верифицируем каждый приём пищи.',heroTitle:'MEAL',
    heroSub:'Первый прикладной продукт в экосистеме PORA. MEAL соединяет доноров с программами питания на местах — каждое пожертвование направляется в конкретный регион, каждый приём пищи верифицируется.',
    ctaRegions:'Изучить регионы',ctaExplorer:'Открыть проводник',ctaDonate:'Пожертвовать',ctaHowItWorks:'Как это работает',ctaOpenApp:'Открыть приложение',
    flowDonate:'Пожертвование',flowRegion:'Регион',flowEvent:'Событие',flowTransparency:'Прозрачность',
    howTitle:'Как работает MEAL',regionsTitle:'Активные регионы',regionsSub:'Каждый регион — верифицированная программа питания на месте. Пожертвования распределяются по регионам.',
    raised:'Собрано',goal:'Цель',meals:'Приёмов пищи',events:'Событий',lastActive:'Последняя активность',progress:'Прогресс',
    donate:'Пожертвовать',viewRegion:'Открыть регион',urgent:'Срочно',active:'Активен',funded:'Профинансирован',
    donateTitle:'Сделать пожертвование',donateSub:'Выберите регион и пожертвуйте. Ваш вклад записывается в протоколе PORA.',
    selectRegion:'Выберите регион',enterAmount:'Сумма (USD)',selectMethod:'Способ оплаты',submitDonation:'Подтвердить пожертвование',
    donateSuccess:'Пожертвование отправлено!',donateSuccessSub:'Ваше пожертвование зафиксировано. Оно появится в проводнике после подтверждения.',
    loginTitle:'Войти в MEAL',loginSub:'Доступ к дашборду пожертвований и ленте регионов.',
    registerTitle:'Создать аккаунт',registerSub:'Присоединяйтесь к сети MEAL. Отслеживайте свой вклад и поддерживайте регионы.',
    emailLabel:'Email',passwordLabel:'Пароль',nameLabel:'Полное имя',countryLabel:'Страна',
    loginCta:'Войти',registerCta:'Создать аккаунт',noAccount:'Нет аккаунта?',haveAccount:'Уже есть аккаунт?',
    dashTitle:'Ваш дашборд',dashTotalDonated:'Всего пожертвовано',dashRegions:'Поддержанных регионов',dashMeals:'Приёмов пищи',
    dashDonations:'Пожертвований',dashRecentDonations:'Последние пожертвования',dashImpactEvents:'События влияния',
    explTitle:'MEAL Проводник',explSub:'Прозрачные данные о пожертвованиях и событиях в MEAL.',
    explTotalDonations:'Всего пожертвований',explTotalRegions:'Активных регионов',explTotalEvents:'Верифицированных событий',explTotalMeals:'Приёмов пищи',
    explRecentDonations:'Последние пожертвования',explRecentEvents:'Последние события',
    colDate:'Дата',colAmount:'Сумма',colRegion:'Регион',colStatus:'Статус',colMeals:'Приёмов пищи',colVerified:'Верифицировано',
    statusConfirmed:'Подтверждено',statusPending:'Ожидает',statusProcessing:'Обрабатывается',
    adminTitle:'Обзор администратора',adminRegionsList:'Регионы',adminDonationSummary:'Сводка пожертвований',adminRecentEvents:'Последние события',
    emptyDonations:'Пожертвований пока нет',emptyEvents:'Событий пока нет',backToMeal:'← MEAL',openApp:'Открыть приложение',
    confirmBack:'← Назад',confirmNote:'Это фронтенд-MVP — реальный платёж не будет осуществлён.',processingText:'Обработка…',
    navOverview:'Обзор',navRegions:'Регионы',navExplorer:'Проводник',
    mapTitle:'Карта регионов',mapEyebrow:'Глобальный вид',mapFutureLabel:'Интерактивная карта — скоро',
    mapFeature1:'Масштабирование по странам и районам',mapFeature2:'Просмотр дефицита питания по зонам',
    mapFeature3:'Направление пожертвований в конкретные зоны',mapFeature4:'Отслеживание покрытия и профицита в реальном времени',
    mapPreviewLabel:'MEAL — предпросмотр глобального покрытия',
    demoUser:'demo@meal.protocol',demoNote:'Демонстрационные данные',
    verifiedLabel:'✓ верифицировано',pendingLabel:'ожидает',
    protocolNote:'События верифицируются и записываются через протокол PORA.',
    howItWorksLink:'Подробное объяснение →',allRegionsLink:'Все регионы →',
  },
}

// ═════════════════════════════════════════════════════════════════════════════
// SPANISH
// ═════════════════════════════════════════════════════════════════════════════
const es: Translations = {
  lang: 'es',
  dir:  'ltr',

  nav: {
    protocol:      'Protocolo',
    useCases:      'Casos de uso',
    proofOfMeal:   'Prueba de alimentación',
    network:       'Red',
    transparency:  'Transparencia',
    futureModules: 'Módulos futuros',
    developers:    'Desarrolladores',
    about:         'Acerca de',
    docs:          'Documentación',
    enterPortal:   'Entrar al portal →',
    donate:        'Donar',
    explorer:      'Explorador',
    meal:          'MEAL',
  },

  common: {
    live:            'En vivo',
    planned:         'Planificado',
    research:        'Investigación',
    learnMore:       'Saber más',
    viewAll:         'Ver todos los eventos →',
    openPortal:      'Abrir portal',
    exploreProtocol: 'Explorar protocolo',
    readDocs:        'Documentación para desarrolladores',
    viewProtocol:    'Ver especificación del protocolo',
    backHome:        'Inicio',
    comingSoon:      'Próximamente',
    verified:        'verificado',
    verifiedShort:   '✓ verificado',
    development:     'Desarrollo',
  },

  home: {
    eyebrow:          'Protocolo activo — primera implementación en funcionamiento',
    heroTitle:        'Prueba de',
    heroTitleAccent:  'Acción Real',
    heroSub:          'Un protocolo que conecta acciones humanitarias reales con registros digitales verificables y permanentes.',
    flowStep1:        'Acción real',
    flowStep2:        'Verificación',
    flowStep3:        'Registro de protocolo',
    ctaExplore:       'Explorar protocolo',
    ctaPortal:        'Entrar al portal',
    scroll:           'Desplazar',
    howTag:           'Cómo funciona',
    howTitle:         'De la acción al registro permanente',
    howSub:           'PORA es infraestructura para convertir eventos humanitarios reales en registros digitales verificables e inmutables. Cualquier acción. Cualquier organización. En cualquier lugar.',
    howCta:           'Leer especificación del protocolo',
    step1Title:       'Ocurre una acción real',
    step1Desc:        'Un participante realiza una acción humanitaria verificable — distribución de alimentos, refugio proporcionado, asistencia médica.',
    step2Title:       'Los validadores confirman',
    step2Desc:        'Validadores independientes revisan la evidencia presentada según los estándares del protocolo antes de proceder al registro.',
    step3Title:       'Registro permanente',
    step3Desc:        'El evento verificado se escribe en la capa de registros PORA — pública, inmutable y consultable por cualquiera.',
    statsTag:         'Estadísticas de red',
    statsTitle:       'Actividad del protocolo, en vivo y abierta',
    statsLive:        'Actualizando en vivo',
    statVerified:     'Acciones verificadas',
    statMeals:        'Comidas verificadas',
    statCountries:    'Países',
    statValidators:   'Validadores',
    statsFootnote:    'Todos los datos son verificables públicamente mediante la API del protocolo PORA.',
    statsLink:        'Ver registro completo de transparencia →',
    globalTag:        'Red global',
    globalTitle:      'Red global de acciones reales',
    globalSub:        'Las acciones verificadas se registran con datos de ubicación, creando un libro mayor global transparente del impacto humanitario.',
    mapLabel:         'Mapa global interactivo — próximamente',
    mapSub:           'Las acciones verificadas aparecerán aquí en tiempo real',
    porTag:           'Primera implementación',
    porTitle:         'Prueba de alimentación',
    porSub:           'Un sistema que verifica eventos de alimentación del mundo real y los registra como acciones permanentes del protocolo. Desde cocinas comunitarias locales hasta operaciones de ayuda a gran escala.',
    porPoint1:        'Enviar un evento de alimentación con evidencia fotográfica',
    porPoint2:        'Los validadores confirman que el evento cumple los estándares del protocolo',
    porPoint3:        'El evento se convierte en un registro permanente y público del protocolo',
    porMealCta:       'Abrir MEAL — explorar regiones',
    liveEvents:       'Eventos del protocolo en vivo',
    moduleLabel:      'Módulo 01 — En vivo',
    dashTag:          'Actividad del protocolo',
    dashTitle:        'Panel en tiempo real',
    dashAllActive:    'Todos los sistemas activos',
    dashViewFull:     'Ver completo →',
    dashFeedTitle:    'Acciones recientes',
    dashFeedSub:      'Últimos eventos verificados del protocolo',
    dashFeedLive:     'En vivo',
    dashMapTitle:     'Mapa de acciones',
    dashMapSub:       'Ubicaciones de acciones verificadas',
    dashHealthTitle:  'Estado del protocolo',
    dashHealthSub:    'Estado del sistema en tiempo real',
    healthNetwork:    'Estado de red',
    healthValidators: 'Validadores en línea',
    healthQueue:      'Cola de verificación',
    healthBlock:      'Último bloque',
    healthApi:        'API',
    healthOk:         'Activo',
    healthPending:    '12 pendientes',
    healthNominal:    'Normal',
    healthActive:     'Activo',
    healthOnline:     '54 / 54',
    sparkLabel:       'Verificaciones / 12h',
    portalTag:        'Acceso al portal',
    portalTitle:      'Entrar al portal PORA',
    portalSub:        'Conecta tu billetera, envía acciones verificadas, valida eventos o simplemente explora el registro global. La participación está abierta a todos.',
    roleParticipant:  'Participante',
    roleValidator:    'Validador',
    roleOrg:          'Organización',
    roleObserver:     'Observador',
  },

  future: {
    metaTitle:        'Módulos futuros',
    metaDesc:         'Acciones del mundo real que pueden verificarse y registrarse con el protocolo PORA.',
    breadcrumbHome:   'Inicio',
    eyebrow:          'Hoja de ruta del protocolo',
    pageTitle:        'Módulos futuros de PORA',
    pageSub:          'Acciones del mundo real que pueden verificarse y registrarse con el protocolo PORA. La infraestructura central es compartida — solo cambia el tipo de acción.',
    buildTag:         'Protocolo abierto',
    buildTitle:       'Construye un módulo Proof-of-X',
    buildSub:         'Cualquier acción humanitaria verificable puede convertirse en un módulo PORA. El protocolo proporciona la capa de verificación y registro — tú defines los estándares de acción.',
    buildCtaDocs:     'Documentación para desarrolladores',
    buildCtaProtocol: 'Ver especificación del protocolo',
    devLabel:         'Desarrollo',
    modules: {
      meal:       { title: 'Prueba de alimentación',  desc: 'Verifica las comidas servidas a personas necesitadas y registra los eventos de alimentación de forma transparente.',  detail: 'La primera implementación de producción del protocolo PORA — operativa y en funcionamiento.',                          meta: ['28 países', '840K+ comidas', '140 organizaciones'] },
      shelter:    { title: 'Prueba de refugio',       desc: 'Confirma el refugio temporal o permanente proporcionado a personas desplazadas.',                                      detail: 'Diseñado para proveedores de vivienda de emergencia, equipos de respuesta al desplazamiento y ONG.',                    meta: ['Est. Q3 2025', 'Borrador listo'] },
      medicine:   { title: 'Prueba de medicina',      desc: 'Rastrea la distribución de medicamentos y las acciones de apoyo sanitario en la cadena.',                             detail: 'Aplicable a unidades de salud móviles, clínicas de campo y programas de ayuda médica.',                                 meta: ['Est. Q4 2025', 'Especificación en revisión'] },
      education:  { title: 'Prueba de educación',     desc: 'Registra sesiones educativas, programas de formación y eventos de aprendizaje.',                                      detail: 'Explorando marcos de verificación para escuelas comunitarias y formación profesional.',                                 meta: ['Investigación inicial', 'RFC abierto'] },
      water:      { title: 'Prueba de agua',          desc: 'Verifica la distribución de agua limpia y los esfuerzos de saneamiento en zonas desatendidas.',                       detail: 'Definiendo estándares para la verificación de entrega de agua en contextos humanitarios.',                              meta: ['Investigación inicial'] },
      protection: { title: 'Prueba de protección',    desc: 'Documenta los servicios de protección y la asistencia jurídica proporcionada a poblaciones vulnerables.',              detail: 'Exploración en etapa temprana para organizaciones de ayuda legal.',                                                    meta: ['Conceptual'] },
    },
  },

  donate: {
    metaTitle:        'Donar',
    metaDesc:         'Apoya el protocolo PORA — infraestructura abierta para la acción humanitaria verificable.',
    eyebrow:          'Apoya el proyecto',
    pageTitle:        'Apoya el Proyecto PORA',
    pageSub:          'Tu donación ayuda a desarrollar infraestructura abierta, investigación blockchain y el protocolo PORA.',
    walletsTag:       'Carteras de donación',
    walletsTitle:     'Enviar una donación',
    walletsTron:      'USDT TRC20',
    walletsEth:       'Ethereum / ERC20',
    networkTron:      'Red TRON',
    networkEth:       'Red Ethereum',
    copyAddress:      'Copiar dirección',
    copied:           '¡Copiado!',
    viewExplorer:     'Ver en explorador',
    balancesTag:      'Saldos en vivo',
    balancesTitle:    'Saldos de carteras',
    balancesRefresh:  'Auto-actualización cada 60s',
    balancesLastSeen: 'Actualizado',
    balancesLoading:  'Cargando saldos…',
    balancesError:    'No se pudo cargar el saldo',
    txTag:            'Historial on-chain',
    txTitle:          'Donaciones recientes',
    txSub:            'Últimas transacciones a las carteras, obtenidas directamente de la blockchain.',
    txLoading:        'Cargando transacciones…',
    txEmpty:          'No se encontraron transacciones',
    txError:          'No se pudieron cargar las transacciones',
    txViewAll:        'Ver todo en el explorador →',
    txFrom:           'De',
    txAmount:         'Monto',
    txTime:           'Hora',
    txNetwork:        'Red',
    txHash:           'Tx',
    transparencyTag:  'Transparencia',
    transparencyText: 'Todas las donaciones apoyan el desarrollo del protocolo PORA, la infraestructura y la investigación tecnológica abierta. El uso de los fondos está documentado públicamente.',
    transparencyLink: 'Ver informe de transparencia →',
    donate:           'Donar',
  },

  explorer: {
    metaTitle:   'Explorador',
    eyebrow:     'Red en vivo',
    pageTitle:   'PoRa Explorador',
    pageSub:     'Eventos de Prueba de Ayuda en vivo',
    totalEvents: 'Total de eventos',
    newSession:  'Nuevos en esta sesión',
    lastUpdated: 'Actualizado',
    showing:     'Mostrando últimos',
    refresh:     'Actualizar',
    refreshing:  'actualizando…',
    colId:       'QR ID',
    colTime:     'Hora',
    colAge:      'Antigüedad',
    loading:     'Cargando eventos…',
    noEvents:    'Sin eventos aún',
    noEventsHint:'Esperando escaneos QR…',
    errorPrefix: 'No se pudieron cargar los eventos',
    demoMode:    'Modo demo — API no disponible',
    demoHint:    'Configura NEXT_PUBLIC_EXPLORER_API para conectar con el backend.',
  },
  meal: {
    navLabel:'MEAL',tagline:'Alimenta el mundo. Verifica cada comida.',heroTitle:'MEAL',
    heroSub:'El primer producto aplicado dentro del ecosistema PORA. MEAL conecta donantes con programas de alimentación en el terreno — cada donación se dirige a una región específica, cada comida se verifica.',
    ctaRegions:'Explorar regiones',ctaExplorer:'Abrir explorador',ctaDonate:'Donar ahora',ctaHowItWorks:'Cómo funciona',ctaOpenApp:'Abrir app',
    flowDonate:'Donación',flowRegion:'Región',flowEvent:'Evento',flowTransparency:'Transparencia',
    howTitle:'Cómo funciona MEAL',regionsTitle:'Regiones activas',regionsSub:'Cada región es un programa de alimentación verificado. Las donaciones se dirigen por región.',
    raised:'Recaudado',goal:'Meta',meals:'Comidas',events:'Eventos',lastActive:'Última actividad',progress:'Progreso',
    donate:'Donar',viewRegion:'Ver región',urgent:'Urgente',active:'Activo',funded:'Financiado',
    donateTitle:'Hacer una donación',donateSub:'Elige una región y dona. Tu contribución se registra en el protocolo PORA.',
    selectRegion:'Selecciona una región',enterAmount:'Monto (USD)',selectMethod:'Método de pago',submitDonation:'Confirmar donación',
    donateSuccess:'¡Donación enviada!',donateSuccessSub:'Tu donación ha sido registrada. Aparecerá en el explorador una vez confirmada.',
    loginTitle:'Iniciar sesión en MEAL',loginSub:'Accede a tu panel de donaciones y al feed de regiones.',
    registerTitle:'Crear una cuenta',registerSub:'Únete a la red MEAL. Rastrea tu impacto y apoya regiones.',
    emailLabel:'Correo electrónico',passwordLabel:'Contraseña',nameLabel:'Nombre completo',countryLabel:'País',
    loginCta:'Iniciar sesión',registerCta:'Crear cuenta',noAccount:'¿No tienes cuenta?',haveAccount:'¿Ya tienes cuenta?',
    dashTitle:'Tu panel',dashTotalDonated:'Total donado',dashRegions:'Regiones apoyadas',dashMeals:'Comidas impactadas',
    dashDonations:'Donaciones realizadas',dashRecentDonations:'Donaciones recientes',dashImpactEvents:'Eventos de impacto',
    explTitle:'MEAL Explorador',explSub:'Datos transparentes de donaciones y eventos para el producto MEAL.',
    explTotalDonations:'Total de donaciones',explTotalRegions:'Regiones activas',explTotalEvents:'Eventos verificados',explTotalMeals:'Comidas servidas',
    explRecentDonations:'Donaciones recientes',explRecentEvents:'Eventos recientes',
    colDate:'Fecha',colAmount:'Monto',colRegion:'Región',colStatus:'Estado',colMeals:'Comidas',colVerified:'Verificado',
    statusConfirmed:'Confirmado',statusPending:'Pendiente',statusProcessing:'Procesando',
    adminTitle:'Vista general del administrador',adminRegionsList:'Regiones',adminDonationSummary:'Resumen de donaciones',adminRecentEvents:'Eventos recientes',
    emptyDonations:'Aún no hay donaciones',emptyEvents:'Aún no hay eventos',backToMeal:'← MEAL',openApp:'Abrir app',
    confirmBack:'← Atrás',confirmNote:'Este es un MVP de frontend — no se realizará ningún pago real.',processingText:'Procesando…',
    navOverview:'Resumen',navRegions:'Regiones',navExplorer:'Explorador',
    mapTitle:'Mapa de regiones',mapEyebrow:'Vista global',mapFutureLabel:'Mapa GIS interactivo — próximamente',
    mapFeature1:'Zoom en países y distritos',mapFeature2:'Ver déficit alimentario por área',
    mapFeature3:'Dirigir donaciones a zonas específicas',mapFeature4:'Rastrear cobertura y superávit en tiempo real',
    mapPreviewLabel:'MEAL — Vista previa de cobertura global',
    demoUser:'demo@meal.protocol',demoNote:'Datos de demostración',
    verifiedLabel:'✓ verificado',pendingLabel:'pendiente',
    protocolNote:'Los eventos se verifican y registran a través del protocolo PORA.',
    howItWorksLink:'Explicación completa →',allRegionsLink:'Todas las regiones →',
  },


  portal: {
    metaDesc:           'Entra al ecosistema PORA — envía acciones, verifica eventos o explora el registro.',
    heroTag:            'Acceso al portal',
    heroTitle:          'Entra al ecosistema',
    heroSub:            'El portal PORA es la interfaz principal para interactuar con el protocolo — para participantes, validadores, organizaciones y observadores.',
    participantEyebrow: 'Enviar acciones',
    participantDesc:    'Conecta una billetera, envía acciones humanitarias reales al protocolo y rastrea el estado de verificación.',
    participantCta:     'Entrar como participante',
    participantMeta1:   'Enviar acciones con evidencia',
    participantMeta2:   'Rastrear estado de verificación',
    participantMeta3:   'Panel de impacto personal',
    validatorEyebrow:   'Verificar eventos',
    validatorDesc:      'Únete a la red de validadores. Revisa las acciones enviadas y contribuye a la integridad del registro global PORA.',
    validatorCta:       'Entrar al panel de validador',
    validatorMeta1:     'Revisar envíos pendientes',
    validatorMeta2:     'Aprobar o rechazar evidencias',
    validatorMeta3:     'Monitorear actividad de la red',
    orgEyebrow:         'Escalar el impacto',
    orgDesc:            'Incorpora tu organización, gestiona miembros del equipo e integra a escala con la API del protocolo PORA.',
    orgCta:             'Incorporar organización',
    orgMeta1:           'Perfil y equipo de la organización',
    orgMeta2:           'Envío masivo de acciones',
    orgMeta3:           'Credenciales API y análisis',
    observerEyebrow:    'Explorar el registro',
    observerDesc:       'No se requiere cuenta. Navega el registro público completo, busca eventos del protocolo y verifica cualquier registro.',
    observerCta:        'Explorar el registro',
    observerMeta1:      'Ver todos los eventos verificados',
    observerMeta2:      'Buscar por país u organización',
    observerMeta3:      'Acceder a conjuntos de datos abiertos',
    walletTitle:        'Conecta tu billetera para comenzar',
    walletSub:          'PORA usa identidad basada en billetera. No se requiere cuenta ni correo para roles de observador y validador.',
    stackAppTag:        'APLICACIÓN',
    stackAppLabel:      'Producto MEAL',
    stackAppSub:        'Regiones · Donaciones · Panel · Explorador',
    stackProtoTag:      'PROTOCOLO',
    stackProtoLabel:    'Protocolo PORA',
    stackProtoSub:      'Eventos · Validadores · Registros · API',
    stackFutureTag:     'FUTURO',
    stackFutureLabel:   'Proof-of-X …',
    stackFutureSub:     'Refugio · Medicina · Educación · Agua',
    confirmBack:        '← Atrás',
    confirmNote:        'Este es un MVP de frontend — no se realizará ningún pago real.',
    processing:         'Procesando…',
  }
}
// ─── Dictionary export ────────────────────────────────────────────────────────
export const dict: Record<Lang, Translations> = { en, ru, es }

export function getT(lang: Lang): Translations {
  return dict[lang] ?? dict.en
}
