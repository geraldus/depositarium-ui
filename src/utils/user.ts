import { UserData } from '@/contexts/AuthContext';

export const mkIdent = (m: UserData): string => {
    const { firstName, lastName, patronymic } = m
    let fullName = []
    lastName != '' ? fullName.push(lastName) : null
    firstName != '' ? fullName.push(firstName) : null
    patronymic != '' ? fullName.push(patronymic) : null
    const name = fullName.join(' ')
    return name == '' ? m.ident : name
}
