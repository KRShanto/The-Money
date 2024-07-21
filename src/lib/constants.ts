import { MoneyTypeTYpe } from "@/types/money";

export const MAIN_COLOR = "rgb(0, 174, 255)";
export const DEFAULT_THEME = "dark";
export const SITE_NAME = "The Money";

export const TYPES = ["profit", "expense", "loan", "borrow"] as const;

// TODO: improve these colors
export function getColor(type: MoneyTypeTYpe) {
  switch (type) {
    case "profit":
      return "rgb(0, 255, 0)";

    case "borrow":
      return "yellow";

    case "expense":
      return "red";

    case "loan":
      return "orange";
  }
}
