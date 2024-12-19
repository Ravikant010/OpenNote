import { db,  } from "@/db/db"; // Adjust the import paths as necessary
import { likes} from "@/db/schema"; // Adjust the import paths as necessary
import { Like, likeSchema } from "@/models/index"; // Adjust the import paths as necessary

export const addLike = async (like: Like) => {
  const validatedLike = likeSchema.parse(like);
  await db.insert(likes).values(validatedLike).execute();
};