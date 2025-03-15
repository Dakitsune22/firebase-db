export const createCalendar = (teamsNumber: number): string[][] => {
  const teams: string[] = [];

  // for (let i = 0; i < teamsNumber; i++) {
  //   teams.push(`Team ${i + 1}`);
  // }
  for (let i = 0; i < teamsNumber; i++) {
    teams.push(`${i}`);
  }

  const m1: string[][] = new Array(teamsNumber - 1);
  const m2: string[][] = new Array(teamsNumber - 1);
  const j1: string[][] = new Array(teamsNumber - 1);
  const j2: string[][] = new Array(teamsNumber - 1);

  //   for (let i = 0; i < teamsNumber - 1; i++) {
  //     m1[i] = new Array(teamsNumber / 2);
  //     m2[i] = new Array(teamsNumber / 2);
  //     j1[i] = new Array(teamsNumber / 2);
  //     j2[i] = new Array(teamsNumber / 2);
  //   }
  for (let i = 0; i < teamsNumber - 1; i++) {
    m1[i] = [];
    m2[i] = [];
    j1[i] = [];
    j2[i] = [];
  }

  // Mostrarlo en consola:
  //   console.log('Matriz #1: ', m1);
  //   console.log('Matriz #2: ', m2);
  //   console.log('Jornadas ida', j1);
  //   console.log('Jornadas vuelta', j2);

  let counter = 0;
  let counter2: number = teamsNumber - 2;

  for (let i = 0; i < teamsNumber - 1; i++) {
    for (let j = 0; j < teamsNumber / 2; j++) {
      // Matriz #1
      m1[i].push(teams[counter]);
      counter++;
      if (counter === teamsNumber - 1) {
        counter = 0;
      }
      // Matriz #2
      if (j === 0) {
        // console.log({ teamsNumber });
        m2[i].push(teams[teamsNumber - 1]);
      } else {
        m2[i].push(teams[counter2]);
        counter2--;
        if (counter2 === -1) {
          counter2 = teamsNumber - 2;
        }
      }
      // Enfrentamientos primera vuelta
      if (j === 0) {
        if (i % 2 === 0) {
          j1[i].push(m2[i][j] + '-' + m1[i][j] + ' ');
        } else {
          j1[i].push(m1[i][j] + '-' + m2[i][j] + ' ');
        }
      } else {
        j1[i].push(m1[i][j] + '-' + m2[i][j] + ' ');
      }
      // Enfrentamientos segunda vuelta
      if (j === 0) {
        if (i % 2 === 0) {
          j2[i].push(m1[i][j] + '-' + m2[i][j] + ' ');
        } else {
          j2[i].push(m2[i][j] + '-' + m1[i][j] + ' ');
        }
      } else {
        j2[i].push(m2[i][j] + '-' + m1[i][j] + ' ');
      }
    }
  }

  // Mostrarlo en consola:
  console.log('Matriz #1: ', m1);
  console.log('Matriz #2: ', m2);
  console.log('Jornadas ida', j1);
  console.log('Jornadas vuelta', j2);

  j1.push(...j2);
  return j1;
};

export const generateLeagueCalendar = (teams: string[]): string[][] => {
  // const teams: string[] = [];

  // for (let i = 0; i < teamsNumber; i++) {
  //   teams.push(`Team ${i + 1}`);
  // }
  const teamsNumber = teams.length;

  const m1: string[][] = new Array(teamsNumber - 1);
  const m2: string[][] = new Array(teamsNumber - 1);
  const j1: string[][] = new Array(teamsNumber - 1);
  const j2: string[][] = new Array(teamsNumber - 1);

  //   for (let i = 0; i < teamsNumber - 1; i++) {
  //     m1[i] = new Array(teamsNumber / 2);
  //     m2[i] = new Array(teamsNumber / 2);
  //     j1[i] = new Array(teamsNumber / 2);
  //     j2[i] = new Array(teamsNumber / 2);
  //   }
  for (let i = 0; i < teamsNumber - 1; i++) {
    m1[i] = [];
    m2[i] = [];
    j1[i] = [];
    j2[i] = [];
  }

  // Mostrarlo en consola:
  //   console.log('Matriz #1: ', m1);
  //   console.log('Matriz #2: ', m2);
  //   console.log('Jornadas ida', j1);
  //   console.log('Jornadas vuelta', j2);

  let counter = 0;
  let counter2: number = teamsNumber - 2;

  for (let i = 0; i < teamsNumber - 1; i++) {
    for (let j = 0; j < teamsNumber / 2; j++) {
      // Matriz #1
      m1[i].push(teams[counter]);
      counter++;
      if (counter === teamsNumber - 1) {
        counter = 0;
      }
      // Matriz #2
      if (j === 0) {
        // console.log({ teamsNumber });
        m2[i].push(teams[teamsNumber - 1]);
      } else {
        m2[i].push(teams[counter2]);
        counter2--;
        if (counter2 === -1) {
          counter2 = teamsNumber - 2;
        }
      }
      // Enfrentamientos primera vuelta
      if (j === 0) {
        if (i % 2 === 0) {
          j1[i].push(m2[i][j] + '-' + m1[i][j] + ' ');
        } else {
          j1[i].push(m1[i][j] + '-' + m2[i][j] + ' ');
        }
      } else {
        j1[i].push(m1[i][j] + '-' + m2[i][j] + ' ');
      }
      // Enfrentamientos segunda vuelta
      if (j === 0) {
        if (i % 2 === 0) {
          j2[i].push(m1[i][j] + '-' + m2[i][j] + ' ');
        } else {
          j2[i].push(m2[i][j] + '-' + m1[i][j] + ' ');
        }
      } else {
        j2[i].push(m2[i][j] + '-' + m1[i][j] + ' ');
      }
    }
  }

  // Mostrarlo en consola:
  console.log('Matriz #1: ', m1);
  console.log('Matriz #2: ', m2);
  console.log('Jornadas ida', j1);
  console.log('Jornadas vuelta', j2);

  j1.push(...j2);
  return j1;
};
