import * as Bookmarks from "@/server/src/bookmark";

export default defineEventHandler(async (event) => {
  return Bookmarks.list();
});
