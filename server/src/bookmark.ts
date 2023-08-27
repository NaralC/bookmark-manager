import { z } from "zod";
import { DatabaseConnection, sql } from "@databases/sqlite";
import { randomUUID } from "node:crypto";
import { generateIconURL } from "./utils";

type Bookmark = {
  id: string;
  url: string;
  icon: {
    url: string;
    version: number;
  };
  createdAt: Date;
  updatedAt: Date;
};

const addOptionsSchema = z.object({ url: z.string() });
type AddOptions = z.infer<typeof addOptionsSchema>;

const bookmarks: Bookmark[] = [];

export async function list(db: DatabaseConnection) {
  return db.query(sql`SELECT * FROM bookmarks`)
}

export async function add(db: DatabaseConnection, options: AddOptions) {
  const params = addOptionsSchema.parse(options);

  const bookmark: Bookmark = {
    id: randomUUID(),
    url: params.url,
    icon: {
      url: generateIconURL(params.url),
      version: 0,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const res = await db.query(sql`INSERT INTO bookmarks (
    id,
    url,
    icon_url,
    icon_version,
    created_at,
    updated_at
  )
  VALUES (
    ${bookmark.id},
    ${bookmark.url},
    ${bookmark.icon.url},
    ${bookmark.icon.version},
    ${bookmark.createdAt},
    ${bookmark.updatedAt}
  );`)
  console.log(res);
  
  return bookmark;
}
