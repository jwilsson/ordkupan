import { sample, uniq } from "@banjoanton/utils";
import { Combo } from "../src/types/types";
import { exportJsonFile, importJsonFile } from "./helpers";

const main = () => {
    const arrayOfWords = importJsonFile("./words/words.json");
    const arrayOfCombos = createCombos(arrayOfWords);
    exportJsonFile("./words/combos.json", arrayOfCombos);
};

function createCombos(allWords: string[]) {
    const wordsWithSevenDifferentLetters = allWords.filter(word => {
        const letters = [...word];
        const uniqueLetters = uniq(letters);
        return uniqueLetters.length === 7;
    });

    const combos = wordsWithSevenDifferentLetters.map(word => {
        const letters = [...word];
        const mainLetter = sample(letters);
        const otherLetters = letters.filter(letter => letter !== mainLetter);

        const wordsWithMainLetter = allWords.filter(w => w.includes(mainLetter));

        const validWords = wordsWithMainLetter.filter(w => {
            const wordLetters = [...w];

            for (const letter of wordLetters) {
                if (!letters.includes(letter)) {
                    return false;
                }
            }

            return true;
        });

        const combo: Combo = {
            mainLetter,
            otherLetters,
            words: validWords.map(word => ({
                word,
                score: getScore(word),
            })),
            // eslint-disable-next-line unicorn/no-array-reduce
            maxScore: validWords.reduce((acc, w) => {
                const score = getScore(w);
                return acc + score;
            }, 0),
        };

        return combo;
    });

    return combos;
}

function getScore(word: string) {
    const isSevenLetters = word.length === 7;
    const isSixLetters = word.length === 6;
    const isFiveLetters = word.length === 5;
    const isFourLetters = word.length === 4;

    const isUnique = uniq([...word]).length === word.length;

    if (isFourLetters) {
        return 1;
    }

    if (isFiveLetters) {
        return 2;
    }

    if (isSixLetters) {
        return 3;
    }

    if (isSevenLetters && isUnique) {
        return 4 + 7;
    }

    if (isSevenLetters) {
        return 4;
    }

    return 0;
}

main();
