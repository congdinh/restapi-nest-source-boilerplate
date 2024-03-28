import { capitalizeFirstLetter, removeSpecialCharacters } from '@commons/utils';

export const Exception = {
  EXISTED: (text: string) => generateError(`${text} existed`),
  NOT_EXISTED: (text: string) => generateError(`${text} not existed`),
  NOT_FOUND: (text: string) => generateError(`${text} not found`),
  INVALID: (text: string) => generateError(`invalid ${text}`),
  UNAVAILABLE: (text: string) => generateError(`${text} unavailable`),
  MISSING: (text: string) => generateError(`${text} missing`),
};

const generateError = (message: string) => ({
  message: capitalizeFirstLetter(message.toLowerCase()),
  code: removeSpecialCharacters(message).replace(/ /g, '_').toUpperCase(), // 'Invalid user id!' => 'INVALID_USER_ID'
});
