import { Box } from "@mui/material";
import React, { useState } from "react";
import styles from "./Accordion.module.scss";
import avatar from "../../assets/avatar3.jpg";
import comment from "../../assets/Vectorcom2.png";
import commentlight from "../../assets/message-2messagelight.svg";
import right from "../../assets/arrow-rightright.svg";
import stopwatch from "../../assets/timer-startstopclock.svg";
import stopwatchlight from "../../assets/timer-startclocklight.svg";
import moment from "moment";

const Accordion = ({ data, setData, setHidden, setDissapear }) => {
  const [activeState, setActiveState] = useState(data[0]);
  console.log(data);
  return (
    <Box>
      <Box
        display={"flex"}
        flexDirection="column"
        width="100%"
        justifyContent={"space-between"}
        alignItems="center"
      >
        {data.map(task => (
          // MOBILEVIEW
          <Box
            borderBottom={"1px solid #E9F3F5"}
            className={styles.taskListMobile}
            paddingBottom="15px"
            paddingTop="15px"
            key={task?.task_id}
            display={"flex"}
            width="100%"
            justifyContent={"space-between"}
            alignItems="center"
            sx={{
              cursor: "pointer",
              backgroundColor: `${
                (activeState === task && "#714DD9") || "#fff"
              }`
            }}
            onClick={() => {
              setData({
                title: task.title,
                date: moment(task.end_time).format("lll"),
                description: task.description,
                status: task.status,
                client: task.user.name,
                number: task.user.phone,
                comment: task.comment
              });
              setDissapear(false);
              setTimeout(() => {
                setHidden(false);
              }, 50);
              setActiveState(task);

              // console.log(activeState);
            }}
          >
            <Box display={"flex"} flexDirection="column">
              <Box
                className={styles.task__name__v1}
                display={"flex"}
                alignItems="center"
                marginLeft={"30px"}
              >
                <h6
                  className={styles.task__name}
                  style={{
                    color: `${(activeState === task && "#fff") || "#333"}`
                  }}
                >
                  {task.title}
                </h6>
              </Box>
              <Box
                display={"flex"}
                alignItems="center"
                gap="20px"
                marginLeft={"50px"}
                className={styles.info}
              >
                <Box display="flex" alignItems={"center"} gap="5px">
                  {" "}
                  <img
                    style={{ height: "20px", borderRadius: "50%" }}
                    src={avatar}
                    alt="avatar"
                  />
                  <span
                    style={{
                      fontSize: "15px",
                      paddingRight: "30px",
                      borderRight: "1px solid #D3D0D9",
                      whiteSpace: "nowrap",
                      color: `${(activeState === task && "#fff") || "#333"}`
                    }}
                  >
                    {task.user.name}{" "}
                  </span>
                </Box>
                <Box display="flex" alignItems={"center"} gap="5px">
                  <img
                    src={activeState === task ? stopwatchlight : stopwatch}
                    alt="stopwatch"
                    style={{ height: "20px", width: "20px" }}
                  />
                  <span
                    style={{
                      fontSize: "15px",
                      color: `${(activeState === task && "#fff") || "#333"}`
                    }}
                  >
                    {moment(task.end_time).format("lll")}{" "}
                  </span>
                </Box>
                <Box display="flex" alignItems={"center"} gap="5px">
                  <img
                    style={{ objectFit: "contain" }}
                    src={activeState === task ? commentlight : comment}
                    alt="comment"
                  />
                  <span
                    style={{
                      fontSize: "13px",
                      color: `${(activeState === task && "#fff") || "#333"}`
                    }}
                  >
                    {"6"}{" "}
                  </span>
                </Box>
              </Box>
            </Box>
            <Box
              display={"flex"}
              gap="5px"
              marginRight={"50px"}
              className={styles.view}
            >
              <span
                style={{
                  color: `${(activeState === task && "#fff") || "#714DD9"}`
                }}
                className={styles.task__date}
              >
                View
              </span>
              <img
                style={{ color: `${activeState === task && "#fff"}}` }}
                className={styles.task__date}
                src={right}
                alt="right"
              />
            </Box>
            {/* <p className= {`${styles.task__date} ${title==='PENDING' && styles.darker ||title==='OVERDUE' && styles.darker }`} >{`${task.date} at ${task.time}`}</p> */}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Accordion;