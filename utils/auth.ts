export const getToken = (): string | undefined => {
  const authData = localStorage.getItem("lemmy-auth")
  if (authData) {
    const token = JSON.parse(authData)
    if (token) {
      return token
    }
  }
  return undefined
}

export const getUser = (): any | undefined => {
  const authData = localStorage.getItem("lemmy-auth")
  if (authData) {
    const parsedData = JSON.parse(authData)
    return parsedData
  }
  return undefined
}

export const checkAuthenticatedUser = (): boolean => {
  const authData = localStorage.getItem("lemmy-auth")
  return !!authData // Returns true if authData is not null or undefined
}

export const saveStorage = (access_token: string): void => {
  const authData = JSON.stringify(access_token)
  localStorage.setItem("lemmy-auth", authData)
}

export const removeStorage = (): void => {
  localStorage.removeItem("lemmy-auth")
}

export const refreshStorage = (user: any): void => {
  const authData = localStorage.getItem("lemmy-auth")
  if (authData) {
    const parsedData = JSON.parse(authData)
    if (parsedData) {
      parsedData.user = user
      localStorage.setItem("lemmy-auth", JSON.stringify(parsedData))
    }
  }
}
