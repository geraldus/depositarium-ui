import React from 'react'

interface UserData {
    id: number,
    name: string,
    [propNames: string]: any
}

export interface UserContext {
    auth: boolean,
    user?: UserData
}

declare global {
    interface Window {
        currentUser: UserContext
    }
}

const defaultState: UserContext = {
    auth: false,
    user: undefined
}

const AuthContext = React.createContext(window.currentUser)

class AuthProvider extends React.Component<{}, UserContext> {
    readonly state = defaultState
    render () {
        return (
            <AuthContext.Provider value={ this.state }>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer, AuthContext }