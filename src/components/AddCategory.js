import { TextField, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { configs } from "../config/config.js";
function AddCategory() {
  const topicRef = useRef("");
  const subTopicRef = useRef("");
  const [topics, setTopic] = useState();
  const [selected, setSelected] = useState();
  const postTopic = () => {
    console.log(topicRef.current.value);
    if (
      topicRef.current.value !== null &&
      topicRef.current.value !== undefined
    ) {
      axios
        .post(configs.BACKEND_URL + "/topic/addTopic", {
          topicName: topicRef.current.value,
        })
        .then((response) => {
          console.log(response.data._id);
          alert("added");
        })
        .catch((err) => {
          alert("error");
        });
    } else {
      alert("error");
    }
  };
  const postSubTopic = () => {
    console.log(subTopicRef.current.value);
    if (
      subTopicRef.current.value !== null &&
      subTopicRef.current.value !== undefined
    ) {
      axios
        .post(configs.BACKEND_URL + "/topic/addSubTopic", {
          subTopicName: subTopicRef.current.value,
          topicId: selected,
        })
        .then((response) => {
          console.log(response.data._id);
          alert("added");
        })
        .catch((err) => {
          alert("error");
        });
    } else {
      alert("error");
    }
  };
  const setSelectedTopic = (event) => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };
  useEffect(() => {
    axios.get(configs.BACKEND_URL + "/topic/getTopics").then((response) => {
      console.log(response);
      setTopic(response.data.result);
    });
  }, []);
  return (
    <div style={{ marginTop: "50px", marginLeft: "10px" }}>
      <div>
        {" "}
        <TextField
          id="outlined-basic"
          inputRef={topicRef}
          label="New Topic"
          variant="outlined"
        />
        <Button
          style={{ marginLeft: "30px" }}
          variant="contained"
          onClick={postTopic}
        >
          Add
        </Button>
      </div>
      <div style={{ marginTop: "50px" }}>
        <select name="topics" id="topics" onChange={setSelectedTopic}>
          {topics &&
            topics.map((topic) => {
              return (
                <option key={topic._id} value={topic._id}>
                  {topic.topicName}
                </option>
              );
            })}
        </select>
      </div>
      <div style={{ marginTop: "20px" }}>
        {" "}
        <TextField
          id="outlined-basic"
          label="New sub Topic"
          variant="outlined"
          inputRef={subTopicRef}
        />
        <Button
          style={{ marginLeft: "30px" }}
          variant="contained"
          onClick={postSubTopic}
        >
          Add
        </Button>
      </div>
    </div>
  );
}

export default AddCategory;
