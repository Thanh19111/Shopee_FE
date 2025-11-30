import axios, {type AxiosError} from "axios";
import HttpStatusCode from "../constants/httpStatusCode.enum.ts";
import config from "../constants/config.ts";

export function isAxiosError<T>(error: unknown): error is AxiosError<T>{
  return axios.isAxiosError(error);
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError>  {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
}

export function formatCurrency(currency: number){
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number){
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(value)
    .replace('.', ',')
    .toLowerCase();
}

export function rateSale(original: number, sale: number) : string{
  return Math.round(((original - sale) / original) * 100) + '%';
}

export const generateNameId = ({name, id} : {name: string, id: string}) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i,${id}`
}

const removeSpecialCharacter = (str: string) =>
  str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ''
  )

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i,');
  return arr[arr.length - 1];
}

const userImage = "https://cdn-icons-png.flaticon.com/512/1144/1144760.png";

export const getAvatarUrl = (avatarName?: string) => {
  return avatarName ? avatarName : userImage;
}
