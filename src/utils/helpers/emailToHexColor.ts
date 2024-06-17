const emailToHexColor = (email: string) => {
  const hashCode = (email: string) => {
    let hash = 0;

    for (let i = 0; i < email.length; i++) {
      const char = email.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Преобразование в 32-битное целое число
    }

    return hash;
  };

  function intToRGB(i: number) {
    const c = (i & 0x00ffffff).toString(16).toUpperCase();

    return '00000'.substring(0, 6 - c.length) + c;
  }

  const hash = hashCode(email);

  return `#${intToRGB(hash)}`;
};

export default emailToHexColor;
