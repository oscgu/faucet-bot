import { Duration, DateTime } from "luxon";
import { getLastRequestDate } from "../db/operations";

export const milliSecondsTillNextRequest = async (
  column: string,
  userId: string,
  cooldown: Duration
): Promise<number> => {
  const lastReqDateUnix = await getLastRequestDate(column, userId);
  const nowUnix = DateTime.utc().toMillis();

  return Duration.fromMillis(lastReqDateUnix)
    .plus(cooldown)
    .minus(Duration.fromMillis(nowUnix))
    .toMillis();
};