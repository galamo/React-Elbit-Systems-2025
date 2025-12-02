import data from "./country.json";

type UserType = typeof data;

type UserType2 = Omit<UserType, "gender" | "name">;

enum GENDER {
  FEMALE = "FEMALE",
  MALE = "MALE",
  OTHER = "OTHER",
}
// galamo
type genderWithStringLiteral = "male" | "female" | "other";

type UserType3 = UserType2 & { gender: GENDER };

const t: UserType3 = { gender: GENDER.FEMALE };
