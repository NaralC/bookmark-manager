import * as Bookmarks from "@/server/src/bookmark";
import { getDatabase } from "~/server/src/db";

export default defineEventHandler(async (event) => {
  const { databaseFilePath } = useRuntimeConfig();
  const db = await getDatabase(databaseFilePath);
  const body = await readBody(event);
  return Bookmarks.add(db, body);
});
