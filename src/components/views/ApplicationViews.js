import { UserViews } from "./UserViews"
import { AdminViews } from "./AdminViews"

export const ApplicationViews = () => {
    const localYouDoUser = localStorage.getItem("youdo_user")
    const youdoUserObject = JSON.parse(localYouDoUser)

    if(youdoUserObject.admin) {
        return <AdminViews />
    }
    else {
        return <UserViews />
    }

	
}