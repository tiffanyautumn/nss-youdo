import { useEffect, useState } from "react"
import { Button, Table } from "reactstrap"
import { Vendor } from "./Vendor"
import { VendorForm } from "./VendorForm"

export const Vendors = ({wedding, user}) => {
    const weddingId = wedding?.id
    const [jobs, setJobs] = useState([])
    const [weddingVendors, setWeddingVendors] = useState([])
    const [formActive, updateFormActive] = useState(false)
    
    //fn to get all vendors and set state of weddingVendors
    //this is in fn form in order to pass it through props
    const getAllVendors = () => {
        fetch (`http://localhost:8088/weddingVendors?_expand=vendor&weddingId=${weddingId}`)
                .then(response => response.json())
                .then((data) => {
                    setWeddingVendors(data)
                })
    }
    
    //this runs getAllVendors and sets the state of jobs
    useEffect(
        () => {

            getAllVendors()

            fetch (`http://localhost:8088/jobs`)
                .then(response => response.json())
                .then((data) => {
                    setJobs(data)
                })
        },
        []
    )

    
    //this fn allows the form to add vendors to be shown when the add a vendor button is clicked and the state of updateFormActive is set to true  
    const vendorForm = () => {
        if (formActive) {
            return <> <h5>Add a Vendor</h5>
            <div><VendorForm jobs={jobs} wedding={weddingId} getAllVendors={getAllVendors} updateFormActive={updateFormActive} /></div>
            <Button onClick={() => updateFormActive(false) }>Nevermind</Button></>
        }
        else {
            return <Button onClick={() => updateFormActive(true) }>Add a Vendor</Button>
        }
    }
    return <>
        <Table>
            <thead>
                <tr>
                    <th>Role</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                
                {
                    weddingVendors.map(
                        
                    (weddingVendor) =>
                    <Vendor key={`weddingVendor--${weddingVendor.id}`} weddingVendor={weddingVendor} getAllVendors={getAllVendors} jobs={jobs}/>
                    )
                }
                
            </tbody>
        
        </Table>
       
        {vendorForm()}
    </>
}