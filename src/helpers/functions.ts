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

export const shortenText = (text: string, maxChars: number): string => {
  // Permitimos un caracter adicional por cada letra 'estrecha' encontrada en el texto (i, j, l), si hay 2 o más:
  // Si no hay ninguna letra 'estrecha', permitimos un caracter menos.
  let updatedMaxChars = maxChars;
  // const fOccurs = text.split('f').length - 1;
  const iOccurs = text.split('i').length - 1;
  const jOccurs = text.split('j').length - 1;
  const lOccurs = text.split('l').length - 1;
  // const tOccurs = text.split('t').length - 1;
  // console.log({ fOccurs }, { iOccurs }, { jOccurs }, { lOccurs }, { tOccurs });
  // console.log({ iOccurs }, { jOccurs }, { lOccurs });
  // const narrowChars = fOccurs + iOccurs + jOccurs + lOccurs + tOccurs;
  const narrowChars = iOccurs + jOccurs + lOccurs;
  if (narrowChars >= 2) {
    updatedMaxChars += Math.round(narrowChars / 2);
  }
  if (narrowChars === 0) {
    updatedMaxChars--;
  }
  // console.log({ text }, { maxChars }, { updatedMaxChars });

  // Si el texto es menor o igual al máximo permitido, se retorna tal cual:
  if (text.length <= updatedMaxChars) return text;

  // Si es hasta 3 caracteres superior al máximo e incluye la inicial del nombre ('X. '), la eliminamos:
  if (text.length > updatedMaxChars && text.length <= updatedMaxChars + 3) {
    return text.substring(3);
  }
  // Para otros casos, se retorna el máximo permitido menos tres y se añaden puntos suspensivos:
  return narrowChars === 0
    ? text.substring(0, maxChars - 3).concat('...')
    : text.substring(0, updatedMaxChars - 3).concat('...');
};
