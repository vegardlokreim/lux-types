import { CREDIT_GRADE } from "./consts"

export type CreditCheckResponse = {
  /**
   * Score from 0 - 100, where 100 is the best score
   */
  score: number
  /**
   * Credit grade, where A is the best grade
   */
  scoreKarakter: (typeof CREDIT_GRADE)[number]
  /**
   * Explanation of the credit grade, norewegian text
   */
  scoreForklaring: string
  /**
   * Suggested credit limit in norwegian kr
   */
  kredittgrense: number
}
