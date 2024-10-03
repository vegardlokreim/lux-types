var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getFunctions, httpsCallable } from "firebase/functions";
// TODO: add types for function names
export function callFunction(name, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const functions = getFunctions();
        const func = httpsCallable(functions, name);
        const response = params ? yield func(params) : yield func();
        return response.data;
    });
}
//# sourceMappingURL=callFunction.js.map