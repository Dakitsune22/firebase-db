// import {
//   teamsEngland1,
//   teamsFrance1,
//   teamsGermany1,
//   teamsItaly1,
//   teamsSpain1,
// } from 'src/data/teams';
import { CountryLeague } from './leagues';
import { Player } from './player';
import { Tactic } from './tactic';

export interface Team {
  country: CountryLeague;
  division: 1 | 2;
  draws: number;
  goalDifference: number;
  goalsConceded: number;
  goalsScored: number;
  id: number;
  losses: number;
  matchesPlayed: number;
  name: string;
  shortName: string;
  points: number;
  wins: number;
  tactic: Tactic;
  players: Player[];
}

// export const crestMapSpain = new Map();
// export const crestMapEngland = new Map();
// export const crestMapItaly = new Map();
// export const crestMapGermany = new Map();
// export const crestMapFrance = new Map();

// teamsSpain1.forEach((t) => {
//   crestMapSpain.set(t.shortName, t.name);
// });
// teamsEngland1.forEach((t) => {
//   crestMapEngland.set(t.shortName, t.name);
// });
// teamsItaly1.forEach((t) => {
//   crestMapItaly.set(t.shortName, t.name);
// });
// teamsGermany1.forEach((t) => {
//   crestMapGermany.set(t.shortName, t.name);
// });
// teamsFrance1.forEach((t) => {
//   crestMapFrance.set(t.shortName, t.name);
// });
// // * En caso de añadir más ligas por país en un futuro, setearlas al crestMap del país correspondiente.

let files = import.meta.glob('/public/images/teams-spain/*.png');
export const teamCrestOptionsSpain: string[] = [];
export const teamCrestOptionsEngland: string[] = [];
export const teamCrestOptionsItaly: string[] = [];
export const teamCrestOptionsGermany: string[] = [];
export const teamCrestOptionsFrance: string[] = [];
export const teamCrestOptionsOthersEurope: string[] = [];
export const teamCrestOptionsOthersWorld: string[] = [];

for (const path in files) {
  teamCrestOptionsSpain.push(
    path.slice(0, path.length - 4).replace('/public/images/teams-spain/', '')
  );
}
files = import.meta.glob('/public/images/teams-england/*.png');
for (const path in files) {
  teamCrestOptionsEngland.push(
    path.slice(0, path.length - 4).replace('/public/images/teams-england/', '')
  );
}
files = import.meta.glob('/public/images/teams-italy/*.png');
for (const path in files) {
  teamCrestOptionsItaly.push(
    path.slice(0, path.length - 4).replace('/public/images/teams-italy/', '')
  );
}
files = import.meta.glob('/public/images/teams-germany/*.png');
for (const path in files) {
  teamCrestOptionsGermany.push(
    path.slice(0, path.length - 4).replace('/public/images/teams-germany/', '')
  );
}
files = import.meta.glob('/public/images/teams-france/*.png');
for (const path in files) {
  teamCrestOptionsFrance.push(
    path.slice(0, path.length - 4).replace('/public/images/teams-france/', '')
  );
}
files = import.meta.glob('/public/images/teams-others-europe/*.png');
for (const path in files) {
  teamCrestOptionsOthersEurope.push(
    path
      .slice(0, path.length - 4)
      .replace('/public/images/teams-others-europe/', '')
  );
}
files = import.meta.glob('/public/images/teams-others-world/*.png');
for (const path in files) {
  teamCrestOptionsOthersWorld.push(
    path
      .slice(0, path.length - 4)
      .replace('/public/images/teams-others-world/', '')
  );
}
