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
