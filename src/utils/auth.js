import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const RolesKey = 'Admin-Roles'
const StateKey = 'Admin-State'

const AgentKey = 'Admin-Agent'
//token or cookie
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
//roles
export function getRoles() {
  return Cookies.get(RolesKey)
}

export function setRoles(Roles) {
  return Cookies.set(RolesKey, Roles)
}

//State
export function getState() {
  return Cookies.get(StateKey)
}

export function setState(State) {
  return Cookies.set(StateKey, State)
}
//Agent
export function getAgent() {
  return Cookies.get(AgentKey)
}

export function setAgent(Agent) {
  return Cookies.set(AgentKey, Agent)
}
export function removeToken() {
  Cookies.remove(RolesKey)
  Cookies.remove(StateKey)
  Cookies.remove(AgentKey)
  return Cookies.remove(TokenKey)
}
