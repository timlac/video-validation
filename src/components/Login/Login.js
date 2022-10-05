import {useState} from "react";

async function verifyUser() {
    return fetch('https://1v3k9pr4el.execute-api.eu-west-1.amazonaws.com/items')
        .then(data => data.json())
}

export default function Login({setToken}) {

    const [username, setUserName] = useState();
    const [alert, setAlert] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        const data = await verifyUser()
        const items = data["Items"]
        const unique = [...new Set(items.map(item => item.alias))];

        if (unique.includes(username)){
            console.log("setting username")
            console.log(username)
            setToken({"token": username})
        } else {
            setAlert(true)
        }
    }

    return(
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            {alert && <h2> Invalid username </h2>}
        </div>
    )
}



const handle = async () => {
    const data = await verifyUser()
    console.log(data)
}

handle()