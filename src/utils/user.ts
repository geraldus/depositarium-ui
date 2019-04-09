import { UserData } from '@/contexts/AuthContext';

export const mkFullName = (m: UserData): string | null => {
    const { firstName, lastName, patronymic } = m
    let fullName = []
    lastName != '' ? fullName.push(lastName) : null
    firstName != '' ? fullName.push(firstName) : null
    patronymic != '' ? fullName.push(patronymic) : null
    const name = fullName.join(' ')
    return name == '' ? null : name
}


export const mkIdent = (u: UserData): string => {
    const name = mkFullName(u) || ''
    return name == '' ? u.ident : name
}


