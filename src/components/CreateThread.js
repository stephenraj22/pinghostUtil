import { TextField, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { configs } from "../config/config.js";
function CreateThread() {
  const [topics, setTopic] = useState();
  const [subTopics, setSubTopics] = useState();
  const [selected, setSelected] = useState();
  const [selectedSub, setSelectedSub] = useState();
  const [arr, setArr] = useState([]);
  const title = useRef("");

  useEffect(() => {
    axios.get(configs.BACKEND_URL + "/topic/getTopics").then((response) => {
      console.log(response);
      setTopic(response.data.result);
    });
  }, []);
  useEffect(() => {
    console.log(arr)
  }, [arr]);

  const addInput = () => {
    setArr((s) => [...s, ""]);
  };
  const minusInput = (e) => {
    console.log(e.target.id);
    setArr((s) => {
      const newArr = s.slice();
      newArr.splice(e.target.id, 1);
      return newArr;
    });
  };
  const setSelectedTopic = (event) => {
    console.log(event.target.value);
    if (event.target.value !== null && event.target.value !== undefined) {
      axios
        .get(configs.BACKEND_URL + "/topic/getSubTopics", {
          params: {
            topicId: event.target.value,
          },
        })
        .then((response) => {
          console.log(response);
          setSubTopics(response.data.result);
        });
      setSelected(event.target.value);
    }
  };
  const setSelectedSubTopic = (event) => {
    console.log(event.target.value);
    setSelectedSub(event.target.value);
  };
  const handleChange = (e) => {
    const index = e.target.id;
    setArr((s) => {
      const newArr = s.slice();
      newArr[index] = e.target.value;
      return newArr;
    });
    console.log(arr);
  };

  const createThread = () => {
    if (
      title.current.value !== null &&
      title.current.value !== undefined &&
      selected !== null &&
      selected !== undefined &&
      arr !== null &&
      arr !== undefined
    ) {
      axios
        .post(configs.BACKEND_URL + "/thread/createThread", {
          topicName: title.current.value,
          topicId: selected,
          content: arr
        })
        .then((response) => {
          console.log(response.data._id);
          alert("added");
        })
        .catch((err) => {
          alert("error");
        });
    } else {
      alert(selected, arr)
    }
  };
  return (
    <div>
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
      <div style={{ marginTop: "50px" }}>
        <select name="subtopics" id="subtopics" onChange={setSelectedSubTopic}>
          <option key="dummy" value="summy">
            select
          </option>
          {subTopics &&
            subTopics.map((topic) => {
              return (
                <option key={topic._id} value={topic._id}>
                  {topic.subTopicName}
                </option>
              );
            })}
        </select>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          inputRef={title}
        />
      </div>
      <div>
        <Button
          id="outlined-basic"
          label="Title"
          variant="outlined"
          onClick={addInput}
        >
          Add box
        </Button>
        {arr.map((item, i) => (
          <div>
            <textarea
              onChange={handleChange}
              value={item.value}
              id={i}
              type="text"
              size="40"
            />
            <Button
              id={i}
              label="Title"
              variant="outlined"
              onClick={minusInput}
            >
              -
            </Button>
          </div>
        ))}
      </div>
      <Button
        id="outlined-basic"
        label="Title"
        variant="outlined"
        onClick={createThread}
      >
        Create Thread
      </Button>
    </div>
  );
}

export default CreateThread;
