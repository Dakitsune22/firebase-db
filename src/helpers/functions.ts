import { Position } from 'src/models/player';

export const sleep = async (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getAge = (birthDateStr: string): number => {
  // Mask expected: DD/MM/YYYY
  const birthDateArray = birthDateStr.split('/');
  const birthDate = new Date(
    Number(birthDateArray[2]),
    Number(birthDateArray[1]) - 1,
    Number(birthDateArray[0])
  );

  const diffMS = Date.now() - birthDate.getTime();
  const ageDate = new Date(diffMS);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const isValidBirthDate = (dateStr: string): boolean => {
  // Mask expected: DD/MM/YYYY
  const dateArray = dateStr.split('/');
  const reverseDate = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;

  // console.log({ reverseDate });
  const reverseDateMS = new Date(reverseDate).getTime();

  // console.log(Date.now() - reverseDateMS);
  return (
    !isNaN(reverseDateMS) &&
    Date.now() - reverseDateMS > 0 &&
    getAge(dateStr) < 100
  );
};

export const getPlayerPositionIndex = (position: Position): number => {
  switch (position) {
    case Position.POR:
      return 1;
    case Position.DF:
      return 2;
    case Position.LD:
      return 3;
    case Position.LI:
      return 4;
    case Position.MCD:
      return 5;
    case Position.MC:
      return 6;
    case Position.MCO:
      return 7;
    case Position.ED:
      return 8;
    case Position.EI:
      return 9;
    case Position.DC:
      return 10;

    default:
      return 1;
  }
};
