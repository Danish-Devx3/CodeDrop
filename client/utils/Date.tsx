import moment from "moment"


export const formatDate = (date: string) => {
    return `Created on ${moment(date).format("DD MMMM YYYY, HH:mm")}`
}

export const joinedOn = (date: string) => {
    return `Joined ${moment(date).fromNow()}`
}