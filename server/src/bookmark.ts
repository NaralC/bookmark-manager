import { z } from "zod";
import { randomUUID } from "node:crypto"
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

export async function list() {
  return bookmarks;
}

export async function add(options: AddOptions) {
  const params = addOptionsSchema.parse(options);

  const bookmark: Bookmark = {
    id: randomUUID(),
    url: params.url,
    icon: {
      url: generateIconURL(params.url), 
      version: 0
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }

  bookmarks.push(bookmark);
  return bookmark;
}
