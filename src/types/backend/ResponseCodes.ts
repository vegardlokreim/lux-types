import { errorCodes, internalErrorCodes, successCodes } from "./consts";

export type ResponseCode = typeof successCodes[number] | typeof errorCodes[number] | typeof internalErrorCodes[number];
