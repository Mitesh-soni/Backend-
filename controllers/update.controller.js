import emp from "../models/employee.js"
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
        res.json({
            employee: empUpdated,
        });
    }
    catch (err) {
        res.json(err)
    }
}
