import { PageTitle } from "../../components/pageTitle/pageTitle"
import { SidebarTimes } from "../../components/SidebarTimes/SidebarTimes"
import "./Times.css"

const Times = ({children, pageTitle}) =>{
    return(
        <>
            <section className="times">
                <div className="sidebar">
                     <SidebarTimes />
                </div>
                <div className="children">
                    <PageTitle text={pageTitle}/>
                     {children}
                </div>
            </section>
        </>
    )
}


export{Times}