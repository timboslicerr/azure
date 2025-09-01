const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/chatapp', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: String,
    messages: [{ type: String }]
});

const User = mongoose.model('User', userSchema);

app.post('/login', async (req, res) => {
    const { username } = req.body;
    let user = await User.findOne({ username });
    if (!user) {
        user = new User({ username });
        await user.save();
    }
    res.json({ success: true, user });
});

app.post('/message', async (req, res) => {
    const { username, message } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        user.messages.push(message);
        await user.save();
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
