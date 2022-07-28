import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "reactstrap"
import "./Login.css"

export const Register = (props) => {
    const [titles, setTitles] =useState ([])
    const [customer, setCustomer] = useState({
        email: "",
        name: "",
        isAdmin: false,
        titleId: 0
    })
    let navigate = useNavigate()

    useEffect(
        () => {
            fetch (`http://localhost:8088/titles`)
                .then(response => response.json())
                .then((data) => {
                    setTitles(data)
                })
        },
        []
    )

    const registerNewUser = () => {
        const userToSend = {
            email: customer.email,
            name: customer.name,
            titleId: parseFloat(customer.titleId)
        }
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userToSend)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("youdo_user", JSON.stringify({
                        id: createdUser.id,
                        admin: createdUser.isAdmin
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${customer.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = {...customer}
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for You do.</h1>
                <fieldset>
                    <label htmlFor="name"> Full Name </label>
                    <input onChange={updateCustomer}
                           type="text" id="name" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateCustomer}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="title"> Title</label>
                    <Input onChange={updateCustomer}
                        id="titleId" type="select"
                        >
                        <option>title</option>
                    {
                        titles.map(
                            (title) => {
                                return <option value={title.id}>{title.name}</option>
                                        })
                    }
                    </Input>
                    </fieldset>
                <fieldset>
                    <input onChange={(evt) => {
                        const copy = {...customer}
                        copy.isStaff = evt.target.checked
                        setCustomer(copy)
                    }}
                        type="checkbox" id="isStaff" />
                    <label htmlFor="email"> </label>
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

