const getOrdinalNum = (number: number) => {
    let selector: number;

    if (number <= 0) {
        selector = 4;
    } else if ((number > 3 && number < 21) || number % 10 > 3) {
        selector = 0;
    } else {
        selector = number % 10;
    }

    const options = ["th", "st", "nd", "rd", ""];

    if (selector > options.length) return "";

    const suffix = options[selector];

    return number.toString() + (suffix || "");
};

export default getOrdinalNum;
