export const apiServiceEndpoint = 'http://localhost:52700';

export const customFetch = (input, getState, init) => {
    if (isNullOrUndefined(input) || isNullOrUndefined(getState) || isNullOrUndefined(init)) {
        return;
    }

    /*const state = getState();

    const accessToken = state.app.loginData.accessToken;
    const userId = state.app.loginData.userId;
    const loginType = state.app.loginData.loginType;*/

    const innerInit = {
        mode: 'cors',
        headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json; charset=utf-8',
            /*'AccessToken': accessToken,
            'UserId': userId,
            'LoginType': loginType*/
        },
        ...init
    };

    return fetch(input, innerInit);
}

const isNullOrUndefined = (obj) => obj === null || obj === undefined;