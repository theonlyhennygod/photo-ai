import { surpriseMePrompts } from "../constants";
import FileSaver from "file-saver";

// This function is used to get a random prompt from the surpriseMePrompts array

export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];

    if (randomPrompt === prompt) return getRandomPrompt(prompt);

    return randomPrompt;
}

export async function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `${_id}.jpg`);
}