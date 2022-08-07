import { useEffect, useState } from "react"
import { isDOMComponent } from "react-dom/test-utils"
import { AccordionBody, AccordionHeader, AccordionItem, Button, Dropdown, DropdownMenu, DropdownToggle, ListGroup, ListGroupItem, Nav, NavItem, Offcanvas, OffcanvasBody, OffcanvasHeader, Table, UncontrolledAccordion } from "reactstrap"
import { Task } from "./Task"

export const TasksbyCat = ({tasks, getAllTasks, youdoUserObject}) => {
    const [categories, setCategories] = useState([])
    const [offcanvas, setOffcanvas] = useState(false)
    const toggle = () => {setOffcanvas(!offcanvas)}
    const [catTask, update] = useState({
        category: 1
    })

    useEffect(
        () => {
            fetch (`http://localhost:8088/categories`)
                .then(response => response.json())
                .then((data) => {
                    setCategories(data)
                })
        },
        []
    )

    const headerdisplay = () => {
        return <> {
            categories.map(
                (category) => {
                    if(category.id === catTask.category) {
                        return category.description
                    }
                }
            )
            }</>
     
    }
    const catdisplay = () => {
        return <>
        <div className="categoryDisplay">
        
        <UncontrolledAccordion defaultOpen={['1','2']} stayOpen>

        <AccordionItem>
            <AccordionHeader targetId="1"> {headerdisplay()}
           </AccordionHeader>
            <AccordionBody accordionId="1">
            
            
            
            <Table>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            { tasks
            .filter( (task) => task.categoryId === catTask.category)
            .map((task) => {
                return <>
                <Task key={`task--${task.id}`} getAllTasks={getAllTasks}
                currentUser= {youdoUserObject}
                taskObject= {task} 
                /></>}) 
            }
            </tbody>
            </Table>
            </AccordionBody>
        </AccordionItem>
        </UncontrolledAccordion>
            
        
        </div>
        </>
            
    }

    return <>
    <div className="d-flex">
    <Dropdown isOpen={offcanvas} toggle= {toggle}>
        <DropdownToggle caret >Categories</DropdownToggle>
    
    <DropdownMenu>
        <ListGroup>
            
        
    {
            categories.map(
                (category) => {
                    return <>
                        <ListGroupItem key={`category--${category.id}`} tag="button" value={category.id} onClick= {(evt) => {
                            const copy = {...catTask}
                            copy.category = parseFloat(evt.target.value)
                            update(copy)
                            toggle()
                        }}>{category.description}</ListGroupItem></>
                    
                }
            )
        }
        </ListGroup>
    </DropdownMenu>
    </Dropdown>
    </div>
    
    {
            catTask !== 0
                ? catdisplay()
                : ""
                
        }

    </>
}