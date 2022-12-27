import fs from "fs";
import path from "path";

const FOLDER_NAME = "carousel";
const POSTS_DIRECTORY = path.join(process.cwd(), "public", "images", FOLDER_NAME);

export const getCarouselItems = (): string[] => {
    return fs.readdirSync(POSTS_DIRECTORY);
};