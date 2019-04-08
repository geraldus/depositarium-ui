import React from 'react'

export interface UserData {
    id: number,
    name: string,
    accessRights: string[],
    [propNames: string]: any
}

export interface UserContext {
    auth: boolean,
    user?: UserData,
    accessRights: string[]
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
    accessRights: [],
    login: () => {},
    logout: () => {}
}

const AuthContext = React.createContext({
    ...defaultState,
    // ...window.currentUser
})


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
        this.setState({
            ...creds,
            auth: true
        })
    }
    logout = () => {
        this.setState(defaultState)
    }
    render () {
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