export function dataCy<T = string>(alias: T): string {
    return `[data-cy=${alias}]`
}

export type AdressSelectors =
    undefined |
    null |
    'country' |
    'province' |
    'city' |
    'address' | 
    'zipCode'

export type BirthSelectors =
    'birth-date' |
    'birth-country' |
    'birth-province' |
    'birth-place'