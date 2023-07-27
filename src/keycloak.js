import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "https://novitravel.ru:8001/auth/",
    realm: "novitravel",
    clientId: "novitravel-app"
});

keycloak.onTokenExpired = () => {
    console.log('Expired');
    keycloak.updateToken(-1);
}

// try {
//     const authenticated = await keycloak.init({
//         flow: 'implicit'
//     });

//     console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
// } catch (error) {
//     console.error('Failed to initialize adapter:', error);
// }


export default keycloak;