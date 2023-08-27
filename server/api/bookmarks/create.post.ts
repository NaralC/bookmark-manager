import * as Bookmarks from "@/server/src/bookmark"

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    return Bookmarks.add(body);
})