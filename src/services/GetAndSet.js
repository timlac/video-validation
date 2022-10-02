export function putItem(item) {
    return fetch('https://1v3k9pr4el.execute-api.eu-west-1.amazonaws.com/items', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(data => data.json())
}

export function getItem() {
    return fetch("https://1v3k9pr4el.execute-api.eu-west-1.amazonaws.com/items/tim")
        .then(data => data.json())
}