import { isEmail, normalizeEmail } from 'validator';
import { hash } from 'bcrypt';

export async function processUserData (formData: FormData) {
  return {
    email: validateAndNormalizeEmail(formData.get('email')),
    password: await validateAndEncryptPassword(formData.get('password'))
  };
}

function validateAndNormalizeEmail (email: String | File | null) {
  if (!isFilledStringEntryValue(email)) throw new EmailNotProvided();
  if (!isEmail(email)) throw new InvalidEmail();

  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) throw new EmailNormalizationError();

  return email;
}

async function validateAndEncryptPassword (password: String | File | null) {
  if (!isFilledStringEntryValue(password)) throw new PasswordNotProvided();
  return await hash(password, 10);
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
