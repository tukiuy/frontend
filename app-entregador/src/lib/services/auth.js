
import config from '$lib/config/auth_config'
import { isAuthenticated, popupOpen, user } from '$lib/stores/auth'
import { createAuth0Client } from '@auth0/auth0-spa-js'

async function createClient() {
  let auth0Client = await createAuth0Client({
    domain: config.domain,
    
    clientId: config.clientId,
  })

  return auth0Client
}
/**
 * @param {import('@auth0/auth0-spa-js').Auth0Client} client 
 * @param {import('@auth0/auth0-spa-js').PopupLoginOptions | undefined} options 
 */
async function loginWithPopup(client, options) {
  popupOpen.set(true)
  try {
    await client.loginWithPopup(options)

    // @ts-ignore
    user.set(await client.getUser())
    isAuthenticated.set(true)
  } catch (e) {
    console.error(e)
  } finally {
    popupOpen.set(false)
  }
}

/**
 * 
 * @param {import('@auth0/auth0-spa-js').Auth0Client} client 
 * @returns {Promise<void>}
 */
function logout(client) {
  return client.logout()
}

const auth = {
  createClient,
  loginWithPopup,
  logout,
}

export default auth