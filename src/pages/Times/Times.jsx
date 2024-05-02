import { PageTitle } from "../../components/pageTitle/pageTitle"
import { SidebarTimes } from "../../components/SidebarTimes/SidebarTimes"
import { DividerComponent } from "../../components/Divider/DividerComponent"
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
                    <DividerComponent margin={"10px 0"} />
                     {children}
                </div>
            </section>
        </>
    )
}


export{Times}