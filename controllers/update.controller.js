import emp from "../models/employee.js"
import axios from "axios"
export const updateemp = async (req, res) => {
    try {
        const { key, value } = req.params;
        const filter = { [key]: value };

        console.log("Filter:", filter);
        console.log("Body:", req.body);

        const empUpdated = await emp.findOneAndUpdate(filter, { $set: req.body }, { new: true });
        if (!empUpdated) {
           return res.json(`message: ${key} ${value} was not in entire modle`)
        }
        const user = await axios.put(`http://localhost:3000/updateuser/${key}/${value}`, req.body);
        res.json({
            employee: empUpdated,
            users: user.data
        });
    }
    catch (err) {
        res.json(err)
    }
}
