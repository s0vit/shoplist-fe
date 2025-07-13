import { describe, it, expect } from 'vitest';
import passwordValidate from 'src/utils/helpers/passwordValidate.ts';

describe('passwordValidate', () => {
  it('возвращает ошибку если поле пустое', () => {
    expect(passwordValidate('', 'password')).toBe('Fill out this field');
  });

  it('возвращает ошибку если пароль короче 6 символов', () => {
    expect(passwordValidate('Ab1', 'password')).toBe('Should contain 6 or more symbols');
  });

  it('возвращает ошибку если пароль длиннее 20 символов', () => {
    expect(passwordValidate('A1' + 'x'.repeat(19), 'password')).toBe('Should contain less than 20 symbols');
  });

  it('возвращает ошибку если нет цифры и заглавной буквы', () => {
    expect(passwordValidate('abcdef', 'password')).toBe('Should contain at least 1 number and 1 capital letter');
    expect(passwordValidate('abc1def', 'password')).toBe('Should contain at least 1 number and 1 capital letter');
    expect(passwordValidate('ABCDEF', 'password')).toBe('Should contain at least 1 number and 1 capital letter');
  });

  it('возвращает пустую строку если пароль валиден', () => {
    expect(passwordValidate('Abc123', 'password')).toBe('');
  });

  it('ничего не делает если rules не "password"', () => {
    expect(passwordValidate('123', 'not-password')).toBe('');
  });
});
