import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import styles from "./VAHome.module.scss";
import Accordian from "../Accordion/Accordion";
import axios from "axios";
import moment from "moment";

// import { SelectDropdown } from "../SelectDropdown/SelectDropdown";
// import tasks from "../Accordion/_mock";
import { AiOutlineDown } from "react-icons/ai";
import assign from "../../assets/autobrightnessassignicon.svg";
import clock from "../../assets/clockclockiicon.svg";
import closeIcon from "../../assets/close-circleclose.svg";
import comment from "../../assets/Frame24comment.svg";
import smile from "../../assets/Subtractsmile.svg";

const VAHome = () => {
  const [data, setData] = useState([]);
  const time = moment(data[0]?.end_time).format("111");
  // const [num, setNum] = useState(data?.length);
  // const [title, setTitle] = useState("ALL");
  const [activeClass, setActiveClass] = useState(2);
  const [singleDate, setSingleData] = useState({
    title: data[0]?.title,
    date: time,
    description: data[0]?.description,
    status: data[0]?.status,
    client: data[0]?.user.name,
    number: data[0]?.user.phone,
    comment: 6
  });
  const [hidden, setHidden] = useState(true);
  const [dissapear, setDissapear] = useState(true);

  const fetchTasks = async () => {
    let vaUser = JSON.parse(localStorage.getItem("VA"));

    if (vaUser) {
      const response = await axios.get(
        `https://api.ticked.hng.tech/api/v1/task/all/va`,
        {
          headers: {
            Authorization: `Bearer ${vaUser.extra.token}`
          }
        }
      );

      const vaTasks = response.data.data;
      console.log(vaTasks);

      setData(vaTasks);
      // console.log(tasks);
    }
  };

  useEffect(() => {
    fetchTasks();
    // console.log(tasks);
  }, []);

  const handleSideBar = () => {
    setHidden(true);

    //Add dissapear style to sidebar after 1second of animation
    setTimeout(() => {
      setDissapear(true);
    }, 500);
  };
  useEffect(() => {
    if (hidden === true) {
      document.body.style = "overflow-y:scroll";
    } else {
      document.body.style = "overflow-y:hidden";
    }
  }, [hidden]);

  return (
    <Box minHeight={"100vh"} padding="33px" bgcolor={"#F9F7FF"}>
      <Box
        display={"flex"}
        justifyContent="space-between"
        flexDirection={"column"}
        className={styles.upperTittle}
        alignItems={"center"}
        sx={{
          width: `${"100%"}`,
          backgroundColor: "#fff",
          padding: "14px 22px",
          borderRadius: "8px",
          gap: "20px"
        }}
      >
        <Box display={"flex"} width="100%" justifyContent={"space-between"}>
          <Box display={"flex"} sx={{ alignItems: "center", gap: "10px" }}>
            {" "}
            <Typography variant="h4" className={styles.tittle}>
              Today
            </Typography>
            <AiOutlineDown className={`${styles.chevron} `} />
          </Box>
        </Box>

        <Box display={"flex"} width="100%" gap={"50px"}>
          <Typography
            onClick={() => {
              setActiveClass(2);
            }}
            sx={{
              fontSize: "15px",
              fontWeight: "600",
              textAlign: "center",
              cursor: "pointer"
            }}
            color={activeClass === 2 && " #714DD9"}
            className={activeClass === 2 && styles.active}
          >
            All Tasks {`(${data?.length})`}
          </Typography>
          <Typography
            onClick={() => {
              setActiveClass(1);
              // console.log(activeClass);
            }}
            sx={{
              fontSize: "15px",
              cursor: "pointer",
              textAlign: "center",
              color: `${activeClass === 1 && " #714DD9"}`
            }}
            className={activeClass === 1 && styles.active}
          >
            Assigned to Me
          </Typography>
        </Box>
      </Box>
      <Box display={"flex"} width="100%" gap={"20px"}>
        {data?.length === 0 && (
          // /* TASKS EMPTY STATE */
          <Box
            minHeight={"69vh"}
            width={"100%"}
            bgcolor="#fff"
            marginTop={3}
            borderRadius={3}
            display={"flex"}
            sx={{
              placeItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            <h4 style={{ fontSize: "24px" }}>No Clients</h4>
            <p
              style={{
                fontSize: "17px",
                textAlign: "center",
                marginTop: "10px"
              }}
            >
              You will be notified when a user has been assigned to you
            </p>
          </Box>
        )}

        <Box
          style={{ display: `${(data?.length === 0 && "none") || "block"}` }}
          className={styles.Accordian__v11}
          display={"flex"}
          flexDirection="column"
          marginTop={"27px"}
          sx={{
            width: "65%",
            backgroundColor: "transparent",
            padding: "10px 0px"
          }}
        >
          {data && (
            <Accordian
              data={data}
              numTask={data?.length}
              setDissapear={setDissapear}
              setHidden={setHidden}
              setData={setSingleData}
            />
          )}{" "}
        </Box>

        {/* //SIDE BAR */}

        <Box
          style={{ display: `${(data?.length === 0 && "none ") || "block"}` }}
          className={`${styles.sidebar} ${hidden && styles.hidden} ${
            dissapear && styles.dissapear
          }`}
          marginTop={"-145px"}
          position="relative"
          sx={{ width: "35%", backgroundColor: "#fff" }}
        >
          <Box
            style={{
              display: `${(data?.length === 0 && "none ") || "block"}`
            }}
            position={"relative"}
            top="-27px"
            className={`${styles.saviour__relative} ${
              hidden && styles.hidden
            } ${dissapear && styles.dissapear}`}
          >
            <Box
              style={{
                display: `${(data?.length === 0 && "none ") || "block"}`
              }}
              width={"42%"}
              height="100%"
              marginTop={"50px"}
              position="fixed"
              className={styles.sidebar__fixed}
            >
              {/* CLOSE ICON */}
              <img
                src={closeIcon}
                alt="close"
                className={styles.closeIcon}
                onClick={handleSideBar}
              />
              <Box
                padding={"20px"}
                paddingBottom={"10px"}
                borderBottom="1px solid #E9F3F5"
              >
                <p
                  className={styles.title__hi}
                  style={{
                    color: "black",
                    fontSize: "18px",
                    fontWeight: 700,
                    paddingTop: "25px"
                  }}
                >
                  {singleDate.title}
                </p>
              </Box>
              <Box width={"100%"} padding="56px 24px">
                <Box display={"flex"} gap="10px">
                  <img src={assign} alt="assign" />
                  <p>Assigned to me</p>
                </Box>
                <Box
                  width={"100%"}
                  border="1px solid #D3D0D9"
                  padding={"20px"}
                  borderRadius="10px"
                  marginTop={"15px"}
                >
                  <h6 style={{ fontSize: "12px", fontWeight: "700" }}>
                    STATUS
                  </h6>
                  <Box display={"flex"} gap="5px" marginBottom={"15px"}>
                    <img src={clock} alt="assign" />
                    <p
                      style={{
                        fontSize: "15px",
                        color: `${
                          (singleDate.status === "Done" && "#53c41a") ||
                          (singleDate.status === "Pending" &&
                            "rgba(113, 77, 217)") ||
                          (singleDate.status === "Overdue" &&
                            "rgba(255, 77, 79)")
                        }`
                      }}
                    >
                      {singleDate.status}
                    </p>
                  </Box>
                  <h6 style={{ fontSize: "12px", fontWeight: "700" }}>
                    DUE TIME
                  </h6>
                  <p>{singleDate.date}</p>
                  <h6
                    style={{
                      marginTop: "15px",
                      fontSize: "12px",
                      fontWeight: "700"
                    }}
                  >
                    CLIENT
                  </h6>
                  <Box
                    display={"flex"}
                    marginTop="10px"
                    justifyContent={"space-between"}
                  >
                    <Box display={"flex"} flexDirection="column">
                      <h6 style={{ color: "#714DD9", fontSize: "12px" }}>
                        {singleDate.client}{" "}
                      </h6>
                      <p style={{ fontSize: "12px" }}> +{singleDate.number} </p>
                    </Box>
                    <Box display={"flex"} alignItems="center" gap="5px">
                      <img src={comment} alt="comment" />
                      <h3 style={{ fontSize: "15px" }}>
                        {singleDate.comment}{" "}
                      </h3>
                    </Box>
                  </Box>
                </Box>
                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "12px",
                    fontWeight: "700"
                  }}
                >
                  Descrption
                </p>
                <p style={{ fontSize: "12px" }}>{singleDate.description} </p>
              </Box>
            </Box>
            <Box
              className={`${styles.comment} ${hidden && styles.hidden} ${
                dissapear && styles.dissapear
              }`}
              width={"37%"}
              borderRadius="10px"
              border="1px solid #D3D0D9"
              position={"fixed"}
              bottom="10px"
              padding="10px"
              right="36px"
              display={"flex"}
              gap="7px"
              alignItems={"center"}
            >
              <img
                style={{
                  height: "28px",
                  marginLeft: "10px",
                  cursor: "pointer"
                }}
                src={smile}
                alt="smile"
              />
              <input
                style={{ margin: "0", border: 0, outline: "none" }}
                type="text"
                placeholder="Add a comment..."
                title="comment"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VAHome;
