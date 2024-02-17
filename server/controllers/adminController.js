import AdminPass from "../models/adminPassSchema.js";
import User from "../models/userSchema.js";
const Tpassword = "123";

export const adminPass = async (req, res) => {
  const { email, password, adminPassword, employeeID, name } = req.body;
  console.log(email, password, adminPassword, employeeID, name);
  if (!email || !password || !adminPassword || !employeeID || !name) {
    return res.status(400).json({ success: false, message: 'missing credentials' });
  }
  try {
    if (adminPassword !== Tpassword) {

      return res.status(400).json({ success: false, message: 'Admin pass is incorrect' });
    }

    const adminPassDocument = await AdminPass.findOne();
    if (!adminPassDocument) {
      const newAdminPass = new AdminPass();
      newAdminPass.allowedUsers.push({ employeeID, email, name, password });
      await newAdminPass.save();
    } else {
      const existingUser = adminPassDocument.allowedUsers.find(
        (user) => user.email === email
      );

      if (existingUser) {
        return res.status(401).json({ success: false, message: 'This user already has admin pass' });
      }

      adminPassDocument.allowedUsers.push({ employeeID, email, name, password });


      await adminPassDocument.save();
    }

    res.status(200).json({ success: true, message: `${email} got the pass` });
  } catch (error) {
    console.log('4');

    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await AdminPass.findOne();

    const userEmails = allUsers.allowedUsers.map(user => ({
      value: user.employeeID,
      label: `${user.name} (${user.employeeID})`
    }));

    res.status(200).json({ success: true, users: userEmails });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export const setAdminToggle = async (req, res) => {
  let userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ success: false, message: 'This user is an Imposter' });
    }
    user.Admin = !user.Admin;
    if (user.Admin === false) {
      res.status(200).json({ success: true, message: `${user.name} demoted to normal user` });
    } else {
      res.status(200).json({ success: true, message: `${user.name} promoted to admin user` });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export const tasker = async (req, res) => {
  try {
    const { selectedOption, task } = req.body;
    console.log(selectedOption.value, task, 'pok');

    let adminPassDocument = await AdminPass.findOne();
    console.log(adminPassDocument);
    if (!adminPassDocument) {
      adminPassDocument = new AdminPass();
    }

    const existingUser = adminPassDocument.allowedUsers.find(
      (user) => user.employeeID === selectedOption.value
    );

    if (existingUser) {
      existingUser.tasks.push({
        task: task,
        status: 'Pending',
        createdAt: new Date().toLocaleDateString('en-US') + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      });
      await adminPassDocument.save();
      res.status(200).json({ success: true, message: 'Task assigned successfully' });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
