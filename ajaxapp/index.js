function main() {
    fetcheUserInfo("js-primer-example")
        .catch((error) => {
            // Promiseチェーンで発生したエラーを受け取る
            console.error(`エラーが発生しました(${error})`);
        });
}

function fetchUserInfo(userId) {
    fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
        .then(response => {
            if (!response.ok) {
                // ここをmainでエラーハンドリングしたい
                return Promise.reject(new Error(`${response.status}: ${response.statusText}`))
            } else {
                return response.json().then(userInfo => {
                    const view = createView(userInfo);
                    display(view);
                });
            }
        }).catch(error => {
            console.error(error);
        });
}

function createView(userInfo) {
    return escapeHTML`
    <h4>${userInfo.name} (@${userInfo.login})</h4>
    <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
    <dl>
        <dt>Location</dt>
        <dd>${userInfo.location}</dd>
        <dt>Repositories</dt>
        <dd>${userInfo.public_repos}</dd>
    </dl>
    `;
}

function displayView(view) {
    const result = document.getElementById("result");
    result.innerHTML = view;
}