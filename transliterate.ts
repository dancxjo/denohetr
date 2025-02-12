const cantillationToAccent = {
    // **Cantillation Marks (Accentual)**
    '\u0591': '\u0301', // Etnahta: main pause in a verse (combining acute accent)
    '\u0592': '\u0311', // Segol: minor pause (combining inverted breve)
    '\u0593': '\u0310', // Shalshelet: rare cantillation mark (combining candrabindu)
    '\u0594': '\u0325', // Zaqef Qatan: minor pause (combining ring below)
    '\u0595': '\u032C', // Zaqef Gadol: minor pause (combining caron below)
    '\u0596': '\u0324', // Tipeha: minor pause (combining diaeresis below)
    '\u0597': '\u0313', // Revia: minor pause (combining comma above)
    '\u0598': '\u0314', // Zarqa: minor pause (combining reversed comma above)
    '\u0599': '\u0330', // Pashta: minor pause (combining tilde below)
    '\u059A': '\u032E', // Yetiv: minor pause (combining breve below)
    '\u059B': '\u033F', // Tevir: minor pause (combining double overline)
    '\u059C': '\u0329', // Geresh Muqdam: minor pause (combining vertical line below)
    '\u059D': '\u032A', // Gershayim: minor pause (combining bridge below)
    '\u059E': '\u032B', // Qarney Para: minor pause (combining inverted double arch below)
    '\u059F': '\u032D', // Telisha Gedola: minor pause
    '\u05A0': '\u032F', // Pazer: minor pause
    '\u05A1': '\u0316', // Munach: connecting mark (combining grave accent below)
    '\u05A3': '\u0317', // Merkha: connecting mark (combining acute accent below)
    '\u05A5': '\u0319', // Darga: connecting mark (combining right tack below)
};
const punctuation = {
    // **Punctuation Marks**
    '\u05BE': '-',  // Maqaf: hyphen
    '\u05C0': '/',  // Paseq: separator
    '\u05C3': ':',  // Sof Pasuq: end of verse
    '\u05C6': '⸮',  // Nun Hafukha: reversed question mark
    '\u05AE': '.',  // Masora Dot: punctuation mark
};

const vowels = {
    // **Vowels & Modifiers**
    '\u05B0': 'ə', // Sheva
    '\u05B1': 'ĕ', // Hataf Segol
    '\u05B2': 'ă', // Hataf Patah
    '\u05B3': 'ŏ', // Hataf Qamats
    '\u05B4': 'i', // Hiriq
    '\u05B5': 'ē', // Tsere
    '\u05B6': 'e', // Segol
    '\u05B7': 'a', // Patah
    '\u05B8': 'ā', // Qamats
    '\u05B9': 'ō', // Holam
    '\u05BA': 'ō', // Holam Haser
    '\u05BB': 'u', // Qubuts
    '\u05C7': 'å', // Qamats Qatan

    // **Dagesh, Rafe, Meteg**
    '\u05BC': '',  // Dagesh (handled in consonant mappings)
    '\u05BF': '',  // Rafe (handled in consonant mappings)
    '\u05BD': '', // Meteg (probably should be ommitted)
};

const consonants = {
    // **Consonants**
    '\u05D0': 'ʾ',  // Aleph
    '\u05D1': 'v',  // Bet
    '\u05D2': 'ɣ',  // Gimel
    '\u05D3': 'ð',  // Dalet
    '\u05D4': 'h',  // He
    '\u05D5': 'w',  // Vav
    '\u05D6': 'z',  // Zayin
    '\u05D7': 'χ',  // Het
    '\u05D8': 'ʈ',  // Tet [tˤ]
    '\u05D9': 'j',  // Yod
    '\u05DA': 'x',  // Final Kaf
    '\u05DB': 'x',  // Kaf
    '\u05DC': 'l',  // Lamed
    '\u05DD': 'm',  // Final Mem
    '\u05DE': 'm',  // Mem
    '\u05DF': 'n',  // Final Nun
    '\u05E0': 'n',  // Nun
    '\u05E1': 's',  // Samekh
    '\u05E2': 'ƹ',  // Ayin
    '\u05E3': 'f',  // Final Pe
    '\u05E4': 'f',  // Pe
    '\u05E5': 'c',  // Final Tsadi
    '\u05E6': 'c',  // Tsadi
    '\u05E7': 'q',  // Qof
    '\u05E8': 'r',  // Resh
    // **Shin & Sin Dots**
    '\u05E9\u05C1': 'ʃ',  // Shin Dot
    '\u05E9\u05C2': 'ɬ',   // Sin Dot (possible ancient pronunciation)
    '\u05E9': 'ʃ',  // Shin
    '\u05EA': 'þ',  // Tav

    // **Dagesh Forms**
    'בּ': 'b',
    'גּ': 'g',
    'דּ': 'd',
    'כּ': 'k',
    'פּ': 'p',
    'תּ': 't',


};

const dagesh = '\u05BC';
const sinDot = '\u05C2';
const shinDot = '\u05C1';

class CompositeGrapheme {
    protected hasDagesh = false;

    constructor(protected consonant: string, protected modifiers: string, protected tail: string = "") {
        this.modifiers = modifiers.normalize('NFD');
        if (this.modifiers.includes(dagesh)) {
            this.hasDagesh = true;
        }

        for (const consonantModifier of [sinDot, shinDot]) {
            if (this.modifiers.includes(consonantModifier)) {
                this.consonant += consonantModifier;
                this.modifiers = this.modifiers.replace(consonantModifier, '');
            }
        }

        this.modifiers = this.modifiers.split('').reverse().join('');
    }

    get shortForm(): string {
        return consonants[this.consonant as keyof typeof consonants] || "?????";
    }

    get longForm(): string {
        const specialCases: Record<string, string> = {
            'ב': 'b', 'פ': 'p', 'ג': 'g', 'כ': 'k', 'ת': 't', 'ד': 'd'
        };
        return specialCases[this.consonant] || (this.shortForm + this.shortForm);
    }

    get nucleus(): string {
        let result = this.modifiers.replaceAll(dagesh, '');
        for (const [grapheme, replacement] of [...Object.entries(vowels), ...Object.entries(cantillationToAccent)]) {
            result = result.replaceAll(grapheme, replacement);
        }
        return result;
    }

    get onset(): string {
        return this.hasDagesh ? this.longForm : this.shortForm;
    }

    toString(): string {
        let result = (this.onset + this.nucleus + this.tail)
            .replace('wō', 'ō')
            .replace('ww', 'ū')
            .replaceAll('ij', 'ī')  // This isn't being observed
            .replaceAll('íj', 'ī́')
            .replaceAll('jəhwāh', 'ʾăðōnāj')
            .replaceAll('jəhwih', 'ʾĕlōhīm')
            .replace(/jw\b/g, 'w');
        for (const [grapheme, replacement] of Object.entries(punctuation)) {
            result = result.replaceAll(grapheme, replacement);
        }
        return result;
    }
}

const C = `[${[...new Set(Object.values(consonants))].join('')}]`;
const V = '[aeiouāēīōūə]';
const permissibleOnsets = new Set(['br']);

function elideSchwa(transliteration: string): string {
    const pattern = `((${V})(${C}?))?(${C})ə(${C})`;
    return transliteration.replace(new RegExp(pattern, 'g'), (match, lastRime = '', V = '', C0 = '', C1: string, C2: string) => {
        if (V && !C0) {
            return `${V}${C1}${C2}`;
        }
        const onset = C1 + C2;
        if (V && onset && permissibleOnsets.has(onset)) {
            return `${C1}${C2}`;
        }
        return match;
    }).replace(new RegExp(`(${C})ə(\\P{L})`, 'gu'), '$1$2');
}

export function transliterate(text: string): string {
    const cantillation = /[\u0591-\u05AF]/g;
    const normalized = text.normalize('NFC').normalize('NFD').normalize('NFC').replace(cantillation, '');
    const consonantBlocks = [...normalized.matchAll(/(([א-ת])([֚-ׇֽֿׁׂׅׄ]*)([^\u05D0-\u05eA]*))/g)]
        .map(match => new CompositeGrapheme(match[2], match[3], match[4]));

    let result = '';
    for (const block of consonantBlocks) {
        result += block.toString();
    }

    return elideSchwa(result.normalize('NFC'));
}
