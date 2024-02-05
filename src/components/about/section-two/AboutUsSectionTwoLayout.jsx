import React, { useState } from "react"
import { Animate } from "../../../hooks/animation/AnimateIn"
import Button from "../../button/ButtonComponent"
import SectionThreeList from "../../../components/landing-page/section-three/section-three-list/SectionThreeList"
//import SectionThreeList from "./section-three-list/SectionThreeList";
import styles from "./AboutUsHeader.module.scss"
import { Button as ButtonComp } from "@mui/material"

const AboutUsSectionTwoLayout = ( { title } ) => {
    const [ img, setImg ] = useState(
        "https://res.cloudinary.com/kingsleysolomon/image/upload/v1707168047/ticked/Frame_34492_u9jnyu.svg",
    )
    const onHover = e => {
        let name = e.target.dataset.name
        if ( name === "step-2" ) {
            setImg(
                `https://res.cloudinary.com/kingsleysolomon/image/upload/v1707168047/ticked/Frame_34492_u9jnyu.svg`,
            )
        } else {
            setImg(
                "https://res.cloudinary.com/kingsleysolomon/image/upload/v1707168047/ticked/Frame_34492_u9jnyu.svg",
            )
        }
    }

    return (
        <div className={ styles.main }>
            <img
                className={ styles.float_icon }
                src="https://res.cloudinary.com/kingsleysolomon/image/upload/v1707168041/ticked/Vector_gek916.png"
                alt="float-icon"
            />
            <section className={ styles.container }>
                <div className={ styles.main__tick }>
                    <header>
                        <h3 className={ styles.section__three_title }>{ title }</h3>
                    </header>
                    <div className={ styles.steps }>
                        <SectionThreeList
                            hover={ onHover }
                            name={ `step-1` }
                            icon="https://res.cloudinary.com/kingsleysolomon/image/upload/v1707167934/ticked/task-square_ydda74.png"
                            title="Get on your dashboard"
                            desc="Describe your task, set the date and time for your task deadline."
                        />
                    </div>
                    <div className={ styles.steps }>
                        <SectionThreeList
                            hover={ onHover }
                            name={ `step-2` }
                            icon="https://res.cloudinary.com/kingsleysolomon/image/upload/v1707167920/ticked/profile-2user_v1f1we.png"
                            title="Personalized Virtual Assistant"
                            desc="The in-app chat feature available allows you to communicate and assign tasks to a personalized Assistant."
                        />
                    </div>
                    <div>
                        <SectionThreeList
                            hover={ onHover }
                            icon="https://res.cloudinary.com/kingsleysolomon/image/upload/v1707167861/ticked/tick-circle_vpvw9h.png"
                            title="Get TICKED"
                            desc="Receive notifications when you complete your tasks and a call when deadlines are fast approaching.
"
                        />
                    </div>
                    <div className={ styles.steps }>
                        <Button
                            link={ `/login` }
                            title={ `Get Started` }
                            style={ { width:`100%` } }
                        />
                        <ButtonComp
                            variant="outlined"
                            style={ { width:`100%` } }
                            className={ [ styles.download ].join( " " ) }
                        >
                            Download App
                        </ButtonComp>
                    </div>
                </div>
            </section>
            <div>
                <Animate.FadeIn>
                    <img className={ styles.img }
                         src={ img }
                         alt="section-three-img"/>
                </Animate.FadeIn>
            </div>
        </div>
    )
}
export default AboutUsSectionTwoLayout
