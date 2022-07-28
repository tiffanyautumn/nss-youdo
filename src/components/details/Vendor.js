import { useEffect, useState } from "react"
import { Button, Card, CardBody } from "reactstrap"


export const Vendor = ({weddingVendor, getAllVendors, jobs}) => {
    const vendorId = weddingVendor?.vendor?.id
    
    const deleteButton = () => {
        return <Button size="sm" onClick={() => {
        
                 return fetch (`http://localhost:8088/vendors/${vendorId}`, {
                        method: "DELETE"
                        })
                .then(() => {
                    getAllVendors()
                })
        }} className="ticket_delete">Delete</Button>
    }
    
    return <>
    <tr>
        <td> {jobs.map(
            (job) => {
                if(weddingVendor?.vendor?.jobId === job.id) {
                    return job.name
                }
            }
        )}</td>
        <td>{weddingVendor?.vendor?.name}</td>
        <td>{weddingVendor?.vendor?.phoneNum}</td>
        <td>{deleteButton()}</td>
    </tr>
    
    
    </>
}