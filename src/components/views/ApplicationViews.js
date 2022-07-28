import { UserViews } from "./UserViews"
import { AdminViews } from "./AdminViews"
import { useEffect, useState } from "react"

export const ApplicationViews = () => {
    const localYouDoUser = localStorage.getItem("youdo_user")
    const youdoUserObject = JSON.parse(localYouDoUser)
    const [user, setUser] = useState([])

    //gets user ands sets user which allows us to check if user is an admin
    useEffect(
        () => {
            fetch (`http://localhost:8088/users/${youdoUserObject.id}`)
                .then(response => response.json())
                .then((data) => {
                    const currentuser = data
                    console.log(currentuser)
                    setUser(currentuser)
                })
        },
        []
    )
    

    if(user?.isAdmin === true) {
        return <AdminViews />
    }
    else {
        return <UserViews />
    }

	
}