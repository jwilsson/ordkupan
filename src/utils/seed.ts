// import { combos } from "../../words/combos.ts";
import { Combo } from "../types/types";
import { addCombo } from "./database";

const COMBOS: Combo[] = []; // change to combos ;

const seed = async () => {
    COMBOS.sort(() => 0.5 - Math.random());
    let index = 0;
    for (const combo of COMBOS) {
        console.log(`Adding combo: ${index + 1}/${COMBOS.length}`);
        await addCombo(combo);
        index++;
    }
};

seed();
