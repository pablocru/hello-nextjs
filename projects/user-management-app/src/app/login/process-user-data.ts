import { isEmail, normalizeEmail } from 'validator';

export function processUserData (formData: FormData) {
  return {
    email: validateAndNormalizeEmail(formData.get('email')),
    password: validateAndEncryptPassword(formData.get('password'))
  };
}

function validateAndNormalizeEmail (email: String | File | null) {
  if (!isFilledStringEntryValue(email)) throw new EmailNotProvided();
  if (!isEmail(email)) throw new InvalidEmail();

  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) throw new EmailNormalizationError();

  return email;
}

function validateAndEncryptPassword (password: String | File | null) {
  if (!isFilledStringEntryValue(password)) throw new PasswordNotProvided();
  return password;
}

function isFilledStringEntryValue (
  entryValue: String | File | null
): entryValue is string {
  return typeof entryValue === 'string' && Boolean(entryValue.length);
}

class EntryValueNotProvided extends Error {
  constructor (entryKey: string) {
    super(entryKey + ' not provided');
  }
}
class PasswordNotProvided extends EntryValueNotProvided {
  constructor () {
    super('Password');
  }
}
class EmailNotProvided extends EntryValueNotProvided {
  constructor () {
    super('Email');
  }
}
class InvalidEmail extends Error {
  constructor () {
    super('Invalid email');
  }
}
class EmailNormalizationError extends Error {
  constructor () {
    super('Email could not be normalized');
  }
}
