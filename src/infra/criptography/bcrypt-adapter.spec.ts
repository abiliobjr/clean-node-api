import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

const salt = 12
const makeSutFactory = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Shoul call bcrypt with correct values', async () => {
    const sut = makeSutFactory()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', 12)
  })

  test('Shoul return a hash on success', async () => {
    const sut = makeSutFactory()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })

  test('Shoul throw if bcrypt throws', async () => {
    const sut = makeSutFactory()
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error())
      ))
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
