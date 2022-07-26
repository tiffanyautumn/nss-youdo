import { useEffect, useState } from "react"
import { Button, Card, CardBody } from "reactstrap"


export const Vendor = ({vendor, getAllVendors}) => {
    const jobId = vendor.vendor.jobId
    const vendorId = vendor.id
    const [job, setJob] = useState({})
    const [weddingVendor, setWeddingVendor] = useState({})

    useEffect(
        () => {
            fetch (`http://localhost:8088/jobs?id=${jobId}`)
                .then(response => response.json())
                .then((data) => {
                    const Job = data[0]
                    setJob(Job)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch (`http://localhost:8088/weddingVendors?vendorId=${vendorId}`)
                .then(response => response.json())
                .then((data) => {
                    const weddingVendor = data[0]
                    setWeddingVendor(weddingVendor)
                })
        },
        []
    )

    const deleteButton = () => {
        return <Button size="sm" onClick={() => {
                fetch(`http://localhost:8088/vendors/${vendor.id}`, {
                method: "DELETE",
                })
                .then(() => {
                return fetch(`http://localhost:8088/weddingVendors/${weddingVendor.id}`, {
                    method: "DELETE",
                    })
                })
                .then(() => {
                    getAllVendors()
                })
        }} className="ticket_delete">Delete</Button>
    }
    
    return <>
    <tr>
        <td> {job.name} </td>
        <td>{vendor.vendor.name}</td>
        <td>{vendor.vendor.phoneNum}</td>
        <td>{deleteButton()}</td>
    </tr>
    </>
}