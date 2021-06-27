import { format } from "date-fns";

export function formateDate(date: string, dateFormat = "do MMM, yyyy"): string {
    return format(new Date(date), dateFormat);
}