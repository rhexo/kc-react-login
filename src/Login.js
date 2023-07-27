import React, { useState } from "react";
// import { useKeycloak } from "@react-keycloak/web";
import keycloak from "./keycloak";

function Login() {
    // const { keycloak, initialized } = useKeycloak()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            let details = {
                'username': username,
                'password': password,
                'grant_type': 'password',
                'client_id': 'novitravel-app'
            };

            let formBody = [];
            for (let property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            let resp = await fetch('https://novitravel.ru:8001/auth/realms/novitravel/protocol/openid-connect/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
                body: formBody
            }).then(resp => resp.json())

            try {
                const authenticated = await keycloak.init({
                    // onLoad: 'check-sso',
                    token: resp.access_token,
                    refreshToken: resp.refresh_token,
                    // flow: 'implicit',
                    checkLoginIframe: false,
                    timeSkew: -10
                });
                console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
            } catch (error) {
                console.error('Failed to initialize adapter:', error);
            }

            // await keycloak.login({
            //     prompt: 'none'
            // });
        } catch (error) {
            console.error("Failed to log in", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <button type="submit">Log in</button>
        </form>
    );
}

export default Login;