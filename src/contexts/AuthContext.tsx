import React from 'react'
import { string } from 'prop-types';

export interface UserData {
    id: number,
    name: string,
    accessRights: string[],
    [propNames: string]: any
}

export interface UserContext {
    auth: boolean,
    user?: UserData
}

export interface SigninFormContext {
    login(u: UserContext): void,
    logout(): void
}

type Context = UserContext & SigninFormContext

declare global {
    interface Window {
        currentUser: UserContext
    }
}

const defaultState: Context = {
    auth: false,
    user: undefined,
    login: () => {},
    logout: () => {}
}

const AuthContext = React.createContext({
    ...defaultState,
    // ...window.currentUser
})

console.log('!CTX!', window, window.currentUser)

class AuthProvider extends React.Component<{}, Context> {
    readonly state = defaultState
    componentDidMount() {
        // if (window.currentUser) {
        //     this.setState(window.currentUser)
        // }
    }
    componentDidUpdate() {
        // if (window.currentUser) {
        //     this.setState(window.currentUser)
        // }
    }
    login = (creds: UserContext) => {
        console.log('UPDATE CONTEXT', creds)
        this.setState({
            ...creds,
            auth: true
        })
    }
    logout = () => {
        this.setState(defaultState)
    }
    render () {
        console.log('CTX', window, window.currentUser, this.state)
        return (
            <AuthContext.Provider
                    value={{stateFromContextProvider: this.state}}
                    // value={{
                    //     ...this.state,
                    //     login: this.login.bind(this),
                    //     logout: this.logout
                    // }}>
                    >
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer, AuthContext }