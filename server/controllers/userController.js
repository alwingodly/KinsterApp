// userController.js
import AdminPass from '../models/adminPassSchema.js';

export const getUserTask = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log(userId);
    const user = await AdminPass.findOne({
      'allowedUsers.employeeID': userId,
    });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const users = user.allowedUsers.find((user) => user.employeeID === userId);

    const tasks = users.tasks;
    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { employeeID, taskIndex } = req.query;
    console.log('employeeID:', employeeID, req.query);
    console.log('taskIndex:', taskIndex);

    const adminPass = await AdminPass.findOne({ 'allowedUsers.employeeID': employeeID });
    console.log(adminPass, '1');
    if (!adminPass) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const taskToUpdater = adminPass.allowedUsers.find((user) => user.employeeID === employeeID);
    console.log(taskToUpdater, 'taskToUpdater');
    const taskToUpdate = taskToUpdater.tasks[taskIndex]
    if (!taskToUpdate) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    if (taskToUpdate.status === 'Pending') {
      console.log('updated to progress');
       taskToUpdate.status = 'progress';
    }
    else if (taskToUpdate.status = 'progress') {
      taskToUpdate.status = 'finished';
      taskToUpdate.finishedAt = new Date().toLocaleDateString('en-US') + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }

    await adminPass.save();
    const user = await AdminPass.findOne({
      'allowedUsers.employeeID': employeeID,
    });
    const users = user.allowedUsers.find((user) => user.employeeID === employeeID);

    const tasks = users.tasks;
    console.log(tasks , '-----------------------------------');
    return res.status(200).json({ success: true, message: 'Task status updated successfully', tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}