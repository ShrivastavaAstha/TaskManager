const express = require("express");
const app = express();
const taskmodel = require("./models/task");
const { connectDatabase } = require("./connection/connect");
app.use(express.json());
const path = require("path");

app.post("/api/addtaskagain", async (req, res) => {
  try {
    const newobj = {
      taskTitle: req.body.taskTitle,
      taskdescription: req.body.taskdescription,
      taskduedate: req.body.taskduedate,
      TaskStatus: req.body.TaskStatus,
    };
    console.log(newobj);
    const taskdata = new taskmodel(newobj);
    await taskdata.save();
    return res.status(200).json({ success: true, message: "Data Saved" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

app.get("/api/gettask", async (req, res) => {
  try {
    const task = await taskmodel.find();
    return res.status(200).json({ success: true, task: task });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});
app.delete("/api/deletetask/:id", async (req, res) => {
  try {
    const deleteit = await taskmodel.findByIdAndDelete(req.params.id);
    return res.json({ success: true });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

//update operation for taskstatus:
app.post("/api/handlestatus/:id", async (req, res) => {
  try {
    const data = await taskmodel.findByIdAndUpdate(req.params.id, {
      TaskStatus: req.body.TaskStatus,
    });
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

//update operation for task description:
app.post("/api/updatedescription/:id", async (req, res) => {
  try {
    const data = await taskmodel.findByIdAndUpdate(req.params.id, {
      taskdescription: req.body.taskdescription,
    });
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
connectDatabase();
app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname + "/client/build/index.html"),
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
});
app.listen(PORT, async () => {
  await console.log(`Server is running at Port ${PORT}`);
});
