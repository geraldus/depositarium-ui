import moment from 'moment'

export const localizeStartDate= (t: number, s: string) => {
    return moment(t).format(s)
}
