const lightenHSLColor = (hslColor, percent) => {    //If assingning custom colors in the future, they may be automatically calculated thus
    const hslRegex = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/;
    const match = hslColor.match(hslRegex);

    if (match) {
      const hue = match[1];
      const saturation = match[2];
      let lightness = parseFloat(match[3]);

      // Adjust the lightness by the percentage provided
      lightness = Math.min(100, Math.max(0, lightness + percent));

      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    return hslColor; // Return original if no match
  };

const colorData = {
    Red: {
        Arrow: 'hsl(0, 100%, 50%)',
        Name: 'hsl(0, 100%, 50%)',
        CountryBase: 'hsl(0, 64%, 40%)',
        CountrySelected: 'hsl(0, 75%, 60%)',
        CountryAdjacent: 'hsl(0, 64%, 50%)',
    },
    Blue: {
        Arrow: 'hsl(210, 100%, 50%)',
        Name: 'hsl(210, 100%, 50%)',
        CountryBase: 'hsl(210, 64%, 40%)',
        CountrySelected: 'hsl(210, 75%, 60%)',
        CountryAdjacent: 'hsl(210, 64%, 50%)',
    },
    Green: {
        Arrow: 'hsl(115, 100%, 50%)',
        Name: 'hsl(115, 100%, 50%)',
        CountryBase: 'hsl(115, 64%, 40%)',
        CountrySelected: 'hsl(115, 75%, 60%)',
        CountryAdjacent: 'hsl(115, 64%, 50%)',
    },
    Purple: {
        Arrow: 'hsl(290, 100%, 50%)',
        Name: 'hsl(290, 100%, 50%)',
        CountryBase: 'hsl(290, 64%, 40%)',
        CountrySelected: 'hsl(290, 75%, 60%)',
        CountryAdjacent: 'hsl(290, 64%, 50%)',
    },
    Grey: {
        Arrow: 'hsl(0, 0%, 50%)',
        Name: 'hsl(0, 0%, 50%)',
        CountryBase: 'hsl(0, 0%, 40%)',
        CountrySelected: 'hsl(0, 0%, 60%)',
        CountryAdjacent: 'hsl(0, 0%, 50%)',
    }
};


export default colorData;