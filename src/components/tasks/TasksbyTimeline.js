import { AccordionBody, AccordionHeader, AccordionItem, Table, UncontrolledAccordion } from "reactstrap"
import { Task } from "./Task"

export const TasksbyTimeline = ({tasks, getAllTasks, youdoUserObject}) => {

    const yeartasks = []
    const tenmonthtasks = []
    const eightmonthtasks = []
    const sixmonthtasks = []
    const fourmonthtasks = [] 
    const twomonthtasks = []
    const onemonthtasks = []
    const dayoftasks = []

    const timeSort = () => {
        
        tasks.map(
            (task) => {
                if (task.timeFrame >= 12) {
                    yeartasks.push(task)
                }
                else if(task.timeFrame >= 10 && task.timeFrame < 12) {
                    tenmonthtasks.push(task)
                } else if (task.timeFrame >= 8 && task.timeFrame < 10) {
                    eightmonthtasks.push(task)
                } else if (task.timeFrame >= 6 && task.timeFrame < 8) {
                    sixmonthtasks.push(task) 
                } else if (task.timeFrame >= 4 && task.timeFrame < 6) {
                    fourmonthtasks.push(task)
                } else if (task.timeFrame >= 2 && task.timeFrame < 4) {
                    twomonthtasks.push(task)
                } else if (task.timeFrame === 1) {
                    onemonthtasks.push(task)
                } else {
                    dayoftasks.push(task)
                }
            }
        )
    }

    const table = (array) => {
        return <>   
        <Table>
            <thead>
                <tr>
                    <th></th>
                    <th>Task</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    array.map(
                        (task) => <Task key={`task--${task.id}`} getAllTasks={getAllTasks}
                currentUser= {youdoUserObject}
                taskObject= {task} 
                />
                )}
                </tbody>
        </Table>
            </>
    }
    return <>
    {timeSort()}
        <div className="TimeDisplay">
        <UncontrolledAccordion  stayOpen>

        <AccordionItem>
            <AccordionHeader targetId="1"> 12+ months before the Wedding</AccordionHeader>
            <AccordionBody accordionId="1">
            { table(yeartasks)}
            </AccordionBody>
        </AccordionItem>

        <AccordionItem>
            <AccordionHeader targetId="2"> 10-11 months</AccordionHeader>
            <AccordionBody accordionId="2">
            { table(tenmonthtasks)}
            </AccordionBody>
        </AccordionItem>
        
        <AccordionItem>
            <AccordionHeader targetId="3"> 8-9 months</AccordionHeader>
            <AccordionBody accordionId="3">
            { table(eightmonthtasks)}
            </AccordionBody>
        </AccordionItem>
            
        <AccordionItem>
            <AccordionHeader targetId="4"> 6-7 months</AccordionHeader>
            <AccordionBody accordionId="4">
            { table(sixmonthtasks)}
            </AccordionBody>
        </AccordionItem>

        <AccordionItem>
            <AccordionHeader targetId="5"> 4-5 months</AccordionHeader>
            <AccordionBody accordionId="5">
            { table(fourmonthtasks)}
            </AccordionBody>
        </AccordionItem>
        
        <AccordionItem>
            <AccordionHeader targetId="6"> 2-3 months</AccordionHeader>
            <AccordionBody accordionId="6">
            { table(twomonthtasks)}
            </AccordionBody>
        </AccordionItem>

        <AccordionItem>
            <AccordionHeader targetId="7"> 2-3 months</AccordionHeader>
            <AccordionBody accordionId="7">
            { table(onemonthtasks)}
            </AccordionBody>
        </AccordionItem>

        <AccordionItem>
            <AccordionHeader targetId="8">wedding week</AccordionHeader>
            <AccordionBody accordionId="8">
            { table(dayoftasks)}
            </AccordionBody>
        </AccordionItem>

        </UncontrolledAccordion>
        </div>
    </>
}

