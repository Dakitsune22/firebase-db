export interface Player {
  shirtNumber: number;
  name: string;
  surname: string;
  nickname?: string;
  birthDate?: string;
  nationality: Flag;
  height?: number;
  position: Position;
  overall: number;
  seasonStats: SeasonStats;
  teamId: number;
}

interface SeasonStats {
  goals: number;
  assists: number;
  injured: number;
}

export enum Position {
  POR = 'POR',
  DF = 'DF',
  LD = 'LD',
  LI = 'LI',
  MCD = 'MCD',
  MC = 'MC',
  MCO = 'MCO',
  ED = 'ED',
  EI = 'EI',
  DC = 'DC',
}

export enum Flag {
  Albania = 'al',
  Andorra = 'ad',
  Angola = 'ao',
  ArabicEmirates = 'ae',
  Argelia = 'dz',
  Argentina = 'ar',
  Armenia = 'am',
  Australia = 'au',
  Austria = 'at',
  Azerbayan = 'az',
  Belarus = 'by',
  Belgium = 'be',
  Benin = 'bj',
  Bolivia = 'bo',
  Bosnia = 'ba',
  Brazil = 'br',
  Bulgaria = 'bg',
  BurkinaFaso = 'bf',
  Burundi = 'bi',
  CaboVerde = 'cv',
  Cameroon = 'cm',
  Canada = 'ca',
  CentralAfricanRep = 'cf',
  Chile = 'cl',
  China = 'cn',
  Colombia = 'co',
  Comoras = 'km',
  Congo = 'cg',
  CongoDR = 'cd',
  CostaRica = 'cr',
  Croatia = 'hr',
  Cyprus = 'cy',
  Cuba = 'cu',
  CzechRepublic = 'cz',
  Denmark = 'dk',
  DominicanRepublic = 'do',
  Ecuador = 'ec',
  Egypt = 'eg',
  ElSalvador = 'sv',
  England = 'gb-eng',
  Estonia = 'ee',
  FaroeIslands = 'fo',
  Finland = 'fi',
  France = 'fr',
  FrenchGuyane = 'gf',
  Gabon = 'ga',
  Gambia = 'gm',
  Georgia = 'ge',
  Germany = 'de',
  Ghana = 'gh',
  Greece = 'gr',
  Guadalupe = 'gp',
  Guatemala = 'gt',
  Guinea = 'gn',
  GuineaBissau = 'gw',
  GuineaEquatorial = 'gq',
  Haiti = 'ht',
  Honduras = 'hn',
  Hungary = 'hu',
  Iceland = 'is',
  Indonesia = 'id',
  Iran = 'ir',
  Iraq = 'iq',
  Ireland = 'ie',
  Israel = 'il',
  Italy = 'it',
  IvoryCoast = 'ci',
  Jamaica = 'jm',
  Japan = 'jp',
  Jordania = 'jo',
  Kazajistan = 'kz',
  Kenia = 'kn',
  Kosovo = 'xk',
  Latvia = 'lv',
  Liberia = 'lr',
  Libya = 'ly',
  Liechtenstein = 'li',
  Lithuania = 'lt',
  Luxembourg = 'lu',
  Macedonia = 'mk',
  Madagascar = 'mg',
  Malaysia = 'my',
  Mali = 'ml',
  Malta = 'mt',
  Martinique = 'mq',
  Mauritania = 'mr',
  Mexico = 'mx',
  Moldavia = 'md',
  Montenegro = 'me',
  Morocco = 'ma',
  Mozambique = 'mz',
  Netherlands = 'nl',
  NewZealand = 'nz',
  Namibia = 'na',
  Nicaragua = 'ni',
  Niger = 'ne',
  Nigeria = 'ng',
  NorthIreland = 'gb-nir',
  Norway = 'no',
  Palestine = 'ps',
  Panama = 'pa',
  Paraguay = 'py',
  Peru = 'pe',
  Philippines = 'ph',
  Poland = 'pl',
  Portugal = 'pt',
  PuertoRico = 'pr',
  Qatar = 'qa',
  Romania = 'ro',
  Russia = 'ru',
  Rwanda = 'rw',
  SaudiArabia = 'sa',
  Scotland = 'gb-sct',
  Senegal = 'sn',
  Serbia = 'rs',
  SierraLeona = 'sl',
  Slovakia = 'sk',
  Slovenia = 'si',
  SouthAfrica = 'za',
  SouthKorea = 'kr',
  Surinam = 'sr',
  Spain = 'es',
  Sweden = 'se',
  Switzerland = 'ch',
  Syria = 'sy',
  Tanzania = 'tz',
  Togo = 'tg',
  TrinidadTobago = 'tt',
  Tunisia = 'tn',
  Turkey = 'tr',
  Uganda = 'ug',
  Ukraine = 'ua',
  UnitedStates = 'us',
  Uruguay = 'uy',
  Uzbekistan = 'uz',
  Venezuela = 've',
  Wales = 'gb-wls',
  Zambia = 'zm',
  Zimbabwe = 'zw',
}

export const flagMap = new Map<string, string>();

flagMap.set('al', 'Albania');
flagMap.set('de', 'Alemania');
flagMap.set('ad', 'Andorra');
flagMap.set('ao', 'Angola');
flagMap.set('sa', 'Arabia Saudí');
flagMap.set('dz', 'Argelia');
flagMap.set('ar', 'Argentina');
flagMap.set('am', 'Armenia');
flagMap.set('au', 'Australia');
flagMap.set('at', 'Austria');
flagMap.set('az', 'Azerbayán');
flagMap.set('be', 'Bélgica');
flagMap.set('bj', 'Benin');
flagMap.set('by', 'Bielorrusia');
flagMap.set('bo', 'Bolivia');
flagMap.set('ba', 'Bosnia');
flagMap.set('br', 'Brasil');
flagMap.set('bg', 'Bulgaria');
flagMap.set('bf', 'Burkina Faso');
flagMap.set('bi', 'Burundi');
flagMap.set('cv', 'Cabo Verde');
flagMap.set('cm', 'Camerún');
flagMap.set('ca', 'Canadá');
flagMap.set('cl', 'Chile');
flagMap.set('cn', 'China');
flagMap.set('co', 'Colombia');
flagMap.set('km', 'Comoras');
flagMap.set('cg', 'Congo');
flagMap.set('kr', 'Corea del Sur');
flagMap.set('ci', 'Costa de Marfil');
flagMap.set('cr', 'Costa Rica');
flagMap.set('hr', 'Croacia');
flagMap.set('cy', 'Chipre');
flagMap.set('cu', 'Cuba');
flagMap.set('dk', 'Dinamarca');
flagMap.set('ec', 'Ecuador');
flagMap.set('eg', 'Egipto');
flagMap.set('sv', 'El Salvador');
flagMap.set('ae', 'Emiratos Árabes');
flagMap.set('gb-sct', 'Escocia');
flagMap.set('sk', 'Eslovaquia');
flagMap.set('si', 'Eslovenia');
flagMap.set('es', 'España');
flagMap.set('us', 'Estados Unidos');
flagMap.set('ee', 'Estonia');
flagMap.set('ph', 'Filipinas');
flagMap.set('fi', 'Finlandia');
flagMap.set('fr', 'Francia');
flagMap.set('ga', 'Gabón');
flagMap.set('gb-wls', 'Gales');
flagMap.set('gm', 'Gambia');
flagMap.set('ge', 'Georgia');
flagMap.set('gh', 'Ghana');
flagMap.set('gr', 'Grecia');
flagMap.set('gp', 'Guadalupe');
flagMap.set('gt', 'Guatemala');
flagMap.set('gf', 'Guayana Francesa');
flagMap.set('gn', 'Guinea');
flagMap.set('gw', 'Guinea Bissau');
flagMap.set('gq', 'Guinea Ecuatorial');
flagMap.set('ht', 'Haití');
flagMap.set('hn', 'Honduras');
flagMap.set('hu', 'Hungría');
flagMap.set('id', 'Indonesia');
flagMap.set('gb-eng', 'Inglaterra');
flagMap.set('ir', 'Irán');
flagMap.set('iq', 'Iraq');
flagMap.set('ie', 'Irlanda');
flagMap.set('gb-nir', 'Irlanda del Norte');
flagMap.set('is', 'Islandia');
flagMap.set('fo', 'Islas Faroe');
flagMap.set('il', 'Israel');
flagMap.set('it', 'Italia');
flagMap.set('jm', 'Jamaica');
flagMap.set('jp', 'Japón');
flagMap.set('jo', 'Jordania');
flagMap.set('kz', 'Kazajistan');
flagMap.set('ke', 'Kenia');
flagMap.set('xk', 'Kosovo');
flagMap.set('lv', 'Letonia');
flagMap.set('lr', 'Liberia');
flagMap.set('ly', 'Libia');
flagMap.set('li', 'Liechtenstein');
flagMap.set('lt', 'Lituania');
flagMap.set('lu', 'Luxemburgo');
flagMap.set('mk', 'Macedonia');
flagMap.set('mg', 'Madagascar');
flagMap.set('my', 'Malasia');
flagMap.set('ml', 'Mali');
flagMap.set('mt', 'Malta');
flagMap.set('ma', 'Marruecos');
flagMap.set('mq', 'Martinica');
flagMap.set('mr', 'Mauritania');
flagMap.set('mx', 'México');
flagMap.set('md', 'Moldavia');
flagMap.set('me', 'Montenegro');
flagMap.set('mz', 'Mozambique');
flagMap.set('na', 'Namibia');
flagMap.set('ni', 'Nicaragua');
flagMap.set('ne', 'Níger');
flagMap.set('ng', 'Nigeria');
flagMap.set('no', 'Noruega');
flagMap.set('nz', 'Nueva Zelanda');
flagMap.set('nl', 'Países Bajos');
flagMap.set('ps', 'Palestina');
flagMap.set('pa', 'Panamá');
flagMap.set('py', 'Paraguay');
flagMap.set('pe', 'Perú');
flagMap.set('pl', 'Polonia');
flagMap.set('pt', 'Portugal');
flagMap.set('pr', 'Puerto Rico');
flagMap.set('qa', 'Qatar');
flagMap.set('cf', 'Rep. Centroafricana');
flagMap.set('cd', 'Rep. Dem. Congo');
flagMap.set('do', 'Rep. Dominicana');
flagMap.set('cz', 'República Checa');
flagMap.set('ro', 'Rumanía');
flagMap.set('rw', 'Ruanda');
flagMap.set('ru', 'Rusia');
flagMap.set('sn', 'Senegal');
flagMap.set('rs', 'Serbia');
flagMap.set('sl', 'Sierra Leona');
flagMap.set('sy', 'Siria');
flagMap.set('za', 'Sudáfrica');
flagMap.set('se', 'Suecia');
flagMap.set('ch', 'Suiza');
flagMap.set('sr', 'Surinam');
flagMap.set('tz', 'Tanzania');
flagMap.set('tg', 'Togo');
flagMap.set('tt', 'Trinidad y Tobago');
flagMap.set('tn', 'Túnez');
flagMap.set('tr', 'Turquía');
flagMap.set('ua', 'Ucrania');
flagMap.set('ug', 'Uganda');
flagMap.set('uy', 'Uruguay');
flagMap.set('uz', 'Uzbekistán');
flagMap.set('ve', 'Venezuela');
flagMap.set('zm', 'Zambia');
flagMap.set('zw', 'Zimbabwe');
