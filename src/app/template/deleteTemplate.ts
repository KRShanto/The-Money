"use server";

import { Template } from "@/models/template";

export async function deleteTemplate(id: string) {
  await Template.deleteOne({ id });

  return { success: true };
}
