// compatibility.js

const mbtiCompatibility = {
  I: "I",
  E: "E",
  S: "S",
  N: "N",
  F: "F",
  T: "T",
  P: "P",
  J: "J",
};

const exceptionalRelations = {
  INFP: ["ENFJ", "ENTJ"],
  ENFP: ["INFJ", "INTJ"],
  INFJ: ["ENFP", "ENTP"],
  ENFJ: ["INFP", "ISFP"],
  INTJ: ["ENFP", "ENTP"],
  ENTJ: ["INFP", "INTP"],
  INTP: ["ENTJ", "ESTJ"],
  ENTP: ["INFJ", "INTJ"],
  ISFP: ["ENFJ", "ESFJ", "ESTJ"],
  ESFP: ["ISFJ", "ISTJ"],
  ESTP: ["ISFJ"],
  ISFJ: ["ESFP", "ESTP"],
  ESFJ: ["ESFP"],
  ESTJ: ["INTP", "ISFP", "ISTP"],
};
const allIn = (chars, str) => {
  for (let char of chars) {
    if (!str.includes(char)) return false;
  }
  return true;
};
export const checkCompatibility = (mbti1, mbti2) => {
  // 두 MBTI 유형이 같은 경우 '좋음' 반환
  if (mbti1 === mbti2) {
    if (allIn(["S", "P"], mbti1)) return "조금 안맞는";
    return "좋음";
  }

  // 예외 관계 체크
  if (
    exceptionalRelations[mbti1] &&
    exceptionalRelations[mbti1].includes(mbti2)
  )
    return "매우 좋음";
  if (
    exceptionalRelations[mbti2] &&
    exceptionalRelations[mbti2].includes(mbti1)
  )
    return "매우 좋음";

  // ENTJ의 특별한 관계
  if (mbti1 === "ENTJ" && allIn(["S", "F", "T"], mbti2)) return "그럭저럭";
  if (mbti2 === "ENTJ" && allIn(["S", "F", "T"], mbti1)) return "그럭저럭";

  // XNFX와 XSFX, XSTX의 관계
  if (allIn(["NF"], mbti1) && (allIn(["SF"], mbti2) || allIn(["ST"], mbti2)))
    return "매우 나쁨";

  // NF와 NT의 관계
  if (allIn(["NF"], mbti1) && allIn(["NT"], mbti2)) return "좋음";

  // XSXP와 XNTX의 관계
  if (allIn(["S", "P"], mbti1) && allIn(["N", "T"], mbti2)) return "그럭저럭";

  // XSXP와 XSXP의 관계
  if (allIn(["S", "P"], mbti1) && allIn(["S", "P"], mbti2))
    return "조금 안맞는";

  // XSXP와 XSXJ의 관계
  if (allIn(["S", "P"], mbti1) && allIn(["S", "J"], mbti2)) return "그럭저럭";

  // XSXJ와 XSXJ의 관계
  if (allIn(["S", "J"], mbti1) && allIn(["S", "J"], mbti2)) return "좋음";

  return "정보 없음";
};

// MBTI 유형 배열을 알파벳 형태로 변환하는 함수
export const mbtiToAlphabet = (mbti) => {
  if (!Array.isArray(mbti)) {
    return "";
  }

  // MBTI 유형 배열의 인덱스를 각 알파벳으로 변환하여 연결하여 반환
  return mbti.map((index) => Object.keys(mbtiCompatibility)[index]).join("");
};
